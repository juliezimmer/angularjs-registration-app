//"myApp" refers to the variable myApp that was created in app.js.
//This file also has to be sourced into index.html.
myApp.controller('RegistrationController', ['$scope', function($scope){
    //The view should now be able to use this variable.
    //"Welcome to my App" will be inserted where {{ message }} is in login.html.  
    $scope.message = "Welcome to my Registration App";


}]); //end of RegistrationController