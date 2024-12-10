import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import '../assets/css/AddManufacturer.css';
import { useNavigate } from 'react-router-dom';

const AddManufacturer = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        contactInfo: '',
        image: null,
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleAddManufacturer = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('country', formData.country);
        formDataToSend.append('contactInfo', formData.contactInfo);
        if (formData.image) formDataToSend.append('image', formData.image);

        try {
            const response = await fetch(SummaryApi.addManufacturer.url, {
                method: 'POST',
                credentials: 'include',
                body: formDataToSend,
            });

            if (response.ok) {
                toast.success("Manufacturer added successfully");
                navigate('/admin-panel/all-manufactures')
                onAdd();
                onClose();
            } else {
                toast.error("Error adding manufacturer.");
            }
        } catch (error) {
            toast.error("Error adding manufacturer.");
        }
    };

    return (
        <div className="add-manufacturer-modal">
            <h2>Add Manufacturer</h2>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
            <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="Contact Info" />
            <input type="file" name="image" onChange={handleImageChange} />
            <button onClick={handleAddManufacturer}>Add</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default AddManufacturer;
