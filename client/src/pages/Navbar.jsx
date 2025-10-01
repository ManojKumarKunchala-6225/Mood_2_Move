// src/pages/Navbar.jsx
import React, { useEffect, useState, useContext } from "react";
import { FaUser, FaSignInAlt, FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icons
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for hamburger menu

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <nav className="flex items-center justify-between p-2 mx-auto max-w-screen transition-colors duration-500 bg-white/10 backdrop-blur-md">
        
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo.png"
            alt="Mood2Move Logo"
            className="w-12 h-12 rounded-full"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/50x50/FFFFFF/000000?text=M2M";
            }}
          />
          <span className="font-bold text-xl sm:text-2xl tracking-wider">Mood2Move</span>
        </div>

        {/* Desktop Links - Hidden on mobile/tablet */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white transition-all duration-300 hover:text-blue-500 hover:scale-110">Home</Link>
          <Link to="/about" className="text-white transition-all duration-300 hover:text-blue-500 hover:scale-110">About</Link>
          <Link to="/contact" className="text-white transition-all duration-300 hover:text-blue-500 hover:scale-110">Contact</Link>
          <Link to="/blogpage" className="text-white transition-all duration-300 hover:text-blue-500 hover:scale-110">Blog</Link>
        </div>

        {/* Auth Section & Hamburger Menu Icon */}
        <div className="flex items-center gap-4">
          {/* Auth Icons (always visible) */}
          <div className="flex justify-end gap-3">
            {isLoggedIn ? (
              <div className="relative group">
                <FaUser
                  className="text-white/80 hover:text-blue-500 cursor-pointer text-xl transition-transform duration-300 hover:scale-110"
                  onClick={() => navigate("/userprofile")}
                  title="User Profile"
                />
              </div>
            ) : (
              <FaSignInAlt
                className="text-white/80 hover:text-blue-500 cursor-pointer text-xl transition-transform duration-300 hover:scale-110"
                onClick={() => navigate("/loginsignup")}
                title="Login / Sign Up"
              />
            )}
          </div>
          
          {/* Hamburger Icon - Only visible on mobile/tablet */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <FaTimes className="text-white text-2xl" />
              ) : (
                <FaBars className="text-white text-2xl" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Only shows when isMobileMenuOpen is true */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md">
          <Link to="/" className="block text-white text-center py-2 hover:bg-white/20" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" className="block text-white text-center py-2 hover:bg-white/20" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link to="/contact" className="block text-white text-center py-2 hover:bg-white/20" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link to="/blogpage" className="block text-white text-center py-2 hover:bg-white/20" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
        </div>
      )}
    </header>
  );
}
