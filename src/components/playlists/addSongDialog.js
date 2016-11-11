"use strict"

var React = require('react');

var AddSongDialog = React.createClass({

  render: function() {
    return(
      <div className="addSongDialog">
        <input type="text" id="addSongTitle" ref="addSongTitle" onKeyPress={this.saveSongDetails}></input>
        <input type="text" id="addSongId" ref="addSongId" ></input>
      </div>
    );
  },

  saveSongDetails: function(e) {
    if(e.key === "Enter") {
      var title = this.refs.addSongTitle.value;
      var id = this.refs.addSongId.value;

      if(window.playlistId !== null) {
        window.database.ref('/users/' + window.user.uid + '/playlists/' + window.playlistId + '/songs').push({title: title, id: id });
      } else {
        var newRef = window.database.ref('/users/' + window.user.uid + '/playlists/').push({playlistTitle: ""});
        window.playlistId = newRef.key;
        window.database.ref('/users/' + window.user.uid + '/playlists/' + window.playlistId + '/songs').push({title: title, id: id });
      }
    }
  }




});

module.exports = AddSongDialog;
