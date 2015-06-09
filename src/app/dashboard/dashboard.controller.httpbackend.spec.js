/**
 * Created by ivonet.
 */
describe('Dashboard test with $httpBackend style specification', function () {


  var $scope,
      $controller;

  beforeEach(module('ivonet', function ($provide) {
    configMock = {
      get: jasmine.createSpy(),
      getLoggingAbsUrl: jasmine.createSpy()
    };

    $provide.value('Config', configMock);


  }));

  beforeEach(inject(function ($httpBackend, _$controller_, $rootScope) {
    //$httpBackend.whenPOST();
    $scope = $rootScope.$new();
    $controller = _$controller_('Dashboard');

  }));


  describe('Controller : Dashboard', function () {

    it('should be defined', function () {
      expect($controller).toBeDefined();
    });

    it("shout have a title: IvoNet.nl", function () {
      expect($controller.title).toBe('Home');
    });

    it("Should contain a description", function () {
      expect($controller.description).toBe('This app contains a lot iv IvoNet stuff')
    });

    it("Should contain a keywords", function () {
      expect($controller.keywords).toBeDefined();
    });

  });


});
