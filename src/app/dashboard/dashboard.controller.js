'use strict';

(function () {
   angular.module('ivonet')
         .controller('Dashboard', Dashboard);

         //.controller('SidenavController', SideNavController)
         //.controller('SideNavLeftController', SideNavLeftController)
         //.controller('SideNavRightController', SideNavRightController);



   Dashboard.$inject = [
      'logger',
      'Config',
      '$mdSidenav'
   ];

   function Dashboard(logger, Config, $mdSidenav) {
      var vm = this;
      vm.title = "Home";
      vm.description = 'This app contains a lot iv IvoNet stuff';
      vm.keywords = 'AngularJs,Java,Javascript,fun';
      logger.info('loaded Dashboard');

      vm.content = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien. Nam consectetuer. Sed aliquam, nunc eget euismod ullamcorper, lectus nunc ullamcorper orci, fermentum bibendum enim nibh eget ipsum. Donec porttitor ligula eu dolor. Maecenas vitae nulla consequat libero cursus venenatis. Nam magna enim, accumsan eu, blandit sed, blandit a, eros. Quisque facilisis erat a dui. Nam malesuada ornare dolor. Cras gravida, diam sit amet rhoncus ornare, erat elit consectetuer erat, id egestas pede nibh eget odio. Proin tincidunt, velit vel porta elementum, magna diam molestie sapien, non aliquet massa pede eu diam. Aliquam iaculis. Fusce et ipsum et nulla tristique facilisis. Donec eget sem sit amet ligula viverra gravida. Etiam vehicula urna vel turpis. Suspendisse sagittis ante a urna. Morbi a est quis orci consequat rutrum. Nullam egestas feugiat felis. Integer adipiscing semper ligula. Nunc molestie, nisl sit amet cursus convallis, sapien lectus pretium metus,   pretium enim wisi id lectus. Proin at eros non eros adipiscing mollis. Donec semper turpis sed diam. Sed consequat ligula nec tortor. Integer eget sem. Ut vitae enim eu est vehicula gravida. Morbi ipsum ipsum, porta nec, tempor id, auctor vitae, purus. Pellentesque neque. Nulla luctus erat vitae libero. Integer nec enim. Phasellus aliquam enim et tortor. Quisque aliquet, quam elementum condimentum feugiat, tellus odio consectetuer wisi, vel nonummy sem neque in elit. Curabitur eleifend wisi iaculis ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In non velit non ligula laoreet ultrices. Praesent ultricies facilisis nisl. Vivamus luctus elit sit amet mi."

      vm.smallContent = 'I\'m small content!';


      //fileDropzone
      vm.image = null;
      vm.imageFileName = '';


      logger.info("The string constant: " + Config.get('apiroot'));


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
   }
})();


