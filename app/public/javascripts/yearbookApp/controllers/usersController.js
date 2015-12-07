(function() {
  'use strict';

  UsersController.$inject = [];
  function UsersController() {

    var self = this;
    self.all = {};
  }

  this.controller('usersController', UsersController);
}).call(require('../app.js'));