import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '../assets/css/UserProfile.css';
import SummaryApi from '../common';
import { Box, Button, FormControl, TextField } from '@mui/material';

const UserProfile = () => {
    const [user, setUser] = useState({
        userId: '',  // Thêm userId để gửi lên server
        name: '',
        email: '',
        phoneNumber: '',
        address: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: ''
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(SummaryApi.current_user.url, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();

                if (data && data.success && data.data) {
                    setUser({
                        userId: data.data._id, // Gán userId từ API
                        name: data.data.username,
                        email: data.data.email,
                        phoneNumber: data.data.phoneNumber,
                        address: data.data.address,
                    });
                    setUpdatedInfo({
                        name: data.data.username,
                        phoneNumber: data.data.phoneNumber,
                        address: data.data.address
                    });
                } else {
                    toast.error("Failed to fetch user profile.");
                }
            } catch (error) {
                toast.error("Error fetching user profile.");
            }
        };
        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInfo({ ...updatedInfo, [name]: value });
    };

    const handleSave = async () => {
        try {
            // Thêm userId vào updatedInfo để gửi lên server
            const updatedData = {
                userId: user.userId,
                username: updatedInfo.name, // map field 'name' to 'username'
                email: user.email, // Email sẽ không thay đổi
                phoneNumber: updatedInfo.phoneNumber,
                address: updatedInfo.address,
            };

            const response = await fetch(SummaryApi.updateUser.url, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            const data = await response.json();
            if (data.success) {
                setUser({
                    ...user,
                    name: updatedInfo.name,
                    phoneNumber: updatedInfo.phoneNumber,
                    address: updatedInfo.address
                });
                setIsEditing(false);
                toast.success("Profile updated successfully.");
            } else {
                toast.error("Error updating profile.");
            }
        } catch (error) {
            toast.error("Error updating profile.");
        }
    };

    return (
        <div>
            {/* <div className="profile-info">
                <p><strong>Họ và tên:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Số điện thoại:</strong> {user.phoneNumber}</p>
                <p><strong>Địa chỉ:</strong> {user.address}</p>
                <button onClick={handleEditClick}>Chỉnh sửa thông tin</button>
            </div> */}
            <h2>Thông tin cá nhân</h2>

            <Box sx={{ margin: '50px auto', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '30%', paddingBottom: '20px', borderBottom: '0.5px solid #ccc', marginBottom: '50px' }}>
                    <div>
                        Họ và tên
                    </div>
                    <div style={{ fontWeight: '600' }}>
                        {user.name}
                    </div>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '30%', paddingBottom: '20px', borderBottom: '0.5px solid #ccc', marginBottom: '50px' }}>
                    <div>
                        Email
                    </div>
                    <div style={{ fontWeight: '600' }}>
                        {user.email}
                    </div>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '30%', paddingBottom: '20px', borderBottom: '0.5px solid #ccc', marginBottom: '50px' }}>
                    <div>
                        Số điện thoại
                    </div>
                    <div style={{ fontWeight: '600' }}>
                        {user.phoneNumber}
                    </div>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '30%', paddingBottom: '20px', borderBottom: '0.5px solid #ccc', marginBottom: '50px' }}>
                    <div style={{ width: '70%' }}>
                        Địa chỉ
                    </div>
                    <div style={{ fontWeight: '600' }}>
                        {user.address}
                    </div>
                </Box>
                <Button style={{ background: '#1250dc', color: 'white' }} onClick={handleEditClick}>Chỉnh sửa thông tin</Button>
            </Box>

            {/* Hiển thị bảng cập nhật thông tin khi nhấn vào "Chỉnh sửa thông tin" */}
            {isEditing && (
                <div className="edit-profile-modal">
                    <h3>Cập nhật thông tin</h3>
                    <label>
                        Họ và tên:
                        <input
                            type="text"
                            name="name"
                            value={updatedInfo.name || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="text"
                            name="email"
                            value={user.email || ''}
                            disabled // Không cho phép chỉnh sửa email
                        />
                    </label>
                    <label>
                        Số điện thoại:
                        <input
                            type="text"
                            name="phoneNumber"
                            value={updatedInfo.phoneNumber || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Địa chỉ:
                        <input
                            type="text"
                            name="address"
                            value={updatedInfo.address || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <button onClick={handleSave}>Lưu</button>
                    <button onClick={() => setIsEditing(false)}>Hủy</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
