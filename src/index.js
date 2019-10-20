var WaveSurfer = require("wavesurfer.js");
var CursorPlugin = require("wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js");
var wavesurfer = {};

document.addEventListener("DOMContentLoaded", function() {
  wavesurfer = WaveSurfer.create({
    container: "#waveform",
    waveColor: "#f9a825",
    progressColor: "#f57f17",
    height: 120,
    barWidth: 1,
    plugins: [
      CursorPlugin.create({
        showTime: true,
        opacity: 1,
        customShowTimeStyle: {
          "background-color": "#000",
          color: "#fff",
          padding: "2px",
          "font-size": "10px"
        }
      })
    ]
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var playPause = document.querySelector("#playPause");
  playPause.addEventListener("click", function() {
    wavesurfer.playPause();
  });

  wavesurfer.on("play", function() {
    document.querySelector("#play").style.display = "none";
    document.querySelector("#pause").style.display = "";
  });
  wavesurfer.on("pause", function() {
    document.querySelector("#play").style.display = "";
    document.querySelector("#pause").style.display = "none";
  });

  var links = document.querySelectorAll("#playlist a");
  var currentTrack = 0;

  var setCurrentSong = function(index) {
    links[currentTrack].classList.remove("active");
    currentTrack = index;
    links[currentTrack].classList.add("active");
    wavesurfer.load(links[currentTrack].href);
  };

  Array.prototype.forEach.call(links, function(link, index) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      setCurrentSong(index);
    });
  });

  wavesurfer.on("ready", function() {
    wavesurfer.play();
  });

  wavesurfer.on("finish", function() {
    setCurrentSong((currentTrack + 1) % links.length);
  });

  setCurrentSong(currentTrack);
});
