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

        }
    });