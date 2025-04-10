import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { socket } from "../../socket";
import './MainPlayer.css'

export default function MainPlayer({ user }) {
    const [waiting, setWaiting] = useState(true);
    const navigate = useNavigate();

    // useEffect(() => {
    //     socket.emit("join-room");

    //     socket.on("load-song", (songData) => {
    //         // Save song data in session or context if needed
    //         navigate("/live", { state: { songData, role: user.instrument } });
    //     });

    //     socket.on("session-ended", () => {
    //         setWaiting(true);
    //     });

    //     return () => {
    //         socket.off("load-song");
    //         socket.off("session-ended");
    //     };
    // }, [navigate, user.instrument]);

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
            <div className="box">
                <div className="note-icon">🎵</div>
                <div className="waiting-text">Waiting for next song...</div>
            </div>
        </div>
    );
};

