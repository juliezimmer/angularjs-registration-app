//"myApp" refers to the variable myApp that was created in app.js.
//This file also has to be sourced into index.html.
//firebase and $firebaseAuth allow authentication to be used in the application. 
myApp.controller('RegistrationController', ['$scope', 'firebase', '$firebaseAuth', function($scope, firebase, $firebaseAuth) {
    //in order to use firebase, a reference must be created to the database.
    //The firebase object database method is used.
    var ref = firebase.database().ref();
    //Another variable is needed for the Authentication.
    //This calls another method called firebase.
    var auth = $firebaseAuth();

    //the login() that is called when the submit button is clicked on the login.html page.
    //This is the login() method called in login.html.
    //It is a function literal.
    $scope.login = function () {
      $scope.message = "Welcome " +  $scope.user.email;
    };

    //This is the register() function/method that is called when submit is clicked on the register.html page. 
    $scope.register = function() { 
      //adding authentiation to the register function
      //$createUserWithEmailAndPassword is a special firebase function.
      //The user's email and password are passed into the function as parameters.
      //This information can be obtained from application $scope. 
      //The promise or callback function contains registration information that is passed to a variable called regUser.
      auth.$createUserWithEmailAndPassword(
        $scope.user.email, $scope.user.password
      ).then(function(regUser){
        $scope.message = "Welcome " +  $scope.user.firstname + " Thanks for registering!";
      }).catch(function(error){
        $scope.message = error.message;
      }); //end createUserWithEmailAndPassword function
    }; //end registration
}]); //end of RegistrationControllergit