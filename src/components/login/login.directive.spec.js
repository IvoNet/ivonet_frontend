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
describe('Should compile to a complete login fragment', function () {
  "use strict";
  var $compile,
      $rootScope,
      element;

  // Load the myApp module, which contains the directive
  beforeEach(module('ivonet'));

  //Loads the correct template because of the carma preprocessor 'ng-html2js'/'karma-ng-html2js-preprocessor'
  beforeEach(module('components/login/login.html'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_.$new();
    element = $compile("<login></login>")($rootScope);
    $rootScope.$digest();
  }));

  it('Should have an id signIn', function () {
    expect(element.find('#signIn')).toBeDefined();
  })

  it("Should be a modal", function () {
    expect(element.find('.modal').length).toBe(1);
  });

  it("Should have a 'close' class", function () {
    expect(element.find('.close')).toBeDefined()
  });

  it("Should have a 'close' class defining a aria-hidden", function () {
    expect(element.find('.close').attr('aria-hidden')).toBe("true");
    expect(element.find('.close').attr('aria-hidden')).toBeTruthy();
  });

  it("Should have fied for Email and Password", function () {
    expect(element.find('#loginMail')).toBeDefined();
    expect(element.find('#loginPassword')).toBeDefined();
  });

  it("Should have a close button", function () {
    expect(element.find('.modal-footer button').length).toBe(2);
    expect(element.find('.modal-footer button')[0].innerHTML).toBe('Close');
    expect(element.find('.modal-footer button')[1].innerHTML).toBe('Send');
  });
});
