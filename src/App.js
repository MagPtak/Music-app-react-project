import "./styles.css";

function Heading() {
  return <h1>Music player</h1>;
}

function SongPlayer() {
  const showControls = false || true;
  const audioURL = "https://examples.devmastery.pl/assets/audio/deadfro5h.mp3";
  return (
    <>
      <Heading />
      <audio controls={showControls}>
        <source src={audioURL} />
      </audio>
    </>
  );
}

function getStatusMessage(isLoading, hasErrors) {
  let message = null;
  if (isLoading) {
    message = "Loading...";
  }
  if (hasErrors) {
    message = "Errors occured...";
  }
  return message;
}

export default function App() {
  const isLoading = false;
  const hasErrors = false;
  const showPlayer = !isLoading && !hasErrors;
  const statusMessage = getStatusMessage(isLoading, hasErrors);
  return (
    <div className="App">{showPlayer ? <SongPlayer /> : statusMessage}</div>
  );
}
