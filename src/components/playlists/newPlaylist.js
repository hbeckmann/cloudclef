var React = require('react');
var ReactDOM = require('react-dom');

var AddSongButton = require('./addSongButton');
var AddSongDialog = require('./addSongDialog');
//var playlistData = require('../../api/playlistData');


var selectedSong = null;
window.database = firebase.database();
window.playlistId = null;
window.newPlaylistData = [{id: "V7shJMAs7co", title: "trigger me"}];

var NewPlaylistPage = React.createClass({


  getInitialState: function() {
    return {
      sidebarToggled: 'wrapper-toggled',
      dialogToggled: 'dialog-hidden',
      direction: 'left',
      songs: window.newPlaylistData,
      //selectedSong: window.selectedSong || JSON.parse(JSON.stringify(playlistData.playlists[0])),
      selectedSong: selectedSong || window.playlistData[0],
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
          <AddSongDialog  addSongToPlaylist={this.addSongToPlaylist} retrieveSongList={this.retrieveSongList}/>
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

  addSongToPlaylist: function() {
    this.setState({
      dialogToggled: this.state.dialogToggled === 'dialog-visible' ? 'dialog-hidden' : 'dialog-visible'
    })
  },

  retrieveSongList: function() {
    var selectedPlaylistRef = firebase.database().ref('/users/' + window.user.uid + '/playlists/' + window.playlistId + '/songs');
    selectedPlaylistRef.once('value', function(snapshot) {
      console.log(snapshot.val());
      window.playlistData = [];
      var response = snapshot.val();
      for (var x in response) {
        window.playlistData.push(response[x]);

        console.log("new playlist data =" + window.playlistData);
      };

    });
    this.setState({
      songs: window.playlistData
    });
  },


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
        <input type="text" placeholder="Enter a Playlist Title"  ref="playlistTitle" onKeyPress={this.keyUpSavePlaylistTitle} onBlur={this.savePlaylistTitle}></input>
      </div>
    )
  },

  savePlaylistTitle : function() {
    var newTitle = this.refs.playlistTitle.value;
    if(window.playlistId === null) {
      var newRef = window.database.ref('/users/' + window.user.uid + '/playlists/').push({playlistTitle: newTitle});
      window.playlistId = newRef.key;
    } else {
      window.database.ref('/users/' + window.user.uid + '/playlists/' + window.playlistId).update({playlistTitle: newTitle});
    }
  },

  keyUpSavePlaylistTitle: function(e) {
    if(e.key === "Enter") {
      this.refs.playlistTitle.blur();
    }
  }

});



module.exports = NewPlaylistPage;
//<iframe width="100%" height="100%" src={"https://www.youtube.com/embed/" + (this.props.selectedSong.id || this.props.selectedSong) + "?autoplay=1"} frameBorder="0"  allowFullScreen></iframe>
