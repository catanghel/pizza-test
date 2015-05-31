'use strict';

angular.module('pizzaApp')
  .service('pizza', function ($http, $q, env) {
    var path = env.host + env.api + env.pizzas;
    return {
      get: getPizzas,
      create: createPizza,
      update: updatePizza,
      remove: removePizza
    };

    /*
     * Gets one or all of the pizzas
     * @param {String} [id]
     * @returns {Promise}
     * */
    function getPizzas (id) {
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
     * Creates a new pizza
     * @param {Object} config
     * @returns {Promise}
     * */
    function createPizza (config) {
      var request = $http({
        method: 'POST',
        url: path,
        headers: {
          'Content-Type': 'application/json'
        },
        data: angular.toJson(config)
      });
      return( request.then( handleSuccess, handleError ) );
    }

    /*
     * Updates a pizza
     * @param {Object} config
     * @returns {Promise}
     * */
    function updatePizza (config) {
      var id = config._id;
      var request = $http({
        method: 'PUT',
        url: path + '/' + id,
        headers: {
          'Content-Type': 'application/json'
        },
        data: angular.toJson(config)
      });
      return( request.then( handleSuccess, handleError ) );
    }

    /*
     * Removes a pizza
     * @param {String} [id]
     * @returns {Promise}
     * */
    function removePizza (id) {
      var request = $http({
        method: 'DELETE',
        url: path + '/' + id,
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
