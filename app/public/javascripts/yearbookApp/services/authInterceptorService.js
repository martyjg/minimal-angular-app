(function() {
  'use strict';

  AuthInterceptor.$inject = [];
  function AuthInterceptor() {
  }

  this.service('authInterceptorService', AuthInterceptor);
}).call(require('../app.js'));