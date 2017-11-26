//create a factory
//'Authentication' is the name of the factory.
//This method uses $rootScope, which is available throughout the entire application. 
myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', function($rootScope, $firebaseAuth){
  //This will require the same variables as were used in the Registration Controller.
  //in order to use firebase, a reference must be created to the database.
  //The firebase object database method is used.
  //This is the link between this app data and firebase. 
  var ref = firebase.database().ref();
  //Another variable is needed for the Authentication.
  //This calls another method called firebase.
  var auth = $firebaseAuth();
  return {
    //this needs a login method that gets some information from the RegistrationController
    login: function(user) {
      $rootScope.message = "Welcome " +  $rootScope.user.email;
    },
    //$createUserWithEmailAndPassword is a special firebase function.
      //The user's email and password are passed into the function as parameters.
      //This information can be obtained from application $scope. 
      //The promise or callback function contains registration information that is passed to a variable called regUser.
    register: function(user) {
      auth.$createUserWithEmailAndPassword(user.email, user.password)
      .then(function(regUser){
        //new variable for stoing  user information in firebase.
        //It uses the ref variable that was created on line 8 and has a link to firebase.
        //All user information will be stored in the ref.child subsection.  
        //"ref.child('users')" is like a path to a sub-directory in the data. 
        
        var regRef = ref.child('users')
        //To get to a specific user's data, another child or path has to be created.
        //uid is a special id that firebase creates automatically for every user who is registered. 
        //.set() is a firebase method.
        //an object with the data that is to be stored is sent to firebase via the .set() method. 
          .child(regUser.uid).set({
            //This will provide the date and time that firebase stored this data. 
            date: firebase.database.ServerValue.TIMESTAMP, 
            regUser: regUser.uid,
            firstname: user.firstname,
            lastname: user.lastname, 
            email: user.email
          })
        $rootScope.message = "Hi " +  user.firstname + " Thanks for registering!";
      }).catch(function(error){
        $rootScope.message = error.message;
      }); //end createUserWithEmailAndPassword function
    } //end register
  }// end return statement
}]); //end of factory


      