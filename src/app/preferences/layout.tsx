'use client';

import React from 'react';
import Link from 'next/link';

const PreferencesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-50">
        <Link href="/home">
          <button className="text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default PreferencesLayout;