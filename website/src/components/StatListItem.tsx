import React from 'react';

interface StatListItemProps {
  label: string;
  value: string | number;
}

export function StatListItem({ label, value }: StatListItemProps) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm" style={{ color: '#333333' }}>{value}</span>
    </div>
  );
}
