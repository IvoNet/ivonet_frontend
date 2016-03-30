'use strict';

/**
 * @ngdoc overview
 * @name ivonet
 * @description
 * This module defines the application.
 * Here it al starts.
 */
(function () {

   angular.module('ivonet').config(IvoNetConfig);

   IvoNetConfig.$inject = [
      "$routeProvider",
      "$mdThemingProvider",
      "hljsServiceProvider",
      "ivoMarkdownConfigProvider",
      "$mdIconProvider"
   ];

   function IvoNetConfig($routeProvider, $mdThemingProvider, hljsServiceProvider, ivoMarkdownConfigProvider
        , $mdIconProvider
   ) {
      //$mdThemingProvider.theme('default').primaryPalette('indigo');
      $mdThemingProvider.theme('default')
           .primaryPalette("indigo")
           .accentPalette('pink')
           .warnPalette('red');

      hljsServiceProvider.setOptions({
         // replace tab with 4 spaces
         tabReplace: '    '
      });

      ivoMarkdownConfigProvider.config({
         tables: true,
         parseImgDimensions: true,
         simplifiedAutoLink: false,
         tasklists: true,
         smoothLivePreview: true,
         strikethrough: true,
         extensions: [
            'twitter',
            'targetblank'
         ]
      });

      $mdIconProvider
           .defaultIconSet('/assets/images/ivonet_core.svg');

      $routeProvider
           .when('/', {
              templateUrl: 'app/dashboard/dashboard.html',
              controller: 'Dashboard as dash'
           })
           .when('/bliki', {
              templateUrl: 'app/bliki/bliki.html',
              controller: 'Bliki as bliki'
           })
           .when('/downloads', {
              templateUrl: 'app/dashboard/dashboard.html',
              controller: 'Dashboard as dash'
           })
           .when('/books', {
              templateUrl: 'app/dashboard/dashboard.html',
              controller: 'Dashboard as dash'
           })
           .otherwise({
              redirectTo: '/'
           });
   }
})();


