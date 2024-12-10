import React, { useEffect, useState, useContext, } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Pagination from './Pagination';
import { useDispatch } from 'react-redux';
import Context from '../context';
import '../assets/css/ProductList.css';

const ProductList = () => {
    const { categoryId } = useParams(); // Lấy categoryId từ URL
    const [products, setProducts] = useState([]); // State để lưu danh sách sản phẩm
    const [currentPage, setCurrentPage] = useState(1); // State cho trang hiện tại
    const [totalPages, setTotalPages] = useState(1); // State cho tổng số trang
    const productsPerPage = 8; // Số sản phẩm mỗi trang
    const navigate = useNavigate(); // Hook điều hướng
    const dispatch = useDispatch(); // Dùng để gọi action
    const { fetchUserAddToCart } = useContext(Context)

    // Hàm xử lý khi người dùng nhấn vào một sản phẩm
    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`); // Điều hướng đến trang chi tiết sản phẩm
    };

    // Hàm thêm sản phẩm vào giỏ hàng
    const handleAddToCart = (product) => {



        // Gọi API để xử lý thêm sản phẩm vào giỏ hàng
        fetch(SummaryApi.addToCart.url, {
            method: SummaryApi.addToCart.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: product._id,
                quantity: 1, // Số lượng mặc định là 1
            }),
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    fetchUserAddToCart()
                    toast.success('Sản phẩm đã được thêm vào giỏ hàng');
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
                toast.error('Không thể thêm sản phẩm vào giỏ hàng');
            });
    };

    // Gọi API để lấy danh sách sản phẩm dựa trên categoryId
    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/products/category/${categoryId}?page=${currentPage}&limit=${productsPerPage}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();

                if (data.success) {
                    setProducts(data.data); // Cập nhật state với danh sách sản phẩm
                    setTotalPages(data.totalPages); // Cập nhật tổng số trang
                } else {
                    toast.error(data.message); // Hiển thị thông báo lỗi nếu có
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                toast.error('Failed to fetch products'); // Hiển thị thông báo lỗi nếu không thể lấy dữ liệu
            }
        };

        fetchProductsByCategory(); // Gọi hàm lấy sản phẩm khi component được render
    }, [categoryId, currentPage]); // Chạy lại khi categoryId hoặc currentPage thay đổi

    return (
        <div className="product-list-container">
            <h2>Danh sách sản phẩm</h2>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div
                            key={product._id}
                            className="product-card"
                            onClick={() => handleProductClick(product._id)}
                        >
                            <img
                                src={`${product.images}`}
                                alt={product.description}
                                className="product-image"
                            />
                            <p className="product-name">{product.name}</p>
                            <p className="product-price">{product.price.toLocaleString()} đ</p>
                            <button
                                className="buy-button"
                                onClick={(e) => {
                                    e.stopPropagation(); // Ngăn chặn sự kiện click trên thẻ cha
                                    handleAddToCart(product);
                                }}
                            >
                                Chọn mua
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Không có sản phẩm nào được tìm thấy.</p> // Hiển thị khi không có sản phẩm
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default ProductList;
