'use strict';

angular.module('pizzaApp')
  .service('ingredient', function ($http, $q, env) {
    var path = env.host + env.api + env.ingredients;

    return {
      get: getIngredients
    };

    function getIngredients (id) {
      var addToPath = (id ? '/' + id : '');
      var request = $http({
        method: 'GET',
        url: path + addToPath,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return( request.then( handleSuccess, handleError ) );
    }

    function handleError( response ) {
      if (!angular.isObject( response.data ) || !response.data.message) {
        return( $q.reject( "An unknown error occurred." ) );
      }
      return( $q.reject( response.data.message ) );
    }

    function handleSuccess( response ) {
      return( response.data );
    }

  });
