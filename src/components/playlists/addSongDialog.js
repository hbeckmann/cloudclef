"use strict"

var React = require('react');

var AddSongDialog = React.createClass({

  render: function() {
    return(
      <div className="addSongDialog">
        <input type="text"></input>
      </div>
    );
  }

});

module.exports = AddSongDialog;
