describe('Unit testing navbar', function () {
   var $compile,
       $rootScope,
       $location,
       element,
       scope;

   // Load the myApp module, which contains the directive
   beforeEach(module('ivonet'));

   //Loads the correct template because of the carma preprocessor 'ng-html2js'/'karma-ng-html2js-preprocessor'
   beforeEach(module('app/navbar/navbar.html'));
   beforeEach(module('components/logo/wolf-logo.html'));

   // Store references to $rootScope and $compile
   // so they are available to all tests in this describe block
   beforeEach(inject(function (_$compile_, _$rootScope_, _$location_) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_.$new();
      $location = _$location_;
      element = $compile("<navbar></navbar>")($rootScope);
      $rootScope.$digest();
      scope = element.isolateScope();
   }));


   //describe("All locations should have the correct texts", function () {
   //  it("Should have correct locations defined", function () {
   //    "use strict";
   //$location.path('/bliki');
   //$rootScope.$apply();
   //expect(element.find("a.active").text()).toBe("Bliki");
   //$location.path("/audiobooks");
   //$rootScope.$apply();
   //expect(element.find(".active a").text()).toBe("Audiobooks");
   //$location.path("/books");
   //$rootScope.$apply();
   //expect(element.find(".active a").text()).toBe("Books");
   //$location.path("/music");
   //$rootScope.$apply();
   //expect(element.find(".active a").text()).toBe("Music");
   //$location.path("/movies");
   //$rootScope.$apply();
   //expect(element.find(".active a").text()).toBe("Movies");
   //$location.path("/comics");
   //$rootScope.$apply();
   //expect(element.find(".active a").text()).toBe("Comics");
   //});

});

