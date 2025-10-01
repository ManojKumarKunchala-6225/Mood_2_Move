// src/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This effect runs once when the app loads. It checks for the
  // access token to determine if the user is already logged in.
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // This function will be called from your LoginSignup page
  // to update the global state and tell the Navbar to change the icon.
  const login = () => {
    setIsLoggedIn(true);
  };

  // This function will be called from your UserProfile page
  // to log the user out and update the Navbar icon.
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// You can create a custom hook to make it easier to use this context
export const useAuth = () => {
    return useContext(AuthContext);
}
