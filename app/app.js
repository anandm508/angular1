'use strict';

// Declare app level module which depends on views, and components
angular.module('calculator', ['ngRoute']).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  
  $locationProvider.hashPrefix('!');
  
  $routeProvider.when('/linearMotionCalc', {
    templateUrl: 'linearCalc/linearMotionCalc.html',
    controller: 'LinearMotionCalcController'
  });
  
  $routeProvider.otherwise({redirectTo: '/linearMotionCalc'});
}]);
