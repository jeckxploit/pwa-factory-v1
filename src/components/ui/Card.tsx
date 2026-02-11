import React from 'react';

export default function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white shadow p-4 rounded ${className}`}>
      {children}
    </div>
  );
}