import React, { useEffect, useState } from "react";
import "../assets/css/PaymentStatus.css";

const PaymentStatus = () => {
    const [status, setStatus] = useState("processing"); // Trạng thái thanh toán
    const [message, setMessage] = useState("Vui lòng đợi trong giây lát.");
    const apiEndpoint = "http://localhost:8000/api/payments/vnpay_return"; // URL API Backend

    useEffect(() => {
        const queryString = window.location.search; // Lấy query string từ URL

        const fetchPaymentStatus = async () => {
            try {
                const response = await fetch(apiEndpoint + queryString, {
                    method: "GET",
                });
                const result = await response.json();

                if (response.ok) {
                    setStatus("success");
                    setMessage(result.message || "Cảm ơn bạn đã mua hàng!");
                } else {
                    setStatus("failed");
                    setMessage(result.message || "Thanh toán thất bại. Vui lòng thử lại.");
                }
            } catch (error) {
                setStatus("failed");
                setMessage("Đã xảy ra lỗi. Vui lòng thử lại sau.");
                console.error("Error:", error);
            }
        };

        fetchPaymentStatus();
    }, [apiEndpoint]);

    return (
        <div className="payment-status-container">
            <h1
                className={`payment-status-heading ${status === "success" ? "payment-status-success" : "payment-status-failed"
                    }`}
            >
                {status === "processing"
                    ? "Đang xử lý..."
                    : status === "success"
                        ? "Thanh toán thành công!"
                        : "Thanh toán thất bại!"}
            </h1>
            <p className="payment-status-message">{message}</p>
            <a href="/" className="payment-status-btn">
                Quay lại trang chủ
            </a>
        </div>
    );
};

export default PaymentStatus;
