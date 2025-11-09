'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '../../../../lib/firebase/clientApp';
import { useUser } from '../../../../components/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../lib/firebase/clientApp';

const ChangeUsernamePage = () => {
  const user = useUser();
  const router = useRouter();
  const [newUsername, setNewUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsername = async () => {
      if (!user?.uid) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setNewUsername(data.username || user.email?.split('@')[0] || '');
        } else {
          setNewUsername(user.email?.split('@')[0] || '');
        }
      } catch (err) {
        console.error('Error loading username:', err);
      }
    };

    loadUsername();
  }, [user]);

  const handleUpdate = async () => {
    if (!newUsername.trim()) {
      setError('Please enter a username');
      return;
    }

    if (newUsername.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (!user?.uid) {
      setError('You must be logged in to update your username');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        username: newUsername.trim(),
        updatedAt: serverTimestamp(),
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/preferences');
      }, 1500);
    } catch (err: any) {
      console.error('Error updating username:', err);
      setError(err.message || 'Failed to update username. Please try again.');
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
        <h1 className="text-2xl font-bold">Change your username</h1>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="newUsername" className="block text-lg font-medium mb-2">
            Enter the new username
          </label>
          <input
            type="text"
            id="newUsername"
            className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter your username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            disabled={isLoading}
          />
          <p className="text-secondary text-xs mt-1">At least 3 characters. Letters, numbers, and underscores only.</p>
          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>
          )}
          {success && (
            <p className="text-green-600 dark:text-green-400 text-sm mt-2">
              ✓ Username updated successfully! Redirecting...
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
          {isLoading ? 'Updating...' : success ? 'Updated!' : 'Update my username'}
        </button>
      </div>
    </div>
  );
};

export default ChangeUsernamePage;
