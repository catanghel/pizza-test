'use strict';

angular.module('pizzaApp')
  .directive('pizzaIngredients', function (ingredient, $q) {
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
              refreshList();
            }
          }
        );

        /*
         * Refreshes the list of ingredients
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

          if (single) {
            temp.splice(temp.indexOf(id), 1)
          } else {
            temp = temp.filter(
              function(element) {
                return element !== id;
              }
            );
          }
          scope.pizza.ingredients = temp;
        };
      }
    };
  });
