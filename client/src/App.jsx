// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages
import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';
import Contact from './pages/Contact';
import BlogPage from './pages/BlogPage';
import About from './pages/About';
import Explore from './pages/Explore';
import UserProfile from './pages/UserProfile';
import Navbar from './pages/Navbar';
import ResetPassword from './pages/ResetPassword'; // ✅ Corrected import

// Import your context and protected route component
import { AuthProvider } from "./AuthContext.jsx";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* ====================================================== */}
          {/* PUBLIC ROUTES                                        */}
          {/* ====================================================== */}
          <Route path="/" element={<Home />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogpage" element={<BlogPage />} />
          <Route path="/about" element={<About />} />
          {/* ✅ Corrected route path with dynamic parameters */}
          <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />

          {/* ====================================================== */}
          {/* PROTECTED ROUTES                                     */}
          {/* ====================================================== */}
          <Route element={<ProtectedRoute />}>
            <Route path="/explore" element={<Explore />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Route>
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
