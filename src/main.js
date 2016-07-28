$ = jQuery = require('jquery');
var ReactDOM = require('react-dom');
var React = require('react');
var Home = require('./components/home');
var Playlists = require('./components/playlists/playlists');
var Header = require('./components/common/header');

var App = React.createClass({
    render: function() {
        var Child;

        switch(this.props.route) {
            case 'playlists': Child = Playlists; break;
            default: Child = Home;
        }

        return (
            <div>
                <Header />
                <Child />
            </div>
        );
    }
});

function render() {
    var route = window.location.hash.substr(1);
    ReactDOM.render(<App route={route} />, document.getElementById('app'));
};

window.addEventListener('hashchange', render);
render();
