'use client';

import React from 'react';
import Link from 'next/link';
import AuthGuard from '../../components/AuthGuard';

const PreferencesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <div className="min-h-screen">
        <div 
          className="sticky top-0 border-b p-4 z-50"
          style={{ 
            backgroundColor: 'var(--background)', 
            borderColor: 'var(--border-color)'
          }}
        >
          <Link href="/home">
            <button className="text-secondary hover:opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </Link>
        </div>
        {children}
      </div>
    </AuthGuard>
  );
};

export default PreferencesLayout;
