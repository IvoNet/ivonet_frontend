'use strict';

/**
 * @ngdoc overview
 * @name ivoNavbar
 * @description
 * The navbar directive makes the menu on top possible.
 */
(function () {
  angular.module('ivoNavbar', []).directive('navbar', navbar);

  /**
   * @ngdoc directive
   * @restrict E
   * @name ivoNavbar.directive:navbar
   */
  function navbar() {
    return {
      restrict: 'E',
      templateUrl: 'app/navbar/navbar.html',
      controller: function ($scope, $location) {

        $scope.go = function(url) {
          $location.path(url);
        };

        $scope.isActive = function (viewLocation) {
          console.log("" +viewLocation + " " +$location.path());
          return viewLocation === $location.path();
        };
      }
    }
  }
})();

