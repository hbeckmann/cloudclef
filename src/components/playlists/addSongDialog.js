"use strict"

var React = require('react');

var AddSongDialog = React.createClass({

  render: function() {
    return(
      <div className="addSongDialog">
        <div className="dialogLine">
          <label>Song Title</label><input type="text" id="addSongTitle" ref="addSongTitle" onKeyPress={this.saveSongDetails}></input>
        </div>
        <div className="dialogLine">
          <label>URL</label><input type="text" id="addSongId" ref="addSongId" ></input>
        </div>
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

      this.refs.addSongTitle.value = "";
      this.refs.addSongId.value = "";
    }
  }




});

module.exports = AddSongDialog;
