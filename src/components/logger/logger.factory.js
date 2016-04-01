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

(function () {
   'use strict';

   angular
        .module('ivoLogger')
        .factory('logger', logger);

   logger.$inject = [
      '$log',
      '$http'
   ];

   function logger($log, $http) {

      // var url = Config.getLoggingAbsUrl();

      return {
         error: error,
         info: info,
         success: success,
         warning: warning,

         // straight to console; bypass toastr
         log: $log.log
      };

      function error(message, data) {
         $log.error('Error: ' + message, data);
      }

      function info(message, data) {
         // $http.post(url, '{"message": "' + message + '"}', {'Content-Type': 'application/json;charset=UTF-8'});
         // "content-type" : "application/json;charset=UTF-8"
         $log.info('Info: ' + message, data);
      }

      function success(message, data) {
         $log.info('Success: ' + message, data);
      }

      function warning(message, data) {
         $log.warn('Warning: ' + message, data);
      }
   }
}());
