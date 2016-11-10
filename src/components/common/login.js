"use strict";

//TODO Make the keys in the songList dependent on the unique key from firebase

var React = require('react');
var Router = require('react-router');

window.token = false;


var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  window.user = result.user;
  window.token = token;
  // The signed-in user info.
  var user = result.user;
  var playlistRef = firebase.database().ref('playlists');
  playlistRef.once('value', function(snapshot) {
    console.log(snapshot.val());
    window.playlistData = [];
    var response = snapshot.val();
    for (var x in response) {
      window.playlistData.push(response[x]);
    };
    console.log(window.playlistData);
  });
  Router.hashHistory.push('/');
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
