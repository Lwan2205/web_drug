import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import UpdateDiscountModal from '../component/UpdateDiscountModal';
import '../assets/css/DiscountList.css';
import { Link } from 'react-router-dom';
import Pagination from '../component/Pagination'; // Import Pagination component
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MdModeEdit, MdDelete } from "react-icons/md";
import moment from 'moment';

const DiscountList = () => {
    const [discounts, setDiscounts] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchDiscounts = async (page = 1) => {
        try {
            const response = await fetch(`${SummaryApi.getAllDiscounts.url}?page=${page}&limit=6`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setDiscounts(data.data);
            setTotalPages(data.totalPages); // Set total pages from the API response
        } catch (error) {
            toast.error("Error fetching discounts.");
        }
    };

    useEffect(() => {
        fetchDiscounts(currentPage); // Fetch discounts on initial load and when page changes
    }, [currentPage]);

    const handleEditDiscount = (discount) => {
        setSelectedDiscount(discount);
        setIsUpdateModalOpen(true);
    };

    const handleDeleteDiscount = async (discountId) => {
        try {
            const response = await fetch(SummaryApi.deleteDiscount(discountId).url, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                toast.success("Discount deleted successfully");
                fetchDiscounts(currentPage); // Refresh after deletion
            } else {
                toast.error("Error deleting discount.");
            }
        } catch (error) {
            toast.error("Error deleting discount.");
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="discount-list">
            <h2>Discount List</h2>
            <Link className='add-button_admin' to={"add-discount"}>Add Discount</Link>
            {/* <div className="discount-grid">
                {discounts.map((discount) => (
                    <div key={discount._id} className="discount-card">
                        <h3>Code: {discount.code}</h3>
                        <p>Percentage: {discount.discountPercent}%</p>
                        <p>Start Date: {new Date(discount.startDate).toLocaleDateString()}</p>
                        <p>End Date: {new Date(discount.endDate).toLocaleDateString()}</p>
                        <button onClick={() => handleEditDiscount(discount)}>Edit</button>
                        <button onClick={() => handleDeleteDiscount(discount._id)}>Delete</button>
                    </div>
                ))}
            </div> */}

            <Box sx={{ margin: '20px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: '700' }} align='left'>Id</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center"> Code</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Percentage</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Start Date</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">End Date</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Created Date</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                discounts && discounts.length >= 0 && discounts.map((discount, index) => (
                                    <TableRow key={discount._id}>
                                        <TableCell align='center'>
                                            <p>{discount._id}</p>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <p>{discount.code}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{discount.discountPercent} %</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{discount.startDate}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{discount.endDate}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{moment(discount.createdAt).format('LL')}</p>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{
                                                display: 'flex',
                                                columnGap: '5px',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <MdModeEdit className='edit-admin_button' onClick={() => {
                                                    handleEditDiscount(discount)
                                                }} />
                                                <MdDelete className='remove-admin_button' onClick={() => handleDeleteDiscount(discount._id)}>
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
                <UpdateDiscountModal
                    discount={selectedDiscount}
                    onClose={() => setIsUpdateModalOpen(false)}
                    onUpdate={fetchDiscounts}
                />
            )}
        </div>
    );
};

export default DiscountList;
