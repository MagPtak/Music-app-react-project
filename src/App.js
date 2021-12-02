import "./styles.css";

function Heading() {
  return <h1>Music player</h1>;
}

function SongPlayer() {
  return (
    <>
      <Heading />
      <audio controls>
        <source src="https://examples.devmastery.pl/assets/audio/deadfro5h.mp3" />
      </audio>
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <SongPlayer />
    </div>
  );
}
