

<template>
  <div id="app">
    <header><h1>My Music</h1></header>
    <main>
      <section class="player">
        <div class="player-title">
          <h2 class="song-title">
            {{ current.title }}
            -
            <span>{{ current.artist }}</span>
          </h2>
        </div>
        <div class="player-pic">
          <img :src="current.pic" alt="music_pic" />
        </div>
        <div class="control">
          <button class="prev" @click="prev">Previous</button>
          <button class="play" v-if="!isPlaying" @click="play">Play</button>
          <button class="pause" v-else @click="pause">Pause</button>
          <button class="next" @click="next">Next</button>
        </div>
      </section>
      <section class="playlist">
        <h3>The Playlist</h3>
        <button
          v-for="song in songs"
          :key="song.src"
          @click="play(song)"
          :class="song.src == current.src ? 'song playing' : 'song'"
        >
          {{ song.title }} - {{ song.artist }}
        </button>
      </section>

      <!-- <plyr>
        <div data-type="youtube" data-video-id="bTqVqk7FSmY" />
      </plyr> -->


    </main>
  </div>
</template>

<script>
export default {
  name: "app ",
  data: () => {
    return {
      current: {},
      index: 0,
      isPlaying: false,
      songs: [
        {
          title: "Red",
          artist: "Taylor Swift",
          src: require("./assets/Taylor Swift - Red.mp3"),
          //src:'https://www.youtube.com/audio/Zlot0i3Zykw',
          pic:
            "https://upload.wikimedia.org/wikipedia/zh/c/c0/Taylor_Swift_-_Red_%28Single%29.png",
        },
        {
          title: "Cry For Me",
          artist: "Twice",
          src: require("./assets/TWICE - Cry For Me.mp3"),
          pic:
            "https://i1.sndcdn.com/artworks-SUEkSxF0liVDFZby-9SSIeg-t500x500.png",
        },
      ],
      player: new Audio(),
    };
  },
  methods: {
    play(song) {
      if (typeof song.src !== "undefined") {
        this.current = song;
        this.player.src = this.current.src;
      }
      this.player.play();
      // 查明ended用法
      this.player.addEventListener("ended", function () {
        this.index++;
        if (this.index > this.songs.length - 1) {
          this.index = 0;
        }
        this.current = this.songs[this.index];
        this.play(this.current);
      });
      this.isPlaying = true;
    },
    pause() {
      this.player.pause();
      this.isPlaying = false;
    },
    prev() {
      this.index++;
      if (this.index < 0) {
        this.index = this.songs.length - 1;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    },
    next() {
      this.index++;
      if (this.index > this.songs.length - 1) {
        this.index = 0;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    },
  },
  created() {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
    //this.player.play();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: sans-serif;
}
header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: #413c69;
  color: #a7c5eb;
}
main {
  widows: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px;
  display: flex;
}
.player {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
}
.player-title {
  height: 20%;
}
.player-pic {
  padding: 25px 0 0;
  width: 50%;
  height: 80%;
}
.player img {
  width: 100%;
  vertical-align: middle;
  object-fit: contain;
}
.song-title {
  color: #212121;
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}
.song-title span {
  font-weight: 400;
  font-style: italic;
}
.control {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 15px;
}
button {
  appearance: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
.play,
.pause {
  font-size: 20px;
  font-weight: 700;
  padding: 15px 25px;
  margin: 0px 15px;
  border-radius: 8px;
  color: #fff;
  background-color: #cc2e5d;
}

.next,
.prev {
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  margin: 0px 15px;
  border-radius: 6px;
  color: #fff;
  background-color: #ff5858;
}

.playlist {
  padding: 30px 0 0;
}

.playlist h3 {
  color: #212121;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 30px;
  text-align: center;
}
.playlist .song {
  display: block;
  width: 100%;
  padding: 15px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
}
.playlist .song:hover {
  color: #ff5858;
}
.playlist .song .playing {
  color: #fff;
  background-image: linear-gradient(to right, #cc2e5d #ff5858);
}
</style>
