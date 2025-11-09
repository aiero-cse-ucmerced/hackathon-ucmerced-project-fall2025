'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '../../../../lib/firebase/clientApp';
import { useUser } from '../../../../components/firebase';
import { updateProfile } from 'firebase/auth';

const ChangeNamePage = () => {
  const user = useUser();
  const router = useRouter();
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.displayName) {
      setNewName(user.displayName);
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!newName.trim()) {
      setError('Please enter a name');
      return;
    }

    if (!user) {
      setError('You must be logged in to update your name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await updateProfile(user, {
        displayName: newName.trim(),
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/preferences');
      }, 1500);
    } catch (err: any) {
      console.error('Error updating name:', err);
      setError(err.message || 'Failed to update name. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="flex items-center mb-8">
        <Link href="/preferences">
          <button className="text-secondary mr-4 hover:opacity-80">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Change your name</h1>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="newName" className="block text-lg font-medium mb-2">
            Enter the new name
          </label>
          <input
            type="text"
            id="newName"
            className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter your name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            disabled={isLoading}
          />
          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>
          )}
          {success && (
            <p className="text-green-600 dark:text-green-400 text-sm mt-2">
              ✓ Name updated successfully! Redirecting...
            </p>
          )}
        </div>
        <button
          onClick={handleUpdate}
          disabled={isLoading || success}
          className={`w-full p-3 rounded-lg text-lg font-medium transition ${
            isLoading || success
              ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed'
              : 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 active:scale-95 shadow-md'
          }`}
        >
          {isLoading ? 'Updating...' : success ? 'Updated!' : 'Update my name'}
        </button>
      </div>
    </div>
  );
};

export default ChangeNamePage;
