// React Hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Axios
import axios from "axios";

function Login() {

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // Login API
      const res = await axios.post(
        "https://deployment-project-yxly.onrender.com/api/auth/login",
        formData
      );

      console.log(res.data);

      alert(res.data.message);

    } catch (error) {

      console.log(error.response?.data || error.message);

      alert(
        error.response?.data?.message || "Something went wrong"
      );

    }
  };

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;