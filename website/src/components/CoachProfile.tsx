import React from 'react';
import { Button } from './ui/button';
import logoImage from 'figma:asset/a75db9bcda9eef7ef085e5ac795127525955e73f.png';

interface CoachProfileProps {
  coachName: string;
  clubName: string;
  email: string;
  gender: string;
  birthdate: string;
  totalPlayers: number;
  totalMatches: number;
  winRate: number;
  onLogout: () => void;
}

export function CoachProfile({
  coachName,
  clubName,
  email,
  gender,
  birthdate,
  totalPlayers,
  totalMatches,
  winRate,
  onLogout,
}: CoachProfileProps) {
  return (
    <div className="min-h-screen bg-white pb-24 px-6 pt-8">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-100 shadow-lg">
          <img 
            src={logoImage} 
            alt="Club Logo" 
            className="w-full h-full object-contain bg-white p-2"
          />
        </div>
        <h1 className="text-center" style={{ color: '#333333' }}>{coachName}</h1>
        <p className="text-center text-gray-600 mt-1">{clubName}</p>
      </div>

      {/* Profile Information Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="mb-4" style={{ color: '#333333' }}>Profile Information</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Email</span>
            <span style={{ color: '#333333' }}>{email}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Gender</span>
            <span style={{ color: '#333333' }} className="capitalize">{gender}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Birthdate</span>
            <span style={{ color: '#333333' }}>{birthdate}</span>
          </div>
        </div>
      </div>

      {/* Club Quick Stats Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="mb-4" style={{ color: '#333333' }}>Club Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              {totalPlayers}
            </p>
            <p className="text-sm text-gray-600 mt-1">Total Players</p>
          </div>
          <div className="text-center">
            <p className="text-3xl bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              {totalMatches}
            </p>
            <p className="text-sm text-gray-600 mt-1">Total Matches</p>
          </div>
          <div className="text-center">
            <p className="text-3xl bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              {winRate}%
            </p>
            <p className="text-sm text-gray-600 mt-1">Win Rate</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-2 mt-8">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full py-6 rounded-xl border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-all duration-200"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
