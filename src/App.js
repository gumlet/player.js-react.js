import logo from './logo.svg';
import './App.css';
import playerjs from "@gumlet/player.js";
import { useState, useEffect } from "react";

function App() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (player) {
      player.on("error", (err) => {
        console.log(err);
      });
      player.play();
      player.setPlaybackRate(1.5);
      player.setVolume(25);
      player.on("playbackRateChange", (newRate) => {
        console.log("playbackRateChange", newRate);
      });
      player.on("volumeChange", (newVolume) => {
        console.log("volumeChanged...", newVolume);
      });
    }
  }, [player]);

  const handleVideoIframeOnload = (e) => {
    e.preventDefault();
    const videoIframe = document.querySelector("iframe");
    const _player = new playerjs.Player(videoIframe);
    setPlayer(_player);
    window.playerjs = _player;
  };

  return (
    <div className="App" style={{height: '500px'}}>
      <h1>Gumlet</h1>
      <iframe
        loading="lazy"
        title="testing gumlet player"
        src={`https://play.gumlet.io/embed/65e6f26c4e9c448aa362dd23?preload=true&autoplay=true&loop=false&disable_player_controls=false`}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
        frameBorder="0"
        allowFullScreen
        className="video-iframe"
        onLoad={(e) => handleVideoIframeOnload(e)}
        style={{ width: "100%", height:"100%" }}
      />
    </div>
  );
}

export default App;
