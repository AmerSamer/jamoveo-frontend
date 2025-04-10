import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { socket } from "../../socket";
import './MainAdmin.css';

export default function MainAdmin() {
    const [songs, setSongs] = useState([]);
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Load metadata from songList.json
        fetch("/songs/songList.json")
            .then(res => res.json())
            .then(data => {
                setSongs(data);
                setFiltered(data); // show all initially
            });
    }, []);

    const handleSearch = () => {
        const q = query.toLowerCase();
        const results = songs.filter((s) =>
            s.name.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
        );
        setFiltered(results);
    };
    const handleSelectSong = async (song) => {
        const res = await fetch(`/songs/${song.file}`);
        const songContent = await res.json();
        
        const songData = {
            name: song.name,
            artist: song.artist,
            content: songContent
        };

        // Broadcast song to players
        // socket.emit("select-song", songData);

        // Navigate to admin Live page
        navigate("/live", {
            state: { songData, role: "admin" }
        });
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

