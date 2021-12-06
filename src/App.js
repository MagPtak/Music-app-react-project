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
    <section className="SongPlayer">
      <Heading title="Music player" />
      <img width="250px" height="250px" src={coverUrl} alt="Song cover" />
      <audio ref={audioRef} key={audioUrl} controls={showControls}>
        <source src={audioUrl} />
      </audio>
      <div>
        <button onClick={() => audioRef.current.play()}>Play</button>
        <button onClick={() => audioRef.current.pause()}>Pause</button>
      </div>
    </section>
  );
}

//Zastosowanie property children aby uniknac prop drillingu i przekazywania propsów przez kolejne komponenty. Logika komponentu została umieszczona wewnatrz komponentu nadrzednego w którym umieszczone są wszystkie dane - nie ma potrzeby ich przekazywania.
function Songs({ children }) {
  return <section className="Songs">{children}</section>;
}

function SongListItem({ song, isCurrent, onSelect }) {
  function handleClick() {
    onSelect(song);
  }
  return (
    <li
      className={`SongListItem ${isCurrent ? "selected" : ""}`}
      onClick={handleClick}
    >
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
          <SongPlayer showControls={false} song={currentSong} />
          <Songs>
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
          </Songs>
        </>
      )}
    </div>
  );
}
