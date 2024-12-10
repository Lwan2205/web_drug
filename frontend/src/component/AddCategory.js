import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import '../assets/css/AddCategory.css';
import { useNavigate } from 'react-router-dom';

const AddCategory = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        slug: '', // Thêm slug vào formData
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddCategory = async () => {
        try {
            const response = await fetch(SummaryApi.addCategory.url, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                toast.success("Category added successfully");
                navigate('/admin-panel/all-categories');
                onAdd();
                onClose();
            } else {
                toast.error("Error adding category.");
            }
        } catch (error) {
            toast.error("Error adding category.");
        }
    };

    return (
        <div className="add-category-modal">
            <h2>Add Category</h2>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Category Name"
            />
            <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="Slug" // Thêm trường input cho slug
            />
            <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <div className='add-category_button_general'>
                <button onClick={handleAddCategory}>Add</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default AddCategory;
