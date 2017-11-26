//"myApp" refers to the variable myApp that was created in app.js.
//This file also has to be sourced into index.html.
myApp.controller('RegistrationController', ['$scope', function($scope){
    //The view should now be able to use this variable.
    //"Welcome to my App" will be inserted where {{ message }} is in login.html.  
    //$scope.message = "Welcome to my Registration App";

    //the login() that is called when the submit button is clicked on the login.html page.
    //This is the login() method called in login.html.
    //It is a function literal.
    $scope.login = function () {
      $scope.message = "Welcome " +  $scope.user.email;
    };

    //This is the register() function/method that is called when submit is clicked on the register.html page. 
    $scope.register = function() { 
    $scope.message = "Welcome " +  $scope.user.firstname;
    };

}]); //end of RegistrationController