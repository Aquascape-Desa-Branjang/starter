// src/component/Pagination.js
import React from 'react';
import kanan from "../ikon/kanan.png";
import kiri from "../ikon/kiri.png";

const Pagination = ({ currentPage, onPageChange }) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-3">
      {/* Tombol Kiri */}
      <button
        className="w-10 h-10 flex items-center justify-center bg-transparent rounded-full hover:bg-gray-100"
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label="Previous Page"
        disabled={currentPage === 1}
      >
        <img src={kiri} alt="Previous" className="w-4 h-6" />
      </button>

      {/* Page Numbers */}
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600`}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600`}
        onClick={() => handlePageChange(2)}
      >
        2
      </button>
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600`}
        onClick={() => handlePageChange(3)}
      >
        3
      </button>

      {/* Tombol Kanan */}
      <button
        className="w-10 h-10 flex items-center justify-center bg-transparent rounded-full hover:bg-gray-100"
        onClick={() => handlePageChange(currentPage + 1)}
        aria-label="Next Page"
        disabled={currentPage === 3}
      >
        <img src={kanan} alt="Next" className="w-4 h-6" />
      </button>
    </div>
  );
};

export default Pagination;
