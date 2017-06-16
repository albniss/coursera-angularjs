(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',FoundItemsDirective);

  function FoundItemsDirective () {
    var ddo = {
      templateUrl: '/templates/founditems.html',
      restrict: 'E',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundItemsController',
      bindToController: true
    }

    return ddo;
  }

  function FoundItemsDirectiveController () {
    var foundItemsDirective = this;
  }

  NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
  function NarrowItDownController ($scope, MenuSearchService) {
    var narrowitdown = this;

    narrowitdown.searchValue="";
    narrowitdown.found=undefined;

    narrowitdown.remove = function (index) {
      narrowitdown.found.splice(index,1);
    }

    narrowitdown.goClick = function () {
      MenuSearchService.getMatchedMenuItems(narrowitdown.searchValue).then(
        function (foundItems) {
          narrowitdown.found = foundItems;
        });
      }
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService ($http) {
      var service = this;

      service.getMatchedMenuItems = function(searchTerm) {
        return $http({
          method: "GET",
          url: "https://davids-restaurant.herokuapp.com/menu_items.json"
        }).then(function (result) {
          if (searchTerm == "")
            return [];

          var menuItems=result.data.menu_items;

          // process result and only keep items that match
          var foundItems = menuItems.filter(function(menuItem) {
            return menuItem.description.indexOf(searchTerm) !== -1;
          });

          // return processed items
          return foundItems;
        });
      }
    }

  })();
