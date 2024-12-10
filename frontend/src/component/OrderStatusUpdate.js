import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { useNavigate } from 'react-router-dom';
import '../assets/css/OrderStatusUpdate.css';

const OrderStatusUpdate = ({ orderId, currentStatus }) => {
    const [status, setStatus] = useState(currentStatus);
    const navigate = useNavigate()

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleUpdateStatus = async () => {
        try {
            const response = await fetch(SummaryApi.update_order_status(orderId).url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ status }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success("Order status updated successfully");
                navigate("/admin-panel/all-orders")

            } else {
                toast.error(data.message || "Error updating order status");
            }
        } catch (error) {
            toast.error("Error updating order status.");
        }
    };

    return (
        <div className="order-status-update">
            <label>Update Status:</label>
            <select value={status} onChange={handleStatusChange}>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Canceled">Canceled</option>
            </select>
            <button onClick={handleUpdateStatus}>Update</button>
        </div>
    );
};

export default OrderStatusUpdate;
