/**
 * @ngdoc directive
 * @name ivoCollapseText.directive:collapseMobile
 * @restrict E
 * @param {text} ngModel - variable containing the text
 * @description
 * Collapses text when on mobile screen.
 */
(function () {
   angular.module('ivoCollapseText').directive('collapseMobile', collapse);

   function collapse($window) {
      return {
         restrict: 'E',
         replace: true,
         templateUrl: 'components/collapse_text/collapse-text.html',
         scope: {
            text: '=ngModel'
         },
         link: function ($scope) {
            "use strict";
            $scope.collapse = false;

            var w = angular.element($window);

            w.on('resize', function () {
               changeTemplate();
               $scope.$apply();
               console.log("resize event")
            });

            function changeTemplate() {
               var screenWidth = $window.innerWidth;
               $scope.collapse = screenWidth < 768;
               //console.log(screenWidth)
            }

            changeTemplate();
         }

      }
   }
})();

