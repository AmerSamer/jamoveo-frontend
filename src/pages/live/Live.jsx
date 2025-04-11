/**
 * Live.jsx
 *
 * Displays the selected song (lyrics & chords) in real-time to all participants.
 * - Players see lyrics (and chords unless they are singers)
 * - Admin can quit the session
 * - All users can auto-scroll the lyrics
 * - Listens for "session-ended" via Socket.IO to return to the main screen
 */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SongDisplay from "../../components/SongDisplay";
import { socket } from "../../socket/socket";
import './Live.css'

const Live = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract song and role from navigation state
  const { songData, role } = location.state || {};
  const [autoScroll, setAutoScroll] = useState(false);
  const [scrollInterval, setScrollInterval] = useState(null);

  const isSinger = role === "singer";
  const isAdmin = role === "admin";

  /**
   * Auto-scroll functionality
   * Scrolls down the page every 50ms when enabled
   */
  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(() => {
        window.scrollBy(0, 1);
      }, 50);
      setScrollInterval(interval);
    } else {
      clearInterval(scrollInterval);
    }

    return () => clearInterval(scrollInterval);
  }, [autoScroll]);

  /**
  * Socket listener: session-ended
  * If the admin ends the session, redirect users to their main screen
  */
  useEffect(() => {
    const handleSessionEnded = () => {
      navigate(isAdmin ? "/mainadmin" : "/mainplayer");
    };

    socket.on("session-ended", handleSessionEnded);

    return () => {
      socket.off("session-ended", handleSessionEnded);
    };
  }, [navigate]);

  /**
   * Admin-only: Emit quit-session to end the session for all users
   */
  const handleQuit = () => {
    socket.emit("quit-session");
    navigate("/mainadmin");
  };

  return (
    <div className="live-page">
      <header className="header">
        <div className="logo">JAMOVEO</div>
        <div className="avatar">
          <svg
            className="avatar-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </header>

      <div className="song-container">
        <h2 className="song-title-live">{songData.name} – {songData.artist}</h2>
        <SongDisplay name={songData.name} data={songData.content} isSinger={isSinger} />
      </div>

      <div className="song-btn-container">
        <button className="scroll-btn" onClick={() => setAutoScroll(!autoScroll)}>
          {autoScroll ? "⏹ Stop Scroll" : "▶ Start Scroll"}
        </button>

        {isAdmin && (
          <button className="quit-btn quit-btn-margin" onClick={handleQuit}>
            ❌ Quit Session
          </button>
        )}
      </div>
    </div>
  );
};

export default Live;
