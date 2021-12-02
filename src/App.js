import "./styles.css";

function Heading({ title }) {
  // Props przekazany jako argument funkcji
  // const title = props.title;
  return <h1>{title}</h1>;
}

function SongPlayer({ showControls = true, song }) {
  const { audioURL, coverURL } = song;
  // const showControls = props.showControls;
  // const audioURL = props.audioURL;
  // DESTRUKTURYZACJA =>
  // SKRÓCONA FORMA DESTRUKTURYZACJI - USUNIĘCIE KLUCZA jeśli nazwa klucza jest taka sama jak stałej
  // const { showControls, audioURL } = props;
  // const { showControls: showControls, audioURL: audioURL} = props;

  return (
    <>
      <Heading title="Music player" />
      <img width="250px" height="250px" src={coverURL} alt="Song" />
      <audio key={audioURL} controls={showControls}>
        <source src={audioURL} />
      </audio>
    </>
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

  const currentSong = songs[1];

  return (
    <div className="App">
      <SongPlayer showControls={true} song={currentSong} />
    </div>
  );
}
