'use strict';

(function () {
   angular.module('ivonet')
        .controller('Dashboard', Dashboard);

   Dashboard.$inject = [
      'logger',
      '$mdSidenav',
      'blikiDataService'
   ];

   function Dashboard(logger, $mdSidenav, blikiDataService) {
      var vm = this;
      vm.title = "Home";
      vm.description = 'This app contains a lot of IvoNet stuff';
      vm.keywords = 'IvoNet,AngularJs,Java,Javascript,fun';
      vm.content =
           "# Python code\n\n```python\n\nimport IvoNet\n\ndef hello():\n    print 'hello world'\n```\n\n```python\n\nimport IvoNet\n\ndef hello():\n    print 'hello world'\n```\n```html\n<div class=\"foo\"><p>text</p></div>\n```\n\n## header 2\nand some normal text here\n\n* bullet 1\n* bullet *italic* 2\n    * indented bullet in **bold**\n\n|Markdown | Less | Pretty |\n|---: | --: | ---: |\n|*Still* | `renders` | **nicely**|\n|1 | 2 | 3|\n\nThis is a @ivonet tweet\n\nthis is ~~deleted text~~\n### header 3 - links\n\n[google material design](http://www.google.com/design/spec/style/color.html#color-color-palette)";

      vm.menu = [];
      vm.menuSelected = undefined;

      vm.menuSrc = function (url) {
         console.log("menuSrc: " + url);
         blikiDataService.getContent(url).then(menuSuccess);
      };

      function mainContent(data) {
         vm.content = data.content;
      }

      function getHome() {
         angular.forEach(vm.menu.browseFiles, function (value) {
            if (value['key'] === 'home.md') {
               blikiDataService.getContent(value['value']).then(mainContent)
            }
         });
      }

      function menuSuccess(data) {
         vm.menu = data;
         getHome()
      }

      vm.selectedFolderMenuItem = function (o) {
         vm.menuSelected = o;
         blikiDataService.getSubmenu(o.value).then(menuSuccess)
      };

      vm.selectedFileMenuItem = function (o) {
         blikiDataService.getContent(o['value']).then(mainContent)
      };
      
      blikiDataService.getMenu()
           .then(menuSuccess);


      vm.toggleSideBar = function () {
         $mdSidenav('left').toggle()
              .then(function () {
                 logger.info("toggle sidebar is done");
              });
      };

      vm.closeSideBar = function () {
         $mdSidenav('left').close()
              .then(function () {
                 logger.info("close sidebar is done");
              });
      };

      vm.openSideBar = function () {
         $mdSidenav('left').open()
              .then(function () {
                 logger.info("open sidebar is done");
              });
      };

      logger.info('loaded Dashboard');

   }
})();



