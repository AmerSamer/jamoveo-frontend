/**
 * MainPlayer.jsx
 *
 * This is the main landing page for a player after login.
 * - Shows "Waiting for next song..." until an admin selects a song.
 * - Listens for `load-song` socket event and redirects to the Live page with song data.
 * - Listens for `session-ended` event and shows an alert.
 * - Allows the player to logout.
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket/socket";
import './MainPlayer.css'
import { useGetUserQuery } from "../../services/userApi";
import { logOut } from "../../services/authService";

export default function MainPlayer() {
    const { data, isLoading, error } = useGetUserQuery();
    const [waiting, setWaiting] = useState(true);
    const navigate = useNavigate();

    // Instrument is used as a role indicator in Live page (e.g., 'singer')
    const instrument = data?.data?.instruments;

    /**
      * Setup socket connection and event listeners
      * - When admin broadcasts a song (`load-song`), redirect to Live screen
      * - If session is ended (`session-ended`), alert and redirect back here
      */
    useEffect(() => {
        if (!instrument || isLoading) return;

        socket.connect();
        socket.emit("join-room");

        const handleLoadSong = (songData) => {
            navigate("/live", { state: { songData, role: instrument } });
        };

        const handleSessionEnded = () => {
            setWaiting(true);
            alert("Session ended by admin");
            navigate("/mainplayer");
        };

        socket.on("load-song", handleLoadSong);
        socket.on("session-ended", handleSessionEnded);

        return () => {
            socket.off("load-song", handleLoadSong);
            socket.off("session-ended", handleSessionEnded);
        };
    }, [instrument, isLoading, navigate]);
    
    /**
      * Logout function clears Firebase session and redirects to login
      */
    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="main-container">
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
            <div className="logout-div">
                <button type="button" className="logout-button" onClick={() => handleLogout()}>
                    Logout
                </button>
            </div>
            <div className="box">
                <div className="note-icon">🎵</div>
                <div className="waiting-text">Waiting for next song...</div>
            </div>
        </div>
    );
};

