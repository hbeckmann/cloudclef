var React = require('react');
var ReactDOM = require('react-dom');

var AddSongButton = require('./addSongButton');
var AddSongDialog = require('./addSongDialog');
//var playlistData = require('../../api/playlistData');


var newPlaylistData = [];
var selectedSong = null;

var NewPlaylistPage = React.createClass({


  getInitialState: function() {
    return {
      sidebarToggled: 'wrapper-toggled',
      dialogToggled: 'dialog-hidden',
      direction: 'left',
      //songs: JSON.parse(JSON.stringify(playlistData.playlists)),
      songs: newPlaylistData,
      //selectedSong: window.selectedSong || JSON.parse(JSON.stringify(playlistData.playlists[0])),
      selectedSong: selectedSong || newPlaylistData[0],
    };

  },
  componentDidMount: function() {

    window.currentSongNum = 0;
    window.songEndTag = null;
    window.songs = this.state.songs;
    //This is no doubt breaking so many best practices but ehh
    window.self = this;
    function createIframe() {
      window.player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: window.songEndTag,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
      console.log(player);
    };

    function onPlayerReady(event) {
      event.target.playVideo();
    };

    function onPlayerStateChange(event) {
      if(event.data === 0) {
        console.log('we done bae');
        window.currentSongNum++;
        window.player.loadVideoById(window.songs[window.currentSongNum].id);
        event.target.playVideo();
        console.log(window.selectedSong);
        window.self.updateHighlightedSong();
      }
    };



    if(window.ytApiLoaded === true || typeof(YT) != "undefined") {
      createIframe();
    };

    window.onYouTubeIframeAPIReady = function() {
      window.ytApiLoaded = true;
      createIframe();
    };



  },

  componentWillUnmount: function() {
    console.log('unmounting');
  },

  render: function() {
    return (
      <div>
        <div className={this.state.sidebarToggled + " sidebar-wrapper"}>
          <ToggleSidebarButton toggleClass={this.toggleSidebarClass} direction={this.state.direction} />
          <PlaylistTitle />
          <SongList songs={this.state.songs} renderSong={this.renderSong} selectedSong={this.state.selectedSong} />
          <AddSongButton addSongToPlaylist={this.addSongToPlaylist}/>
        </div>
        <div className={this.state.dialogToggled}>
          <AddSongDialog  />
        </div>
        <div className="videoHolder">
          <MusicVideoBackdrop selectedSong={this.state.selectedSong} songs={this.state.songs}/>
        </div>
      </div>
    );
  },

  toggleSidebarClass: function() {
    this.setState({
      sidebarToggled: this.state.sidebarToggled === 'wrapper-toggled' ? 'wrapper-notoggled' : 'wrapper-toggled',
      direction: this.state.direction === 'left' ? 'right' : 'left'
    })
  },

  renderSong: function(newSelectedSong, index) {
    window.player.loadVideoById(newSelectedSong);
    window.currentSongNum = index;

    //React state change in case we need it for another component - change is done above on global scope
    this.setState({
      selectedSong: newSelectedSong
    })
  },

  updateHighlightedSong: function() {
    this.setState({
      selectedSong: JSON.parse(JSON.stringify(playlistData.playlists[window.currentSongNum]))
    })
  },

  addSongToPlaylist: function(newSong) {
    console.log(newSong);
    this.setState({
      dialogToggled: this.state.dialogToggled === 'dialog-visible' ? 'dialog-hidden' : 'dialog-visible'
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
      <div>
        <div id="player" className="videoHolder"></div>
      </div>
    );
  }

});

var SongList = React.createClass({

  render: function() {

    var createList = function(songInfo, index) {
      //Index is song index of playlist
        return (
          <div key={songInfo.id} className={ this.props.selectedSong.id == songInfo.id || this.props.selectedSong == songInfo.id ? "selectedSong" : "songList"}>
            <div><div onClick={this.props.renderSong.bind(null, songInfo.id, index)}>{songInfo.title}</div></div>
          </div>
        );
    };

    return (
      <div className="songsWrapper">
        {this.props.songs.map(createList, this)}
      </div>
    );
  }
});

var PlaylistTitle = React.createClass({

  render: function() {
    return (
      <div className="playlistTitle">
        <input type="text" placeholder="Enter a Playlist Title"></input>
      </div>
    )
  }

});



module.exports = NewPlaylistPage;
//<iframe width="100%" height="100%" src={"https://www.youtube.com/embed/" + (this.props.selectedSong.id || this.props.selectedSong) + "?autoplay=1"} frameBorder="0"  allowFullScreen></iframe>
