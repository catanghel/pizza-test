'use strict';

angular.module('pizzaApp')
  .controller('MainCtrl', function ($scope, pizza, $state, $window, $cookies) {
    $scope.pizzas = [];
    loadPizzas();

    /*
     * Redirects to the detail view
     * */
    $scope.newPizza = function () {
      $cookies.put('pizzaId', '');
      $state.go('detail');
    };

    /*
     * Removes a pizza from the list
     * @param {String} id
     * */
    $scope.removePizza = function (id) {
      var confirm = $window.confirm('Are you sure you want to remove this pizza?');
      if (confirm) {
        pizza.remove(id).then(
          function (data) {
            loadPizzas();
          }
        );
      }
    };

    $scope.updateCookie = function (value) {
      $cookies.put('pizzaId', value);
    };

    /*
     * Loads the pizzas
     * */
    function loadPizzas () {
      pizza.get().then(function(data) {
        $scope.pizzas = data;
      });
    }

  });
