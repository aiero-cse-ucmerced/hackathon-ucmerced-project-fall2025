import React, { useState } from 'react';

interface CategoryFilterProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <div className="flex space-x-2 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === category 
              ? 'bg-blue-600 dark:bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-200 text-gray-900 dark:text-gray-900'
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;