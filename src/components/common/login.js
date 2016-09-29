"use strict";

var React = require('react');
var Router = require('react-router');

window.token = false;

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  window.token = token;
  console.log(token);
  // The signed-in user info.
  var user = result.user;
  // ...
  //window.location = "/";

  Router.hashHistory.push('/');
  console.log('trying to push');
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});


var Login = React.createClass({
    render: function() {
        return (
            <div className="jumbotron">
                <h1>Please Login First</h1>
            </div>
        );
    }
});

module.exports = Login;
