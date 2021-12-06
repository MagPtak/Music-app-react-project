import { useEffect, useRef, useState } from "react";
import "./styles.css";

function Heading({ title }) {
  return <h1>{title}</h1>;
}

//useRef zostanie wykorzystany do przekazania referencji do obiektu i wywołania na nim odpowiedniej metody. Przez zmienną audioRef zostanie przekazana referencja do obiektu audio. Po kliknięciu w przycisk wywołuje się metodę na obiekcie audio, jest to molzliwe poprzez uzyskanie do niego referencji.
function SongPlayer({ showControls = false, song }) {
  const audioRef = useRef();
  const { audioUrl, coverUrl } = song;

  return (
    <>
      <Heading title="Music player" />
      <img width="250px" height="250px" src={coverUrl} alt="Song cover" />
      <audio ref={audioRef} key={audioUrl} controls={showControls}>
        <source src={audioUrl} />
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

//useState jest zainicjalizowany pustą tablicą, jest z niego wyciągana aktualna wartość, funckję do zmieniania wartości. Będzie tu przechowywana lista ściągniętych piosenek.
//useEfect słuy do pobrania piosenek tylko raz, w przeciwnym wypadku wykonywałby się tyle razy ile funkcja, przy kazdej zmianie piosenki. Jako pierwszy argument przyjmuje funkcję wywołującą efekt uboczny czyli pobranie listy piosenek, drugim argumentem jest pusta tablica, która powoduje ze  piosenki zostaną pobrane tylko raz po pierwszym renderze.
export default function App() {
  const URL = "https://examples.devmastery.pl/songs-api/songs";
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    fetch(URL).then((response) => {
      if (response.ok) {
        response.json().then(setSongs);
      }
    });
  }, []);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];

  //Funkcja wybierająca aktualną piosenkę -> stała audioIndex słuy do iterowania tablicy songs ze wszystkimi piosenkami, sprawdzenia ich indeków i porównania ich audioUrl z audioUrl wybranej piosenki, funkcja zwróci indeks piosenki, następnie wywoła funkcję setCurrentSongIndex i przekaze do niej audioIndex
  function handleSelectSong(selectedSong) {
    const audioIndex = songs.findIndex(
      (song) => song.audioUrl === selectedSong.audioUrl
    );
    if (audioIndex >= 0) {
      setCurrentSongIndex(audioIndex);
    }
  }
  return (
    <div className="App">
      {songs.length === 0 ? (
        "Loading..."
      ) : (
        <>
          <SongPlayer showControls={true} song={currentSong} />
          <section>
            <Heading title="Songs" />
            <ul>
              {songs.map((song) => (
                <SongListItem
                  key={song.audioUrl}
                  song={song}
                  isCurrent={currentSong.audioUrl === song.audioUrl}
                  onSelect={handleSelectSong}
                />
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
