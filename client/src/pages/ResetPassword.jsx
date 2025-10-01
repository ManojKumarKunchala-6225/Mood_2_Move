// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const { uidb64, token } = useParams(); // Get params from URL
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        setMessage("Resetting password...");

        try {
            await axios.post(`http://127.0.0.1:8000/api/password-reset-confirm/${uidb64}/${token}/`, { password });
            setMessage("✅ Password reset successfully! Redirecting to login...");
            setTimeout(() => navigate('/loginsignup'), 2000);
        } catch (error) {
            // ✅ Log the full error to the console for debugging
            console.error("Password reset failed:", error);

            // Check if the server sent a specific error message
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(`❌ ${error.response.data.error}`);
            } else {
                // Otherwise, show a generic message
                setMessage("❌ Failed to reset password. The link may be invalid or expired.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
            <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center">Set a New Password</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label>New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border rounded-md"
                        />
                    </div>
                    <div>
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full p-3 border rounded-md"
                        />
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-red-600 text-white rounded-md">
                        Reset Password
                    </button>
                </form>
                {message && <p className="text-center mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
