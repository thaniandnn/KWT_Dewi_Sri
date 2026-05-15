import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-16">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-12 h-12 rounded-full border border-kwt-maroon/10 flex items-center justify-center text-kwt-maroon disabled:opacity-30 hover:bg-kwt-maroon hover:text-white transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-12 h-12 rounded-full font-bold text-sm transition-all ${
              currentPage === page
                ? 'bg-kwt-orange text-white shadow-lg'
                : 'text-kwt-maroon hover:bg-kwt-offwhite'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-12 h-12 rounded-full border border-kwt-maroon/10 flex items-center justify-center text-kwt-maroon disabled:opacity-30 hover:bg-kwt-maroon hover:text-white transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
