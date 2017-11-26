//This is NOT registrationApp referenced in ng-app in index.html. 
//This is just a variable that will refer to the application. 
//This var holds an angular module.
//The angular module will reference the app name: registrationApp.
var myApp = angular.module('registrationApp', ['ngRoute','firebase']);

//This traps authentication events that can be used to give the user feedback on their status. 
myApp.run(['$rootScope', '$location', function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, next, previous, error){
    if (error == 'AUTH_REQUIRED') {
      $rootScope.message = 'You must be logged in to access that mmn page';
      $location.path('/login');
    } //end Auth_Required error
  }); //end $routeChangeError
}]); //end myApp.run

myApp.config(['$routeProvider', function($routeProvider){
  // function($routeProvider) runs whenever routes have to be declared, defined, or accessed.
  $routeProvider
    .when('/login', { 
      //this view is used when the path is: '/login'.
      //This view is inserted where the ng-view directive is placed in index.html.
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    })
    .when('/success', {
      templateUrl: 'views/success.html',
      controller: 'SuccessController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    })
    //what to do when none of these paths is the requested Url 
    .otherwise({ //the default route
      redirectTo:'/login'
    });
}]);




