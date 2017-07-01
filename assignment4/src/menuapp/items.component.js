(function () {
  'use strict';

  angular.module('MenuApp')
  .component('items', {
    templateUrl: 'src/menuapp/componenttemplates/items.template.html',
    bindings: {
      items: '<'
    }
  });

})();
