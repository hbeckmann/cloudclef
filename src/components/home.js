"use strict";

var React = require('react');

var Home = React.createClass({
    render: function() {
        return (
            <div className="jumbotron">
                <h1>Welcome to Cloudclef</h1>
                <p>Playlist City</p>
            </div>
        );
    }
});

module.exports = Home;