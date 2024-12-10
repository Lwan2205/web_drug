import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import '../assets/css/OrderList.css';
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
import { MdDelete } from "react-icons/md";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchOrders = async (page = 1) => {
        try {
            const response = await fetch(`${SummaryApi.all_order.url}?page=${page}&limit=6`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setOrders(data.data);
            setTotalPages(data.totalPages); // Set total pages from the API response
        } catch (error) {
            toast.error("Error fetching orders.");
        }
    };

    const toDetailPage = (id) => {
        navigate(`/orders/${id}`);
    };

    useEffect(() => {
        fetchOrders(currentPage); // Fetch orders when component mounts or page changes
    }, [currentPage]);

    const cancelOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${orderId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await response.json();
            if (response.status === 200) {
                toast.success(data.message);
                setOrders(orders.filter(order => order._id !== orderId));  // Remove canceled order from the list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error canceling order.");
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="order-list-container">
            <h2>All Orders</h2>

            <Box sx={{ margin: '20px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: '700' }} align='center'>Order Id</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center"> Status</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Total Price</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Created Date</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orders && orders.length && orders.map((order, index) => (
                                    <TableRow key={order._id} sx={{ cursor: 'pointer' }}>
                                        <TableCell align='center'>
                                            <p>{order._id}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{order.status}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{order.totalAmount}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{moment(order.createdAt).format('LL')}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            {/* Nút Chi Tiết */}
                                            <button
                                                onClick={() => toDetailPage(order._id)}
                                                className="view-details-button">
                                                Chi Tiết
                                            </button>

                                            {/* Nút Hủy */}
                                            <MdDelete
                                                className='remove-admin_button'
                                                onClick={() => cancelOrder(order._id)}
                                            />
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
        </div>
    );
};

export default OrderList;
