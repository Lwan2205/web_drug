const express = require('express');
const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategoryId,
    getProductsByCategoryName,
    getProductsByBrandId,
    getProductDiscount,
    getRelatedProduct,
    getAllProductDiscount
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const cloudinaryFileUploader = require('../middleware/FileUploader');

const router = express.Router();

// Lấy tất cả sản phẩm
router.get('/', getAllProducts);


//Lây sản tât ca sản phẩm giảm giá

router.get('/allDiscout', getAllProductDiscount)

router.get('/discount', getProductDiscount);

// Tìm kiếm sản phẩm theo tên danh mục
router.get('/category/search', getProductsByCategoryName);

// Lấy chi tiết sản phẩm theo ID
router.get('/:id', getProductById);

// Lấy sản phẩm theo ID Category
router.get('/category/:categoryId', getProductsByCategoryId);

//Lay san pham liên quan
router.get('/related/:productId', getRelatedProduct)

// Lấy sản phẩm theo ID Brand
router.get('/brands/:brandId', getProductsByBrandId);


// Thêm sản phẩm (chỉ admin) và hỗ trợ upload ảnh
router.post('/add', protect, admin, cloudinaryFileUploader.single('image'), addProduct);

// Cập nhật sản phẩm (chỉ admin) và hỗ trợ upload ảnh
router.put('/:id', protect, admin, cloudinaryFileUploader.single('image'), updateProduct);

// Xóa sản phẩm (chỉ admin)
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
