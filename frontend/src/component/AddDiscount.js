import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common'; // API URLs for different actions
import '../assets/css/AddDiscount.css';
import { useNavigate } from 'react-router-dom';

const AddDiscount = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        code: '',
        discountPercent: '',
        startDate: '',
        endDate: ''
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddDiscount = async () => {
        try {
            const response = await fetch(SummaryApi.addDiscount.url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate("/admin-panel/all-discounts")
                toast.success("Discount added successfully");
                onAdd();
                onClose();

            } else {
                toast.error("Error adding discount.");
            }
        } catch (error) {
            toast.error("Error adding discount.");
        }
    };

    return (
        <div className="add-discount-modal">
            <h2>Add Discount</h2>
            <input type="text" name="code" value={formData.code} onChange={handleChange} placeholder="Discount Code" />
            <input type="number" name="discountPercent" value={formData.discountPercent} onChange={handleChange} placeholder="Discount Percentage" />
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="Start Date" />
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} placeholder="End Date" />
            <button onClick={handleAddDiscount}>Add</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default AddDiscount;
