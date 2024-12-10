import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import UpdateCategoryModal from '../component/UpdateCategoryModal';
import '../assets/css/CategoryList.css';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MdModeEdit, MdDelete, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import moment from 'moment';
import Pagination from '../component/Pagination'; // Import Pagination component

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [totalPages, setTotalPages] = useState(1); // Track the total number of pages

    // Fetch categories with pagination
    const fetchCategories = async (page = 1) => {
        try {
            const response = await fetch(`${SummaryApi.category_list.url}?page=${page}&limit=6`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setCategories(data.data);
            setTotalPages(data.totalPages); // Set the total number of pages
        } catch (error) {
            toast.error("Error fetching categories.");
        }
    };

    useEffect(() => {
        fetchCategories(currentPage); // Fetch categories when component mounts or page changes
    }, [currentPage]);

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setIsUpdateModalOpen(true);
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            const response = await fetch(SummaryApi.deleteCategory(categoryId).url, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                toast.success("Category deleted successfully");
                fetchCategories(currentPage); // Refresh the current page
            } else {
                toast.error("Error deleting category.");
            }
        } catch (error) {
            toast.error("Error deleting category.");
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page); // Change the page and trigger fetch
    };

    return (
        <div className="category-list">
            <h2>Category List</h2>
            <Link className='add-button_admin' to={"/admin-panel/all-categories/add-category"}>Add Category</Link>
            {/* <div className="category-grid">
                {categories.map((category) => (
                    <div key={category._id} className="category-card">
                        <h3>{category.name}</h3>
                        <p>Description: {category.description}</p>
                        <button onClick={() => handleEditCategory(category)}>Edit</button>
                        <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                    </div>
                ))}
            </div> */}

            <Box sx={{ margin: '20px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: '700' }} align='left'>Sr.</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center"> Name</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Description</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Featured</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Created Date</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                categories && categories.length && categories.map((category, index) => (
                                    <TableRow key={category._id}>
                                        <TableCell align='center'>
                                            <p>{(currentPage - 1) * 10 + index + 1}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{category.name}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{category.description}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{category.isFeatured ? <MdOutlineCheckBox style={{ color: 'green' }} /> : <MdOutlineCheckBoxOutlineBlank style={{ color: '#ccc' }} />}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{moment(category.createdAt).format('LL')}</p>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{
                                                display: 'flex',
                                                columnGap: '5px',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <MdModeEdit className='edit-admin_button' onClick={() => handleEditCategory(category)} />
                                                <MdDelete className='remove-admin_button' onClick={() => handleDeleteCategory(category._id)}>
                                                </MdDelete>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {isUpdateModalOpen && (
                <UpdateCategoryModal
                    category={selectedCategory}
                    onClose={() => setIsUpdateModalOpen(false)}
                    onUpdate={fetchCategories}
                />
            )}
        </div>
    );
};

export default CategoryList;
