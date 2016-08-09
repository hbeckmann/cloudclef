var React = require('react');
var ReactDOM = require('react-dom');
var playlistData = require('../../api/playlistData');

console.log(JSON.parse(JSON.stringify(playlistData.playlists)));

var NewPlaylistPage = React.createClass({

  getInitialState: function() {
    return {
      toggled: 'wrapper-toggled',
      direction: 'left',
      songs: JSON.parse(JSON.stringify(playlistData.playlists)),
      selectedSong: JSON.parse(JSON.stringify(playlistData.playlists[0])),
    };

  },

  render: function() {
    return (
      <div>
        <div className={this.state.toggled + " sidebar-wrapper"}>
          <ToggleSidebarButton toggleClass={this.toggleClass} direction={this.state.direction} />
          <SongList songs={this.state.songs} renderSong={this.renderSong} />
        </div>
        <div className="videoHolder">
          <MusicVideoBackdrop selectedSong={this.state.selectedSong} />
        </div>
      </div>
    );
  },

  toggleClass: function() {
    this.setState({
      toggled: this.state.toggled === 'wrapper-toggled' ? 'wrapper-notoggled' : 'wrapper-toggled',
      direction: this.state.direction === 'left' ? 'right' : 'left'
    })
  },

  renderSong: function(newSelectedSong) {
    this.setState({
      selectedSong: newSelectedSong
    })
  }

});

var ToggleSidebarButton = React.createClass({
  render: function() {
    return (
        <span className={"glyphicon toggleButton2 glyphicon-chevron-" + this.props.direction} onClick={this.props.toggleClass}></span>
    );
  }

});

var MusicVideoBackdrop = React.createClass({
  render: function() {
    return (
      <iframe width="100%" height="100%" src={"https://www.youtube.com/embed/" + (this.props.selectedSong.id || this.props.selectedSong) + "?autoplay=1"} frameBorder="0"  allowFullScreen></iframe>
    );
  }

});

var SongList = React.createClass({

  render: function() {

    var createList = function(songInfo) {
        return (
          <div key={songInfo.id} className="songList">
            <div><div onClick={this.props.renderSong.bind(null, songInfo.id)}>{songInfo.title}</div></div>
          </div>
        );
    };

    return (
      <div>
        {this.props.songs.map(createList, this)}
      </div>
    );
  }
});


module.exports = NewPlaylistPage;
