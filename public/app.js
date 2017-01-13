angular.module('app',["ui.router"])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home',{
        url: "/home",
        templateUrl: "./templates/home.html"
      })
      .state('friends',{
        url: "/friend/:github_username",
        templateUrl: "./templates/friends.html"
      })
      .state('login',{
        url: "/auth/github",
        templateUrl: "./templates/login"
      });


  });
