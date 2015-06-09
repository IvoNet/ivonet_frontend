(function () {
   angular.module('ivoLogo').directive('ivoWolfLogo', wolfLogo);

   function wolfLogo() {
      return {
         restrict: 'E',
         templateUrl: 'components/logo/wolf-logo.html',
         replace: false
      };
   }
})();
