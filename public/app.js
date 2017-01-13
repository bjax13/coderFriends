angular.module('app',["ui-router"])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home',{
        url: "/",
        templateUrl: "./templates/home"
      })
      .state('friends',{
        url: "/friend/:github_username",
        templateUrl: "./templates/friends"
      })
      .state('login',{
        url: "/auth/github",
        templateUrl: "./templates/login"
      });


  });
