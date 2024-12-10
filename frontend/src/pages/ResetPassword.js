// ResetPassword.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/css/ResetPassword.css'; // Đảm bảo không bị trùng lặp với các component khác

const ResetPassword = () => {
    const { resetToken } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/api/auth/reset-password/${resetToken}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword })
            });

            const data = await response.json();
            setMessage(data.message);

            if (data.message === 'Mật khẩu đã được đặt lại thành công') {
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            setMessage('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Đặt Lại Mật Khẩu</h2>
            <form onSubmit={handleResetPassword}>
                <input
                    type="password"
                    className="reset-password-input"
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit" className="reset-password-button">Đặt Lại Mật Khẩu</button>
            </form>
            {message && <p className="reset-password-message">{message}</p>}
        </div>
    );
};

export default ResetPassword;
