(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  function ShoppingListCheckOffService() {
    var service = this;

    // List of shopping items
    var toBuyItems = [
      { name: "cookie", quantity: 1 },
      { name: "chips", quantity: 2 },
      { name: "chocolates", quantity: 3 },
      { name: "candies", quantity: 4 },
      { name: "pepto bismol", quantity: 5 }
    ];
    var boughtItems = [];

    service.bought = function (index) {
      boughtItems.push(toBuyItems[index]);
      toBuyItems.splice(index,1);
    }

    service.getToBuyItems = function () {
      return toBuyItems;
    }

    service.getBoughtItems = function () {
      return boughtItems;
    }
  }

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.bought = function (index) {
      ShoppingListCheckOffService.bought(index);
    }

    toBuy.everythingBought = function () {
      if (toBuy.items.length == 0) {
        return true;
      }
      return false;
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();

    alreadyBought.nothingBought = function () {
      if (alreadyBought.items.length == 0) {
        return true;
      }
      return false;
    }
  }

})();
