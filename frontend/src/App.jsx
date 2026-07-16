import { useState } from "react";
import axios from "axios";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
// import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  const getMessage = async () => {
    try {
      const res = await axios.get("https://deployment-project-yxly.onrender.com");
      setMessage(res.data);
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <div>
      <h1>Deployment Project</h1>

      {/* <button onClick={getMessage}>
        Connect Backend
      </button>

      <h2>{message}</h2> */}

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