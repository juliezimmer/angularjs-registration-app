//"myApp" refers to the variable myApp that was created in app.js.
//This file also has to be sourced into index.html.
//firebase and $firebaseAuth allow authentication to be used in the application. 
myApp.controller('RegistrationController', ['$scope', 'Authentication', function($scope, Authentication) {

    //the login() that is called when the submit button is clicked in the login.html page.
    //It is a function literal.
    $scope.login = function () {
      //All that is needed to log in is to call the Authentication Service or factory and then issue the login method passing along the user's information from scope.  
      Authentication.login($scope.user);
    };
    //registration function that is called when Submit is clicked in register.html.
    $scope.register = function() { 
      Authentication.register($scope.user);
    }; //end registration

}]); //end of RegistrationController