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
 * @name app.constants
 * @author ivonet.
 */
(function () {
   angular.module('ivonet.environments', []).service('Config', Config);

   function Config($location) {

      /**
       * You can have as many environments as you like in here
       * just make sure the host matches up to your hostname including port
       */
      var _environments = {
         local: {
            host: 'localhost',
            config: {
               apiroot: '//localhost:8080',
               loggingUrl: '/logging/rest/log',
               bliki: '/bliki/rest/folders/',
               sessionCheckInterval: 30000,
               couchdb: {
                  //TODO weghalen
                  url: '//localhost:5984',
                  bliki: '/bliki',
                  image: '/image'
               }

            }
         },
         beta: {
            host: 'beta.ivonet.nl',
            config: {
               apiroot: '//beta.ivonet.nl/api',
               loggingUrl: '/logging/rest/log',
               bliki: '/bliki/rest/folders/',
               couchdb: {
                  //TODO weghalen
                  url: '//beta.ivonet.nl/cdb',
                  bliki: '/bliki',
                  image: '/image'
               }
            }
         },
         nl: {
            host: 'www.ivonet.nl',
            config: {
               apiroot: '//www.ivonet.nl/api',
               loggingUrl: '/logging/rest/log',
               bliki: '/bliki/rest/folders/',
               couchdb: {
                  //TODO weghalen
                  url: '//www.ivonet.nl/cdb',
                  bliki: '/bliki',
                  image: '/image'
               }
            }
         },
         it: {
            host: 'www.ivonet.it',
            config: {
               apiroot: '//www.ivonet.it/api',
               loggingUrl: '/logging/rest/log',
               bliki: '/bliki/rest/folders/',
               couchdb: {
                  //TODO weghalen
                  url: '//www.ivonet.it/cdb',
                  bliki: '/bliki',
                  image: '/image'
               }
            }
         }
      },
          _environment;

      return {
         getEnvironment: function () {

            if (_environment) {
               return _environment;
            }

            for (var environment in _environments) {
               if (typeof _environments[environment].host && _environments[environment].host == $location.host()) {
                  _environment = environment;
                  return _environment;
               }
            }

            return null;
         },
         get: function (property) {
            return _environments[this.getEnvironment()].config[property];
         },
         getLoggingAbsUrl: function () {
            return this.get('apiroot') + this.get('loggingUrl');
         },
         getBliki: function () {
            return this.get('apiroot') + this.get('bliki');
         },
         getCouchDB: function () {
            return this.get('couchdb');
         },
         getCouchDBBaseUri: function () {
            return this.getCouchDB()['url'];
         },
         getCouchDBurl: function (property) {
            return this.getCouchDBBaseUri() + this.getCouchDB()[property];
         }
      }
   }
})();
