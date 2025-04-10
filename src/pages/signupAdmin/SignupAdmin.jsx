/**
 * SignupAdmin.jsx
 *
 * Allows a new admin user to register for JaMoveo.
 * - Uses Firebase Auth for email/password registration
 * - Sends a backend request to flag the user as an admin
 * - Redirects to role-specific dashboard based on backend response
 */

import React, { useState } from 'react';
import { signUp } from '../../services/authService';
import '../signup/Signup.css'
import signupImg from '../../assets/signup.svg'
import { useNavigate } from 'react-router-dom';
import { useCreateAdminUserMutation } from "../../services/userApi";

export default function SignupAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // RTK mutation hook to register admin in backend
  const [createAdminUser, { isLoading }] = useCreateAdminUserMutation();

  /**
  * Handles admin registration:
  * 1. Creates Firebase Auth user with email/password
  * 2. Calls backend to mark user as admin
  * 3. Navigates to appropriate dashboard
  */
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await signUp(email, password);
      if (data) {
        // Register admin role in backend
        const userData = await createAdminUser().unwrap();
        // Redirect based on role from backend response
        if (userData && userData.data.role === 'player') {
          navigate('/mainplayer');
        } else if (userData && userData.data.role === 'admin') {
          navigate('/mainadmin');
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h2 className="subtitle">Welcome to JaMoveo</h2>
        <h1 className="title">Register as Administrator</h1>
        <form onSubmit={handleRegister} className="form">
          <input
            type="email"
            placeholder="Select your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className="submit-button">
            Register
          </button>
          <p className="login-text">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} className="login-link">
              Log In
            </span>
          </p>
        </form>
      </div>
      <div className="image-container">
        <img src={signupImg} alt="Musicians" className="image" />
      </div>
    </div>
  );
}
