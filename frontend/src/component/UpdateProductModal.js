import React, { useState, useEffect } from 'react';
import '../assets/css/UpdateProductModal.css';
import SummaryApi from '../common';
import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import TextLabel from '@mui/material/FormLabel';

const UpdateProductModal = ({ product, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category?._id,
        discount: product.discount?._id,
        manufacturer: product.manufacturer?._id,
        stock: product.stock,
        images: '', // Bỏ giá trị URL, sẽ thay bằng file upload
        rating: product.rating,
        isFeatured: product.isFeatured,
    });

    const [selectedFile, setSelectedFile] = useState(null); // Lưu file ảnh khi người dùng chọn

    const [categories, setCategories] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [discounts, setDiscounts] = useState([]);

    // Fetch categories, manufacturers, and discounts
    useEffect(() => {

        const fetchData = async () => {
            const categoryResponse = await fetch(SummaryApi.category_list.url, { method: 'get', credentials: 'include' });
            const manufacturerResponse = await fetch(SummaryApi.all_manufacturers.url, { method: 'get', credentials: 'include' });
            const discountResponse = await fetch(SummaryApi.all_discount.url, { method: 'get', credentials: 'include' });
            const categories = await categoryResponse.json();
            const manufacturer = await manufacturerResponse.json();
            const discount = await discountResponse.json();

            setCategories(categories.data);
            setManufacturers(manufacturer.data);
            setDiscounts(discount.data);
            console.log(discount.data)
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]); // Lưu file vào state
    };

    const handleUpdateProduct = async () => {
        try {
            const form = new FormData(); // Tạo FormData để gửi dữ liệu kèm ảnh

            // Add các trường khác vào form
            for (const key in formData) {
                form.append(key, formData[key]);
            }

            // Thêm ảnh vào form
            if (selectedFile) {
                form.append('image', selectedFile); // Key 'image' phải trùng với backend
            }

            const response = await fetch(SummaryApi.update_product(product._id).url, {
                method: 'PUT',
                credentials: 'include',
                body: form, // Gửi FormData
            });

            const updateProduct = await response.json();
            if (updateProduct.success) {
                onUpdate();
            } else {
                console.error("Error updating product.");
            }
        } catch (error) {
            console.error("Error updating product.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 style={{ marginTop: '200px' }}>Update Product</h2>
                {/* <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" /> */}
                <FormControl fullWidth>
                    <TextField
                        sx={{ marginBottom: '20px', border: 'none' }}
                        type="text"
                        placeholder="Product Name"
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleChange}
                    ></TextField>
                </FormControl>
                {/* <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" /> */}

                <FormControl fullWidth>
                    <TextField
                        sx={{ marginBottom: '20px', border: 'none' }}
                        type="number"
                        name="price"
                        label="Price"
                        value={formData.price}
                        onChange={handleChange}
                    ></TextField>
                </FormControl>

                <FormControl sx={{ marginBottom: '20px', border: 'none' }} fullWidth>
                    <TextareaAutosize
                        sx={{ marginBottom: '20px', border: 'none' }}
                        type="text"
                        name="description"
                        label="Description"
                        placeholder='Description'
                        value={formData.description}
                        onChange={handleChange}
                    ></TextareaAutosize>
                </FormControl>

                {/* Select danh mục hiện tại */}
                {/* <div className="field-group">
                    <label>Current Category:</label>
                    <select name="category" value={formData.category} onChange={handleChange}>
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div> */}

                <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                    <InputLabel id="demo-simple-select-label">Current Category</InputLabel>
                    <Select
                        value={formData.category}
                        name="category"
                        label="Current Category"
                        onChange={handleChange}
                    >
                        {categories.map(category => (
                            <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Select giảm giá hiện tại */}
                {/* <div className="field-group">
                    <label>Current Discount:</label>
                    <select name="discount" value={formData.discount} onChange={handleChange}>
                        <option value="">Select Discount</option>
                        {discounts.map(disc => (
                            <option key={disc._id} value={disc._id}>{disc.code} - {disc.discountPercent}%</option>
                        ))}
                    </select>
                </div> */}
                <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                    <InputLabel id="demo-simple-select-label">Current Discount</InputLabel>
                    <Select
                        value={formData.discount}
                        name='discount'
                        label="Current Discount"
                        onChange={handleChange}
                    >
                        {discounts.map(disc => (
                            <MenuItem key={disc._id} value={disc._id}>{disc.code} - {disc.discountPercent}%</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Select nhà sản xuất hiện tại */}
                <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                    <InputLabel id="demo-simple-select-label">Current Manufacturer</InputLabel>
                    <Select
                        name="manufacturer"
                        value={formData.manufacturer}
                        label="Current Manufacturer"
                        onChange={handleChange}
                    >
                        {manufacturers.map(man => (
                            <MenuItem key={man._id} value={man._id}>{man.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <TextField

                        sx={{ marginBottom: '20px', border: 'none' }}
                        type="number"
                        name="stock"
                        label="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                    ></TextField>
                </FormControl>

                {/* File input cho ảnh */}
                <div className="field-group">
                    <label>Upload Image:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange} // Xử lý file
                    />
                </div>

                <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" />
                <label>
                    <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
                    Featured
                </label>
                <div className="modal-actions">
                    <button onClick={handleUpdateProduct}>Update</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div >
    );
};

export default UpdateProductModal;
