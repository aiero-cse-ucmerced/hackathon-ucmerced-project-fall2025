'use client';

import React from 'react';
import Link from 'next/link';

const ChangeNamePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 font-poppins">
      <div className="flex items-center mb-8">
        <Link href="/preferences">
          <button className="text-gray-600 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Change your name</h1>
      </div>

      <div className="max-w-md mx-auto">
        <label htmlFor="newName" className="block text-lg font-medium text-gray-700 mb-2">
          Enter the new name
        </label>
        <input
          type="text"
          id="newName"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the new name"
        />
        <button className="mt-6 w-full bg-blue-500 text-white p-3 rounded-lg text-lg font-medium">
          Update my name
        </button>
      </div>
    </div>
  );
};

export default ChangeNamePage;