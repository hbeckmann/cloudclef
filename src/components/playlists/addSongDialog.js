"use strict"

var React = require('react');

var AddSongDialog = React.createClass({

  render: function() {
    return(
      <div className="addSongDialog">
        <input type="text" id="addSongTitle"></input>
        <input type="text" id="addSongId"></input>
      </div>
    );
  },

  savePlaylistTitle : function() {
    console.log('blur');
  }

});

module.exports = AddSongDialog;
