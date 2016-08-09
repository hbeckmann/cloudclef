"use strict";

var React = require('react');
var Router = require('react-router');
var IndexRoute = Router.IndexRoute;
var Route = Router.Route;
var Home = require('./components/home');
var App = require('./components/app');
var AuthorPage = require('./components/authors/authorPage');
var Playlists = require('./components/playlists/playlists');
var NewPlaylist = require('./components/playlists/newPlaylist')

var routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/authors" component={AuthorPage} />
        <Route path="/playlists" component={Playlists} />
        <Route path="/newPlaylist" component={NewPlaylist} />
    </Route>
)

module.exports = routes;
