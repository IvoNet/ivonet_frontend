/**
 * @ngdoc directive
 * @name ivoPanels.directive:listPanel
 * @description
 * a bootstrap panel voor lists of urls
 */
(function () {
   angular.module('ivoPanels').directive('listPanel', listPanel);

   function listPanel() {
      return {
         restrict: 'E',
         templateUrl: 'app/panel/list-panel.html',
         replace: true,
         /* scope
          false: Is the default option which does not create a new scope for a directive but
          shares the scope with its parent.
          true: Creates a new scope but prototypically inherits from the parent scope.
          isolate: Creates an isolated scope which does not prototypically inherit from the parent
          scope but you can access parent scope using scope.$parent.

          @ – binds the value of parent scope property (which always a string) to the local scope.
          So the value you want to pass in should be wrapped in {{}}. Remember `a` in braces.
          = – binds parent scope property directly which will be evaluated before being passed in.
          & – binds an expression or method which will be executed in the context of the scope it belongs.

          */
         scope: {
            title: '@',
            items: '=',
            initialCollapse: '@collapse'
         },
         /* controller
          This can be treated as a control room for a directive.
          You can either bind properties/methods to $scope available or this keyword.
          The data bound to this will be accessible in other directives by injecting the
          controller using require option.
          */
         controller: function ($scope) {
            "use strict";
            $scope.collapse = $scope.initialCollapse === undefined ? false : ($scope.initialCollapse === 'true');

            $scope.toggleShow = function () {
               $scope.collapse = !$scope.collapse;
            };

            if ($scope.items === undefined || $scope.items === null) {
               $scope.collapse = true;
            }

         }
      }
   }
})();
