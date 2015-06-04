'use strict';

angular.module('pizzaApp', [
/*'ngResource',
  'ngSanitize',*/
  'ngCookies',
  'ui.router',
  'ui.bootstrap'
])
  .constant('env', {
    host: 'http://162.250.78.47',
    api: '/api',
    pizzas: '/pizzas',
    ingredients: '/ingredients'
  })
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    //$locationProvider.html5Mode(true);
  });
