(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['$rootScope','MenuDataService','categories'];
  function CategoriesController($rootScope, MenuDataService, categories) {
    var categoriesController = this;
    categoriesController.categories = categories;
  }

})();
