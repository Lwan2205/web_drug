import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import "../assets/css/AddProduct.css";
import SummaryApi from '../common';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        discount: '',
        manufacturer: '',
        stock: 0,
        rating: 0,
        isFeatured: false,
        ingredients: '',
        usage: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const categoryResponse = await fetch(SummaryApi.category_list.url, {
                method: 'get',
                credentials: 'include'
            });
            const manufacturerResponse = await fetch(SummaryApi.all_manufacturers.url, {
                method: 'get',
                credentials: 'include'
            });
            const discountResponse = await fetch(SummaryApi.all_discount.url, {
                method: 'get',
                credentials: 'include'
            });
            const categories = await categoryResponse.json();
            const manufacturer = await manufacturerResponse.json();
            const discount = await discountResponse.json();

            setCategories(categories.data);
            setManufacturers(manufacturer.data);
            setDiscounts(discount.data);
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleAddProduct = async () => {
        const productData = new FormData();
        productData.append('name', formData.name);
        productData.append('price', formData.price);
        productData.append('description', formData.description);
        productData.append('category', formData.category);
        productData.append('discount', formData.discount);
        productData.append('manufacturer', formData.manufacturer);
        productData.append('stock', formData.stock); // Thêm stock vào FormData
        productData.append('rating', formData.rating);
        productData.append('isFeatured', formData.isFeatured);
        productData.append('ingredients', formData.ingredients);
        productData.append('usage', formData.usage);
        if (imageFile) {
            productData.append('image', imageFile);
        }

        try {
            const response = await fetch(SummaryApi.add_product.url, {
                method: 'POST',
                credentials: 'include',
                body: productData
            });
            if (response.ok) {
                toast.success("Product added successfully");
                setFormData({
                    name: '', price: '', description: '', category: '',
                    discount: '', manufacturer: '', stock: 0, rating: 0, isFeatured: false,
                    ingredients: '', usage: ''
                });
                setImageFile(null);
                navigate('/admin-panel/all-products')

            } else {
                toast.error("Error adding product.");
            }
        } catch (error) {
            toast.error("Error adding product.");
        }
    };

    return (
        <div className="add-product-container">
            <h2>Add Product</h2>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" />
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            <select name="category" value={formData.category} onChange={handleChange}>
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
            </select>
            <select name="discount" value={formData.discount} onChange={handleChange}>
                <option value="">Select Discount</option>
                {discounts.map(disc => <option key={disc._id} value={disc._id}>{disc.code} - {disc.discountPercent}%</option>)}
            </select>
            <select name="manufacturer" value={formData.manufacturer} onChange={handleChange}>
                <option value="">Select Manufacturer</option>
                {manufacturers.map(man => <option key={man._id} value={man._id}>{man.name}</option>)}
            </select>

            <input type="file" name="image" onChange={handleImageChange} />

            {/* Ô nhập liệu cho ingredients */}
            <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredients" />

            {/* Ô nhập liệu cho usage */}
            <textarea name="usage" value={formData.usage} onChange={handleChange} placeholder="Usage Instructions" />

            {/* Ô nhập liệu cho stock */}
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock Quantity" />

            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default AddProduct;
