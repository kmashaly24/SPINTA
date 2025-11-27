import React from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PlayerProfileProps {
  playerName: string;
  clubName: string;
  email: string;
  height: string;
  age: number;
  dateOfBirth: string;
  position: string;
  matchesPlayed: number;
  goals: number;
  assists: number;
  profileImage: string;
  onLogout: () => void;
}

export function PlayerProfile({
  playerName,
  clubName,
  email,
  height,
  age,
  dateOfBirth,
  position,
  matchesPlayed,
  goals,
  assists,
  profileImage,
  onLogout,
}: PlayerProfileProps) {
  return (
    <div className="min-h-screen bg-white pb-24 px-6 pt-8">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-100 shadow-lg">
          <ImageWithFallback 
            src={profileImage} 
            alt={playerName} 
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-center" style={{ color: '#333333' }}>{playerName}</h1>
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
            <span className="text-gray-600">Height</span>
            <span style={{ color: '#333333' }}>{height}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Age</span>
            <span style={{ color: '#333333' }}>{age}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Birthdate</span>
            <span style={{ color: '#333333' }}>{dateOfBirth}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Position</span>
            <span style={{ color: '#333333' }}>{position}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Summary Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="mb-4" style={{ color: '#333333' }}>Season Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              {matchesPlayed}
            </p>
            <p className="text-sm text-gray-600 mt-1">Matches Played</p>
          </div>
          <div className="text-center">
            <p className="text-3xl bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              {goals}
            </p>
            <p className="text-sm text-gray-600 mt-1">Goals</p>
          </div>
          <div className="text-center">
            <p className="text-3xl bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              {assists}
            </p>
            <p className="text-sm text-gray-600 mt-1">Assists</p>
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
