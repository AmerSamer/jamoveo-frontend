import React from "react";
import "./SongDisplay.css";

const SongDisplay = ({ data, isSinger }) => {
  return (
    <div className="song-display">
      {data.map((line, idx) => (
        <div className="song-line" key={idx}>
          {line.map((word, wIdx) => (
            <div className="word-block" key={wIdx}>
              {!isSinger && word.chords && (
                <div className="chord">{word.chords}</div>
              )}
              <div className="lyrics">{word.lyrics}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SongDisplay;
