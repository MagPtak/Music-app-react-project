import "./styles.css";

function Heading(props) {
  const title = props.title;
  return <h1>{title}</h1>;
}

function SongPlayer(props) {
  const showControls = props.showControls;
  const audioURL = props.audioURL;
  return (
    <>
      <Heading title="Music player" />
      <audio controls={showControls}>
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
        audioURL="https://examples.devmastery.pl/assets/audio/deadfro5h.mp3"
      />
    </div>
  );
}
