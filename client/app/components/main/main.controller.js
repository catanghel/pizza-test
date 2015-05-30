'use strict';

angular.module('pizzaApp')
  .controller('MainCtrl', function ($scope, pizza, $state) {
    $scope.pizzas = [];

    pizza.get().then(function(data) {
      $scope.pizzas = data;
    });

    $scope.newPizza = function () {
      $state.go('detail');
    };

    $scope.removePizza = function (id) {

    };

  });
