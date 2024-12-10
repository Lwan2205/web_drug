import React from 'react';
import '../assets/css/FeaturedCategory.css'

const FeaturedCategories = () => {
    const categoriesData = [
        { id: 1, name: "Thần kinh não", productCount: 107, icon: "🧠" },
        { id: 2, name: "Vitamin & Khoáng chất", productCount: 211, icon: "💧" },
        { id: 3, name: "Sức khoẻ tim mạch", productCount: 44, icon: "❤️" },
        { id: 4, name: "Tăng sức đề kháng, miễn dịch", productCount: 74, icon: "🛡️" },
        { id: 5, name: "Hỗ trợ tiêu hóa", productCount: 122, icon: "🍽️" },
        { id: 6, name: "Sinh lý - Nội tiết tố", productCount: 84, icon: "💊" },
        { id: 7, name: "Dinh dưỡng", productCount: 79, icon: "🥗" },
        { id: 8, name: "Hỗ trợ điều trị", productCount: 197, icon: "🩺" },
        { id: 9, name: "Giải pháp làm da", productCount: 88, icon: "💄" },
        { id: 10, name: "Chăm sóc da mặt", productCount: 165, icon: "🧴" },
        { id: 11, name: "Hỗ trợ làm đẹp", productCount: 49, icon: "💎" },
        { id: 12, name: "Hỗ trợ tình dục", productCount: 41, icon: "⏱️" },
    ];

    return (
        <div className="featured-categories-section">
            <h2 className="section-title">
                <span className="icon">🏆</span> Danh mục nổi bật
            </h2>
            <div className="categories-grid">
                {categoriesData.map((category) => (
                    <div className="category-card" key={category.id}>
                        <div className="category-icon">{category.icon}</div>
                        <h3 className="category-name">{category.name}</h3>
                        <p className="category-product-count">{category.productCount} sản phẩm</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCategories;
