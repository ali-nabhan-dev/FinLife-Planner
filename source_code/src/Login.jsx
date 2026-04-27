import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import loginImage from "./images/loginimage.webp"; // Make sure this path is correct

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = "min-h-screen bg-cover bg-center bg-fixed";
    document.body.style.backgroundImage = `url(${loginImage})`;

    return () => {
      document.body.className = "";
      document.body.style.backgroundImage = "";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username.length < 3 || password.length < 6) {
      setError("Username must be at least 3 characters and password at least 6 characters.");
      return;
    }

    console.log("Username:", username, "Password:", password, "Remember Me:", rememberMe);
    navigate("/UserMainPage");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white bg-opacity-90 rounded-xl p-16 shadow-lg w-[400px] text-center">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-left mb-1">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-left mb-1">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4 space-y-2">
          <Link to="/ForgotPassword" className="block text-purple-600 hover:underline">Forgot password?</Link>
          <Link to="/signup" className="block text-purple-600 hover:underline">Don't have an account? Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;