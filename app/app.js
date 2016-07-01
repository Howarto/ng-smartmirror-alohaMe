'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'myApp.version',
  'ds.clock',
  'feeds'
]);

myApp.controller("GeneralController", ["$scope", "$interval", "$window", function($scope, $interval, $window) {
    $scope.Timer = $interval(function () {
      $window.location.reload();
    }, 1000*60*15); // Every 15' The page refresh all the content.
}]);
