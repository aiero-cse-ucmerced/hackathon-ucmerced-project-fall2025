'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const ChangeUsernamePage = () => {
  const [newUsername, setNewUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async () => {
    if (!newUsername.trim()) {
      alert('Please enter a username');
      return;
    }
    if (newUsername.length < 3) {
      alert('Username must be at least 3 characters');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setNewUsername('');
      }, 2000);
    }, 500);
  };

  return (
    <div className="min-h-screen p-4 font-poppins">
      <div className="flex items-center mb-8">
        <Link href="/preferences">
          <button className="text-secondary mr-4 hover:opacity-80">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Change your username</h1>
      </div>

      <div className="max-w-md mx-auto">
            <label htmlFor="newUsername" className="block text-lg font-medium mb-2">
          Enter the new username
        </label>
        <input
          type="text"
          id="newUsername"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the new username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          disabled={isLoading}
        />
        <p className="text-tertiary text-xs mt-1">At least 3 characters</p>
        {success && (
          <p className="text-green-600 text-sm mt-2">✓ Username updated successfully!</p>
        )}
        <button
          onClick={handleUpdate}
          disabled={isLoading || success}
              className={`mt-6 w-full p-3 rounded-lg text-lg font-medium transition ${
            isLoading || success
              ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed'
              : 'bg-blue-500 dark:bg-teal-500 text-white hover:bg-blue-600 dark:hover:bg-teal-600 active:scale-95'
          }`}
        >
          {isLoading ? 'Updating...' : success ? 'Updated!' : 'Update my username'}
        </button>
      </div>
    </div>
  );
};

export default ChangeUsernamePage;