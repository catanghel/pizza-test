'use strict';

angular.module('pizzaApp')
  .controller('DetailCtrl', function ($scope, $stateParams, pizza, ingredient, $state, $cookies) {
    var pizzaId = $stateParams.pizzaId || $cookies.get('pizzaId');

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
    $scope.ingredientsPromise = ingredient.get().then(
      function (data) {
        $scope.ingredients = data;
      }
    );

    /*
     * Adds an ingredient to the pizza
     * @param {String} id
     * */
    $scope.addIngredient = function (id) {
      if (id) {
        $scope.pizza.ingredients.push(id);
      }
    };

    /*
     * Saves the pizza
     * */
    $scope.save = function () {
      if (validate()) {
        if ($scope.pizza._id) {
          pizza.update($scope.pizza).then(
            function (data) {
              $cookies.put('pizzaId', '');
              $state.go('main');
            }
          );
        } else {
          pizza.create($scope.pizza).then(
            function (data) {
              $cookies.put('pizzaId', '');
              $state.go('main');
            }
          );
        }
      } else {
        alert("Please use at least one ingredient for this pizza")
      }
    };

    /*
     * Validates the number of ingredients
     * */
    function validate() {
      var isValid = true;
      if (!$scope.pizza.ingredients.length) {
        isValid = false;
      }
      return isValid;
    }

  });
