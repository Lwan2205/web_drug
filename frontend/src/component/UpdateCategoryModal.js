import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import '../assets/css/UpdateCategoryModal.css';

const UpdateCategoryModal = ({ category, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: category?.name || '',
        description: category?.description || '',
    });

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                description: category.description,
            });
        }
    }, [category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateCategory = async () => {
        try {
            const response = await fetch(SummaryApi.updateCategory(category._id).url, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                toast.success("Category updated successfully");
                onUpdate();
                onClose();
            } else {
                toast.error("Error updating category.");
            }
        } catch (error) {
            toast.error("Error updating category.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="update-category-modal">
                <h2>Update Category</h2>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Category Name" />
                <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                <div className="modal-buttons">
                    <button onClick={handleUpdateCategory}>Update</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategoryModal;
