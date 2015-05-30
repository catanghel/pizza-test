'use strict';

angular.module('pizzaApp')
  .controller('DetailCtrl', function ($scope, $stateParams, pizza, ingredient) {
    var pizzaId = $stateParams.pizzaId;

    $scope.pizza = {};
    $scope.pizza.ingredients = [];
    if (pizzaId) {
      pizza.get(pizzaId).then(
        function (data) {
          $scope.pizza = data;
        }
      );
    }

    $scope.ingredients = [];
    ingredient.get().then(
      function (data) {
        $scope.ingredients = data;
      }
    );

    $scope.addIngredient = function(id) {
      if (id) {
        $scope.pizza.ingredients.push(id);
      }
    };

    $scope.save = function () {
      if (validate)
      if ($scope.pizza._id) {
        pizza.update($scope.pizza);
      } else {
        pizza.create($scope.pizza);
      }
    }

  });
