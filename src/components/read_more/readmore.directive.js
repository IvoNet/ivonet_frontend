(function () {
   angular.module('ivoReadMore')
         .directive('readMore', readMore)
         .filter('readMoreFilter', readMoreFilter);


   /**
    * @ngdoc directive
    * @restrict E
    * @name ivoReadMore.directive:readMore
    * @param {text} ngModel - the variable containing the text (mandatory)
    * @param {boolean} [words='true'] - 'true' of collapse on whole words. 'false' if on letters.
    * @param {number} [length='50'] - a number to collapse after. depends on the words param on what it collapses. Words or letters.
    * @description
    * The read-more tag collapses text greater than the specified size and provides a 'Show more|less' button.
    */
   function readMore() {
      return {
         restrict: 'E',
         replace: true,
         scope: {
            text: '=ngModel',
            wholeWords: '@words',
            maxLength: '@length'
         },
         templateUrl: 'components/read_more/read-more.html',
         controller: [
            '$scope',
            function ($scope) {
               $scope.textLength = isNaN(parseInt($scope.maxLength)) ? 50 : parseInt($scope.maxLength);
               $scope.countingWords = $scope.wholeWords === undefined ? true : ($scope.wholeWords === 'true');
               $scope.collapsed = true;

               $scope.showLinks = $scope.countingWords ? $scope.text.split(" ").length > $scope.textLength :
                                  $scope.text.length > $scope.textLength;

               $scope.changeLength = function () {
                  $scope.textLength = $scope.collapsed ? $scope.text.length : $scope.maxLength;
                  $scope.collapsed = !$scope.collapsed;
               };

            }
         ]
      };
   }

   function readMoreFilter() {
      return function (str, words, tlen) {
         {
            var strToReturn   = str,
                length        = parseInt(tlen),
                foundWords    = [],
                countingWords = ( !!words);

            if (length <= 0) {
               return "";
            }

            if (countingWords) {
               foundWords = str.split(/\s+/);

               if (foundWords.length > length) {
                  strToReturn = foundWords.slice(0, length).join(' ');
               }
            } else {
               if (str.length > length) {
                  strToReturn = str.slice(0, length);
               }
            }
            return strToReturn;
         }
      };
   }
})();