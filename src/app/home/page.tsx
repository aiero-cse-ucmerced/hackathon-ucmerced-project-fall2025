'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { searchFlashcards, getAllFlashcards, Flashcard } from '../../lib/firebaseService';
import { useAuth } from '../../hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFlashcards, setFilteredFlashcards] = useState<Flashcard[]>([]);
  const [allFlashcards, setAllFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Mock statistics - in a real app, these would come from Firebase
  const stats = {
    studiedCards: 34,
    decksCreated: 18,
    streak: 7,
  };

  // Fetch all flashcards on mount
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const flashcards = await getAllFlashcards(50);
        setAllFlashcards(flashcards);
      } catch (err) {
        console.error('Error fetching flashcards:', err);
      }
    };
    fetchFlashcards();
  }, []);

  // Search flashcards when searchTerm changes
  useEffect(() => {
    const performSearch = async () => {
      if (!searchTerm.trim()) {
        setFilteredFlashcards([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchFlashcards(searchTerm);
        setFilteredFlashcards(results);
      } catch (err) {
        console.error('Search error:', err);
        setFilteredFlashcards([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Filter flashcards by category
  const getFilteredDecks = () => {
    if (selectedFilter === 'All') return allFlashcards;
    return allFlashcards.filter(deck => deck.category === selectedFilter);
  };

  const categories = ['All', ...Array.from(new Set(allFlashcards.map(f => f.category)))];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-secondary text-sm mt-1">Welcome back{user ? `, ${user.displayName || 'User'}` : ''}!</p>
        </div>
        <Link href="/preferences">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-md">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-white font-bold text-lg">
                {user?.displayName?.[0] || user?.email?.[0] || 'U'}
              </span>
            )}
          </div>
        </Link>
      </header>

      {/* Statistics Cards */}
      <section className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-4 shadow-lg">
            <div className="text-white">
              <p className="text-3xl font-bold">{stats.studiedCards}</p>
              <p className="text-sm opacity-90 mt-1">Studied cards</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-lg">
            <div className="text-white">
              <p className="text-3xl font-bold">{stats.decksCreated}</p>
              <p className="text-sm opacity-90 mt-1">Decks created</p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Challenge */}
      <section className="px-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h2 className="text-xl font-bold mb-1">Daily Quiz</h2>
              <p className="text-sm opacity-90">Your daily challenge is waiting!</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <button className="mt-4 bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors w-full">
            Start Challenge
          </button>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-4 mb-6">
        <div className="relative">
          <input
            type="text"
            className="w-full p-4 pl-12 pr-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all shadow-sm"
            placeholder="Search flashcards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-4.5 text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchTerm && (
            <button
              className="absolute right-4 top-4 text-tertiary hover:text-secondary"
              onClick={() => setSearchTerm('')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {searchTerm && !isLoading && filteredFlashcards.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl max-h-64 overflow-y-auto">
            {filteredFlashcards.map((card) => (
              <Link key={card.id} href={`/search?q=${encodeURIComponent(card.title)}`}>
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition first:rounded-t-2xl last:rounded-b-2xl last:border-b-0">
                  <p className="font-semibold">{card.title}</p>
                  <p className="text-xs text-secondary mt-1">{card.category}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        {searchTerm && isLoading && (
          <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-4">
            <p className="text-sm text-secondary">Searching...</p>
          </div>
        )}
      </section>

      {/* Continue Learning */}
      {!searchTerm && (
        <section className="px-4 mb-6">
          <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-5 shadow-md border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">50% Progress</span>
                </div>
                <p className="font-semibold text-lg mb-1">Spanish Vocabulary</p>
                <p className="text-sm text-secondary">42 of 84 cards studied</p>
                <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <Link href="/search?q=Spanish Vocabulary">
                <button className="ml-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Filter Tabs */}
      {!searchTerm && (
        <section className="px-4 mb-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.slice(0, 5).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === category
                    ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category} {category !== 'All' && `(${allFlashcards.filter(f => f.category === category).length})`}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Featured/Recommended Decks */}
      {!searchTerm && (
        <section className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Featured Decks</h2>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">See all</button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {getFilteredDecks().slice(0, 6).map((deck) => (
              <Link key={deck.id} href={`/study/${deck.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full">
                          {deck.category}
                        </span>
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Top Pick
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{deck.title}</h3>
                      <p className="text-sm text-secondary">24 cards • 120+ students</p>
                    </div>
                    <div className="ml-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {getFilteredDecks().length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-tertiary text-lg mb-2">No decks found</p>
              <p className="text-secondary text-sm">Create your first flashcard deck to get started!</p>
              <Link href="/flashcards">
                <button className="mt-4 bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                  Create Deck
                </button>
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Search Results */}
      {searchTerm && (
        <section className="px-4">
          <h2 className="text-xl font-bold mb-4">
            Search Results {filteredFlashcards.length > 0 && `(${filteredFlashcards.length})`}
          </h2>
          {filteredFlashcards.length > 0 ? (
            <div className="space-y-3">
              {filteredFlashcards.map((card) => (
                <Link key={card.id} href={`/search?q=${encodeURIComponent(card.title)}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer">
                    <h3 className="font-bold text-lg mb-1">{card.title}</h3>
                    <p className="text-sm text-secondary">Category: {card.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-tertiary text-lg mb-2">No flashcards found</p>
              <p className="text-secondary text-sm">Try searching with different keywords</p>
            </div>
          )}
        </section>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-around items-center shadow-lg z-50">
        <Link href="/home" className="flex flex-col items-center">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className="text-xs mt-1 text-blue-600 dark:text-blue-400 font-medium">Home</span>
        </Link>
        <Link href="/flashcards" className="flex flex-col items-center -mt-8">
          <button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </Link>
        <Link href="/preferences" className="flex flex-col items-center">
          <div className="p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-xs mt-1 text-secondary">Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;
