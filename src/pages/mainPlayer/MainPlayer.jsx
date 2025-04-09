import React, { useState } from 'react';
// import { signUp } from '../../services/authService';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../features/auth/authSlice';
import './MainPlayer.css'
// import signupImg from '../../assets/signup.svg'
// import { useNavigate } from 'react-router-dom';

export default function MainPlayer() {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    return (
        <div className="main-container">
            {/* Header */}
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

            {/* Center Box */}
            <div className="box">
                <div className="note-icon">🎵</div>
                <div className="waiting-text">Waiting for next song...</div>
            </div>
        </div>
    );
}
