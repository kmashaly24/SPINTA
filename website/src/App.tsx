import React, { useState } from 'react';
import { 
  Eye, EyeOff, Camera, CheckCircle, ArrowLeft, Search, Share2, 
  Trophy, Target, Shield, TrendingUp, Activity, Clock, Users as UsersIcon,
  Plus, Check, X, ChevronRight, BarChart3, Zap, MapPin, Calendar as CalendarIcon,
  Map, Pencil, Send, Key, Info, Clipboard, Dumbbell
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { BottomNavigation } from './components/BottomNavigation';
import { MatchListItem } from './components/MatchListItem';
import { PlayerListItem } from './components/PlayerListItem';
import { DataCard } from './components/DataCard';
import { InviteCodeBox } from './components/InviteCodeBox';
import { ComparisonStatBar } from './components/ComparisonStatBar';
import { StatListItem } from './components/StatListItem';
import { SoccerField } from './components/SoccerField';
import { AttributeRadarChart } from './components/AttributeRadarChart';
import { CoachProfile } from './components/CoachProfile';
import { PlayerProfile } from './components/PlayerProfile';
import coachImage from 'figma:asset/5be67071b9167d07dbd957c0d9d2d6284c7b7075.png';
import playerImage from 'figma:asset/c0033141475f9734ac14cf46838e561d43e1cbb7.png';
import logoImage from 'figma:asset/a75db9bcda9eef7ef085e5ac795127525955e73f.png';
import { 
  mockClubData, 
  mockMatches, 
  mockUpcomingMatches, 
  mockPlayers, 
  mockMatchDetail,
  mockTrainingPlans,
  mockMatchPlayerStats
} from './data/mockData';

type CoachScreen = 'clubOverview' | 'matchDetail' | 'playersList' | 'playerDetailUnlinked' | 'playerDetailLinked' | 'matchPlayerStats' | 'addMatch' | 'assignTraining' | 'createTrainingPlan' | 'assignSuccess' | 'trainingPlanDetail' | 'profile';
type PlayerScreen = 'playerSignup' | 'enterInviteCode' | 'playerConfirmation' | 'myStats' | 'trainingList' | 'trainingDetail' | 'matchesList' | 'matchPlayerStats' | 'trainingPlanDetail' | 'profile';
type AuthScreen = 'login' | 'signup' | 'coachSignup' | 'clubInfo' | 'confirmation';

export default function App() {
  // Navigation state
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [userType, setUserType] = useState<'coach' | 'player' | null>(null);
  const [coachScreen, setCoachScreen] = useState<CoachScreen>('clubOverview');
  const [playerScreen, setPlayerScreen] = useState<PlayerScreen>('myStats');
  const [coachTab, setCoachTab] = useState<'club' | 'players' | 'chatbot' | 'profile'>('club');
  const [playerTab, setPlayerTab] = useState<'stats' | 'matches' | 'training' | 'profile'>('stats');
  
  // Form states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'coach' | 'player' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [selectedTrainingId, setSelectedTrainingId] = useState<string | null>(null);
  const [selectedTrainingPlanId, setSelectedTrainingPlanId] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState('');
  const [selectedMapType, setSelectedMapType] = useState<'heatmap' | 'passmap' | 'shotmap'>('heatmap');
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean[]>>({});
  const [matchDetailTab, setMatchDetailTab] = useState<'summary' | 'statistics' | 'lineup' | 'maps'>('summary');
  const [matchPlayerStatsTab, setMatchPlayerStatsTab] = useState<'stats' | 'maps'>('stats');
  const [playerDetailTab, setPlayerDetailTab] = useState<'summary' | 'matches' | 'training'>('summary');
  
  // Add match form state
  const [matchForm, setMatchForm] = useState({
    opponent: '',
    date: '',
    time: '',
    location: '',
    homeScore: '',
    awayScore: '',
    matchVideo: null as File | null
  });
  
  // Assign training form state
  const [trainingForm, setTrainingForm] = useState({
    planName: '',
    duration: '',
    additionalNotes: ''
  });
  const [exercises, setExercises] = useState<Array<{
    name: string;
    description: string;
    sets: string;
    reps: string;
    minutes: string;
  }>>([]);
  const [currentExercise, setCurrentExercise] = useState({
    name: '',
    description: '',
    sets: '',
    reps: '',
    minutes: ''
  });
  const [editingExerciseIndex, setEditingExerciseIndex] = useState<number | null>(null);
  const [editingExerciseData, setEditingExerciseData] = useState<{
    name: string;
    description: string;
    sets: string;
    reps: string;
    minutes: string;
  } | null>(null);
  
  // Coach signup form state
  const [coachForm, setCoachForm] = useState({
    fullName: 'John Smith',
    email: 'john@example.com',
    password: '',
    confirmPassword: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    gender: ''
  });

  // Club information form state
  const [clubForm, setClubForm] = useState({
    clubLogo: null as File | null,
    clubName: 'Thunder United FC',
    country: '',
    ageGroup: 'U16',
    stadium: ''
  });

  // Player signup form state
  const [playerForm, setPlayerForm] = useState({
    profilePicture: null as File | null,
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    height: '',
    jerseyNumber: '',
    position: '',
    selectedClub: ''
  });

  // Invitation code data (fetched after entering code)
  const [invitationData, setInvitationData] = useState({
    playerName: '',
    jerseyNumber: '',
    position: '',
    clubName: ''
  });

  // Auth handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - go to coach dashboard for demo
    setUserType('coach');
    setCoachTab('club');
    setCoachScreen('clubOverview');
  };

  const handleContinue = () => {
    if (selectedRole === 'coach') {
      setAuthScreen('coachSignup');
    } else if (selectedRole === 'player') {
      setAuthScreen('coachSignup'); // Will create player signup next
      setUserType('player');
      setPlayerScreen('enterInviteCode');
    }
  };

  const handleCoachSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthScreen('clubInfo');
  };

  const handleClubSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthScreen('confirmation');
  };

  const handleGoToDashboard = () => {
    setUserType('coach');
    setCoachTab('club');
    setCoachScreen('clubOverview');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setClubForm({ ...clubForm, clubLogo: file });
  };

  const handlePlayerProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPlayerForm({ ...playerForm, profilePicture: file });
  };

  const handleLogout = () => {
    // Reset all state to initial values
    setUserType(null);
    setAuthScreen('login');
    setCoachTab('club');
    setPlayerTab('stats');
    setCoachScreen('clubOverview');
    setPlayerScreen('myStats');
    setEmail('');
    setPassword('');
    setSelectedRole(null);
  };

  // Navigation handlers
  const handleCoachTabChange = (tab: 'club' | 'players' | 'chatbot' | 'profile') => {
    setCoachTab(tab);
    if (tab === 'club') setCoachScreen('clubOverview');
    if (tab === 'players') setCoachScreen('playersList');
    if (tab === 'chatbot') setCoachScreen('clubOverview'); // Reset screen when going to chatbot
    if (tab === 'profile') setCoachScreen('profile');
  };

  const handlePlayerTabChange = (tab: 'stats' | 'matches' | 'training' | 'profile') => {
    setPlayerTab(tab);
    // Map player tabs to playerDetailTab for the profile screen
    if (tab === 'stats') {
      setPlayerDetailTab('summary');
      setPlayerScreen('myStats');
    }
    if (tab === 'matches') {
      setPlayerDetailTab('matches');
      setPlayerScreen('myStats');
    }
    if (tab === 'training') {
      setPlayerDetailTab('training');
      setPlayerScreen('myStats');
    }
    if (tab === 'profile') {
      setPlayerScreen('profile');
    }
  };

  // ==================== AUTH SCREENS ====================
  
  const LoginScreen = () => (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="mb-6 flex justify-center">
            <img src={logoImage} alt="Stats Spinta Logo" className="h-16 w-auto object-contain" />
          </div>
          <h2 className="text-xl" style={{ color: '#333333' }}>Welcome Back</h2>
          <p className="text-gray-600">Log in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" style={{ color: '#333333' }}>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
              style={{ color: '#333333' }}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" style={{ color: '#333333' }}>Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                style={{ color: '#333333' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            Log In
          </Button>
        </form>

        <div className="text-center pt-4">
          <p style={{ color: '#333333' }}>
            Don't have an account?{' '}
            <button
              type="button"
              className="hover:underline transition-colors"
              style={{ color: '#f97316' }}
              onClick={() => setAuthScreen('signup')}
            >
              <strong>Sign Up</strong>
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const SignupScreen = () => (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="mb-6 flex justify-center">
            <img src={logoImage} alt="Stats Spinta Logo" className="h-16 w-auto object-contain" />
          </div>
          <h2 className="text-xl" style={{ color: '#333333' }}>Choose your role</h2>
        </div>

        <div className="space-y-6">
          <button
            type="button"
            onClick={() => setSelectedRole('coach')}
            className={`w-full p-6 rounded-xl border-2 transition-all duration-200 flex items-center justify-between min-h-[100px] ${
              selectedRole === 'coach'
                ? 'border-orange-400 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg'
                : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-md'
            }`}
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 mr-4">
              <img src={coachImage} alt="Coach" className="w-full h-full object-cover" />
            </div>
            <div className="text-right flex-1">
              <h3 className="text-2xl" style={{ color: '#333333' }}>Coach</h3>
            </div>
          </button>

          <div className="text-center">
            <p className="text-gray-500 text-lg">or</p>
          </div>

          <button
            type="button"
            onClick={() => setSelectedRole('player')}
            className={`w-full p-6 rounded-xl border-2 transition-all duration-200 flex items-center justify-between min-h-[100px] ${
              selectedRole === 'player'
                ? 'border-orange-400 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg'
                : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-md'
            }`}
          >
            <div className="text-left flex-1">
              <h3 className="text-2xl" style={{ color: '#333333' }}>Player</h3>
            </div>
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 ml-4">
              <img src={playerImage} alt="Player" className="w-full h-full object-cover" />
            </div>
          </button>
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`w-full py-3 px-4 rounded-lg text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
            selectedRole
              ? 'bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Continue
        </Button>

        <div className="text-center pt-4">
          <p style={{ color: '#333333' }}>
            Have an account?{' '}
            <button
              type="button"
              className="hover:underline transition-colors"
              style={{ color: '#f97316' }}
              onClick={() => setAuthScreen('login')}
            >
              <strong>Log In</strong>
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const CoachSignupScreen = () => (
    <div className="min-h-screen bg-white flex items-start justify-center p-6 pt-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <img src={logoImage} alt="Stats Spinta Logo" className="h-16 w-auto object-contain" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-center text-xl" style={{ color: '#333333' }}>Create Your Coach Account</h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center text-white font-medium text-sm">1</div>
              <span className="text-sm" style={{ color: '#333333' }}>Coach Info</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-medium text-sm">2</div>
              <span className="text-sm text-gray-500">Club Info</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleCoachSignup} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName" style={{ color: '#333333' }}>Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={coachForm.fullName}
              onChange={(e) => setCoachForm({ ...coachForm, fullName: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
              style={{ color: '#333333' }}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coachEmail" style={{ color: '#333333' }}>Email</Label>
            <Input
              id="coachEmail"
              type="email"
              placeholder="Enter your email"
              value={coachForm.email}
              onChange={(e) => setCoachForm({ ...coachForm, email: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
              style={{ color: '#333333' }}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coachPassword" style={{ color: '#333333' }}>Password</Label>
            <div className="relative">
              <Input
                id="coachPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={coachForm.password}
                onChange={(e) => setCoachForm({ ...coachForm, password: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                style={{ color: '#333333' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" style={{ color: '#333333' }}>Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={coachForm.confirmPassword}
                onChange={(e) => setCoachForm({ ...coachForm, confirmPassword: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                style={{ color: '#333333' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label style={{ color: '#333333' }}>Date of Birth</Label>
            <div className="grid grid-cols-3 gap-3">
              <select
                value={coachForm.birthMonth}
                onChange={(e) => setCoachForm({ ...coachForm, birthMonth: e.target.value })}
                className="rounded-lg border border-gray-300 bg-white px-3 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors text-sm"
                style={{ color: '#333333' }}
                required
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(2000, i).toLocaleDateString('en', { month: 'long' })}
                  </option>
                ))}
              </select>
              <select
                value={coachForm.birthDay}
                onChange={(e) => setCoachForm({ ...coachForm, birthDay: e.target.value })}
                className="rounded-lg border border-gray-300 bg-white px-3 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors text-sm"
                style={{ color: '#333333' }}
                required
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select
                value={coachForm.birthYear}
                onChange={(e) => setCoachForm({ ...coachForm, birthYear: e.target.value })}
                className="rounded-lg border border-gray-300 bg-white px-3 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors text-sm"
                style={{ color: '#333333' }}
                required
              >
                <option value="">Year</option>
                {Array.from({ length: 80 }, (_, i) => {
                  const year = new Date().getFullYear() - 16 - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <Label style={{ color: '#333333' }}>Gender</Label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={coachForm.gender === 'male'}
                  onChange={(e) => setCoachForm({ ...coachForm, gender: e.target.value })}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  required
                />
                <span style={{ color: '#333333' }}>Male</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={coachForm.gender === 'female'}
                  onChange={(e) => setCoachForm({ ...coachForm, gender: e.target.value })}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  required
                />
                <span style={{ color: '#333333' }}>Female</span>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            Continue
          </Button>
        </form>

        <div className="text-center pt-4">
          <p style={{ color: '#333333' }}>
            Already have an account?{' '}
            <button
              type="button"
              className="hover:underline transition-colors"
              style={{ color: '#f97316' }}
              onClick={() => setAuthScreen('login')}
            >
              <strong>Log In</strong>
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const ClubInfoScreen = () => (
    <div className="min-h-screen bg-white flex items-start justify-center p-6 pt-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <img src={logoImage} alt="Stats Spinta Logo" className="h-16 w-auto object-contain" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-center text-xl" style={{ color: '#333333' }}>Enter Your Club Information</h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-medium text-sm">✓</div>
              <span className="text-sm text-green-600">Coach Info</span>
            </div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-red-500"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center text-white font-medium text-sm">2</div>
              <span className="text-sm" style={{ color: '#333333' }}>Club Info</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleClubSignup} className="space-y-5">
          <div className="space-y-2">
            <Label style={{ color: '#333333' }}>Club Logo</Label>
            <div className="flex justify-center">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="logoUpload"
                />
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center hover:border-orange-400 hover:bg-orange-50 transition-colors cursor-pointer">
                  {clubForm.clubLogo ? (
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={URL.createObjectURL(clubForm.clubLogo)}
                        alt="Club logo preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <>
                      <Camera className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500 text-center px-2">Upload Club Logo</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clubName" style={{ color: '#333333' }}>Club Name</Label>
            <Input
              id="clubName"
              type="text"
              placeholder="Enter your club name"
              value={clubForm.clubName}
              onChange={(e) => setClubForm({ ...clubForm, clubName: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
              style={{ color: '#333333' }}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" style={{ color: '#333333' }}>Country</Label>
            <select
              id="country"
              value={clubForm.country}
              onChange={(e) => setClubForm({ ...clubForm, country: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
              style={{ color: '#333333' }}
              required
            >
              <option value="">Select country</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Spain">Spain</option>
              <option value="Italy">Italy</option>
              <option value="Brazil">Brazil</option>
              <option value="Argentina">Argentina</option>
              <option value="Mexico">Mexico</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ageGroup" style={{ color: '#333333' }}>Age Group / Level</Label>
            <select
              id="ageGroup"
              value={clubForm.ageGroup}
              onChange={(e) => setClubForm({ ...clubForm, ageGroup: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
              style={{ color: '#333333' }}
              required
            >
              <option value="">Select age group</option>
              <option value="U6">Under 6</option>
              <option value="U8">Under 8</option>
              <option value="U10">Under 10</option>
              <option value="U12">Under 12</option>
              <option value="U14">Under 14</option>
              <option value="U16">Under 16</option>
              <option value="U18">Under 18</option>
              <option value="U21">Under 21</option>
              <option value="Senior">Senior (18+)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stadium" style={{ color: '#333333' }}>Stadium</Label>
            <Input
              id="stadium"
              type="text"
              placeholder="Enter stadium name"
              value={clubForm.stadium}
              onChange={(e) => setClubForm({ ...clubForm, stadium: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
              style={{ color: '#333333' }}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            Sign Up
          </Button>
        </form>

        <div className="text-center pt-4">
          <p style={{ color: '#333333' }}>
            Already have an account?{' '}
            <button
              type="button"
              className="hover:underline transition-colors"
              style={{ color: '#f97316' }}
              onClick={() => setAuthScreen('login')}
            >
              <strong>Log In</strong>
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const ConfirmationScreen = () => (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl" style={{ color: '#333333' }}>Welcome, Coach!</h1>
          <p className="text-lg text-gray-600">Your account is all set up and ready to go.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
              {clubForm.clubLogo ? (
                <img src={URL.createObjectURL(clubForm.clubLogo)} alt="Club logo" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-yellow-100 to-orange-100 flex items-center justify-center">
                  <span className="text-2xl" style={{ color: '#333333' }}>
                    {clubForm.clubName ? clubForm.clubName.charAt(0).toUpperCase() : 'C'}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl" style={{ color: '#333333' }}>{clubForm.clubName || 'Your Club'}</h2>
          </div>

          <div className="w-full h-px bg-gray-200"></div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Coach</span>
              <span style={{ color: '#333333' }}>{coachForm.fullName || 'Coach Name'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Team</span>
              <span style={{ color: '#333333' }}>{clubForm.ageGroup || 'Age Group'}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleGoToDashboard}
          className="w-full py-4 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );

  // ==================== COACH SCREENS ====================

  const ClubOverviewScreen = () => (
    <div className="min-h-screen bg-white pb-24">
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center text-white text-2xl">
            {mockClubData.clubName.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl" style={{ color: '#333333' }}>{mockClubData.clubName}</h1>
            <p className="text-gray-600">Coach: {mockClubData.coachName}</p>
          </div>
        </div>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-gray-100 p-1 rounded-lg mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            {/* Win/Loss/Draw Bar */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Season Record</h3>
              <div className="space-y-3">
                <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
                  <div 
                    className="bg-green-500 flex items-center justify-center text-white text-sm transition-all"
                    style={{ width: `${(mockClubData.basicStats.wins / mockClubData.basicStats.matchesPlayed) * 100}%` }}
                  >
                    {mockClubData.basicStats.wins > 0 && mockClubData.basicStats.wins}
                  </div>
                  <div 
                    className="bg-gray-400 flex items-center justify-center text-white text-sm transition-all"
                    style={{ width: `${(mockClubData.basicStats.draws / mockClubData.basicStats.matchesPlayed) * 100}%` }}
                  >
                    {mockClubData.basicStats.draws > 0 && mockClubData.basicStats.draws}
                  </div>
                  <div 
                    className="bg-red-500 flex items-center justify-center text-white text-sm transition-all"
                    style={{ width: `${(mockClubData.basicStats.losses / mockClubData.basicStats.matchesPlayed) * 100}%` }}
                  >
                    {mockClubData.basicStats.losses > 0 && mockClubData.basicStats.losses}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-600">Wins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span className="text-gray-600">Draws</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-gray-600">Losses</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl" style={{ color: '#333333' }}>Team Form</h2>
                <span className="text-sm text-gray-600">Last 5</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {mockClubData.teamForm.slice(-5).map((result, idx) => (
                  <div
                    key={idx}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      result === 'W' ? 'bg-green-500' : result === 'L' ? 'bg-red-500' : 'bg-gray-400'
                    }`}
                  >
                    <span className="text-white">{result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Matches List - only visible in Summary tab */}
            <div>
              <h2 className="text-xl mb-4" style={{ color: '#333333' }}>Matches</h2>
              <div className="space-y-3">
                {mockMatches.slice(0, 3).map((match) => (
                  <MatchListItem
                    key={match.id}
                    opponent={match.opponent}
                    date={match.date}
                    score={match.score}
                    result={match.result}
                    clubName={mockClubData.clubName}
                    onClick={() => {
                      setSelectedMatchId(match.id);
                      setMatchDetailTab('summary');
                      setCoachScreen('matchDetail');
                    }}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-4">
            {/* Card 1: Season Summary */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Season Summary</h3>
              <div className="space-y-1">
                <StatListItem label="Matches Played" value={mockClubData.basicStats.matchesPlayed} />
                <StatListItem label="Goals Scored" value={mockClubData.basicStats.totalGoalsScored} />
                <StatListItem label="Goals Conceded" value={mockClubData.goalsConceded} />
                <StatListItem label="Total Assists" value={mockClubData.basicStats.totalAssists} />
              </div>
            </div>

            {/* Card 2: Attacking */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Attacking</h3>
              <div className="space-y-1">
                <StatListItem label="Avg Goals per Match" value={(mockClubData.basicStats.totalGoalsScored / mockClubData.basicStats.matchesPlayed).toFixed(1)} />
                <StatListItem label="Avg xG per Match" value={mockClubData.basicStats.avgXg} />
                <StatListItem label="Avg Total Shots" value={mockClubData.basicStats.avgShots} />
                <StatListItem label="Avg Shots on Target" value={mockClubData.basicStats.avgShotsOnTarget} />
                <StatListItem label="Avg Dribbles" value={mockClubData.basicStats.avgDribbles} />
                <StatListItem label="Avg Successful Dribbles" value={mockClubData.basicStats.avgSuccessfulDribbles} />
              </div>
            </div>

            {/* Card 3: Passes */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Passes</h3>
              <div className="space-y-1">
                <StatListItem label="Avg Possession %" value={`${mockClubData.basicStats.avgPossession}%`} />
                <StatListItem label="Avg Passes" value={mockClubData.basicStats.avgPasses} />
                <StatListItem label="Pass Completion %" value={`${mockClubData.basicStats.avgPassCompletionRate}%`} />
                <StatListItem label="Avg Final Third Passes" value={mockClubData.basicStats.avgFinalThirdPasses} />
                <StatListItem label="Avg Crosses" value={mockClubData.basicStats.avgCrosses} />
              </div>
            </div>

            {/* Card 4: Defending */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Defending</h3>
              <div className="space-y-1">
                <StatListItem label="Total Clean Sheets" value={mockClubData.basicStats.cleanSheets} />
                <StatListItem label="Avg Goals Conceded per Match" value={(mockClubData.goalsConceded / mockClubData.basicStats.matchesPlayed).toFixed(1)} />
                <StatListItem label="Avg Tackles" value={mockClubData.basicStats.avgTackles} />
                <StatListItem label="Tackle Success %" value={`${mockClubData.basicStats.tackleSuccessRate}%`} />
                <StatListItem label="Avg Interceptions" value={mockClubData.basicStats.avgInterceptions} />
                <StatListItem label="Interception Success %" value={`${mockClubData.basicStats.interceptionSuccessRate}%`} />
                <StatListItem label="Avg Ball Recoveries" value={mockClubData.basicStats.avgBallRecoveries} />
                <StatListItem label="Avg Saves per Match" value={mockClubData.basicStats.avgSavesPerMatch} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  const MatchDetailScreen = () => (
    <div className="min-h-screen bg-white pb-24">
      <div className="bg-white p-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => setCoachScreen('clubOverview')}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Club
        </button>

        <div className="text-center space-y-4">
          <p className="text-gray-600 text-sm">{mockMatchDetail.date}</p>
          
          <div className="flex items-center justify-between gap-4">
            {/* Home Team */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center text-white text-2xl mb-2 shadow-lg">
                {mockClubData.clubName.charAt(0)}
              </div>
              <p className="text-sm text-center" style={{ color: '#333333' }}>{mockClubData.clubName}</p>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-1" style={{ color: '#333333' }}>
                {mockMatchDetail.homeScore} - {mockMatchDetail.awayScore}
              </div>
              <span className={`text-sm px-3 py-1 rounded-full ${
                mockMatchDetail.result === 'win' 
                  ? 'bg-green-500 text-white' 
                  : mockMatchDetail.result === 'loss'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-400 text-white'
              }`}>
                {mockMatchDetail.result === 'win' ? 'Win' : mockMatchDetail.result === 'loss' ? 'Loss' : 'Draw'}
              </span>
            </div>

            {/* Away Team */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white text-2xl mb-2 shadow-lg">
                {mockMatchDetail.opponent.charAt(0)}
              </div>
              <p className="text-sm text-center" style={{ color: '#333333' }}>{mockMatchDetail.opponent}</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={matchDetailTab} onValueChange={(value) => setMatchDetailTab(value as any)} className="w-full">
        <TabsList className="w-full grid grid-cols-3 bg-gray-100 p-1 rounded-lg mx-6 my-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="lineup">Lineup</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="p-6 pt-0">
          <div>
            <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Goal Scorers</h3>
            <div className="space-y-2">
              {mockMatchDetail.goalScorers.map((scorer, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    scorer.isOurTeam ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'
                  }`}
                >
                  <span style={{ color: '#333333' }}>{scorer.player}</span>
                  <span className="text-gray-600">{scorer.minute}'</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="p-6 pt-0 space-y-4">
          {/* Card 1: Match Overview */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="text-lg mb-4" style={{ color: '#333333' }}>Match Overview</h3>
            <div className="space-y-4">
              {mockMatchDetail.matchStats.overview.map((stat, idx) => {
                const total = stat.home + stat.away;
                const homePercent = (stat.home / total) * 100;
                const awayPercent = (stat.away / total) * 100;
                
                // Special design for Ball Possession (first stat)
                if (idx === 0 && stat.label === 'Ball Possession') {
                  return (
                    <div key={idx} className="space-y-3">
                      <p className="text-sm text-center" style={{ color: '#333333' }}>{stat.label}</p>
                      <div className="flex items-center gap-3">
                        {/* Home Team Badge */}
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center text-white shadow-md">
                            {mockClubData.clubName.charAt(0)}
                          </div>
                          <span className="text-xs" style={{ color: '#333333' }}>{stat.home}%</span>
                        </div>
                        
                        {/* Possession Bar */}
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden flex">
                          <div 
                            className="bg-gradient-to-r from-orange-400 to-orange-500 transition-all"
                            style={{ width: `${homePercent}%` }}
                          />
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all"
                            style={{ width: `${awayPercent}%` }}
                          />
                        </div>
                        
                        {/* Away Team Badge */}
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white shadow-md">
                            {mockMatchDetail.opponent.charAt(0)}
                          </div>
                          <span className="text-xs" style={{ color: '#333333' }}>{stat.away}%</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                // Regular centered bars for other stats
                const homeIsHigher = stat.home > stat.away;
                const maxValue = Math.max(stat.home, stat.away);
                const homeBarWidth = (stat.home / maxValue) * 50; // Max 50% of container
                const awayBarWidth = (stat.away / maxValue) * 50; // Max 50% of container
                
                return (
                  <div key={idx} className="space-y-2">
                    <p className="text-xs text-center text-gray-600">{stat.label}</p>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span style={{ color: '#333333' }}>
                        {stat.isPercentage ? `${stat.home}%` : stat.home}
                      </span>
                      <div className="flex-1 mx-3">
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            {/* Home team bar (extends from center to left) */}
                            <div 
                              className={`absolute right-1/2 h-full ${
                                homeIsHigher 
                                  ? 'bg-gradient-to-l from-yellow-400 to-red-500' 
                                  : 'bg-gradient-to-l from-gray-300 to-gray-400'
                              } transition-all`}
                              style={{ width: `${homeBarWidth}%` }}
                            />
                            {/* Away team bar (extends from center to right) */}
                            <div 
                              className={`absolute left-1/2 h-full ${
                                !homeIsHigher 
                                  ? 'bg-gradient-to-r from-yellow-400 to-red-500' 
                                  : 'bg-gradient-to-r from-gray-300 to-gray-400'
                              } transition-all`}
                              style={{ width: `${awayBarWidth}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <span style={{ color: '#333333' }}>
                        {stat.isPercentage ? `${stat.away}%` : stat.away}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: Attacking */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="text-lg mb-4" style={{ color: '#333333' }}>Attacking</h3>
            <div className="space-y-4">
              {mockMatchDetail.matchStats.attacking.map((stat, idx) => {
                const homeIsHigher = stat.home > stat.away;
                const maxValue = Math.max(stat.home, stat.away);
                const homeBarWidth = (stat.home / maxValue) * 50;
                const awayBarWidth = (stat.away / maxValue) * 50;
                
                return (
                  <div key={idx} className="space-y-2">
                    <p className="text-xs text-center text-gray-600">{stat.label}</p>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span style={{ color: '#333333' }}>
                        {stat.isPercentage ? `${stat.home}%` : stat.home}
                      </span>
                      <div className="flex-1 mx-3">
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div 
                              className={`absolute right-1/2 h-full ${
                                homeIsHigher 
                                  ? 'bg-gradient-to-l from-yellow-400 to-red-500' 
                                  : 'bg-gradient-to-l from-gray-300 to-gray-400'
                              } transition-all`}
                              style={{ width: `${homeBarWidth}%` }}
                            />
                            <div 
                              className={`absolute left-1/2 h-full ${
                                !homeIsHigher 
                                  ? 'bg-gradient-to-r from-yellow-400 to-red-500' 
                                  : 'bg-gradient-to-r from-gray-300 to-gray-400'
                              } transition-all`}
                              style={{ width: `${awayBarWidth}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <span style={{ color: '#333333' }}>
                        {stat.isPercentage ? `${stat.away}%` : stat.away}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 3: Passing */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="text-lg mb-4" style={{ color: '#333333' }}>Passing</h3>
            <div className="space-y-4">
              {mockMatchDetail.matchStats.passing.map((stat, idx) => {
                const homeIsHigher = stat.home > stat.away;
                const maxValue = Math.max(stat.home, stat.away);
                const homeBarWidth = (stat.home / maxValue) * 50;
                const awayBarWidth = (stat.away / maxValue) * 50;
                
                return (
                  <div key={idx} className="space-y-2">
                    <p className="text-xs text-center text-gray-600">{stat.label}</p>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span style={{ color: '#333333' }}>
                        {stat.isPercentage ? `${stat.home}%` : stat.home}
                      </span>
                      <div className="flex-1 mx-3">
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div 
                              className={`absolute right-1/2 h-full ${
                                homeIsHigher 
                                  ? 'bg-gradient-to-l from-yellow-400 to-red-500' 
                                  : 'bg-gradient-to-l from-gray-300 to-gray-400'
                              } transition-all`}
                              style={{ width: `${homeBarWidth}%` }}
                            />
                            <div 
                              className={`absolute left-1/2 h-full ${
                                !homeIsHigher 
                                  ? 'bg-gradient-to-r from-yellow-400 to-red-500' 
                                  : 'bg-gradient-to-r from-gray-300 to-gray-400'
                              } transition-all`}
                              style={{ width: `${awayBarWidth}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <span style={{ color: '#333333' }}>
                        {stat.isPercentage ? `${stat.away}%` : stat.away}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 4: Defending */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="text-lg mb-4" style={{ color: '#333333' }}>Defending</h3>
            <div className="space-y-4">
              {mockMatchDetail.matchStats.defending.map((stat, idx) => {
                // Special circular design for Tackle Success %
                if (stat.label === 'Tackle Success %') {
                  const homeIsHigher = stat.home > stat.away;
                  return (
                    <div key={idx} className="py-2">
                      <p className="text-sm text-center mb-4" style={{ color: '#333333' }}>{stat.label}</p>
                      <div className="flex items-center justify-around">
                        {/* Home Team Circle */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="relative w-20 h-20">
                            <svg className="w-20 h-20 transform -rotate-90">
                              <circle
                                cx="40"
                                cy="40"
                                r="32"
                                stroke="#e5e7eb"
                                strokeWidth="6"
                                fill="none"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="32"
                                stroke={homeIsHigher ? "url(#orangeGradientDefend)" : "url(#grayGradientHome)"}
                                strokeWidth="6"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 32}`}
                                strokeDashoffset={`${2 * Math.PI * 32 * (1 - stat.home / 100)}`}
                                strokeLinecap="round"
                              />
                              <defs>
                                <linearGradient id="orangeGradientDefend" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#facc15" />
                                  <stop offset="100%" stopColor="#f97316" />
                                </linearGradient>
                                <linearGradient id="grayGradientHome" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#d1d5db" />
                                  <stop offset="100%" stopColor="#9ca3af" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-lg" style={{ color: '#333333' }}>{stat.home}%</span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-600">{mockClubData.clubName}</span>
                        </div>
                        
                        {/* Away Team Circle */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="relative w-20 h-20">
                            <svg className="w-20 h-20 transform -rotate-90">
                              <circle
                                cx="40"
                                cy="40"
                                r="32"
                                stroke="#e5e7eb"
                                strokeWidth="6"
                                fill="none"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="32"
                                stroke={!homeIsHigher ? "url(#yellowGradientDefend)" : "url(#grayGradientAway)"}
                                strokeWidth="6"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 32}`}
                                strokeDashoffset={`${2 * Math.PI * 32 * (1 - stat.away / 100)}`}
                                strokeLinecap="round"
                              />
                              <defs>
                                <linearGradient id="yellowGradientDefend" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#facc15" />
                                  <stop offset="100%" stopColor="#f97316" />
                                </linearGradient>
                                <linearGradient id="grayGradientAway" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#d1d5db" />
                                  <stop offset="100%" stopColor="#9ca3af" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-lg" style={{ color: '#333333' }}>{stat.away}%</span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-600">{mockMatchDetail.opponent}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                // Regular centered bars for other defending stats
                const homeIsHigher = stat.home > stat.away;
                const maxValue = Math.max(stat.home, stat.away);
                const homeBarWidth = (stat.home / maxValue) * 50;
                const awayBarWidth = (stat.away / maxValue) * 50;
                
                return (
                  <div key={idx} className="space-y-2">
                    <p className="text-xs text-center text-gray-600">{stat.label}</p>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span style={{ color: '#333333' }}>
                        {stat.isPercentage ? `${stat.home}%` : stat.home}
                      </span>
                      <div className="flex-1 mx-3">
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div 
                              className={`absolute right-1/2 h-full ${
                                homeIsHigher 
                                  ? 'bg-gradient-to-l from-yellow-400 to-red-500' 
                                  : 'bg-gradient-to-l from-gray-300 to-gray-400'
                              } transition-all`}
                              style={{ width: `${homeBarWidth}%` }}
                            />
                            <div 
                              className={`absolute left-1/2 h-full ${
                                !homeIsHigher 
                                  ? 'bg-gradient-to-r from-yellow-400 to-red-500' 
                                  : 'bg-gradient-to-r from-gray-300 to-gray-400'
                              } transition-all`}
                              style={{ width: `${awayBarWidth}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <span style={{ color: '#333333' }}>
                        {stat.isPercentage ? `${stat.away}%` : stat.away}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="lineup" className="p-6 pt-0 space-y-6">
          {/* Home Team Section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-l-4 border-green-400">
            <h3 className="text-lg mb-3" style={{ color: '#333333' }}>{mockClubData.clubName}</h3>
            <p className="text-sm text-gray-600 mb-3">Starting XI</p>
            <div className="space-y-2">
              {mockMatchDetail.lineup.map((player) => (
                <div key={player.jerseyNumber} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center text-white text-sm">
                      {player.jerseyNumber}
                    </div>
                    <span style={{ color: '#333333' }}>{player.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{player.position}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Away Team Section */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border-l-4 border-gray-400">
            <h3 className="text-lg mb-3" style={{ color: '#333333' }}>{mockMatchDetail.opponent}</h3>
            <p className="text-sm text-gray-600 mb-3">Starting XI</p>
            <div className="space-y-2">
              {mockMatchDetail.awayLineup.map((player) => (
                <div key={player.jerseyNumber} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-500 to-gray-700 flex items-center justify-center text-white text-sm">
                      {player.jerseyNumber}
                    </div>
                    <span style={{ color: '#333333' }}>{player.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{player.position}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const PlayersListScreen = () => {
    const totalPlayers = mockPlayers.length;
    const joinedPlayers = mockPlayers.filter(p => p.isLinked).length;
    const pendingPlayers = mockPlayers.filter(p => !p.isLinked).length;

    return (
      <div className="min-h-screen bg-white pb-24">
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 pb-8">
          <h1 className="text-2xl mb-4" style={{ color: '#333333' }}>Team Players</h1>
          
          {/* Summary Card */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="grid grid-cols-3 gap-4">
              {/* Total Players */}
              <div className="text-center">
                <p className="text-3xl mb-1" style={{ color: '#f97316' }}>{totalPlayers}</p>
                <p className="text-sm text-gray-600">Total Players</p>
              </div>
              
              {/* Joined */}
              <div className="text-center border-l border-r border-gray-200">
                <p className="text-3xl mb-1 text-green-600">{joinedPlayers}</p>
                <p className="text-sm text-gray-600">Joined</p>
              </div>
              
              {/* Pending */}
              <div className="text-center">
                <p className="text-3xl mb-1" style={{ color: '#f97316' }}>{pendingPlayers}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {mockPlayers.map((player) => (
            <PlayerListItem
              key={player.id}
              jerseyNumber={player.jerseyNumber}
              name={player.name}
              image={player.image}
              isLinked={player.isLinked}
              onClick={() => {
                setSelectedPlayerId(player.id);
                setCoachScreen(player.isLinked ? 'playerDetailLinked' : 'playerDetailUnlinked');
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const PlayerDetailUnlinkedScreen = () => {
    const player = mockPlayers.find((p) => p.id === selectedPlayerId);
    if (!player) return null;

    return (
      <div className="min-h-screen bg-white pb-24">
        {/* Header Section */}
        <div className="bg-white p-6 pb-6 border-b border-gray-200">
          <button
            onClick={() => {
              setCoachScreen('playersList');
              setPlayerDetailTab('summary'); // Reset tab when going back
            }}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Players
          </button>

          <div className="text-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center text-white text-5xl mx-auto shadow-lg">
              {player.jerseyNumber}
            </div>
            <div>
              <h1 className="text-2xl mb-2" style={{ color: '#333333' }}>Player #{player.jerseyNumber}</h1>
              <div className="flex items-center justify-center gap-3">
                <span className="text-sm px-3 py-1 rounded-full bg-orange-100" style={{ color: '#f97316' }}>
                  Pending Invitation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Interface */}
        <Tabs value={playerDetailTab} onValueChange={(value) => setPlayerDetailTab(value as any)} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-gray-100 p-1 rounded-lg mx-6 my-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="p-6 pt-0 space-y-6">
            <div>
              <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Player Invite Code</h3>
              <InviteCodeBox
                code={`SP${player.jerseyNumber}TH${player.id.padStart(3, '0')}`}
                onShare={() => alert('Share functionality would open native share dialog')}
              />
            </div>

            {/* Attribute Overview Card */}
            {player.attributes && (
              <div>
                <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Attribute Overview</h3>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <AttributeRadarChart attributes={player.attributes} />
                </div>
              </div>
            )}

            {/* Season Statistics Card */}
            <div>
              <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Season Statistics</h3>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="space-y-4">
                  {/* General */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">General</p>
                    <div className="space-y-1">
                      <StatListItem label="Matches Played" value={player.matchesPlayed || 0} />
                    </div>
                  </div>

                  {/* Attacking */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">Attacking</p>
                    <div className="space-y-1">
                      <StatListItem label="Goals" value={player.goals || 0} />
                      <StatListItem label="Assists" value={player.assists || 0} />
                      <StatListItem label="Expected Goals (xG)" value={player.xG?.toFixed(1) || '0.0'} />
                      <StatListItem label="Shots per Game" value={player.shotsPerGame?.toFixed(1) || '0.0'} />
                      <StatListItem label="Shots on Target per Game" value={player.shotsOnTargetPerGame?.toFixed(1) || '0.0'} />
                    </div>
                  </div>

                  {/* Passing */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">Passing</p>
                    <div className="space-y-1">
                      <StatListItem label="Total Passes" value={player.totalPasses || 0} />
                      <StatListItem label="Passes Completed" value={player.passesCompleted || 0} />
                    </div>
                  </div>

                  {/* Dribbling */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">Dribbling</p>
                    <div className="space-y-1">
                      <StatListItem label="Total Dribbles" value={player.totalDribbles || 0} />
                      <StatListItem label="Successful Dribbles" value={player.successfulDribbles || 0} />
                    </div>
                  </div>

                  {/* Defending */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">Defending</p>
                    <div className="space-y-1">
                      <StatListItem label="Tackles" value={player.tackles || 0} />
                      <StatListItem label="Tackle Success %" value={`${player.tackleSuccessRate || 0}%`} />
                      <StatListItem label="Interceptions" value={player.interceptions || 0} />
                      <StatListItem label="Interception Success %" value={`${player.interceptionSuccessRate || 0}%`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="p-6 pt-0">
            <div>
              <h3 className="text-lg mb-4" style={{ color: '#333333' }}>Match History</h3>
              <div className="space-y-3">
                {mockMatches.map((match) => (
                  <MatchListItem
                    key={match.id}
                    opponent={match.opponent}
                    date={match.date}
                    score={match.score}
                    result={match.result}
                    clubName={mockClubData.clubName}
                    onClick={() => {
                      setSelectedMatchId(match.id);
                      setMatchPlayerStatsTab('stats');
                      setCoachScreen('matchPlayerStats');
                    }}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="p-6 pt-0">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg" style={{ color: '#333333' }}>Training Plans</h3>
              </div>
              <Button 
                onClick={() => {
                  // Pre-fill with AI-generated mock data immediately
                  setTrainingForm({
                    planName: 'Shooting Accuracy Improvement',
                    duration: '4',
                    additionalNotes: ''
                  });
                  setExercises([
                    {
                      name: 'Target Shooting Drill',
                      description: 'Practice shooting at designated target zones in the goal from various angles',
                      sets: '3',
                      reps: '10',
                      minutes: '20'
                    },
                    {
                      name: 'First Touch & Finish',
                      description: 'Receive passes and shoot on goal with maximum 2 touches',
                      sets: '4',
                      reps: '8',
                      minutes: '15'
                    },
                    {
                      name: 'Power Shot Training',
                      description: 'Work on generating shot power while maintaining accuracy',
                      sets: '3',
                      reps: '12',
                      minutes: '18'
                    }
                  ]);
                  setCurrentExercise({ name: '', description: '', sets: '', reps: '', minutes: '' });
                  setCoachScreen('assignTraining');
                }}
                className="w-full mb-4 py-3 bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white shadow-lg"
              >
                <Zap className="h-4 w-4 mr-2" />
                Create Training Plan Using AI
              </Button>
              <div className="space-y-3">
                {mockTrainingPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => {
                      setSelectedTrainingPlanId(plan.id);
                      setCoachScreen('trainingPlanDetail');
                    }}
                    className="w-full p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md hover:border-gray-300 transition-all active:scale-[0.98] text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="mb-1" style={{ color: '#333333' }}>{plan.title}</p>
                        <p className="text-sm text-gray-600">{plan.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full flex-shrink-0 ${
                          plan.status === 'completed' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                        }`}>
                          {plan.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const PlayerDetailLinkedScreen = () => {
    const player = mockPlayers.find((p) => p.id === selectedPlayerId);
    if (!player) return null;

    return (
      <div className="min-h-screen bg-white pb-24">
        {/* Header Section */}
        <div className="bg-white p-6 pb-6 border-b border-gray-200">
          <button
            onClick={() => {
              setCoachScreen('playersList');
              setPlayerDetailTab('summary'); // Reset tab when going back
            }}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Players
          </button>

          <div className="text-center space-y-4">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mx-auto shadow-lg">
              <ImageWithFallback
                src={player.image || ''}
                alt={player.name || ''}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl mb-2" style={{ color: '#333333' }}>{player.name}</h1>
              <div className="flex items-center justify-center gap-3 text-gray-600">
                <span>#{player.jerseyNumber}</span>
                <span>•</span>
                <span>{player.height || "5'11\""}</span>
                <span>•</span>
                <span>23 years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Interface */}
        <Tabs value={playerDetailTab} onValueChange={(value) => setPlayerDetailTab(value as any)} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-gray-100 p-1 rounded-lg mx-6 my-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="p-6 pt-0 space-y-6">
            {/* Attribute Overview Card */}
            {player.attributes && (
              <div>
                <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Attribute Overview</h3>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <AttributeRadarChart attributes={player.attributes} />
                </div>
              </div>
            )}

            {/* Season Statistics Card */}
            <div>
              <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Season Statistics</h3>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="space-y-4">
                  {/* General */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">General</p>
                    <div className="space-y-1">
                      <StatListItem label="Matches Played" value={player.matchesPlayed || 0} />
                    </div>
                  </div>

                  {/* Attacking */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">Attacking</p>
                    <div className="space-y-1">
                      <StatListItem label="Goals" value={player.goals || 0} />
                      <StatListItem label="Assists" value={player.assists || 0} />
                      <StatListItem label="Expected Goals (xG)" value={player.xG?.toFixed(1) || '0.0'} />
                      <StatListItem label="Shots per Game" value={player.shotsPerGame?.toFixed(1) || '0.0'} />
                      <StatListItem label="Shots on Target per Game" value={player.shotsOnTargetPerGame?.toFixed(1) || '0.0'} />
                    </div>
                  </div>

                  {/* Passing */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">Passing</p>
                    <div className="space-y-1">
                      <StatListItem label="Total Passes" value={player.totalPasses || 0} />
                      <StatListItem label="Passes Completed" value={player.passesCompleted || 0} />
                    </div>
                  </div>

                  {/* Dribbling */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">Dribbling</p>
                    <div className="space-y-1">
                      <StatListItem label="Total Dribbles" value={player.totalDribbles || 0} />
                      <StatListItem label="Successful Dribbles" value={player.successfulDribbles || 0} />
                    </div>
                  </div>

                  {/* Defending */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">Defending</p>
                    <div className="space-y-1">
                      <StatListItem label="Tackles" value={player.tackles || 0} />
                      <StatListItem label="Tackle Success %" value={`${player.tackleSuccessRate || 0}%`} />
                      <StatListItem label="Interceptions" value={player.interceptions || 0} />
                      <StatListItem label="Interception Success %" value={`${player.interceptionSuccessRate || 0}%`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="p-6 pt-0">
            <div>
              <h3 className="text-lg mb-4" style={{ color: '#333333' }}>Match History</h3>
              <div className="space-y-3">
                {mockMatches.map((match) => (
                  <MatchListItem
                    key={match.id}
                    opponent={match.opponent}
                    date={match.date}
                    score={match.score}
                    result={match.result}
                    clubName={mockClubData.clubName}
                    onClick={() => {
                      setSelectedMatchId(match.id);
                      setMatchPlayerStatsTab('stats');
                      setCoachScreen('matchPlayerStats');
                    }}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="p-6 pt-0">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg" style={{ color: '#333333' }}>Training Plans</h3>
              </div>
              <Button 
                onClick={() => {
                  // Pre-fill with AI-generated mock data immediately
                  setTrainingForm({
                    planName: 'Shooting Accuracy Improvement',
                    duration: '4',
                    additionalNotes: ''
                  });
                  setExercises([
                    {
                      name: 'Target Shooting Drill',
                      description: 'Practice shooting at designated target zones in the goal from various angles',
                      sets: '3',
                      reps: '10',
                      minutes: '20'
                    },
                    {
                      name: 'First Touch & Finish',
                      description: 'Receive passes and shoot on goal with maximum 2 touches',
                      sets: '4',
                      reps: '8',
                      minutes: '15'
                    },
                    {
                      name: 'Power Shot Training',
                      description: 'Work on generating shot power while maintaining accuracy',
                      sets: '3',
                      reps: '12',
                      minutes: '18'
                    }
                  ]);
                  setCurrentExercise({ name: '', description: '', sets: '', reps: '', minutes: '' });
                  setCoachScreen('assignTraining');
                }}
                className="w-full mb-4 py-3 bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white shadow-lg"
              >
                <Zap className="h-4 w-4 mr-2" />
                Create Training Plan Using AI
              </Button>
              <div className="space-y-3">
                {mockTrainingPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => {
                      setSelectedTrainingPlanId(plan.id);
                      setCoachScreen('trainingPlanDetail');
                    }}
                    className="w-full p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md hover:border-gray-300 transition-all active:scale-[0.98] text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="mb-1" style={{ color: '#333333' }}>{plan.title}</p>
                        <p className="text-sm text-gray-600">{plan.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full flex-shrink-0 ${
                          plan.status === 'completed' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                        }`}>
                          {plan.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const TrainingPlanDetailScreen = () => {
    const plan = mockTrainingPlans.find((p) => p.id === selectedTrainingPlanId);
    if (!plan) return null;

    const isCoach = userType === 'coach';
    
    // Initialize completed exercises state for this plan if it doesn't exist
    React.useEffect(() => {
      if (!completedExercises[plan.id]) {
        const initialState = plan.exercises.map(ex => ex.completed);
        setCompletedExercises(prev => ({
          ...prev,
          [plan.id]: initialState
        }));
      }
    }, [plan.id]);

    // Get current completion state
    const currentCompletedExercises = completedExercises[plan.id] || plan.exercises.map(ex => ex.completed);
    
    // Calculate dynamic progress
    const completedCount = currentCompletedExercises.filter(Boolean).length;
    const totalExercises = plan.exercises.length;
    const progressPercentage = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;
    
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

    // Toggle exercise completion (only for players)
    const toggleExerciseCompletion = (exerciseIndex: number) => {
      if (isCoach) return; // Coaches can't toggle
      
      setCompletedExercises(prev => {
        const planExercises = [...(prev[plan.id] || currentCompletedExercises)];
        planExercises[exerciseIndex] = !planExercises[exerciseIndex];
        return {
          ...prev,
          [plan.id]: planExercises
        };
      });
    };

    return (
      <div className="min-h-screen bg-white pb-24">
        {/* Header Section */}
        <div className="bg-white p-6 pb-6 border-b border-gray-200">
          <button
            onClick={() => {
              if (isCoach) {
                setCoachScreen('playerDetailLinked');
              } else {
                setPlayerScreen('myStats');
                setPlayerDetailTab('training');
              }
            }}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>

          <div className="space-y-4">
            {/* Training Plan Name */}
            <h1 className="text-2xl" style={{ color: '#333333' }}>{plan.title}</h1>

            {/* Player Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={plan.playerImage || ''}
                  alt={plan.playerName || ''}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm" style={{ color: '#333333' }}>{plan.playerName}</p>
                <p className="text-xs text-gray-600">#{plan.playerJerseyNumber}</p>
              </div>
            </div>

            {/* Status and Date */}
            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1 rounded-full ${
                plan.status === 'completed' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
              }`}>
                {plan.status === 'completed' ? 'Completed' : 'In Progress'}
              </span>
              <span className="text-sm text-gray-600">{plan.createdDate}</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Progress Card */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex flex-col items-center">
              {/* Circular Progress */}
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#facc15" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Percentage text in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl" style={{ color: '#333333' }}>{progressPercentage}%</span>
                </div>
              </div>

              {/* Completion text */}
              <p className="text-gray-600 text-center">
                {completedCount} of {totalExercises} Exercises Completed
              </p>
            </div>
          </div>

          {/* Exercises List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg" style={{ color: '#333333' }}>Exercise List</h3>
              {!isCoach && (
                <span className="text-xs text-gray-500">Tap to mark complete</span>
              )}
            </div>
            <div className="space-y-3">
              {plan.exercises.map((exercise, idx) => {
                const isCompleted = currentCompletedExercises[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleExerciseCompletion(idx)}
                    disabled={isCoach}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      isCompleted 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200'
                    } ${!isCoach ? 'cursor-pointer hover:shadow-md active:scale-[0.98]' : 'cursor-default'}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Completion Indicator */}
                      <div className="flex-shrink-0 mt-1">
                        {isCompleted ? (
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <div className={`w-6 h-6 rounded-full border-2 bg-white transition-colors ${
                            !isCoach ? 'border-gray-300 hover:border-orange-400' : 'border-gray-300'
                          }`}></div>
                        )}
                      </div>

                      {/* Exercise Info */}
                      <div className="flex-1">
                        <p className={`mb-1 ${isCompleted ? 'line-through text-gray-500' : ''}`} style={isCompleted ? {} : { color: '#333333' }}>{exercise.name}</p>
                        <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                        <div className="flex gap-4 text-sm text-gray-600">
                          {exercise.sets && <span>Sets: {exercise.sets}</span>}
                          {exercise.reps && <span>Reps: {exercise.reps}</span>}
                          {exercise.minutes && <span>Minutes: {exercise.minutes}</span>}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coach Notes Section */}
          <div>
            <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Coach Notes</h3>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-orange-200">
              {plan.coachNotes ? (
                <p className="text-gray-700">{plan.coachNotes}</p>
              ) : (
                <p className="text-gray-500 italic">No additional notes</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };


  const AssignSuccessScreen = () => {
    const player = mockPlayers.find((p) => p.id === selectedPlayerId);
    const hasNavigated = React.useRef(false);
    
    React.useEffect(() => {
      if (hasNavigated.current) return;
      hasNavigated.current = true;

      const timeout = setTimeout(() => {
        setCoachScreen('playerDetailLinked');
        setPlayerDetailTab('training');
      }, 3000);

      return () => clearTimeout(timeout);
    });

    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <div className="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-2xl">
            <Check className="h-16 w-16 text-white" />
          </div>
          <div>
            <h1 className="text-2xl mb-2 flex items-center justify-center gap-2" style={{ color: '#333333' }}>
              Training Plan Assigned! <Check className="h-6 w-6 text-green-500" />
            </h1>
            <p className="text-gray-600">{player?.name} has been notified</p>
          </div>
        </div>
      </div>
    );
  };

  const AssignTrainingScreen = () => {
    const player = mockPlayers.find((p) => p.id === selectedPlayerId);

    const handleAddExercise = () => {
      if (!currentExercise.name || !currentExercise.description) {
        alert('Please fill in exercise name and description');
        return;
      }
      setExercises([...exercises, { ...currentExercise }]);
      setCurrentExercise({ name: '', description: '', sets: '', reps: '', minutes: '' });
    };

    const handleRemoveExercise = (index: number) => {
      setExercises(exercises.filter((_, i) => i !== index));
    };

    const handleEditExercise = (index: number) => {
      setEditingExerciseIndex(index);
      setEditingExerciseData({ ...exercises[index] });
    };

    const handleSaveEdit = () => {
      if (editingExerciseIndex === null || !editingExerciseData) return;
      if (!editingExerciseData.name || !editingExerciseData.description) {
        alert('Please fill in exercise name and description');
        return;
      }
      const updatedExercises = [...exercises];
      updatedExercises[editingExerciseIndex] = { ...editingExerciseData };
      setExercises(updatedExercises);
      setEditingExerciseIndex(null);
      setEditingExerciseData(null);
    };

    const handleCancelEdit = () => {
      setEditingExerciseIndex(null);
      setEditingExerciseData(null);
    };

    const handleAssign = () => {
      if (!trainingForm.planName || !trainingForm.duration) {
        alert('Please fill in required fields');
        return;
      }
      if (exercises.length === 0) {
        alert('Please add at least one exercise');
        return;
      }
      setCoachScreen('assignSuccess');
    };

    if (!player) return null;

    return (
      <div className="min-h-screen bg-white pb-24">
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 pb-8">
          <button
            onClick={() => setCoachScreen('playerDetailLinked')}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Player
          </button>
          <h1 className="text-2xl mb-2" style={{ color: '#333333' }}>Assign Training Plan</h1>
          <p className="text-gray-600">Create a personalized training plan for {player?.name}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Player Info Card */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Assigning to:</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={player?.image || ''}
                  alt={player?.name || ''}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p style={{ color: '#333333' }}>{player?.name}</p>
                <p className="text-sm text-gray-600">#{player?.jerseyNumber}</p>
              </div>
            </div>
          </div>

          {/* Training Plan Name */}
          <div className="space-y-2">
            <Label htmlFor="planName" style={{ color: '#333333' }}>Training Plan Name *</Label>
            <Input
              id="planName"
              type="text"
              placeholder="e.g. Shooting Accuracy Improvement"
              value={trainingForm.planName}
              onChange={(e) => setTrainingForm({ ...trainingForm, planName: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              style={{ color: '#333333' }}
              required
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" style={{ color: '#333333' }}>Duration *</Label>
            <select
              id="duration"
              value={trainingForm.duration}
              onChange={(e) => setTrainingForm({ ...trainingForm, duration: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              style={{ color: '#333333' }}
              required
            >
              <option value="">Select duration</option>
              {Array.from({ length: 8 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} week{i > 0 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* Exercises Section */}
          <div className="space-y-3">
            <Label style={{ color: '#333333' }}>Exercises</Label>
            
            {/* Exercise List */}
            {exercises.map((exercise, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border-2 border-gray-200">
                {editingExerciseIndex === idx && editingExerciseData ? (
                  // Edit Mode
                  <div className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Exercise Name *"
                      value={editingExerciseData.name}
                      onChange={(e) => setEditingExerciseData({ ...editingExerciseData, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
                      style={{ color: '#333333' }}
                    />
                    
                    <textarea
                      placeholder="Exercise Description *"
                      value={editingExerciseData.description}
                      onChange={(e) => setEditingExerciseData({ ...editingExerciseData, description: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 min-h-[80px] resize-y focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      style={{ color: '#333333' }}
                    />
                    
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        type="number"
                        placeholder="Sets"
                        value={editingExerciseData.sets}
                        onChange={(e) => setEditingExerciseData({ ...editingExerciseData, sets: e.target.value })}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2"
                        style={{ color: '#333333' }}
                        min="0"
                      />
                      <Input
                        type="number"
                        placeholder="Reps"
                        value={editingExerciseData.reps}
                        onChange={(e) => setEditingExerciseData({ ...editingExerciseData, reps: e.target.value })}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2"
                        style={{ color: '#333333' }}
                        min="0"
                      />
                      <Input
                        type="number"
                        placeholder="Minutes"
                        value={editingExerciseData.minutes}
                        onChange={(e) => setEditingExerciseData({ ...editingExerciseData, minutes: e.target.value })}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2"
                        style={{ color: '#333333' }}
                        min="0"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        type="button"
                        onClick={handleSaveEdit}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Display Mode
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="mb-1" style={{ color: '#333333' }}>{exercise.name}</p>
                      <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                      <div className="flex gap-4 text-sm">
                        {exercise.sets && <span className="text-gray-600">Sets: {exercise.sets}</span>}
                        {exercise.reps && <span className="text-gray-600">Reps: {exercise.reps}</span>}
                        {exercise.minutes && <span className="text-gray-600">Minutes: {exercise.minutes}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() => handleEditExercise(idx)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleRemoveExercise(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Add New Exercise Form */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-orange-200 space-y-3">
              <p className="text-sm" style={{ color: '#333333' }}>Add New Exercise</p>
              
              <Input
                type="text"
                placeholder="Exercise Name *"
                value={currentExercise.name}
                onChange={(e) => setCurrentExercise({ ...currentExercise, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
                style={{ color: '#333333' }}
              />
              
              <textarea
                placeholder="Exercise Description *"
                value={currentExercise.description}
                onChange={(e) => setCurrentExercise({ ...currentExercise, description: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 min-h-[80px] resize-y focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                style={{ color: '#333333' }}
              />
              
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  placeholder="Sets"
                  value={currentExercise.sets}
                  onChange={(e) => setCurrentExercise({ ...currentExercise, sets: e.target.value })}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2"
                  style={{ color: '#333333' }}
                  min="0"
                />
                <Input
                  type="number"
                  placeholder="Reps"
                  value={currentExercise.reps}
                  onChange={(e) => setCurrentExercise({ ...currentExercise, reps: e.target.value })}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2"
                  style={{ color: '#333333' }}
                  min="0"
                />
                <Input
                  type="number"
                  placeholder="Minutes"
                  value={currentExercise.minutes}
                  onChange={(e) => setCurrentExercise({ ...currentExercise, minutes: e.target.value })}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2"
                  style={{ color: '#333333' }}
                  min="0"
                />
              </div>
              
              <Button
                type="button"
                onClick={handleAddExercise}
                className="w-full bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Exercise
              </Button>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="additionalNotes" style={{ color: '#333333' }}>Additional Notes from Coach (Optional)</Label>
            <textarea
              id="additionalNotes"
              placeholder="Add any additional instructions or notes..."
              value={trainingForm.additionalNotes}
              onChange={(e) => setTrainingForm({ ...trainingForm, additionalNotes: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 min-h-[100px] resize-y focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              style={{ color: '#333333' }}
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleAssign}
              className="w-full py-4 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white shadow-lg"
            >
              Assign Plan
            </Button>
            <Button
              type="button"
              onClick={() => setCoachScreen('playerDetailLinked')}
              className="w-full py-3 rounded-lg bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  };



  const AddMatchScreen = () => {
    const handleMatchVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setMatchForm({ ...matchForm, matchVideo: file });
    };

    const handleSubmitMatch = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle match submission
      alert('Match added successfully!');
      setCoachScreen('clubOverview');
    };

    return (
      <div className="min-h-screen bg-white pb-24">
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 pb-8">
          <button
            onClick={() => setCoachScreen('clubOverview')}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Club
          </button>
          <h1 className="text-2xl" style={{ color: '#333333' }}>Add New Match</h1>
        </div>

        <form onSubmit={handleSubmitMatch} className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="opponent" style={{ color: '#333333' }}>Opponent Team</Label>
            <Input
              id="opponent"
              type="text"
              placeholder="Enter opponent name"
              value={matchForm.opponent}
              onChange={(e) => setMatchForm({ ...matchForm, opponent: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              style={{ color: '#333333' }}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="matchDate" style={{ color: '#333333' }}>Match Date</Label>
              <Input
                id="matchDate"
                type="date"
                value={matchForm.date}
                onChange={(e) => setMatchForm({ ...matchForm, date: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                style={{ color: '#333333' }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="matchTime" style={{ color: '#333333' }}>Match Time</Label>
              <Input
                id="matchTime"
                type="time"
                value={matchForm.time}
                onChange={(e) => setMatchForm({ ...matchForm, time: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                style={{ color: '#333333' }}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" style={{ color: '#333333' }}>Location / Stadium</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="location"
                type="text"
                placeholder="Enter stadium or location"
                value={matchForm.location}
                onChange={(e) => setMatchForm({ ...matchForm, location: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                style={{ color: '#333333' }}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label style={{ color: '#333333' }}>Final Score</Label>
            <div className="grid grid-cols-3 gap-3 items-center">
              <Input
                type="number"
                placeholder="Home"
                value={matchForm.homeScore}
                onChange={(e) => setMatchForm({ ...matchForm, homeScore: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-center focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                style={{ color: '#333333' }}
                min="0"
                required
              />
              <span className="text-center text-gray-500">-</span>
              <Input
                type="number"
                placeholder="Away"
                value={matchForm.awayScore}
                onChange={(e) => setMatchForm({ ...matchForm, awayScore: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-center focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                style={{ color: '#333333' }}
                min="0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label style={{ color: '#333333' }}>Match Video (Optional)</Label>
            <div className="relative">
              <input
                type="file"
                accept="video/*"
                onChange={handleMatchVideoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="videoUpload"
              />
              <div className="w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 flex flex-col items-center justify-center hover:border-orange-400 hover:bg-orange-50 transition-colors cursor-pointer">
                {matchForm.matchVideo ? (
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <p className="text-sm" style={{ color: '#333333' }}>{matchForm.matchVideo.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(matchForm.matchVideo.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <>
                    <Activity className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 text-center mb-1">Upload Match Video</p>
                    <p className="text-xs text-gray-500 text-center">MP4, MOV, AVI up to 500MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <Button
              type="submit"
              className="w-full py-4 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white transition-all shadow-lg hover:shadow-xl"
            >
              Save Match
            </Button>
            <Button
              type="button"
              onClick={() => setCoachScreen('clubOverview')}
              className="w-full py-3 px-4 rounded-lg bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 transition-all"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  };

  const ChatbotScreen = () => {
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; content: string }>>([
      {
        role: 'bot',
        content: "Hi Coach! I'm your AI assistant. I can help you with tactics, training plans, player analysis, and team management. How can I help you today?"
      }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputMessage.trim()) return;

      // Add user message
      const newMessages = [...messages, { role: 'user' as const, content: inputMessage }];
      setMessages(newMessages);
      setInputMessage('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = getBotResponse(inputMessage);
        setMessages([...newMessages, { role: 'bot', content: botResponse }]);
      }, 1000);
    };

    const getBotResponse = (userInput: string): string => {
      const input = userInput.toLowerCase();
      
      if (input.includes('training') || input.includes('drill')) {
        return "I can help create personalized training plans! Based on your team's performance data, I recommend focusing on passing accuracy and defensive positioning. Would you like me to generate a detailed training plan?";
      } else if (input.includes('tactic') || input.includes('formation')) {
        return "Looking at your recent matches, your 4-3-3 formation has been effective with 70% win rate. However, against stronger opponents, consider switching to a 4-2-3-1 for better defensive stability. Would you like specific tactical adjustments?";
      } else if (input.includes('player') || input.includes('performance')) {
        return "Your top performers this season are Marcus Silva (8.2 avg rating) and Alex Chen (7.9 avg rating). I notice James Wilson's pass completion has dropped to 78% - this might need attention in training. Want detailed player analysis?";
      } else if (input.includes('match') || input.includes('game')) {
        return "Your next match is against Valley Rangers. They play high-press with aggressive wingers. I suggest focusing on quick counter-attacks and midfield control. Shall I provide a detailed match preparation plan?";
      } else if (input.includes('stats') || input.includes('data')) {
        return "Your team stats show 58% possession average and 18.2% shot conversion rate - both above league average! Areas for improvement: high press recoveries (115 vs 98 league avg). Need specific statistical insights?";
      } else {
        return "I understand you're asking about team management. I can provide insights on tactics, training programs, player performance, match preparation, and statistical analysis. What specific area would you like to explore?";
      }
    };

    const quickPrompts = [
      "Analyze our last match",
      "Create training plan",
      "Suggest tactics",
      "Player performance review"
    ];

    return (
      <div className="min-h-screen bg-white pb-24 flex flex-col">
        {/* Header */}
        <div className="bg-white p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center shadow-md">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl" style={{ color: '#333333' }}>AI Coach Assistant</h1>
              <p className="text-sm text-gray-600">Your tactical companion</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm border ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-yellow-400 to-red-500 text-white border-transparent'
                    : 'bg-white text-gray-900 border-gray-200'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          
          {messages.length === 1 && (
            <div className="space-y-3 mt-6">
              <p className="text-sm text-gray-600 mb-3">Quick suggestions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputMessage(prompt);
                      setTimeout(() => {
                        handleSendMessage(new Event('submit') as any);
                      }, 100);
                    }}
                    className="p-3 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all text-sm"
                    style={{ color: '#333333' }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="bg-white border-t border-gray-200 px-4 pb-4">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Ask about tactics, training, players..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-5 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:bg-white transition-colors"
              style={{ color: '#333333' }}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-md hover:shadow-lg flex-shrink-0"
            >
              <Send className="h-5 w-5 text-white" />
            </button>
          </form>
        </div>
      </div>
    );
  };

  // ==================== PLAYER SCREENS ====================

  const PlayerSignupScreen = () => (
    <div className="min-h-screen bg-white flex items-start justify-center p-6 pt-8 overflow-y-auto">
      <div className="w-full max-w-sm space-y-6 pb-8">
        {/* Header */}
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <img src={logoImage} alt="Stats Spinta Logo" className="h-16 w-auto object-contain" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-center text-xl" style={{ color: '#333333' }}>Create Your Player Account</h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-medium text-sm">✓</div>
              <span className="text-sm text-green-600">Join Club</span>
            </div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-red-500"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center text-white font-medium text-sm">2</div>
              <span className="text-sm" style={{ color: '#333333' }}>Player Info</span>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          setPlayerScreen('playerConfirmation');
        }} className="space-y-5">
          {/* Profile Picture Upload */}
          <div className="flex justify-center">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handlePlayerProfileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="playerProfileUpload"
              />
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center hover:border-orange-400 hover:bg-orange-50 transition-colors cursor-pointer">
                {playerForm.profilePicture ? (
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={URL.createObjectURL(playerForm.profilePicture)}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <>
                    <Camera className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500 text-center px-2">Add Photo</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Pre-filled Information Section */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-3">
            <p className="text-xs uppercase tracking-wide text-gray-600 mb-2">Pre-filled Information</p>
            
            {/* Player Name - Editable */}
            <div className="space-y-1">
              <Label htmlFor="playerFullName" className="text-xs text-gray-600">Player Name</Label>
              <Input
                id="playerFullName"
                type="text"
                placeholder="Enter your full name"
                value={playerForm.fullName}
                onChange={(e) => setPlayerForm({ ...playerForm, fullName: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                style={{ color: '#333333' }}
                required
              />
            </div>

            {/* Jersey Number - Read Only */}
            <div className="space-y-1">
              <Label className="text-xs text-gray-600">Jersey Number</Label>
              <div className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-gray-500 cursor-not-allowed">
                {invitationData.jerseyNumber}
              </div>
            </div>

            {/* Position - Read Only */}
            <div className="space-y-1">
              <Label className="text-xs text-gray-600">Position</Label>
              <div className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-gray-500 cursor-not-allowed capitalize">
                {invitationData.position}
              </div>
            </div>

            {/* Club - Read Only */}
            <div className="space-y-1">
              <Label className="text-xs text-gray-600">Club</Label>
              <div className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-gray-500 cursor-not-allowed">
                {invitationData.clubName}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="playerEmail" style={{ color: '#333333' }}>Email</Label>
            <Input
              id="playerEmail"
              type="email"
              placeholder="Enter your email"
              value={playerForm.email}
              onChange={(e) => setPlayerForm({ ...playerForm, email: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
              style={{ color: '#333333' }}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="playerPassword" style={{ color: '#333333' }}>Password</Label>
            <div className="relative">
              <Input
                id="playerPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={playerForm.password}
                onChange={(e) => setPlayerForm({ ...playerForm, password: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                style={{ color: '#333333' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="playerConfirmPassword" style={{ color: '#333333' }}>Confirm Password</Label>
            <div className="relative">
              <Input
                id="playerConfirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={playerForm.confirmPassword}
                onChange={(e) => setPlayerForm({ ...playerForm, confirmPassword: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                style={{ color: '#333333' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label style={{ color: '#333333' }}>Date of Birth</Label>
            <div className="grid grid-cols-3 gap-3">
              <select
                value={playerForm.birthMonth}
                onChange={(e) => setPlayerForm({ ...playerForm, birthMonth: e.target.value })}
                className="rounded-lg border border-gray-300 bg-white px-3 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors text-sm"
                style={{ color: '#333333' }}
                required
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(2000, i).toLocaleDateString('en', { month: 'long' })}
                  </option>
                ))}
              </select>
              <select
                value={playerForm.birthDay}
                onChange={(e) => setPlayerForm({ ...playerForm, birthDay: e.target.value })}
                className="rounded-lg border border-gray-300 bg-white px-3 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors text-sm"
                style={{ color: '#333333' }}
                required
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select
                value={playerForm.birthYear}
                onChange={(e) => setPlayerForm({ ...playerForm, birthYear: e.target.value })}
                className="rounded-lg border border-gray-300 bg-white px-3 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors text-sm"
                style={{ color: '#333333' }}
                required
              >
                <option value="">Year</option>
                {Array.from({ length: 40 }, (_, i) => {
                  const year = new Date().getFullYear() - 10 - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
          </div>

          {/* Height */}
          <div className="space-y-2">
            <Label htmlFor="height" style={{ color: '#333333' }}>Height</Label>
            <div className="relative">
              <Input
                id="height"
                type="number"
                placeholder="e.g., 175"
                value={playerForm.height}
                onChange={(e) => setPlayerForm({ ...playerForm, height: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                style={{ color: '#333333' }}
                required
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">cm</span>
            </div>
          </div>

          {/* Complete Signup Button */}
          <Button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            Complete Signup
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center pt-4">
          <p style={{ color: '#333333' }}>
            Already have an account?{' '}
            <button
              type="button"
              className="hover:underline transition-colors"
              style={{ color: '#f97316' }}
              onClick={() => {
                setUserType(null);
                setAuthScreen('login');
              }}
            >
              <strong>Log In</strong>
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const EnterInviteCodeScreen = () => (
    <div className="min-h-screen bg-white flex items-start justify-center p-6 pt-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <img src={logoImage} alt="Stats Spinta Logo" className="h-16 w-auto object-contain" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-center text-xl" style={{ color: '#333333' }}>Create Your Player Account</h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center text-white font-medium text-sm">1</div>
              <span className="text-sm" style={{ color: '#333333' }}>Join Club</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-medium text-sm">2</div>
              <span className="text-sm text-gray-500">Player Info</span>
            </div>
          </div>
        </div>

        {/* Circular Icon */}
        <div className="flex justify-center pt-2">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center shadow-lg">
            <Key className="h-12 w-12" style={{ color: '#f97316' }} />
          </div>
        </div>

        {/* Information Box */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
          <Info className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#f97316' }} />
          <p className="text-sm text-gray-700">
            Your coach has shared a unique code with you. Enter it below to join the team.
          </p>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          // Mock fetching player data based on invitation code
          setInvitationData({
            playerName: 'Marcus Silva',
            jerseyNumber: '10',
            position: 'Forward',
            clubName: 'Thunder United FC'
          });
          // Pre-fill the player form with fetched data
          setPlayerForm({
            ...playerForm,
            fullName: 'Marcus Silva',
            jerseyNumber: '10',
            position: 'forward',
            selectedClub: 'thunder'
          });
          setPlayerScreen('playerSignup');
        }} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="inviteCode" style={{ color: '#333333' }}>
              Invitation Code <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
              <Input
                id="inviteCode"
                type="text"
                placeholder="ENTER CODE"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                className="w-full rounded-lg border-2 border-orange-300 bg-white pl-12 pr-12 py-4 text-center tracking-widest focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                style={{ color: '#333333', letterSpacing: '0.2em' }}
                required
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.readText().then(text => {
                    setInviteCode(text.toUpperCase());
                  });
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Paste"
              >
                <Clipboard className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">Format: ABC-1234</p>
          </div>

          <Button
            type="submit"
            disabled={!inviteCode.trim()}
            className={`w-full py-4 px-4 rounded-lg text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
              inviteCode.trim()
                ? 'bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Confirm & Join
          </Button>
        </form>
      </div>
    </div>
  );

  const PlayerConfirmationScreen = () => {
    // Calculate age from birth date
    const calculateAge = () => {
      if (!playerForm.birthYear || !playerForm.birthMonth || !playerForm.birthDay) return '';
      const today = new Date();
      const birthDate = new Date(
        parseInt(playerForm.birthYear),
        parseInt(playerForm.birthMonth) - 1,
        parseInt(playerForm.birthDay)
      );
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return `${age} years`;
    };

    const handleGoToDashboard = () => {
      setPlayerTab('stats');
      setPlayerScreen('myStats');
      setPlayerDetailTab('summary');
    };

    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8 text-center">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center shadow-lg">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl" style={{ color: '#333333' }}>Welcome, {playerForm.fullName.split(' ')[0]}!</h1>
            <p className="text-lg text-gray-600">Your account is all set up and ready to go.</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
                {playerForm.profilePicture ? (
                  <img src={URL.createObjectURL(playerForm.profilePicture)} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-yellow-100 to-orange-100 flex items-center justify-center">
                    <span className="text-2xl" style={{ color: '#333333' }}>
                      {playerForm.fullName ? playerForm.fullName.charAt(0).toUpperCase() : 'P'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl" style={{ color: '#333333' }}>
                {playerForm.selectedClub === 'thunder' ? 'Thunder United FC' : 
                 playerForm.selectedClub === 'strikers' ? 'City Strikers' :
                 playerForm.selectedClub === 'eagles' ? 'Eagles FC' :
                 playerForm.selectedClub === 'rangers' ? 'Valley Rangers' :
                 playerForm.selectedClub === 'phoenix' ? 'Phoenix FC' : 'Your Club'}
              </h2>
            </div>

            <div className="w-full h-px bg-gray-200"></div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Jersey Number</span>
                <span style={{ color: '#333333' }}>#{playerForm.jerseyNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Position</span>
                <span style={{ color: '#333333' }}>
                  {playerForm.position === 'attack' ? 'Attack' :
                   playerForm.position === 'midfield' ? 'Midfielder' :
                   playerForm.position === 'defender' ? 'Defender' :
                   playerForm.position === 'goalkeeper' ? 'Goalkeeper' : playerForm.position}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Age</span>
                <span style={{ color: '#333333' }}>{calculateAge()}</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleGoToDashboard}
            className="w-full py-4 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  };

  const PlayerOwnProfileScreen = () => {
    const player = mockPlayers[0]; // Using first player as logged in player

    return (
      <div className="min-h-screen bg-white pb-24">
        {/* Header Section - No Back Button */}
        <div className="bg-white p-6 pb-6 border-b border-gray-200">
          <div className="text-center space-y-4">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mx-auto shadow-lg">
              <ImageWithFallback
                src={player.image || ''}
                alt={player.name || ''}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl mb-2" style={{ color: '#333333' }}>{player.name}</h1>
              <div className="flex items-center justify-center gap-3 text-gray-600">
                <span>#{player.jerseyNumber}</span>
                <span>•</span>
                <span>{player.height || "5'11\""}</span>
                <span>•</span>
                <span>23 years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab - No TabsList */}
        {playerDetailTab === 'summary' && (
          <div className="p-6 pt-0 space-y-6 mt-6">
            {/* Attribute Overview Card */}
            {player.attributes && (
              <div>
                <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Attribute Overview</h3>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <AttributeRadarChart attributes={player.attributes} />
                </div>
              </div>
            )}

            {/* Season Statistics Card */}
            <div>
              <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Season Statistics</h3>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="space-y-4">
                  {/* General */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">General</p>
                    <div className="space-y-1">
                      <StatListItem label="Matches Played" value={player.matchesPlayed || 0} />
                    </div>
                  </div>

                  {/* Attacking */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">Attacking</p>
                    <div className="space-y-1">
                      <StatListItem label="Goals" value={player.goals || 0} />
                      <StatListItem label="Assists" value={player.assists || 0} />
                      <StatListItem label="Expected Goals (xG)" value={player.xG?.toFixed(1) || '0.0'} />
                      <StatListItem label="Shots per Game" value={player.shotsPerGame?.toFixed(1) || '0.0'} />
                      <StatListItem label="Shots on Target per Game" value={player.shotsOnTargetPerGame?.toFixed(1) || '0.0'} />
                    </div>
                  </div>

                  {/* Passing */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">Passing</p>
                    <div className="space-y-1">
                      <StatListItem label="Total Passes" value={player.totalPasses || 0} />
                      <StatListItem label="Passes Completed" value={player.passesCompleted || 0} />
                    </div>
                  </div>

                  {/* Dribbling */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">Dribbling</p>
                    <div className="space-y-1">
                      <StatListItem label="Total Dribbles" value={player.totalDribbles || 0} />
                      <StatListItem label="Successful Dribbles" value={player.successfulDribbles || 0} />
                    </div>
                  </div>

                  {/* Defending */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 px-3">Defending</p>
                    <div className="space-y-1">
                      <StatListItem label="Tackles" value={player.tackles || 0} />
                      <StatListItem label="Tackle Success %" value={`${player.tackleSuccessRate || 0}%`} />
                      <StatListItem label="Interceptions" value={player.interceptions || 0} />
                      <StatListItem label="Interception Success %" value={`${player.interceptionSuccessRate || 0}%`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Matches Tab Content */}
        {playerDetailTab === 'matches' && (
          <div className="p-6 pt-0 mt-6">
            <div>
              <h3 className="text-lg mb-4" style={{ color: '#333333' }}>Match History</h3>
              <div className="space-y-3">
                {mockMatches.map((match) => (
                  <MatchListItem
                    key={match.id}
                    opponent={match.opponent}
                    date={match.date}
                    score={match.score}
                    result={match.result}
                    clubName={mockClubData.clubName}
                    onClick={() => {
                      setSelectedMatchId(match.id);
                      setMatchPlayerStatsTab('stats');
                      setPlayerScreen('matchPlayerStats');
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Training Tab Content */}
        {playerDetailTab === 'training' && (
          <div className="p-6 pt-0 mt-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg" style={{ color: '#333333' }}>Training Plans</h3>
              </div>
              <div className="space-y-3">
                {mockTrainingPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => {
                      setSelectedTrainingPlanId(plan.id);
                      setPlayerScreen('trainingPlanDetail');
                    }}
                    className="w-full p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md hover:border-gray-300 transition-all active:scale-[0.98] text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="mb-1" style={{ color: '#333333' }}>{plan.title}</p>
                        <p className="text-sm text-gray-600">{plan.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full flex-shrink-0 ${
                          plan.status === 'completed' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                        }`}>
                          {plan.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };


  // ==================== SHARED SCREENS ====================

  const MatchPlayerStatsScreen = () => {
    const isCoach = userType === 'coach';

    return (
      <div className="min-h-screen bg-white pb-24">
        {/* Header Section */}
        <div className="bg-white p-6 pb-6 border-b border-gray-200">
          <button
            onClick={() => {
              if (isCoach) {
                setCoachScreen('playerDetailLinked');
              } else {
                setPlayerScreen('myStats');
                setPlayerDetailTab('matches');
              }
            }}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>

          <div className="text-center space-y-4">
            <p className="text-gray-600 text-sm">{mockMatchPlayerStats.date}</p>
            
            <div className="flex items-center justify-between gap-4">
              {/* Home Team */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center text-white text-xl mb-2 shadow-lg">
                  {mockClubData.clubName.charAt(0)}
                </div>
                <p className="text-xs text-center" style={{ color: '#333333' }}>{mockClubData.clubName}</p>
              </div>

              {/* Score */}
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-1" style={{ color: '#333333' }}>
                  {mockMatchPlayerStats.homeScore} - {mockMatchPlayerStats.awayScore}
                </div>
              </div>

              {/* Away Team */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white text-xl mb-2 shadow-lg">
                  {mockMatchPlayerStats.opponent.charAt(0)}
                </div>
                <p className="text-xs text-center" style={{ color: '#333333' }}>{mockMatchPlayerStats.opponent}</p>
              </div>
            </div>

            {/* Player Performance - Most Prominent */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">{mockMatchPlayerStats.playerName}</p>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-5xl mb-1" style={{ color: '#10b981' }}>{mockMatchPlayerStats.stats.goals}</div>
                  <p className="text-sm text-gray-600">Goals</p>
                </div>
                <div className="text-4xl text-gray-300">•</div>
                <div className="text-center">
                  <div className="text-5xl mb-1" style={{ color: '#f97316' }}>{mockMatchPlayerStats.stats.assists}</div>
                  <p className="text-sm text-gray-600">Assists</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Content - No Tabs */}
        <div className="p-6 space-y-4">
          {/* Card 1: Attacking */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Attacking</h3>
            <div className="space-y-1">
              <StatListItem label="Goals" value={mockMatchPlayerStats.stats.goals} />
              <StatListItem label="Assists" value={mockMatchPlayerStats.stats.assists} />
              <StatListItem label="xG" value={mockMatchPlayerStats.stats.xG?.toFixed(1) || '0.0'} />
              <StatListItem label="Total Shots" value={mockMatchPlayerStats.stats.shots} />
              <StatListItem label="Shots on Target" value={mockMatchPlayerStats.stats.shotsOnTarget} />
              <StatListItem label="Total Dribbles" value={mockMatchPlayerStats.stats.totalDribbles || 0} />
              <StatListItem label="Successful Dribbles" value={mockMatchPlayerStats.stats.dribblesSuccessful} />
            </div>
          </div>

          {/* Card 2: Passing */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Passing</h3>
            <div className="space-y-1">
              <StatListItem label="Total Passes" value={mockMatchPlayerStats.stats.totalPasses} />
              <StatListItem label="Passes Completed" value={mockMatchPlayerStats.stats.passesCompleted} />
              <StatListItem label="Short Passes" value={mockMatchPlayerStats.stats.shortPasses || 0} />
              <StatListItem label="Long Passes" value={mockMatchPlayerStats.stats.longPasses || 0} />
              <StatListItem label="Final Third" value={mockMatchPlayerStats.stats.finalThirdPasses || 0} />
              <StatListItem label="Crosses" value={mockMatchPlayerStats.stats.crosses || 0} />
            </div>
          </div>

          {/* Card 3: Defending */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="text-lg mb-3" style={{ color: '#333333' }}>Defending</h3>
            <div className="space-y-1">
              <StatListItem label="Tackles" value={mockMatchPlayerStats.stats.tackles || 0} />
              <StatListItem label="Tackle Success %" value={`${mockMatchPlayerStats.stats.tackleSuccessRate || 0}%`} />
              <StatListItem label="Interceptions" value={mockMatchPlayerStats.stats.interceptions} />
              <StatListItem label="Interception Success %" value={`${mockMatchPlayerStats.stats.interceptionSuccessRate || 0}%`} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== RENDER ====================

  const renderScreen = () => {
    // Auth screens
    if (!userType) {
      switch (authScreen) {
        case 'login':
          return <LoginScreen />;
        case 'signup':
          return <SignupScreen />;
        case 'coachSignup':
          return <CoachSignupScreen />;
        case 'clubInfo':
          return <ClubInfoScreen />;
        case 'confirmation':
          return <ConfirmationScreen />;
        default:
          return <LoginScreen />;
      }
    }

    // Coach screens
    if (userType === 'coach') {
      // Show chatbot when chatbot tab is active
      if (coachTab === 'chatbot') {
        return (
          <>
            <ChatbotScreen />
            <BottomNavigation userType="coach" activeTab={coachTab} onTabChange={handleCoachTabChange} />
          </>
        );
      }

      let content;
      switch (coachScreen) {
        case 'clubOverview':
          content = <ClubOverviewScreen />;
          break;
        case 'matchDetail':
          content = <MatchDetailScreen />;
          break;
        case 'playersList':
          content = <PlayersListScreen />;
          break;
        case 'playerDetailUnlinked':
          content = <PlayerDetailUnlinkedScreen />;
          break;
        case 'playerDetailLinked':
          content = <PlayerDetailLinkedScreen />;
          break;
        case 'matchPlayerStats':
          content = <MatchPlayerStatsScreen />;
          break;
        case 'addMatch':
          content = <AddMatchScreen />;
          break;
        case 'assignTraining':
          content = <AssignTrainingScreen />;
          break;
        case 'assignSuccess':
          content = <AssignSuccessScreen />;
          break;
        case 'createTrainingPlan':
          content = <CreateTrainingPlanScreen />;
          break;
        case 'trainingPlanDetail':
          content = <TrainingPlanDetailScreen />;
          break;
        case 'profile':
          content = (
            <CoachProfile
              coachName={coachForm.fullName || mockClubData.coachName}
              clubName={clubForm.clubName || mockClubData.clubName}
              email={coachForm.email}
              gender={coachForm.gender}
              birthdate={coachForm.birthMonth && coachForm.birthDay && coachForm.birthYear
                ? `${coachForm.birthMonth}/${coachForm.birthDay}/${coachForm.birthYear}`
                : 'Not specified'}
              totalPlayers={mockPlayers.filter(p => p.isLinked).length}
              totalMatches={mockClubData.basicStats.matchesPlayed}
              winRate={Math.round((mockClubData.basicStats.wins / mockClubData.basicStats.matchesPlayed) * 100)}
              onLogout={handleLogout}
            />
          );
          break;
        default:
          content = <ClubOverviewScreen />;
      }

      return (
        <>
          {content}
          <BottomNavigation userType="coach" activeTab={coachTab} onTabChange={handleCoachTabChange} />
        </>
      );
    }

    // Player screens
    if (userType === 'player') {
      // If not authenticated yet, show signup/invite code flow
      if (playerScreen === 'playerSignup' || playerScreen === 'enterInviteCode' || playerScreen === 'playerConfirmation') {
        switch (playerScreen) {
          case 'playerSignup':
            return <PlayerSignupScreen />;
          case 'enterInviteCode':
            return <EnterInviteCodeScreen />;
          case 'playerConfirmation':
            return <PlayerConfirmationScreen />;
        }
      }

      // Authenticated player screens
      let content;
      const currentPlayer = mockPlayers.find(p => p.id === '1') || mockPlayers[0]; // Using Marcus Silva as default player
      switch (playerScreen) {
        case 'myStats':
          content = <PlayerOwnProfileScreen />;
          break;
        case 'trainingPlanDetail':
          content = <TrainingPlanDetailScreen />;
          break;
        case 'matchPlayerStats':
          content = <MatchPlayerStatsScreen />;
          break;
        case 'profile':
          const birthDate = playerForm.birthMonth && playerForm.birthDay && playerForm.birthYear
            ? new Date(parseInt(playerForm.birthYear), parseInt(playerForm.birthMonth) - 1, parseInt(playerForm.birthDay))
            : new Date(2007, 5, 15); // Default date
          const age = new Date().getFullYear() - birthDate.getFullYear();
          content = (
            <PlayerProfile
              playerName={playerForm.fullName || currentPlayer.name || 'Marcus Silva'}
              clubName={clubForm.clubName || mockClubData.clubName}
              email={playerForm.email || 'marcus.silva@example.com'}
              height={playerForm.height || currentPlayer.height || '5\'11"'}
              age={age}
              dateOfBirth={`${birthDate.getMonth() + 1}/${birthDate.getDate()}/${birthDate.getFullYear()}`}
              position={playerForm.position || 'Forward'}
              matchesPlayed={currentPlayer.matchesPlayed}
              goals={currentPlayer.goals}
              assists={currentPlayer.assists}
              profileImage={currentPlayer.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400'}
              onLogout={handleLogout}
            />
          );
          break;
        default:
          content = <PlayerOwnProfileScreen />;
      }

      return (
        <>
          {content}
          <BottomNavigation userType="player" activeTab={playerTab} onTabChange={handlePlayerTabChange} />
        </>
      );
    }

    return <LoginScreen />;
  };

  return renderScreen();
}
