import React, { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/submit", form);
    alert("Data submitted!");

    setForm({ username: "", email: "", message: "" });
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        /><br /><br />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        /><br /><br />

        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
        /><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;