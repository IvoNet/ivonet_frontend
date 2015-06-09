describe("the collapse-mobile tag should no", function () {
   "use strict";
   var $compile,
       $rootScope,
       element,
       $window,
       isoScope;

   beforeEach(module('ivoCollapseText'));
   beforeEach(module('components/read_more/read-more.html'));
   beforeEach(module('components/collapse_text/collapse-text.html'));

   beforeEach(inject(function (_$compile_, _$rootScope_, _$window_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_.$new();
      $window = _$window_;

      $rootScope.content = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien. Nam consectetuer. Sed aliquam, nunc eget euismod ullamcorper, lectus nunc ullamcorper orci, fermentum bibendum enim nibh eget ipsum. Donec porttitor ligula eu dolor. Maecenas vitae nulla consequat libero cursus venenatis. Nam magna enim, accumsan eu, blandit sed, blandit a, eros. Quisque facilisis erat a dui. Nam malesuada ornare dolor. Cras gravida, diam sit amet rhoncus ornare, erat elit consectetuer erat, id egestas pede nibh eget odio. Proin tincidunt, velit vel porta elementum, magna diam molestie sapien, non aliquet massa pede eu diam. Aliquam iaculis. Fusce et ipsum et nulla tristique facilisis. Donec eget sem sit amet ligula viverra gravida. Etiam vehicula urna vel turpis. Suspendisse sagittis ante a urna. Morbi a est quis orci consequat rutrum. Nullam egestas feugiat felis. Integer adipiscing semper ligula. Nunc molestie, nisl sit amet cursus convallis, sapien lectus pretium metus, vitae pretium enim wisi id lectus. Proin at eros non eros adipiscing mollis. Donec semper turpis sed diam. Sed consequat ligula nec tortor. Integer eget sem. Ut vitae enim eu est vehicula gravida. Morbi ipsum ipsum, porta nec, tempor id, auctor vitae, purus. Pellentesque neque. Nulla luctus erat vitae libero. Integer nec enim. Phasellus aliquam enim et tortor. Quisque aliquet, quam elementum condimentum feugiat, tellus odio consectetuer wisi, vel nonummy sem neque in elit. Curabitur eleifend wisi iaculis ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In non velit non ligula laoreet ultrices. Praesent ultricies facilisis nisl. Vivamus luctus elit sit amet mi.";

   }));

   function compileElement() {
      element = angular.element('<collapse-mobile ng-model="content"></collapse>');
      element = $compile(element)($rootScope);
      $rootScope.$digest();
      isoScope = element.isolateScope();
      //console.log(element);
   }

   it("should show the 'Show more' link", function () {
      //spyOn($window, 'innerWidth').and.returnValue(767);
      $window.innerWidth = 767;
      compileElement();
      expect(isoScope.collapse).toBe(true);
      expect(element.text()).not.toContain($rootScope.content);
   });

   it("should not show the 'Show more' link, but the complete text", function () {
      //spyOn($window, 'innerWidth').and.returnValue(768); //When mocking a function
      $window.innerWidth = 768;
      compileElement();
      expect(isoScope.collapse).toBe(false);
      expect(element.text()).toContain($rootScope.content);
   });


});