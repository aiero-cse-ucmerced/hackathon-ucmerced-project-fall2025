'use client';

import React, { useState } from 'react';
import CategoryFilter from '../../components/CategoryFilter';
import RecommendationCard from '../../components/RecommendationCard';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('School');

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hello,<br />Jack Daniels</h1>
        <button className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </header>

      {/* Continue where you left off */}
      <section className="p-4">
        <h2 className="text-xl font-medium mb-4">Continue where you left off</h2>
        <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center shadow-md">
          <div>
            <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">50% Progress</span>
            <p className="mt-2 text-lg">Ut enim ad minim veniam</p>
          </div>
          <button className="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Recommendations */}
      <section className="p-4">
        <h2 className="text-xl font-medium mb-4">Recommendations</h2>
        <CategoryFilter
          categories={['School', 'Languages']}
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {selectedCategory === 'School' && (
            <>
              <RecommendationCard
                title="DMV Permit Test"
                tags={[
                  { text: '# Driving', color: 'bg-gray-200 text-gray-700' },
                  {
                    text: 'Top Pick',
                    color: 'bg-green-200 text-green-800',
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ),
                  },
                ]}
              />
              <RecommendationCard
                title="DMV Permit Test"
                tags={[
                  { text: '# Driving', color: 'bg-gray-200 text-gray-700' },
                  {
                    text: 'Top Pick',
                    color: 'bg-green-200 text-green-800',
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ),
                  },
                ]}
              />
            </>
          )}
        </div>
      </section>

      {/* More for you */}
      <section className="p-4 mt-4">
        <h2 className="text-xl font-medium mb-4">More for you</h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          <RecommendationCard
            title="Introduction to Physics"
            tags={[
              { text: '# Science', color: 'bg-gray-200 text-gray-700' },
              { text: 'New', color: 'bg-yellow-200 text-yellow-800' },
            ]}
          />
          <RecommendationCard
            title="Drawing Fundamentals"
            tags={[
              { text: '# Art', color: 'bg-gray-200 text-gray-700' },
              { text: 'Popular', color: 'bg-red-200 text-red-800' },
            ]}
          />
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-around items-center">
        <button className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button className="bg-blue-500 text-white p-3 rounded-full shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default HomePage;