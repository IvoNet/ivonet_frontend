/**
 * @ngdoc directive
 * @name ivoFileDrop.directive:fileDrop
 * @param {object} file - the container for the filedrop
 * @param {object} filename - the filename container for the filedrop
 * @param {number} [max-file-size] - number in MB for max filesize
 * @param {string / array} [file-dropzone] - mime types allowed to be dropped (see example).
 * @description
 * a place to drag and drop files unto
 * <pre>
    <div class="dropzone" file-dropzone="[image/png, image/jpeg, image/gif]"
       data-file="ctrl.image" data-filename="ctrl.imageFileName" data-max-file-size="3">
       <span>Drop Image Here</span>
    </div>
    <div class="image-container">
       <img ng-src="{{ctrl.image}}"/>
       <span class="file-name">{{ctrl.imageFileName}}</span>
    </div>
 * </pre>
 */
(function () {
   angular.module('ivoFileDrop').directive('fileDropzone', fileDrop);

   function fileDrop() {
      return {
         restrict: 'A',
         scope: {
            file: '=',
            filename: '='
         },
         link: function (scope, element, attrs) {
            var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;
            processDragOverOrEnter = function (event) {
               if (event != null) {
                  event.preventDefault();
               }
               (event.originalEvent || event).dataTransfer.effectAllowed = 'copy';
               return false;
            };
            validMimeTypes = attrs.fileDropzone;
            checkSize = function (size) {
               var _ref;
               if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024
                                                                               < attrs.maxFileSize) {
                  return true;
               } else {
                  alert("File must be smaller than " + attrs.maxFileSize + " MB");
                  return false;
               }
            };
            isTypeValid = function (type) {
               if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
                  return true;
               } else {
                  alert("Invalid file type.  File must be one of following types " + validMimeTypes);
                  return false;
               }
            };
            element.bind('dragover', processDragOverOrEnter);
            element.bind('dragenter', processDragOverOrEnter);

            return element.bind('drop', function (event) {
               var file, name, reader, size, type;
               if (event != null) {
                  event.preventDefault();
               }
               reader = new FileReader();
               reader.onload = function (evt) {
                  if (checkSize(size) && isTypeValid(type)) {
                     return scope.$apply(function () {
                        scope.file = evt.target.result;
                        if (angular.isString(scope.filename)) {
                           return scope.filename = name;
                        }
                     });
                  }
               };
               file = (event.originalEvent || event).dataTransfer.files[0];
               name = file.name;
               type = file.type;
               size = file.size;
               reader.readAsDataURL(file);
               return false;
            });
         }
      };
   }
})();
