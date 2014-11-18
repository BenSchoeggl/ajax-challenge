"use strict";
/*
    app.js, main Angular application script
*/

angular.module('ReviewHandler', ['ui.bootstrap'])
    .config(function($httpProvider) {
        // configures the module to talk to the database I have setup on parse.com for the website
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'r08kYhI1EpXVsSxo5UNA1XhB29XCNsnVCpZbOolY';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = '09pXpIgpA0JrexzlP0JZ2xpnzkEZvDSTTzRkMRDy';
    })
    .controller('ReviewController', function($scope, $http) {
        var reviewUrl = 'https://api.parse.com/1/classes/Review';
        $scope.refreshReviews = function() {
            $scope.loading = true;
            $http.get(reviewUrl + '?where={"done": false}')
                .sucess(function(responseData) {
                    $scope.reviewGroup = responseData.results;

                    // add for loop group by 3 using mod
                })
                .error(function(err) {
                    console.log(err);
                })
                .finally(function() {
                    $scope.loading = false;
                });
        };

        $scope.refreshReviews();
        $scope.addReview = function(newReview) {
            $scope.inserting = true;
            $http.post(reviewUrl, newReview)
                .success(function(responseData) {
                    newReview.objectId = responseData.objectId;
                    $scope.reviewGroup.push(newReview);
                })
                .error(function (err) {
                    console.log(err);
                })
                .finally(function() {
                    $scope.inserting = false;
                });
        };

        $scope.updateReview = function(review) {
            $scope.updating = true;
            $http.put(reviewUrl + '/' + review.objectId, review)
                .success(function(responseData){})
                .error(function(err) {
                    console.log(err);
                })
                .finally(function() {
                    $scope.updating = true;
                })
        };
    });