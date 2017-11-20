//This is NOT registrationApp referenced in ng-app in index.html. 
//This is just a variable that will refer to the application. 
//This var holds an angular module.
//The angular module will reference the app name: registrationApp.
var myApp = angular.module('registrationApp', []);

//create the controller
//It has to be tied to the html using ng-controller. 
myApp.controller('appController', ['$scope', function($scope){
  //the view sould now beable to use this variable where {{ message }} is inserted in index.html.
  $scope.message = "Welcome to my App";
}])