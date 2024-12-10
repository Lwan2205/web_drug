// ForgotPassword.js
import React, { useState } from 'react';
import '../assets/css/ForgotPassword.css'
import Box from '@mui/material/Box';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        // <div className="forgot-password-container">
        //     <h2 className="forgot-password-title">Forgot Password</h2>
        //     <form onSubmit={handleForgotPassword}>
        //         <input
        //             type="email"
        //             className="forgot-password-input"
        //             placeholder="Enter your email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             required
        //         />
        //         <button type="submit" className="forgot-password-button">Send Reset Link</button>
        //     </form>
        //     {message && <p className="forgot-password-message">{message}</p>}
        // </div>
        <Box sx={{ width: '80%', margin: '50px auto' }}>
            <form style={{
                width: '100%',
                maxWidth: '300px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }} onSubmit={handleForgotPassword}>
                <input
                    type="email"
                    className="forgot-password-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button style={{
                    maxWidth: '150px',
                    width: '100%',
                }} type="submit" className="forgot-password-button">Send Reset Link</button>
            </form>
            {message && <p className="forgot-password-message">{message}</p>}
        </Box>
    );
};
export default ForgotPassword;
