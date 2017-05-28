(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunchMenu="";
    $scope.message="";
    $scope.messageStyle={};
    $scope.textboxStyle={};

    $scope.checkIfTooMuch = function () {
      var itemCount=0;
      var items=$scope.lunchMenu.split(",");

      items.forEach(function (i) {
        if (i != "")
          itemCount++;
      });

      if (itemCount == 0) {
        $scope.message="Please enter data first";
        $scope.messageStyle={'color':'red'};
        $scope.textboxStyle={'border-color':'red'};
      }
      else if (itemCount <= 3) {
        $scope.message="Enjoy!";
        $scope.messageStyle={'color':'green'};
        $scope.textboxStyle={'border-color':'green'};
      }
      else {
        $scope.message="Too much!";
        $scope.messageStyle={'color':'green'};
        $scope.textboxStyle={'border-color':'green'};
      }
    };
  }

})();
