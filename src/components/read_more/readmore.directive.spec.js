/*
 * Copyright 2015 ivonet
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Created by ivonet.
 */
describe('a read-more element with a long content and truncation on words', function () {
   "use strict";
   var $compile,
       $rootScope,
       element,
       isoScope;

   // Load the myApp module, which contains the directive
   beforeEach(module('ivonet'));

   //Loads the correct template because of the carma preprocessor 'ng-html2js'/'karma-ng-html2js-preprocessor'
   beforeEach(module('components/read_more/read-more.html'));

   // Store references to $rootScope and $compile
   // so they are available to all tests in this describe block
   beforeEach(inject(function (_$compile_, _$rootScope_) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_.$new();
      $rootScope.content = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien. Nam consectetuer. Sed aliquam, nunc eget euismod ullamcorper, lectus nunc ullamcorper orci, fermentum bibendum enim nibh eget ipsum. Donec porttitor ligula eu dolor. Maecenas vitae nulla consequat libero cursus venenatis. Nam magna enim, accumsan eu, blandit sed, blandit a, eros. Quisque facilisis erat a dui. Nam malesuada ornare dolor. Vivamus luctus elit sit amet mi.";

      element = angular.element('<read-more ng-model="content" length="1" words="true"></read-more>');
      element = $compile(element)($rootScope);

      $rootScope.$digest();
      isoScope = element.isolateScope();
      //console.log(element);
   }));

   it('should have the show more or less buttons', function () {
      expect(isoScope.showLinks).toBe(true);
   });

   it("should be in collapsed mode", function () {
      expect(isoScope.collapsed).toBe(true);
   });

   it("should have 'Show more' in the ng-hide after a click", function () {
      element.find('button').click();
      expect(isoScope.collapsed).toBe(false);
   });

   it("should have 1 word (Lorem) before the ...", function () {
      expect(element.text()).toContain('Lorem');
   });

});


describe("a read-more element with a long content an truncation on letters", function () {
   "use strict";
   var $compile,
       $rootScope,
       element,
       scope;

   beforeEach(module('ivonet'));
   beforeEach(module('components/read_more/read-more.html'));

   beforeEach(inject(function (_$compile_, _$rootScope_) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_.$new();
      $rootScope.content = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien. Nam consectetuer. Sed aliquam, nunc eget euismod ullamcorper, lectus nunc ullamcorper orci, fermentum bibendum enim nibh eget ipsum. Donec porttitor ligula eu dolor. Maecenas vitae nulla consequat libero cursus venenatis. Nam magna enim, accumsan eu, blandit sed, blandit a, eros. Quisque facilisis erat a dui. Nam malesuada ornare dolor. Vivamus luctus elit sit amet mi.";

      element = angular.element('<read-more ng-model="content" length="1" words="false"></read-more>');
      element = $compile(element)($rootScope);
      $rootScope.$digest();
      //console.log(element);
      scope = element.isolateScope()
   }));


   it("should only print 1 Letter (L) before the ...", function () {
      expect(scope.countingWords).toBe(false);
   });

   it("should have visible showLinks", function () {
      expect(element.find('button').hasClass('ng-hide')).toBe(false);
   });

});


describe("a read-more element with small content with defaults enabled", function () {
   "use strict";
   var $compile,
       $rootScope,
       element;

   beforeEach(module('ivonet'));
   beforeEach(module('components/read_more/read-more.html'));

   beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_.$new();
      $rootScope.content = "Small content block.";

      element = angular.element('<read-more ng-model="content"></read-more>');
      element = $compile(element)($rootScope);
      $rootScope.$digest();
      //console.log(element);
   }));

   it("Should not have the show links", function () {
      expect(element.find('button').hasClass('ng-hide')).toBe(true);
   });

});

describe("a read-more element with boundary size content with defaults enabled", function () {
   "use strict";
   var $compile,
       $rootScope,
       element;

   beforeEach(module('ivonet'));
   beforeEach(module('components/read_more/read-more.html'));

   beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_.$new();
   }));

   function compileElement() {
      element = angular.element('<read-more ng-model="content"></read-more>');
      element = $compile(element)($rootScope);
      $rootScope.$digest();
   }

   it("Should not have the show links because it is exactly 50 words", function () {
      $rootScope.content = "This content block is at the boundary of words allowed. This content block is at the boundary of words allowed. This content block is at the boundary of words allowed. This content block is at the boundary of words allowed. This content block is at the boundary of words allowed.";
      compileElement();
      var scope = element.isolateScope();

      expect(element.find('button').hasClass('ng-hide')).toBe(true);
      expect(element.text()).toContain($rootScope.content);
      expect(scope.showLinks).toBe(false)
   });

   it("Should have the show links because it is exactly 51 words", function () {
      $rootScope.content = "This content block is at the boundary of words allowed. This content block is at the boundary of words allowed. This content block is at the boundary of words allowed. This content block is at the boundary of words allowed. This content block is at the boundary of words allowed. fiftyOne";
      compileElement();
      var scope = element.isolateScope();
      expect(element.find('button').hasClass('ng-hide')).toBe(false);
      expect(element.text()).toContain($rootScope.content.substring(0, $rootScope.content.length - ' fiftyOne'.length));
      expect(scope.showLinks).toBe(true);
   });

});
