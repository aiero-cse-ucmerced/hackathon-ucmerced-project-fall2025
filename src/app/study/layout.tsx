import React from 'react';
import AuthGuard from '../../components/AuthGuard';

export default function StudyLayout({
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

