(function () {
  "use strict";

  angular.module('public')
  .controller('RegistrationController', RegistrationController);

  RegistrationController.$inject = ['ApiPath','UserService','$http'];
  function RegistrationController(ApiPath,UserService,$http) {
    var reg = this;
    reg.user = {};
    reg.submitted = false;
    reg.menuError = false;
    reg.menuValid = false;

    reg.submit = function () {
      reg.submitted=false;
      reg.menuError=false;

      $http.get(ApiPath + '/menu_items/' + reg.user.favDish + '.json')
      .then(function (response) {
        reg.user.menuItem = response.data;
        UserService.setUser(reg.user);
        reg.menuError = false;
        reg.submitted = true;
      },
      function (response) {
        reg.menuError = true;
        reg.submitted = false;
      });
    };

    reg.validate = function() {
      if (reg.user.favDish === undefined)
        return;

      $http.get(ApiPath + '/menu_items/' + reg.user.favDish + '.json')
      .then(function (response) {
        reg.user.menuItem = response.data;
        reg.menuError = false;
        reg.menuValid = true;
      },
      function (response) {
        reg.menuError = true;
        reg.menuValid = false;
      });
    }
  }

})();
