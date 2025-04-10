/**
 * Login.jsx
 *
 * Handles Firebase user authentication and redirects based on user role.
 * - Uses Firebase email/password login via `signIn` service
 * - Fetches user role from MongoDB via RTK Query (`getUser`)
 * - Redirects:
 *    - players → /mainplayer
 *    - admins  → /mainadmin
 */

import React, { useState } from 'react';
import { signIn } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import loginImg from '../../assets/login.svg'
import { useLazyGetUserQuery } from "../../services/userApi";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Lazy query to fetch user details after login
    const [getUser, { data, isLoading, error }] = useLazyGetUserQuery();

    /**
       * Handles form submission and user authentication.
       * 1. Signs in user with Firebase
       * 2. Fetches user role from backend
       * 3. Redirects to /mainplayer or /mainadmin based on role
       */
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await signIn(email, password);
            if (data) {
                const userData = await getUser(); // Returns promise from RTK Query
                if (userData && userData.data.data.role === 'player') {
                    navigate('/mainplayer');
                } else if (userData && userData.data.data.role === 'admin') {
                    navigate('/mainadmin');
                }
            }
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="container">
            <div className="left-section">
                <h2 className="subtitle">Welcome to JaMoveo</h2>
                <h1 className="title">Log in</h1>
                <form onSubmit={handleLogin} className="form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        required
                    />
                    <button type="submit" className="submit-button">
                        Log in
                    </button>
                    <p className="register-text">
                        Don’t have an account?{' '}
                        <span onClick={() => navigate('/signup')} className="register-link">
                            Register
                        </span>
                    </p>
                </form>
            </div>
            <div className="right-section">
                <img src={loginImg} alt="Musicians" className="image" />
            </div>
        </div>
    );
}
