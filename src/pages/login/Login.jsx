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
    const [getUser, { data, isLoading, error }] = useLazyGetUserQuery();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await signIn(email, password);
            if (data) {
                const userData = await getUser();
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
