import * as React from "react";

import useAudio from "./useAudio";
import TimeBar from "./TimeBar";
import PlaybackButton from "./PlayBackButton";

function AudioPlayer({ audiourl }) {
  const [audioElement, audioProps] = useAudio(audiourl);

  return (
    <div className="audio-player">
      {audioElement}

      {audioProps.isLoading ? (
        <div style={{ color: "white" }}>Loading...</div>
      ) : (
        <div className="controls">
          <PlaybackButton
            onClick={audioProps.togglePlaybackStatus}
            playbackStatus={audioProps.playbackStatus}
          />
          <TimeBar
            currentTime={audioProps.currentTime}
            isSeeking={audioProps.isSeeking}
            duration={audioProps.duration}
            progress={audioProps.progress}
            setTime={audioProps.setTime}
          />
        </div>
      )}
    </div>
  );
}

export default AudioPlayer;