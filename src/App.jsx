import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import SignupAdmin from './pages/signupAdmin/SignupAdmin';
import Login from './pages/login/Login';
import MainPlayer from './pages/mainPlayer/MainPlayer';
import MainAdmin from './pages/mainAdmin/MainAdmin';
import Live from './pages/live/Live';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import ProtectedRoute from './ProtectedRoute';

export default function App() {

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        localStorage.setItem("token", user.accessToken);
      } else {
        localStorage.removeItem("token");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signupadmin" element={<SignupAdmin />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/mainplayer"
        element={
          <ProtectedRoute requiredRole="player">
            <MainPlayer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mainadmin"
        element={
          <ProtectedRoute requiredRole="admin">
            <MainAdmin />
          </ProtectedRoute>
        }
      />
      <Route path="/live" element={<Live />} />
    </Routes>
  );
}