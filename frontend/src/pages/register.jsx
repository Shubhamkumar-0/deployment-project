// React Hooks
import { useState } from "react";

// Axios
import axios from "axios";

function Register() {

  // Form State
  const [formData, setFormData] = useState({
    name: "",
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

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // POST Request
      await axios.post(
        "https://deployment-project-yxly.onrender.com/api/auth/register",
        formData
        );

      console.log(res.data);

      alert(res.data.message);

    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.message);
    }
  };

  return (
    <div>

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <br /><br />

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
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;