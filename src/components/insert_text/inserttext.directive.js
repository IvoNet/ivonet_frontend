/**
 * Created by ivonet.
 */
(function () {
   angular.module('ivoInsertText', [])
         .directive('ivoInsertText', ivoInsertText)
         .directive('ivoCaretPosition', ivoCaretPosition);

   ivoInsertText.$inject = ['$rootScope'];

   /**
    * @ngdoc directive
    * @restrict A
    * @name ivoInsertText.directive:ivoInsertText
    * @description
    * your controller needs something like this:
    <pre>
    insertImage = function () {
       var text = "!["+vm.image.filename+"]("+vm.image.data+")";
       $rootScope.$broadcast('insertText', text);
    }
    </pre>
    * Your html needs something like this:
    <pre>
    <div ng-click="insertImage()">click me</div>
    </pre>
    And the html also needs a textarea to contain something like this:
    <pre>
    <label>
    <textarea ng-model="myText" ivo-insert-text></textarea>
    </label>
    </pre>
    */
   function ivoInsertText($rootScope) {
      return {
         restrict: 'A',
         link: function (scope, element, attrs) {
            $rootScope.$on('ivoInsertText:insert', function (e, val) {
               var domElement = element[0];

               if (document.selection) {
                  domElement.focus();
                  var sel = document.selection.createRange();
                  sel.text = val;
                  domElement.focus();
               } else if (domElement.selectionStart || domElement.selectionStart === 0) {
                  var startPos = domElement.selectionStart;
                  var endPos = domElement.selectionEnd;
                  var scrollTop = domElement.scrollTop;
                  var bc = {};
                  bc.startpos = startPos;
                  bc.endpos = endPos;
                  bc.value = val;
                  domElement.value = domElement.value.substring(0, startPos) + val
                                     + domElement.value.substring(endPos, domElement.value.length);
                  domElement.focus();
                  domElement.selectionStart = startPos + val.length;
                  domElement.selectionEnd = startPos + val.length;
                  domElement.scrollTop = scrollTop;
               } else {
                  domElement.value += val;
                  domElement.focus();
               }

            });
         }
      }
   }

   function ivoCaretPosition($rootScope) {
      return {
         restrict: 'A',
         link: function (scope, element, attrs) {
            $rootScope.$on('ivoCaretPosition:get', function (e, val) {
               var domElement = element[0];

               bc = {};
               bc.value = val;
               if (document.selection) {
                  bc.start = 0;
                  bc.end = 0;
               } else if (domElement.selectionStart || domElement.selectionStart === 0) {
                  bc.start = domElement.selectionStart;
                  bc.end = domElement.selectionEnd;
               } else {
                  bc.start = domElement.value.length;
                  bc.start = domElement.value.length;
               }
               $rootScope.$broadcast('ivoCaretPosition:put', bc);
            });
         }
      }
   }
})();
