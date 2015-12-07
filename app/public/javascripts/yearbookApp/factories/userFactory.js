(function() {
  'use strict';

  User.$inject = [];
  function User() {
  }

  this.factory('userFactory', User);
}).call(require('../app.js'));