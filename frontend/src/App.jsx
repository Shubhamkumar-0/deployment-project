import { useState } from "react";
import axios from "axios";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";
// import "./App.css";

function App() {

  

  return (
    <div>
      <h1>Deployment Project</h1>

      {/* this route is for testing and nothing else */}
      {/* <Register />
      <Login /> */}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;