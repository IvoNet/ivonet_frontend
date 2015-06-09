/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {

  this.navbar = element(by.css('navbar'));
  this.title = element(by.css('title'));
  this.loginLink = element(by.id('loginLink'));
  this.loginUsr = element(by.id('loginMail'));
  this.loginPwd = element(by.id('loginPassword'));
};

module.exports = new MainPage();
