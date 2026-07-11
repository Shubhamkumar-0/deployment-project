import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  const getMessage = async () => {
    try {
      const res = await axios.get("https://deployment-project-yxly.onrender.com")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Deployment Project</h1>

      <button onClick={getMessage}>
        Connect Backend
      </button>

      <h2>{message}</h2>
    </div>
  );
}

export default App;