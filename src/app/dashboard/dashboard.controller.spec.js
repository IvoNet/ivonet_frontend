describe('Dashboard tested with jasmine mocks', function () {

  var $controller;

  beforeEach(module('ivonet', function ($provide) {
    configMock = {
      get: jasmine.createSpy()
    };

    $provide.value('Config', configMock);

    loggerMock = {
      info: jasmine.createSpy()
    };

    $provide.value('logger', loggerMock);

  }));

  beforeEach(function () {
    inject(function (_$controller_) {
      // The injector unwraps the underscores (_)
      // from around the parameter names when matching
      $controller = _$controller_('Dashboard');
    });
  });

  //-- test controller
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

    //it("should have called logger.info", function () {
    //  "use strict";
    //  expect(loggerMock.info).toHaveBeenCalledWith('loaded Main');
    //  expect(loggerMock.info).toHaveBeenCalled();
    //});

    it("should have called Config.get", function () {
      "use strict";
      expect(configMock.get).toHaveBeenCalledWith('apiroot');
    });

  });

});
