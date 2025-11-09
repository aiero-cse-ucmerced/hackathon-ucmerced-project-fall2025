import React from 'react';
import AuthGuard from '../../components/AuthGuard';

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
};

export default SearchLayout;
