"use strict";

var React = require('react');

var Header = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-default">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/#playlists">Playlists</a></li>
                </ul>
            </nav>
        );
    }
});

module.exports = Header;