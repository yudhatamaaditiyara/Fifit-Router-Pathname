/**
 * Copyright (C) 2019 Yudha Tama Aditiyara
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const {IllegalArgumentError} = require('ganiyem-error');
const hasOwnProperty = {}.hasOwnProperty;

/**
 */
class Pathname
{
  /**
   * @param {Object} [routes]
   */
  constructor(routes){
    this._routes = {};
    if (routes != null) {
      this.routes(routes);
    }
  }

  /**
   * @param {string} pathname
   * @returns {Pathname}
   */
  has(pathname){
    return hasOwnProperty.call(this._routes, pathname);
  }

  /**
   * @param {string} pathname
   * @param {function} callback
   * @throws {IllegalArgumentError}
   * @returns {Pathname}
   */
  route(pathname, callback){
    if (typeof callback !== 'function') {
      throw new IllegalArgumentError('The callback must be type of function');
    }
    this._routes[pathname] = callback;
    return this;
  }

  /**
   * @param {Object} routes
   * @returns {Pathname}
   */
  routes(routes){
    Object.keys(routes).forEach(pathname => this.route(pathname, routes[pathname]));
    return this;
  }

  /**
   * @param {Context} context
   * @param {function} done
   * @returns {any}
   */
  handle(context, done){
    let pathname = context.request.pathname;
    if (hasOwnProperty.call(this._routes, pathname)) {
      return this._routes[pathname](context, done);
    }
    return done();
  }
}

/**
 * @+
 */
module.exports = Pathname;