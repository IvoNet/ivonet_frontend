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
         getContent: getContent
      };

      function getRootMenu() {
         return $http({
            method: 'GET',
            url: Config.getBliki()
         })
              .then(sendResponseData)
              .catch(sendGetBooksError)
      }

      function getContent(url) {
         return $http({
            method: 'GET',
            url: url
         })
              .then(sendResponseData)
              .catch(sendGetBooksError)
      }

      function sendResponseData(response) {
         return response.data;
      }

      function sendGetBooksError(response) {
         return $q.reject('Error retrieving book(s). (HTTP status: ' + response.status + ')');
      }

   }
}());

