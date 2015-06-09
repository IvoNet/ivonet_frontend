/**
 * @ngdoc overview
 * @name ivoHeader
 * @description
 * This module defines directives for manipulating the title tag from within a
 * view or add a tag to the head from within a view.
 */
(function (document) {

  var mod = angular.module('ivoHeader', []);

  /**
   * @ngdoc directive
   * @name ivoHeader.directive:viewTitle
   * @element h1
   * @restrict EA
   * @description
   * Change the title element in de head to look like this:
   * <pre>
   *    <title ng-bind-template="{{viewTitle}}"/></title>
   * </pre>
   * Add one of the usages to the views of your ngRoute views.
   * This will change the title element of the main page.
   */
  mod.directive(
    'viewTitle',
    [
      '$rootScope',
      function ($rootScope) {
        return {
          restrict: 'EA',
          link: function (scope, iElement) {
            // If we've been inserted as an element then we detach from the DOM because the caller
            // doesn't want us to have any visual impact in the document.
            // Otherwise, we're piggy-backing on an existing element so we'll just leave it alone.
            var tagName = iElement[0].tagName.toLowerCase();
            if (tagName === 'view-title' || tagName === 'viewtitle') {
              iElement.remove();
            }

            scope.$watch(
              function () {
                return iElement.text();
              },
              function (newTitle) {
                $rootScope.viewTitle = newTitle;
              }
            );
            scope.$on(
              '$destroy',
              function () {
                delete $rootScope.viewTitle;
              }
            );
          }
        };
      }
    ]
  );

  /**
   * @ngdoc directive
   * @name ivoHeader.directive:viewHead
   * @element foo
   * @restrict A
   * @description
   * Add elements dynamically to the head element of the page. Examples:
   * <pre>
   *    <meta view-head name="description" content="A descition here or an Angular thing">
   *    <meta view-head name="author" content="Ivo Woltring">
   *    <meta view-head name="keywords" content="Angular,js,javascript,cool stuff,ivonet">
   * </pre>
   */
  mod.directive(
    'viewHead',
    function () {
      var head = angular.element(document.head);
      return {
        restrict: 'A',
        link: function (scope, iElement) {
          // Move the element into the head of the document.
          // Although the physical location of the document changes, the element remains
          // bound to the scope in which it was declared, so it can refer to variables from
          // the view scope if necessary.
          head.append(iElement);

          // When the scope is destroyed, remove the element.
          // This is on the assumption that we're being used in some sort of view scope.
          // It doesn't make sense to use this directive outside of the view, and nor does it
          // make sense to use it inside other scope-creating directives like ng-repeat.
          scope.$on(
            '$destroy',
            function () {
              iElement.remove();
            }
          );
        }
      };
    }
  );

})(document);
