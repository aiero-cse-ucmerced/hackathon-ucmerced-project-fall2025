import React from 'react';
import AuthGuard from '../../components/AuthGuard';

export default function FlashcardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}

