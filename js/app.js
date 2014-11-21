"use strict";
/*
    app.js, main Angular application script
*/

angular.module('Reviews and Ratings', ['ui.bootstrap'])
    .config(function($httpProvider) {
        // configures the module to talk to the database I have setup on parse.com for the website
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'r08kYhI1EpXVsSxo5UNA1XhB29XCNsnVCpZbOolY';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = '09pXpIgpA0JrexzlP0JZ2xpnzkEZvDSTTzRkMRDy';
    })
    .controller('ReviewController', function($scope, $http) {
        var reviewsURL = 'https://api.parse.com/1/classes/Review';
        $scope.refreshReviews = function() {
            // Add $scope.loading = true;
            $http.get(reviewsURL)
                .sucess(function(responseData) {
                   $scope.reviews = responseData.results;
                })
                .error(function(err) {
                    console.log(err);
                })
                .finally(function() {
                    //$scope.loading = false;
                });
        }; // refreshReviews

        $scope.refreshReviews(); // called to refresh reviews when the page loads
        $scope.newReview = {votes: 0}; // initialize a new review object on the scope for the new review form

        // Posts a new review to the parse.com server
        $scope.addReview = function(newReview) {
            $scope.inserting = true;
            $http.post(reviewsURL, newReview)
                .success(function(responseData) {
                    newReview.objectId = responseData.objectId;
                    $scope.reviews.push(newReview);
                    $scope.newReview = {votes: 0};
                })
                .error(function (err) {
                    console.log(err);
                })
                .finally(function() {
                    //$scope.inserting = false;
                });
            // end of $http.post
        };

        /*$scope.updateReview = function(review) {
            $scope.updating = true;
            $http.put(reviewsURL + '/' + review.objectId, review)
                .success(function(responseData){})
                .error(function(err) {
                    console.log(err);
                })
                .finally(function() {
                    $scope.updating = true;
                })
        };*/
    });