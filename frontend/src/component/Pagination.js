import React from 'react';

    const Pagination = ({ currentPage, totalPages, onPageChange }) => {
        return (
            <div className="pagination">
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Trang trước
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Trang sau
                </button>
            </div>
        );
    };

export default Pagination;
