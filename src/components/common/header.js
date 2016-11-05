"use strict";

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Header = React.createClass({
    render: function() {

      return (
          <nav className="navbar navbar-default">
            <div className="navbar-header">
            <Link to ="/">
              <img src="images/logo1.png" className="navbar-brand" />
            </Link>
            </div>
              <ul className="nav navbar-nav">
                  <li className="nav-item"><Link to ="playlists">Playlists</Link></li>
                  <li className="nav-item"><Link to ="authors">Authors</Link></li>
              </ul>
              <CreatePlaylistButton />


          </nav>
      );
    }
});

var createPlaylistStyle = {
  float: 'right',
  color: 'green',
  margin: '8px 20px 0px 0px'
};

var CreatePlaylistButton = React.createClass({
  render: function() {
    return (
      <Link to ="newPlaylist">
      <button style={createPlaylistStyle} type="button" className="btn btn-default">
        <span className="glyphicon glyphicon-plus"></span> New Playlist
      </button>
      </Link>
    );
  }
});



module.exports = Header;
