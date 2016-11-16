"use strict"

var React = require('react');

var AddSongDialog = React.createClass({

  render: function() {
    return(
      <div className="addSongDialog">
        <div className="dialogLine">
          <div className="closeButton">
            X
          </div>
        </div>
        <div className="dialogLine">
          <label>Song Title</label><input type="text" id="addSongTitle" ref="addSongTitle"></input>
        </div>
        <div className="dialogLine">
          <label>URL</label><input type="text" id="addSongId" ref="addSongId"  onKeyPress={this.saveSongDetailsEnter} ></input>
        </div>
        <button type="button" className="btn btn-primary saveButton" ref="saveSongButton" onClick={this.saveSongDetails} >Save</button>
      </div>
    );
  },

  saveSongDetailsEnter: function(e) {
    if(e.key === "Enter") {
      this.refs.saveSongButton.click();
    }
  },

  saveSongDetails: function() {
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




});

module.exports = AddSongDialog;
