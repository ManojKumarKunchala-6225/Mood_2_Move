// src/pages/UserProfile.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true); // To show a loading message

  useEffect(() => {
    // This function runs when the component loads
    const fetchUserProfile = async () => {
      try {
        // Get the token from storage
        const token = localStorage.getItem("access_token");
        if (!token) {
          // If no token, redirect to login
          navigate("/loginsignup");
          return;
        }

        // Make an authenticated request to your new backend endpoint
        const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Save the fetched user data to state
        setUserProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // Handle error, e.g., redirect to login if token is invalid
        navigate("/loginsignup");
      } finally {
        setLoading(false); // Stop showing the loading message
      }
    };

    fetchUserProfile();
  }, [navigate]); // Dependency array

  const handleLogout = () => {
    // ✅ Correctly remove the tokens from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Redirect to homepage
    navigate("/");

    // Optional: reload to refresh navbar icon immediately
    window.location.reload();
  };

  // Show a loading message while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl">Loading profile...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <Navbar />
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg w-full max-w-3xl p-6">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src="/user.png" // Make sure this image exists in your public folder
            alt="User"
            className="h-32 w-32 rounded-full border-4 border-red-700 object-cover"
          />
        </div>

        {/* User Details */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-lg sm:text-xl mb-6">
            <tbody>
              <tr>
                <td className="py-2 font-semibold text-red-800">Username</td>
                <td className="py-2">{userProfile?.username || "Guest"}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-red-800">Email</td>
                <td className="py-2">{userProfile?.email || "N/A"}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-red-800">Mobile</td>
                <td className="py-2">{userProfile?.phone_number || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
            Edit
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
            Wishlist
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
            History
          </button>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;