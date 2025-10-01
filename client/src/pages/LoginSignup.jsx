// src/pages/LoginSignup.jsx
import React, { useRef, useState, useContext } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import axios from 'axios'; // Make sure axios is imported

export default function LoginSignup() {
  // --- Refs for animations ---
  const shadeRef = useRef(null);
  const signTextRef = useRef(null);
  const loginTextRef = useRef(null);
  const navigate = useNavigate();

  // --- State Management ---
  const { login } = useContext(AuthContext);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ Now correctly used

  const [signupData, setSignupData] = useState({
    name: "",
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // --- Animation handlers ---
  const handleSignUp = () => {
    setShowForgotPassword(false);
    shadeRef.current.style.left = "45%";
    signTextRef.current.style.display = "none";
    setTimeout(() => {
      loginTextRef.current.style.display = "block";
      loginTextRef.current.style.marginLeft = "59.5%";
    }, 1000);
    setTimeout(() => {
      loginTextRef.current.style.marginLeft = "0";
    }, 1100);
    loginTextRef.current.style.transition = "1s";
    shadeRef.current.style.transition = "1s ease-in-out";
  };

  const handleLogin = () => {
    setShowForgotPassword(false);
    shadeRef.current.style.left = "-58%";
    loginTextRef.current.style.display = "none";
    setTimeout(() => {
      signTextRef.current.style.display = "block";
      signTextRef.current.style.marginLeft = "0";
    }, 1000);
    setTimeout(() => {
      signTextRef.current.style.marginLeft = "59.5%";
    }, 1100);
    signTextRef.current.style.transition = "1s";
    shadeRef.current.style.transition = "1s ease-in-out";
  };

  // --- Form Submission Handlers ---
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating your account...");

    if (signupData.password !== signupData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/register/', {
        username: signupData.username,
        email: signupData.email,
        phone_number: signupData.phone_number,
        password: signupData.password,
      });

      setMessage("Account created! Logging you in...");
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
          username: signupData.username,
          password: signupData.password,
      });

      if (response.data.access) {
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
          login(response.data.access);
          setMessage("✅ Signed up and logged in successfully!");
          setTimeout(() => navigate("/"), 1000);
          setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      }

    } catch (error) {
      console.error("Signup or Login failed:", error.response?.data);
      if (error.response && error.response.data.username) {
        setMessage(`❌ Error: ${error.response.data.username[0]}`);
      } else {
        setMessage("❌ Registration failed. Please try again.");
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: loginData.identifier,
        password: loginData.password,
      });

      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        login(response.data.access);
        setMessage("✅ Logged in successfully!");
        setTimeout(() => navigate("/"), 1000);
        setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      }

    } catch (error) {
      console.error("Login failed:", error.response?.data);
      setMessage("❌ Incorrect details. Please try again.");
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Disable the button
    
    // Instantly show the success message
    setMessage("✅ If an account exists, a reset link has been sent to your email.");

    // Send the request in the background
    axios.post('http://127.0.0.1:8000/api/password-reset/', { email: resetEmail })
      .catch((error) => {
        console.error("Forgot password error:", error);
      });

    // Refresh the page after a short delay
    setTimeout(() => {
        window.location.reload();
    }, 1500);
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center font-sans"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <Navbar />

      <div className="relative w-[900px] h-[600px] rounded-2xl flex items-center justify-center backdrop-blur-md border-2 border-black overflow-hidden shadow-xl bg-transparent">
        <div className="flex relative gap-[10%] w-full h-full">

          {/* Sign Up Form */}
          <form onSubmit={handleSignupSubmit} className="w-1/2 p-8 flex flex-col justify-center gap-4">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <input
              type="text"
              placeholder="Full Name"
              value={signupData.name}
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
              required
              className="w-[15vw] border-b-2 border-black outline-none bg-transparent placeholder:text-black focus:border-b-[3px] transition"
            />
            <input
              type="text"
              placeholder="Username"
              value={signupData.username}
              onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
              required
              className="w-[15vw] border-b-2 border-black outline-none bg-transparent placeholder:text-black focus:border-b-[3px] transition"
            />
            <input
              type="email"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              required
              className="w-[15vw] border-b-2 border-black outline-none bg-transparent placeholder:text-black focus:border-b-[3px] transition"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={signupData.phone_number}
              onChange={(e) => setSignupData({ ...signupData, phone_number: e.target.value })}
              required
              className="w-[15vw] border-b-2 border-black outline-none bg-transparent placeholder:text-black focus:border-b-[3px] transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              required
              className="w-[15vw] border-b-2 border-black outline-none bg-transparent placeholder:text-black focus:border-b-[3px] transition"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
              required
              className="w-[15vw] border-b-2 border-black outline-none bg-transparent placeholder:text-black focus:border-b-[3px] transition"
            />
            <input
              type="submit"
              value="Sign Up"
              className="border border-black w-[8vw] py-[0.5vw] font-bold text-[1.2vw] rounded-lg mt-[2vw] hover:cursor-pointer active:scale-90 transition"
            />
          </form>

          {/* Login Form & Forgot Password Form Container */}
          <div className="w-1/2 p-8 flex flex-col justify-center gap-4">
            {showForgotPassword ? (
              // Forgot Password Form
              <div>
                <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
                <form onSubmit={handleForgotPasswordSubmit} className="flex flex-col gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="w-[15vw] border-b-2 border-black outline-none bg-transparent placeholder:text-black focus:border-b-[3px] transition"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="border border-black w-[10vw] py-2 font-bold rounded-lg mt-4 hover:cursor-pointer active:scale-90 transition disabled:opacity-50"
                  >
                    {isLoading ? "Sending..." : "Send Link"}
                  </button>
                  <button
                    type="button" // This prevents the form from submitting
                    onClick={() => setShowForgotPassword(false)}
                    className="text-sm text-center mt-2 hover:underline"
                  >
                    Back to Login
                  </button>
                </form>
              </div>
            ) : (
              // Login Form
              <form onSubmit={handleLoginSubmit} className="flex flex-col justify-center gap-4">
                <h1 className="text-3xl font-bold">Login</h1>
                <input
                  type="text"
                  placeholder="Username / E-Mail"
                  value={loginData.identifier}
                  onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
                  required
                  className="w-[15vw] border-b-2 border-black outline-none bg-transparent placeholder:text-black focus:border-b-[3px] transition"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  className="w-[15vw] border-b-2 border-black outline-none bg-transparent placeholder:text-black focus:border-b-[3px] transition"
                />
                <input
                  type="submit"
                  value="Login"
                  className="border border-black w-[8vw] py-[0.5vw] font-bold text-[1.2vw] rounded-lg mt-[2vw] hover:cursor-pointer active:scale-90 transition"
                />
                <button
                  type="button" // This prevents the form from submitting
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-center mt-2 hover:underline"
                >
                  Forgot Password?
                </button>
              </form>
            )}
          </div>

          {/* Shade Panel */}
          <div
            ref={shadeRef}
            className="absolute w-full h-full rounded-[100px] bg-gradient-to-br from-[#d4fc79] to-[#96e6a1] flex flex-row gap-[25%] pl-[10%] pt-[10%] text-center left-[-58%]"
          >
            <div ref={loginTextRef} className="hidden text-[blueviolet] mt-[5em]">
              <p className="text-[2.8vw] font-bold">Welcome Back!</p>
              <p className="font-medium">Already have an account?</p>
              <button
                type="button"
                className="mt-[1vw] h-[2.7vw] w-[7vw] rounded-lg border border-[blueviolet] text-[blueviolet] active:scale-90 transition"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div ref={signTextRef} className="ml-[59.5%] text-[blueviolet] mt-[5em]">
              <p className="text-[2.8vw] font-bold">Hi, Welcome!</p>
              <p className="font-medium">Don't have account?</p>
              <button
                type="button"
                className="mt-[1vw] h-[2.7vw] w-[7vw] rounded-lg border border-[blueviolet] text-[blueviolet] active:scale-90 transition"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback message */}
      {message && (
        <p className="absolute bottom-4 text-center text-lg font-medium text-white bg-black bg-opacity-60 px-4 py-2 rounded-lg">
          {message}
        </p>
      )}
    </div>
  );
}
