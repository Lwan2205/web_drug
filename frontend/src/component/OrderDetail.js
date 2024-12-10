import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import OrderStatusUpdate from './OrderStatusUpdate';
import '../assets/css/OrderDetail.css';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await fetch(SummaryApi.get_order_by_id(id).url, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                setOrder(data);
            } catch (error) {
                toast.error("Error fetching order details.");
            }
        };
        fetchOrderDetail();
    }, [id]);

    if (!order) return <div>Loading...</div>;

    return (
        <div className="order-detail-container">
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
            <p><strong>Products:</strong></p>
            <ul>
                {order.products.map((product) => (
                    <li key={product.productId._id}>
                        {product.productId.name} - ${product.price} x {product.quantity}
                    </li>
                ))}
            </ul>

            {/* Component cập nhật trạng thái đơn hàng nếu là admin */}
            <OrderStatusUpdate orderId={order._id} currentStatus={order.status} />
        </div>
    );
};

export default OrderDetail;
