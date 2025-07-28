import { useState } from "react";
import { api } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

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
        navigate("/social-dashbaord")
        // setMsg("Login successful!");
      } else {
        setMsg("Registration successful!");
      }
    } catch (err) {
      setMsg(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-5xl text-blue-500 mb-2" />
          <h2 className="text-2xl font-extrabold text-gray-800 mb-1 tracking-tight">
            {type === "login" ? "Welcome Back in Sociolyze!" : "Create Account"}
          </h2>
          <p className="text-gray-500 text-sm">
            {type === "login" ? "Login to your account" : "Register a new account"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all bg-gray-50 placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all bg-gray-50 placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={type === "login" ? "current-password" : "new-password"}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {type === "login" ? "Login" : "Register"}
          </button>
          <p className="text-center text-gray-500 text-sm mt-2 min-h-[1.5em]">{msg}</p>
        </form>
        <div className="mt-6 text-center">
          {type === "login" ? (
            <span className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/" className="text-blue-600 hover:underline font-medium">Register</Link>
            </span>
          ) : (
            <span className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
