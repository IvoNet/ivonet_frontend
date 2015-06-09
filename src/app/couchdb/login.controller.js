/**
 * Created by ivonet.
 */
(function () {
   angular.module('ivonet').controller('SignupLoginController', SignupLoginController);

   SignupLoginController.$inject = [
      'couchdb',
      '$http',
      'Config',
      '$mdDialog',
      '$mdToast'
   ];

   function SignupLoginController(couchdb, $http, Config, $mdDialog, $mdToast) {
      "use strict";

      var self = this;


      self.showAlertToast = function () {
         $mdToast.show(
               $mdToast.simple()
                     .content(self.alert)
                     .position('top left')
                     .hideDelay(3000)
         );
      };


      self.login = function () {
         //couchdb.user.logout(function (data) {
         //   console.log("logout: " + data)
         //});

         couchdb.user.login(self.username, self.password).then(function (data) {
            console.log(data);
            $mdDialog.hide();
         });
         //couchdb.user.logout(function(data){console.log(data)});

      }

   }

})();
