'use client';

import React, { useState, ChangeEvent, useMemo } from 'react';
import Link from 'next/link';
import { allFlashcards } from '../../data/flashcards';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter flashcards based on search term
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }
    return allFlashcards.filter(card =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 font-poppins pb-20">
      <div className="flex items-center mb-8">
        <Link href="/home">
          <button className="text-gray-600 mr-4 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Search Flashcards</h1>
      </div>

      <div className="max-w-full mx-auto">
        <div className="relative mb-6">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for flashcards by name..."
            value={searchTerm}
            onChange={handleSearch}
            autoFocus
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchTerm('')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {searchTerm && (
          <div>
            <p className="text-gray-600 mb-4">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </p>
            {searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                  >
                    <h3 className="font-semibold text-lg text-gray-900">{result.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">Category: {result.category}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-500 text-lg">No flashcards found matching "{searchTerm}"</p>
                <p className="text-gray-400 text-sm mt-2">Try searching with different keywords</p>
              </div>
            )}
          </div>
        )}

        {!searchTerm && (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-500 text-lg">Start typing to search for flashcards</p>
            <p className="text-gray-400 text-sm mt-2">Search by flashcard name</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;