import { useRef } from "react";
import { Heading } from "./Heading";
import "./SongPlayer.css";

//useRef zostanie wykorzystany do przekazania referencji do obiektu i wywołania na nim odpowiedniej metody. Przez zmienną audioRef zostanie przekazana referencja do obiektu audio. Po kliknięciu w przycisk wywołuje się metodę na obiekcie audio, jest to molzliwe poprzez uzyskanie do niego referencji.
export function SongPlayer({
  showControls = true,
  song,
  onClickPrevButton,
  onClickNextButton,
}) {
  const audioRef = useRef();
  console.log(audioRef);
  const { audioUrl, coverUrl } = song;

  function handleClickPrevButton() {
    onClickPrevButton();
  }

  function handleClickNextButton() {
    onClickNextButton();
  }

  return (
    <section className="SongPlayer">
      <Heading title="Music player" />
      <img width="250px" height="250px" src={coverUrl} alt="Song cover" />
      <audio ref={audioRef} key={audioUrl} controls={showControls}>
        <source src={audioUrl} />
      </audio>
      <div>
        <button onClick={handleClickPrevButton}>←</button>
        <button onClick={() => audioRef.current.play()}>Play</button>
        <button onClick={() => audioRef.current.pause()}>Pause</button>
        <button onClick={handleClickNextButton}>→</button>
      </div>
    </section>
  );
}
