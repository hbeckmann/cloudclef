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
          <AddSongButton />
        </div>
        <div className="videoHolder">
          <MusicVideoBackdrop selectedSong={this.state.selectedSong} songs={this.state.songs}/>
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
    window.player.loadVideoById(newSelectedSong);

    //React state change in case we need it for another component - change is done above on global scope
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

  componentDidMount: function() {
    //Super weird hack to add a script tag for REACT might be accidentally adding a lot to memory on long playlists
    /*var script = document.createElement("script");
    script.type = 'text/javascript';
    window.songEndTag = (this.props.selectedSong.id || this.props.selectedSong);
    window.songs = this.props.songs;
    function testing() {

            // 3. This function creates an <iframe> (and YouTube player)
            //    after the API code downloads.
            window.player;
            window.onYouTubeIframeAPIReady = function() {
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
            }


            // 4. The API will call this function when the video player is ready.
            function onPlayerReady(event) {
              event.target.playVideo();
            };

            function onPlayerStateChange(event) {
              if(event.data === 0) {
                console.log('we done bae');

              }
            }

    };
    var test = 'testing();' + testing.toString();
    script.appendChild(document.createTextNode(test));
    document.body.appendChild(script);
    */
    window.songEndTag = (this.props.selectedSong.id || this.props.selectedSong);
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
        <div id="player" className="videoHolder"></div>
      </div>
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

var AddSongButton = React.createClass({

  render: function() {
    return(
      <div className="addSongButton">
        <p><b>+</b> ADD SONG</p>
      </div>
    );
  }

});


module.exports = NewPlaylistPage;
//<iframe width="100%" height="100%" src={"https://www.youtube.com/embed/" + (this.props.selectedSong.id || this.props.selectedSong) + "?autoplay=1"} frameBorder="0"  allowFullScreen></iframe>
