/**
 * SongDisplay Component
 * 
 * Renders a song's lyrics and chords line-by-line.
 *
 * Props:
 * - name (string): The name of the song (used to control directionality)
 * - data (array): Song content in the format [[{ lyrics, chords? }, ...], ...]
 * - isSinger (boolean): If true, hides chords and shows only lyrics
 * 
 * Behavior:
 * - Displays chords above lyrics unless the user is a singer
 * - Switches text direction (LTR or RTL) based on the song name
 * - Hebrew songs use RTL layout by applying a different CSS class
 */
import React from "react";
import "./SongDisplay.css";

const SongDisplay = ({ name, data, isSinger }) => {
  return (
    <div className="song-display">
      {data.map((line, idx) => (
        <div className={name === "Hey Jude" ? "song-line" : "song-line song-line-rtl"} key={idx}>
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
