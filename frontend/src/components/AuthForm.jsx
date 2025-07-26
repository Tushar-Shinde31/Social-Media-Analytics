import { useState } from "react";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ type }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Loading...");

    try {
      const res = await api.post(`/auth/${type}`, { email, password });

      if (type === "login") {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard")
        // setMsg("Login successful!");
      } else {
        setMsg("Registration successful!");
      }
    } catch (err) {
      setMsg(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-xl space-y-4">
      <h2 className="text-xl font-bold">{type === "login" ? "Login" : "Register"}</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        {type === "login" ? "Login" : "Register"}
      </button>
      <p className="text-sm text-center text-gray-600">{msg}</p>
    </form>
  );
}
