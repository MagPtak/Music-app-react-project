import { useEffect, useState } from "react";
import { Heading } from "./Heading";
import { SongPlayer } from "./SongPlayer";
import { Songs } from "./Songs";
import { SongListItem } from "./SongListItem";
import "./App.css";

//useState jest zainicjalizowany pustą tablicą, jest z niego wyciągana aktualna wartość, funckję do zmieniania wartości. Będzie tu przechowywana lista ściągniętych piosenek.
//useEfect słuy do pobrania piosenek tylko raz, w przeciwnym wypadku wykonywałby się tyle razy ile funkcja, przy kazdej zmianie piosenki. Jako pierwszy argument przyjmuje funkcję wywołującą efekt uboczny czyli pobranie listy piosenek, drugim argumentem jest pusta tablica, która powoduje ze  piosenki zostaną pobrane tylko raz po pierwszym renderze.
export function App() {
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

  function handleSelectPrevButton() {
    const previousSong = currentSongIndex - 1;
    if (currentSongIndex > 0) {
      setCurrentSongIndex(previousSong);
    }
  }

  function handleSelectNextButton() {
    const nextSong = currentSongIndex + 1;
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(nextSong);
    }
  }

  return (
    <div className="App">
      {songs.length === 0 ? (
        "Loading..."
      ) : (
        <>
          <SongPlayer
            showControls={false}
            song={currentSong}
            onClickPrevButton={handleSelectPrevButton}
            onClickNextButton={handleSelectNextButton}
          />
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
