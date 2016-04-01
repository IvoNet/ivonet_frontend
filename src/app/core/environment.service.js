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
               apiroot: '//192.168.99.100:8081/ivonet/api',
               bliki: '/bliki',
               epub: '/epub'
            }
         },
         beta: {
            host: 'beta.ivonet.nl',
            config: {
               apiroot: '//beta.ivonet.nl/api',
               bliki: '/bliki',
               epub: '/epub'
            }
         },
         nl: {
            host: 'www.ivonet.nl',
            config: {
               apiroot: '//www.ivonet.nl/api',
               bliki: '/bliki',
               epub: '/epub'

            }
         },
         it: {
            host: 'www.ivonet.it',
            config: {
               apiroot: '//www.ivonet.it/api',
               bliki: '/bliki',
               epub: '/epub'

            }
         }
      }, _environment;

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
         getBliki: function () {
            return this.get('apiroot') + this.get('bliki');
         },
         getEpub: function () {
            return this.get('apiroot') + this.get('epub');
         }
      }
   }
})();
