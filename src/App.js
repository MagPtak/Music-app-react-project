import "./styles.css";

function Heading({ title }) {
  // Props przekazany jako argument funkcji
  // const title = props.title;
  return <h1>{title}</h1>;
}

function SongPlayer({ showControls = true, audioURL, ...remainingProps }) {
  // const showControls = props.showControls;
  // const audioURL = props.audioURL;
  // DESTRUKTURYZACJA =>
  // SKRÓCONA FORMA DESTRUKTURYZACJI - USUNIĘCIE KLUCZA jeśli nazwa klucza jest taka sama jak stałej
  // const { showControls, audioURL } = props;
  // const { showControls: showControls, audioURL: audioURL} = props;

  return (
    <>
      <Heading title="Music player" />
      <audio controls={showControls} {...remainingProps}>
        <source src={audioURL} />
      </audio>
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <SongPlayer
        showControls={true}
        loop
        audioURL="https://examples.devmastery.pl/assets/audio/deadfro5h.mp3"
      />
    </div>
  );
}
