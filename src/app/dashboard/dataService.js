(function () {

   angular.module('ivonet')
        .factory('blikiDataService', [
           '$q',
           '$http',
           'Config',
           blikiDataService
        ]);

   function blikiDataService($q, $http, Config) {

      return {
         getMenu: getRootMenu,
         getSubmenu: getSubmenu,
         getContent: getMenuContent
      };

      function getRootMenu() {
         return $http({
            method: 'GET',
            url: Config.getBliki(),
            cached: true
         })
              .then(sendResponseData)
              .catch(sendGetBooksError)
      }

      function getSubmenu(url) {
         return $http({
            method: 'GET',
            url: url
         })
              .then(sendResponseData)
              .catch(sendGetBooksError)
      }
      function getMenuContent(url) {
         return $http({
            method: 'GET',
            url: url
         })
              .then(sendResponseData)
              .catch(sendGetBooksError)
      }

      function sendResponseData(response) {
         console.log("responsedata: " + angular.toJson(response.data));
         return response.data;
      }

      function sendGetBooksError(response) {
         return $q.reject('Error retrieving book(s). (HTTP status: ' + response.status + ')');
      }

   }
}());

