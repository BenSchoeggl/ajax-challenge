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
        var reviewsURL = 'https://api.parse.com/1/classes/Review';
        // Sets scope.reviewGroupsBy3 to an array of arrays each containing 3 review objects so they can be put into
        // divs by ng-repeat
        $scope.refreshReviews = function() {
            // Add $scope.loading = true;
            $scope.reviewGroupsBy3 = [];
            $http.get(reviewsURL + '?where={"done": false}')
                .sucess(function(responseData) {
                    var resultsIdx = 0;
                    var i;
                    var j;
                    var arrayToPush;
                    var reviewGroupsBy3Size = responseData.results.length / 3;
                    if (responseData.results.length % 3 > 0) {
                        reviewGroupsBy3Size++;
                    }
                    for (i = 0; i < reviewGroupsBy3Size; i++) {
                        arrayToPush = [];
                        j = 0;
                        while (j < 3 && resultsIdx < responseData.results.length) {
                            arrayToPush.push(responseData.results[resultsIdx]);
                            resultsIdx++;
                            j++
                        }
                        reviewGroupsBy3[i].push(arrayToPush);
                        i++;
                    }
                    console.log($scope.reviewGroupsBy3);
                })
                .error(function(err) {
                    console.log(err);
                })
                .finally(function() {
                    $scope.loading = false;
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
                    $scope.push(newReview);
                    $scope.newReview = {votes: 0};
                })
                .error(function (err) {
                    console.log(err);
                })
                .finally(function() {
                    $scope.inserting = false;
                });
            // end of $http.post
        };

        $scope.updateReview = function(review) {
            $scope.updating = true;
            $http.put(reviewsURL + '/' + review.objectId, review)
                .success(function(responseData){})
                .error(function(err) {
                    console.log(err);
                })
                .finally(function() {
                    $scope.updating = true;
                })
        };
    });