/**
 * Created by ivonet.
 */

(function () {
   angular.module('ivoIcons', []).directive('ivoIcon', ivoIcon);

   function ivoIcon() {
      "use strict";

      var shapes = {
         'help': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>',
         'close': '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
         'menu': '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>'
      };

      return {
         restrict: 'E',
         replace: true,
         link: link
      };

      function link(scope, element, attr) {

         var icon, size;

         var render = function () {
            if (attr.icon !== undefined) {
               icon = attr.icon;
            } else {
               icon = 'help'
            }

            size = 24;
            element.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="' + size + '" height="' + size + '">' + shapes[icon] + '</svg>');
         };

         render();


      }

   }

})();