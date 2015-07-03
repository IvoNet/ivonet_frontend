'use strict';

(function () {
   angular.module('ivonet').controller('Bliki', Bliki);

   Bliki.$inject = [
      'logger',
      '$rootScope',
      '$mdDialog',
      '$mdToast',
      'Config',
      'session'
   ];

   function Bliki(logger, $rootScope, $mdDialog, $mdToast, Config, session) {
      logger.info('Bliki entered');
      var self = this;
      self.title = "Bliki";
      self.description = 'Ivo\'s bliki';
      self.keywords = 'bliki,wiki,blog,fun,development,java,linux,mac';

      //fileDropzone
      self.image = {};
      self.image.filename = '';

      self.authenticated = false;

      self.isOpen = false;
      self.demo = {
         count: 0
      };

      //couchdb.server.setUrl(Config.getCouchDBBaseUri());
      //couchdb.db.use("bliki");

      self.markdown =
           "# Python code\n\n```python\n\nimport IvoNet\n\ndef hello():\n    print 'hello world'\n```\n\n```python\n\nimport IvoNet\n\ndef hello():\n    print 'hello world'\n```\n```html\n<div class=\"foo\"><p>text</p></div>\n```\n\n## header 2\nand some normal text here\n\n* bullet 1\n* bullet *italic* 2\n    * indented bullet in **bold**\n\n|Markdown | Less | Pretty |\n|---: | --: | ---: |\n|*Still* | `renders` | **nicely**|\n|1 | 2 | 3|\n\nThis is a @ivonet tweet\n\nthis is ~~deleted text~~";

      self.showPreview = false;
      self.togglePreview = function () {
         self.showPreview = !self.showPreview;
         var mmPreview = angular.element('#mmPreview');
         if (self.showPreview) {
            mmPreview.removeAttr('hide');
         } else {
            mmPreview.attr('hide', '');
         }
      };

      function generateUUID() {
         var d = new Date().getTime();
         return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
         });
      };

      //self.isAuthenticated = function () {
      //   couchdb.user.isAuthenticated().then(function (data) {
      //      console.log("Authenticated: " + data);
      //      self.authenticated = data;
      //      return data;
      //   }, function (data) {
      //      logger.info(data);
      //      return false;
      //   });
      //};

      self.logoff = function () {
         couchdb.user.logout().then(function (data) {
            console.log("logout: " + data);
            self.isAuthenticated()
         })
      };

      self.saveBlog = function () {
         console.log("saveBlog called.");
         function onSuccess() {
            self.alert = "Document saved";
            self.showAlertToast()
         }

         function onError() {
            self.alert = "Document NOT saved";
            self.showAlertToast()

         }

         //couchdb.user.isAuthenticated().then(function (authenticated) {
         //   console.log("Authenticated: " + authenticated);
         //   if (!authenticated) {
         //      console.log("need to log in first");
         //      $mdDialog.show({
         //         //controller: SignupLoginController,
         //         templateUrl: 'app/couchdb/login.html'
         //         //targetEvent: ev
         //      }).then(function () {
         //         self.alert = 'Logged in.';
         //         self.authenticated = true;
         //         self.showAlertToast();
         //      }, function () {
         //         self.alert = 'You cancelled the dialog.';
         //         self.showAlertToast()
         //      });
         //   }
         //});

         console.log("saveing the blog");
         var doc = {};
         doc._id = generateUUID();
         doc.data = self.markdown;

         console.log(doc);

         couchdb.doc.put(doc, function (data) {
            console.log("put: " + data);

            doc._rev = data.rev;
            couchdb.doc.delete(doc, function (data) {
               console.log("deleted: " + data)
            })

         });

      };

      self.showAlertToast = function () {
         $mdToast.show(
              $mdToast.simple()
                   .content(self.alert)
                   .position('top left')
                   .hideDelay(3000)
         );
      };

      /*
       broadcasts the image data as markdown text to the ivoCaretPosition directive
       so that it can broadcast its position with the value of the text.
       */
      self.insertImage = function () {
         //TODO add uploading of the image to the server here
         //TODO change the text attribute to represent the url iso the base64 code
         console.log(self.image.data);
         var text = "![" + self.image.filename + "](" + self.image.data + ")";
         if (self.image.data != null) {
            $rootScope.$broadcast('ivoCaretPosition:get', text);
         }
      }; //insertImage

      /*
       This function caches the broadcast of the ivoCaretPosition directive
       telling where what the positions are of the caret in the textarea
       annotated with 'ivo-caret-position' attr.
       */
      $rootScope.$on('ivoCaretPosition:put', function (e, val) {
         self.markdown = self.markdown.substring(0, val.start) + "\n" + val.value
                         + self.markdown.substr(val.end, self.markdown.length);
      }); //ivoCaretPosition:put

   }
})
();




