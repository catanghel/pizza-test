'use strict';

angular.module('pizzaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('detail', {
        url: '/detail',
        params: {
          pizzaId: null,
        },
        templateUrl: 'app/components/detail/detail.html',
        controller: 'DetailCtrl'
      });
  });
