/**
 * Keeps track of the session that the user is in (i.e. logged in, logged out)
 */
(function () {

   'use strict';

   function SessionService(Config, $cookieStore) {

      var self = this;

      self.loggedIn = false;
      self.$cookieStore = $cookieStore;
      self.lastUsername = $cookieStore.get('username');
      self.user = {};

      self.login = function (name) {
         self.user.name = name;
         self.loggedIn = true;
         this.$cookieStore.put('username', user.name);
      }
   }

   angular.module('ivonet').service('session', [
      'Config',
      '$cookieStore',
      SessionService
   ]);

})();

