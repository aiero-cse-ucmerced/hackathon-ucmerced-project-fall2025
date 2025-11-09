'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '../../../../lib/firebase/clientApp';
import { useUser } from '../../../../components/firebase';
import { updateEmail, sendEmailVerification } from 'firebase/auth';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../lib/firebase/clientApp';

const ChangeEmailPage = () => {
  const user = useUser();
  const router = useRouter();
  const [newEmail, setNewEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.email) {
      setNewEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!newEmail.trim()) {
      setError('Please enter an email address');
      return;
    }

    if (!newEmail.includes('@') || !newEmail.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    if (!user) {
      setError('You must be logged in to update your email');
      return;
    }

    if (newEmail === user.email) {
      setError('This is already your current email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await updateEmail(user, newEmail.trim());
      
      // Update email in Firestore
      if (user.uid) {
        await updateDoc(doc(db, 'users', user.uid), {
          email: newEmail.trim(),
          updatedAt: serverTimestamp(),
        });
      }

      // Send verification email
      await sendEmailVerification(user);
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/preferences');
      }, 2000);
    } catch (err: any) {
      console.error('Error updating email:', err);
      
      if (err.code === 'auth/requires-recent-login') {
        setError('For security, please sign out and sign back in before changing your email.');
      } else {
        setError(err.message || 'Failed to update email. Please try again.');
      }
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
        <h1 className="text-2xl font-bold">Change your email</h1>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="newEmail" className="block text-lg font-medium mb-2">
            Enter the new email
          </label>
          <input
            type="email"
            id="newEmail"
            className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter your email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            disabled={isLoading}
          />
          <p className="text-secondary text-xs mt-1">A verification email will be sent to the new address.</p>
          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>
          )}
          {success && (
            <div className="mt-2">
              <p className="text-green-600 dark:text-green-400 text-sm">
                ✓ Email updated successfully! A verification email has been sent.
              </p>
              <p className="text-secondary text-xs mt-1">Redirecting...</p>
            </div>
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
          {isLoading ? 'Updating...' : success ? 'Updated!' : 'Update my email'}
        </button>
      </div>
    </div>
  );
};

export default ChangeEmailPage;
