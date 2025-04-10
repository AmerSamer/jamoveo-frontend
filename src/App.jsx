import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import SignupAdmin from './pages/signupAdmin/SignupAdmin';
import Login from './pages/login/Login';
import MainPlayer from './pages/mainPlayer/MainPlayer';
import MainAdmin from './pages/mainAdmin/MainAdmin';
import Live from './pages/live/Live';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signupadmin" element={<SignupAdmin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mainplayer" element={<MainPlayer />} />
      <Route path="/mainadmin" element={<MainAdmin />} />
      <Route path="/live" element={<Live />} />
    </Routes>
  );
}

//////////////////////////////////////////////////////
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App