import React, { useState, useEffect } from 'react';
import '../assets/css/UserOrders.css'; // Đảm bảo bạn có file CSS này để định dạng
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/orders', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Có lỗi xảy ra khi tải đơn hàng');
                }

                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (error) {
                setError(error.message || 'Có lỗi xảy ra');
                setLoading(false);
            }
        };

        fetchUserOrders();
    }, []);

    if (loading) {
        return <p>Đang tải...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        // <div className="user-orders">
        //     <h2>Danh sách đơn hàng của bạn</h2>
        //     {orders.length > 0 ? (
        //         <ul className="order-list">
        //             {orders.map((order) => (
        //                 <li key={order._id} className="order-item">
        //                     <p><strong>Mã đơn hàng:</strong> {order._id}</p>
        //                     <p><strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        //                     <p><strong>Tổng tiền:</strong> {order.totalAmount.toLocaleString()} đ</p>
        //                     <p><strong>Trạng thái:</strong> {order.status}</p>
        //                 </li>
        //             ))}
        //         </ul>
        //     ) : (
        //         <p>Bạn chưa có đơn hàng nào.</p>
        //     )}
        // </div>

        <Box sx={{ margin: '20px' }}>
            {
                orders.length === 0 ? <p style={{ textAlign: 'center' }}>Bạn chưa có đơn hàng nào.</p> : <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: '700' }} align='center'>Order Id</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center"> Status</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Total Price</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Order Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orders && orders.length && orders.map((order, index) => (
                                    <TableRow key={order._id}>
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
                                            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Box>

    );
};

export default UserOrders;
