import React from 'react';

interface DataCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export function DataCard({ label, value, className = '' }: DataCardProps) {
  return (
    <div className={`p-4 rounded-lg bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-100 ${className}`}>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl" style={{ color: '#333333' }}>{value}</p>
    </div>
  );
}
