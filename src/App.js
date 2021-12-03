import { useRef, useState } from "react";
import "./styles.css";

function Heading({ title }) {
  return <h1>{title}</h1>;
}

function SongPlayer({ showControls = true, song }) {
  const audioRef = useRef();
  const { audioURL, coverURL } = song;

  return (
    <>
      <Heading title="Music player" />
      <img width="250px" height="250px" src={coverURL} alt="Song" />
      <audio ref={audioRef} key={audioURL} controls={showControls}>
        <source src={audioURL} />
      </audio>
      <div>
        <button onClick={() => audioRef.current.play()}>Play</button>
        <button onClick={() => audioRef.current.pause()}>Pause</button>
      </div>
    </>
  );
}

function SongListItem({ song, isCurrent, onSelect }) {
  const background = isCurrent ? "darkslategrey" : "none";
  const style = { background };
  function handleClick() {
    onSelect(song);
  }
  return (
    <li style={style} onClick={handleClick}>
      {song.title} by {song.artist}
    </li>
  );
}

export default function App() {
  const songs = [
    {
      audioURL: "https://examples.devmastery.pl/assets/audio/deadfro5h.mp3",
      coverURL: "https://examples.devmastery.pl/assets/audio/deadfro5h.jpg",
      title: "Deadfro5h",
      artist: "starfrosh",
    },
    {
      audioURL: "https://examples.devmastery.pl/assets/audio/majesty.mp3",
      coverURL: "https://examples.devmastery.pl/assets/audio/majesty.jpg",
      title: "Majesty (Original Mix)",
      artist: "Ryan Craig Martin",
    },
    {
      audioURL: "https://examples.devmastery.pl/assets/audio/runs.mp3",
      coverURL: "https://examples.devmastery.pl/assets/audio/runs.jpg",
      title: "Runs",
      artist: "Wowa",
    },
  ];
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];

  function handleSelectSong(selectedSong) {
    const audioIndex = songs.findIndex(
      (song) => song.audioURL === selectedSong.audioURL
    );
    if (audioIndex >= 0) {
      setCurrentSongIndex(audioIndex);
    }
  }
  return (
    <div className="App">
      <SongPlayer showControls={true} song={currentSong} />
      <section>
        <Heading title="Songs" />
        <ul>
          {songs.map((song) => (
            <SongListItem
              key={song.audioURL}
              song={song}
              isCurrent={currentSong.audioURL === song.audioURL}
              onSelect={handleSelectSong}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
