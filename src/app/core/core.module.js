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
 * @ngdoc overview
 * @name ivonet.core
 * @description
 * This core module defines all the external dependencies probably needed by most
 * ivonet modules.
 *
 * This module should be injected into the main app and it will make defining feature modules easy.
 * These modules don't need to declare these modules themselves.
 */
(function () {
   angular.module('ivonet.core', [
      //Angular modules
      'ngAnimate',
      'ngCookies',
      'ngSanitize',
      'ngMaterial',
      'ngResource',
      'ngRoute',

      //Reusable self build modules
      'ivonet.environments',
      'ivoHeader',
      'ivoLogger',
      'ivoReadMore',
      'ivoCollapseText',
      'ivoFileDrop',
      'ivoLogo',
      'ivoMarkdown',
      'ivoInsertText'

      //Third party modules
      //scroll-glue
      , 'luegg.directives'
      //, 'IvoNetCouchDB'
   ])
})();

