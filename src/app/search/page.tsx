'use client';

import React, { useState, ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import { searchFlashcards, Flashcard } from '../../lib/firebaseService';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search flashcards when searchTerm changes
  useEffect(() => {
    const performSearch = async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await searchFlashcards(searchTerm);
        setSearchResults(results);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to search flashcards. Please try again.');
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search to avoid too many requests
    const timeoutId = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="min-h-screen p-4 font-poppins pb-20">
      <div className="flex items-center mb-8">
        <Link href="/home">
          <button className="text-secondary mr-4 hover:opacity-80">
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
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for flashcards by name..."
            value={searchTerm}
            onChange={handleSearch}
            autoFocus
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-3 text-tertiary hover:text-secondary"
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
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="text-tertiary mt-4">Searching...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-500 text-lg">{error}</p>
              </div>
            ) : (
              <>
                <p className="text-secondary mb-4">
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                </p>
                {searchResults.length > 0 ? (
                  <div className="space-y-3">
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition cursor-pointer"
                      >
                        <h3 className="font-semibold text-lg">{result.title}</h3>
                        <p className="text-sm text-secondary mt-1">Category: {result.category}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-tertiary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-tertiary text-lg">No flashcards found matching "{searchTerm}"</p>
                    <p className="text-tertiary text-sm mt-2">Try searching with different keywords</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {!searchTerm && (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-tertiary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-tertiary text-lg">Start typing to search for flashcards</p>
            <p className="text-tertiary text-sm mt-2">Search by flashcard name</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;