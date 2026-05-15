import React from 'react';

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onFilterChange: (category: string) => void;
}

export const FilterBar = ({ categories, activeCategory, onFilterChange }: FilterBarProps) => {
  return (
    <div className="bg-kwt-offwhite py-8 border-y border-kwt-maroon/5 mb-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 border ${
              activeCategory === category
                ? 'bg-kwt-orange text-white border-kwt-orange shadow-lg shadow-kwt-orange/20'
                : 'bg-white text-kwt-maroon border-kwt-maroon/10 hover:border-kwt-orange/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
