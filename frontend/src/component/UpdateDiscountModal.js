import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import '../assets/css/UpdateDiscountModal.css';

const UpdateDiscountModal = ({ discount, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        code: '',
        discountPercent: '',
        startDate: '',
        endDate: ''
    });

    // Initialize form with selected discount's data
    useEffect(() => {
        if (discount) {
            setFormData({
                code: discount.code || '',
                discountPercent: discount.discountPercent || '',
                startDate: discount.startDate ? discount.startDate.split('T')[0] : '',
                endDate: discount.endDate ? discount.endDate.split('T')[0] : ''
            });
        }
    }, [discount]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateDiscount = async () => {
        try {
            const response = await fetch(SummaryApi.updateDiscount(discount._id).url, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Discount updated successfully");
                onUpdate(); // Refresh the discount list
                onClose();  // Close the modal
            } else {
                toast.error("Error updating discount.");
            }
        } catch (error) {
            toast.error("Error updating discount.");
        }
    };

    return (
        <div className="update-discount-modal">
            <h2>Update Discount</h2>
            <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Discount Code"
            />
            <input
                type="number"
                name="discountPercent"
                value={formData.discountPercent}
                onChange={handleChange}
                placeholder="Discount Percentage"
            />
            <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="Start Date"
            />
            <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                placeholder="End Date"
            />
            <button onClick={handleUpdateDiscount}>Update</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default UpdateDiscountModal;
