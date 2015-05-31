'use strict';

angular.module('pizzaApp')
  .service('ingredient', function ($http, $q, env) {
    var path = env.host + env.api + env.ingredients;

    return {
      get: getIngredients
    };

    /*
     * Gets one or all of the ingredients
     * @param {String} [id]
     * @returns {Promise}
     * */
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

    /*
     * Handles error
     * @param {Object} response
     * @returns {Promise}
     * */
    function handleError( response ) {
      if (!angular.isObject( response.data ) || !response.data.message) {
        return( $q.reject( "An unknown error occurred." ) );
      }
      return( $q.reject( response.data.message ) );
    }

    /*
     * Handles success
     * @param {Object} response
     * @returns {Promise}
     * */
    function handleSuccess( response ) {
      return( response.data );
    }

  });
