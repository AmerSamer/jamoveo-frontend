import React, { useState } from 'react';
import { signUp } from '../../services/authService';
import { useDispatch } from 'react-redux';
// import { setUser } from '../../features/auth/authSlice';
import './Signup.css'
import signupImg from '../../assets/signup.svg'
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation, useGetInstrumentsQuery } from "../../services/userApi";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();
  // const { data: instruments, isLoading: instrumentLoading, error: instrumentError } = useGetInstrumentsQuery();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await signUp(email, password);
      if (data) {
        const payload = {
          instrument
        };
        const userData = await createUser(payload).unwrap();
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
        <h1 className="title">Register</h1>
        <form onSubmit={handleRegister} className="form">
          <input
            type="email"
            placeholder="Select your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <select
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            className="input"
            required
          >
            <option value="">Select your instrument</option>
            {/* {instruments?.map((inst) => (
              <option key={inst} value={inst}>
                {inst}
              </option>
            ))} */}
            <option>drums</option>
            <option>guitars</option>
            <option>bass</option>
            <option>saxophone</option>
            <option>keyboards</option>
            <option>vocals</option>
          </select>
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
          <p className="login-text">
            Don’t have an admin account?{' '}
            <span onClick={() => navigate('/signupAdmin')} className="login-link">
              Register as Admin
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
