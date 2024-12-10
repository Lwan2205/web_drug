import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import '../assets/css/UpdateManufacturerModal.css';

const UpdateManufacturerModal = ({ manufacturer, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: manufacturer?.name || '',
        country: manufacturer?.country || '',
        contactInfo: manufacturer?.contactInfo || '',
        image: null,
    });

    useEffect(() => {
        if (manufacturer) {
            setFormData({
                name: manufacturer.name,
                country: manufacturer.country,
                contactInfo: manufacturer.contactInfo,
                image: null,
            });
        }
    }, [manufacturer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleUpdateManufacturer = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('country', formData.country);
        formDataToSend.append('contactInfo', formData.contactInfo);
        if (formData.image) formDataToSend.append('image', formData.image);

        try {
            const response = await fetch(SummaryApi.updateManufacturer(manufacturer._id).url, {
                method: 'PUT',
                credentials: 'include',
                body: formDataToSend,
            });

            if (response.ok) {
                toast.success("Manufacturer updated successfully");
                onUpdate();
                onClose();
            } else {
                toast.error("Error updating manufacturer.");
            }
        } catch (error) {
            toast.error("Error updating manufacturer.");
        }
    };

    return (
        <div className="update-manufacturer-modal">
            <h2>Update Manufacturer</h2>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
            <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="Contact Info" />
            <input type="file" name="image" onChange={handleImageChange} />
            <button onClick={handleUpdateManufacturer}>Update</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default UpdateManufacturerModal;
