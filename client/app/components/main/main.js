'use strict';

angular.module('pizzaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/components/main/main.html',
        controller: 'MainCtrl'
      });
  });
