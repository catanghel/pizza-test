'use strict';

angular.module('pizzaApp')
  .directive('pizzaIngredients', function (ingredient, $q, $window) {
    return {
      templateUrl: 'app/components/detail/pizzaIngredients/pizzaIngredients.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.list = [];
        scope.nameList = [];

        scope.$watchCollection(
          function () {
            return scope.pizza.ingredients;
          },
          function (n, o, s) {
            if (n) {
              scope.list = n;
              //refreshList();
              refreshIngredientList();
            }
          }
        );

        /*
         * Refreshes the list of ingredients
         * */
        function refreshIngredientList() {
          var i, j, ingredientsLength, listLenght = scope.list.length;
          var ingredient = {}, listItem = {};
          scope.ingredientsPromise.then(
            function () {
              ingredientsLength = scope.ingredients.length;
              resetQuanities();
              for (i = 0; i < listLenght; i++) {
                listItem = scope.list[i];
                for (j = 0; j < ingredientsLength; j++) {
                  ingredient = scope.ingredients[j];
                  if (listItem === ingredient._id) {
                    ingredient.no += 1;
                  }
                }
              }
            }
          );
        }

        /*
         * Refreshes the list of ingredients
         * */
        function resetQuanities () {
          var i, length = scope.ingredients.length;
          for (i = 0; i < length; i++) {
            scope.ingredients[i].no = 0;
          }
        }

        /*
         * Refreshes the list of ingredients
         * @deprecated use refreshIngredientList() instead
         * */
        function refreshList() {
          var a = checkOccurrences(scope.list);
          var i, length = a[0].length, promises = [];
          for (i = 0; i < length; i++) {
            promises.push(ingredient.get(a[0][i]));
          }
          $q.all(promises).then(
            function (data) {
              scope.nameList = [];
              for (i = 0; i < length; i++) {
                scope.nameList.push({
                  no: a[1][i],
                  _id: data[i]._id,
                  name: data[i].name
                });
              }
            }
          );
        }

        /*
         * Checks occurrences of each ingredient
         * @deprecated not used any more
         * @param {Array<String>} arr
         * @returns {Array<String><Number>}
         * */
        function checkOccurrences(arr) {
          var a = [], b = [], prev;
          if (arr) {
            arr.sort();
            for (var i = 0; i < arr.length; i++) {
              if (arr[i] !== prev) {
                a.push(arr[i]);
                b.push(1);
              } else {
                b[b.length - 1]++;
              }
              prev = arr[i];
            }
          }
          return [a, b];
        }

        /*
         * Removes one or all occurrences of an ingredient
         * @param {String} id
         * @param {Boolean} [single]
         * */
        scope.remove = function (id, single) {
          var temp = angular.copy(scope.pizza.ingredients);
          var confirm = $window.confirm('Are you sure you want to remove this ingredient?');
          if (confirm) {
            if (single) {
              temp.splice(temp.indexOf(id), 1)
            } else {
              temp = temp.filter(
                function (element) {
                  return element !== id;
                }
              );
            }
          }
          scope.pizza.ingredients = temp;
        };
      }
    };
  });
