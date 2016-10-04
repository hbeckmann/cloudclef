"use strict"

var React = require('react');

var AddSongButton = React.createClass({

  render: function() {
    return(
      <div className="addSongButton">
        <p><b>+</b> ADD SONG</p>
      </div>
    );
  }

});

module.exports = AddSongButton;
