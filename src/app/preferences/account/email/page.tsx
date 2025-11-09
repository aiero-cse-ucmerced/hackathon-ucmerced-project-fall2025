'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const ChangeEmailPage = () => {
  const [newEmail, setNewEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async () => {
    if (!newEmail.trim() || !newEmail.includes('@')) {
      alert('Please enter a valid email');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setNewEmail('');
      }, 2000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 font-poppins">
      <div className="flex items-center mb-8">
        <Link href="/preferences">
          <button className="text-gray-600 mr-4 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Change your email</h1>
      </div>

      <div className="max-w-md mx-auto">
        <label htmlFor="newEmail" className="block text-lg font-medium text-gray-700 mb-2">
          Enter the new email
        </label>
        <input
          type="email"
          id="newEmail"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the new email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          disabled={isLoading}
        />
        {success && (
          <p className="text-green-600 text-sm mt-2">✓ Email updated successfully!</p>
        )}
        <button
          onClick={handleUpdate}
          disabled={isLoading || success}
          className={`mt-6 w-full p-3 rounded-lg text-lg font-medium transition ${
            isLoading || success
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
          }`}
        >
          {isLoading ? 'Updating...' : success ? 'Updated!' : 'Update my email'}
        </button>
      </div>
    </div>
  );
};

export default ChangeEmailPage;