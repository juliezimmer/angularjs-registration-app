//create a factory
//'Authentication' is the name of the factory.
//This method uses $rootScope, which is available throughout the entire application. 
myApp.factory('Authentication', ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth', function($rootScope, $location, $firebaseObject, $firebaseAuth){
  //This will require the same variables as were used in the Registration Controller.
  //in order to use firebase, a reference must be created to the database.
  //The firebase object database method is used.
  //This is the link between this app data and firebase. 
  var ref = firebase.database().ref();
  //Another variable is needed for the Authentication.
  //This calls another method called firebase.
  var auth = $firebaseAuth();
  var myObject;

  //onAuthStateChanged is a firebase method that is used to detect when a user has logged in.
  //The function passes on information about what the change has been.
  //The function checks the database against what has been entered to verify if the user if authorized. 
  //If a registered user logs into the app, firebase returns all their information to the userRef variable for the duration of their session. 
  //authUser is a variable created whenever a user logs into the app.
  //That information is pulled from Firebase and also has a firebase created uid. 
  //uid can be used to get the rest of the user's information from Firebase. 
  auth.$onAuthStateChanged(function(authUser){
    if(authUser) {
      //this gets a reference to the current user. using the id that Firebase generates as a result of the authenticatioh event. 
      var userRef = ref.child('users').child(authUser.uid);
      //Once the userRef is obtained, the userObj can store all the information associated with the user.
      //userObject uses a library called $firebaseObject.
      //$firebaseObject has to be included in the dependencies of the factory and its function.
      //var userObj stores the information pulled from Firebase.
      var userObj = $firebaseObject(userRef);
      //the userObj information is passed along using $rootScope.
      $rootScope.currentUser = userObj;
    } else {//if there is no authenticated, the $rootScope variable is set to an empty string
        $rootScope.currentUser = '';
    }
  });

  myObject =  {
    login: function(user) {
      //auth is the same variable that was created on line 12 for firebase authentication methods.
      //Here, it is using a firebase method called signInWithEmailAndPassword.
      //The information in the parens is fed to the method from whichever controller is handling the login. 
      //In this case, it is from the Registration Controller.
      auth.$signInWithEmailAndPassword (user.email, user.password) 
        .then(function(user){ //this sends the user to another page using the angular $location   service. 
          //The $location service must be added to the factory dependencies and to the function parameters.
          //After the user logs in, they are sent to the success path.
          $location.path('/success');
        }).catch(function(error){
          $rootScope.message = error.message;
        }); //End signInWithEmailAndPassword 
      },
    //creating a logout method
    logout: function() {
      return auth.$signOut();
    },
    requireAuth: function(){
      return auth.$requireSignIn(); //this resolves to true is user is signed in.
    },
    register: function(user) {
      //$createUserWithEmailAndPassword is a special firebase function.
      //The user's email and password are passed into the function as parameters.
      //This information can be obtained from application $scope. 
      //The promise or callback function contains registration information that is passed to a variable called regUser.
      auth.$createUserWithEmailAndPassword(user.email, user.password)
        .then(function(regUser){
        //regRef is a new variable for storing user information in firebase.
        //It uses the ref variable that was created on line 9 and has a link to firebase.
        //All user information will be stored in the ref.child subsection.  
        //"ref.child('users')" is like a path to a sub-directory in the data. 
        
        var regRef = ref.child('users')
        //To get to a specific user's data, another child or path has to be created.
        //uid is a special id that firebase creates automatically for every user who is registered. 
        //.set() is a firebase method.
        //an object with the data that is to be stored is sent to firebase via the .set() method. 
          .child(regUser.uid).set({
            //This provides the date and time that firebase stored this data. 
            date: firebase.database.ServerValue.TIMESTAMP, 
            regUser: regUser.uid,
            firstname: user.firstname,
            lastname: user.lastname, 
            email: user.email
          });
        myObject.login(user);
      }).catch(function(error){
        $rootScope.message = error.message;
      }); //end createUserWithEmailAndPassword function
    } //end register
  }// end return statement
  
  
  return myObject;
}]); //end of factory


      