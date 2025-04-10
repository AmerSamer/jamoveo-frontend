import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket/socket";
import './MainAdmin.css';
import { logOut } from "../../services/authService";
import { useGetSongsQuery, useLazyGetSongQuery } from "../../services/songApi";

export default function MainAdmin() {
    const [songs, setSongs] = useState([]);
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState([]);
    const navigate = useNavigate();
    const { data, loading, error } = useGetSongsQuery();
    const [getSong, { dataSong, isLoadingSong, errorSong }] = useLazyGetSongQuery();

    useEffect(() => {
        socket.connect();
        socket.emit("join-room");

        if (data) {
            setSongs(data.data);
            setFiltered(data.data);
        }
    }, [data, loading, error]);

    const handleSearch = () => {
        const q = query.toLowerCase();
        const results = songs.filter((s) =>
            s.name.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
        );
        setFiltered(results);
    };
    const handleSelectSong = async (song) => {
        try {
            const newSong = await getSong(song.file);
            const songData = {
                name: song.name,
                artist: song.artist,
                content: newSong.data
            };

            //Broadcast song to players
            socket.emit("select-song", songData);

            //Navigate to admin Live page
            navigate("/live", {
                state: { songData, role: "admin" }
            });
        } catch (error) {
            console.error("Failed to load song:", error);
            alert("Could not load song.");
        }
    };
    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="admin-container">
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
            <main className="admin-main">
                <div className="search-bar">
                    <input type="text" placeholder="Search any song..." value={query} onChange={(e) => setQuery(e.target.value)} />
                    <button className="search-icon" onClick={handleSearch}>🔍</button>
                </div>

                <h2 className="section-title">Recommended song list</h2>

                <ul className="song-list">
                    {filtered.map((song, index) => (
                        <li className="song-item" key={index} onClick={() => handleSelectSong(song)}>
                            <div className="song-left">
                                <img className="song-image" src={song.img} alt={song.name} />
                                <span className="song-title">{song.name} – {song.artist}</span>
                            </div>
                            <div className="song-icons">
                                <span title="Lyrics">🅣</span>
                                <span title="Chords">🎬</span>
                                <span title="Music">🎵</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

