'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
    browser.driver.manage().window().maximize();
    page = require('./main.po');
  });

  it('should contain a navbar element', function () {
    expect(page.navbar).toBeDefined();
  });
  it('should have a title', function () {
    expect(browser.getTitle()).toEqual('IvoNet.nl - home');
  });

  it("Should have a Login menu item", function () {
    page.loginLink.click();

    element(by.id('loginMail')).sendKeys("Ivo@IvoNEt.nl");

  });

});
