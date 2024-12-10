import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import "../assets/css/ChangeUseRole.css";

const ChangeUserRole = ({
    name,
    email,
    phoneNumber,
    address,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userDetails, setUserDetails] = useState({
        username: name,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        role: role,
        password: '' // Thêm trường mật khẩu nếu cần cập nhật
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const updateUserDetails = async () => {
        try {
            const response = await fetch(SummaryApi.updateUser.url, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    ...userDetails
                })
            });


            const data = await response.json();
            if (data.success) {
                // toast.success(data.message);
                callFunc(); // Refresh the user list
                onClose(); // Close the modal
            } else {
                toast.error("Failed to update user");
            }
        } catch (error) {
            toast.error("Error updating user.");
        }
    };

    return (
        <div className='modal-overlay'>
            <div className='modal-container'>
                <button className='modal-close-btn' onClick={onClose}>
                    <IoMdClose />
                </button>

                <h1 className='modal-title'>Update User</h1>
                <div className='input-group_container'>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={userDetails.username}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={userDetails.phoneNumber}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={userDetails.address}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label>Role</label>
                        <select
                            name="role"
                            value={userDetails.role}
                            onChange={handleChange}
                            className="role-select"
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Password (Optional)</label>
                        <input
                            type="password"
                            name="password"
                            value={userDetails.password}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>
                </div>

                <button className='change-role-btn' onClick={updateUserDetails}>
                    Update User
                </button>
            </div>
        </div>
    );
};

export default ChangeUserRole;
