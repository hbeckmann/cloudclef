var ReactDOM = require('react-dom');
var React = require('react');
var Header = require('./components/common/header');
$ = jQuery = require('jquery');

var Router = require('react-router').Router;
var routes = require('./routes');
var browserHistory = require('react-router').browserHistory;
var hashHistory = require('react-router').hashHistory;

ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById('app'));

//ReactDOM.render(<Header />, document.getElementById('app'));
