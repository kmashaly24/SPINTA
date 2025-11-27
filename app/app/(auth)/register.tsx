import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Input, ProgressIndicator, Logo } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { UserRole } from '@/types';

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthStore();

  // Step 1: Role selection
  // Step 2: For Player - invite code | For Coach - coach info (step 3a)
  // Step 3: For Player - player details | For Coach - club info (step 3b)
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [inviteCode, setInviteCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Coach-specific fields for step 2 (club info)
  const [clubName, setClubName] = useState('');
  const [country, setCountry] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [stadium, setStadium] = useState('');
  const [coachSubStep, setCoachSubStep] = useState(1); // 1 for coach info, 2 for club info

  // Dropdown visibility states
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showAgeGroupDropdown, setShowAgeGroupDropdown] = useState(false);
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  // Dropdown options - expanded countries list
  const allCountries = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
    'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia', 'Croatia',
    'Czech Republic', 'Denmark', 'Ecuador', 'Egypt', 'England', 'Finland',
    'France', 'Germany', 'Ghana', 'Greece', 'Hungary', 'Iceland', 'India',
    'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan',
    'Kenya', 'South Korea', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand',
    'Nigeria', 'Norway', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Scotland', 'Senegal',
    'Serbia', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Thailand',
    'Tunisia', 'Turkey', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
    'United States', 'Uruguay', 'Venezuela', 'Vietnam', 'Wales', 'Other',
  ];

  // Filter countries based on search
  const filteredCountries = countrySearch
    ? allCountries.filter(c => c.toLowerCase().startsWith(countrySearch.toLowerCase()))
    : allCountries;

  const ageGroups = [
    'U-10', 'U-12', 'U-14', 'U-16', 'U-18', 'U-21', 'U-23', 'Senior', 'Veterans',
  ];

  const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

  // Additional fields from PDF
  const [birthDate, setBirthDate] = useState(new Date(2000, 0, 1)); // Default date
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [height, setHeight] = useState(''); // Player only
  const [weight, setWeight] = useState(''); // Player only
  const [position, setPosition] = useState(''); // Player only
  const [jerseyNumber, setJerseyNumber] = useState(''); // Player only
  const [profileImage, setProfileImage] = useState<string | null>(null); // Profile picture (optional)

  // Function to pick profile picture
  const handlePickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Please allow access to your photo library to upload a profile picture.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  // Helper function to calculate age from date of birth
  const calculateAge = (date: Date): string => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      age--;
    }

    return age.toString();
  };

  // Helper function to format date for display
  const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  // Handle date picker change
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
  };

  const handleRoleContinue = () => {
    if (!role) {
      Alert.alert('Error', 'Please select your role');
      return;
    }
    if (role === 'coach') {
      // Coach doesn't need invite code, skip to registration details
      setStep(3);
    } else {
      // Player needs invite code
      setStep(2);
    }
  };

  const handleInviteCodeNext = () => {
    if (!inviteCode.trim()) {
      Alert.alert('Error', 'Please enter your invite code');
      return;
    }
    setStep(3);
  };

  const handleRegister = async () => {
    clearError();

    // Validation
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // For player, invite code is required
    if (role === 'player' && !inviteCode.trim()) {
      Alert.alert('Error', 'Invite code is required for players');
      return;
    }

    const success = await register(
      name,
      email,
      password,
      role!,
      role === 'player' ? inviteCode : '' // Only pass invite code for players
    );

    if (success) {
      // Auto-login successful, navigate to welcome screen
      if (role === 'coach') {
        router.replace({
          pathname: '/(auth)/welcome-coach',
          params: {
            name: name,
            clubName: clubName,
            ageGroup: ageGroup,
            profileImage: profileImage || '',
          },
        });
      } else {
        // Player role
        router.replace({
          pathname: '/(auth)/welcome-player',
          params: {
            name: name,
            clubName: 'Your Club',
            jerseyNumber: jerseyNumber,
            position: position,
            age: calculateAge(birthDate),
            profileImage: profileImage || '',
          },
        });
      }
    } else if (error) {
      Alert.alert('Registration Failed', error);
    }
  };

  const handleLogin = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const handleCoachInfoNext = () => {
    // Validate coach info fields
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    // Move to club info step
    setCoachSubStep(2);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setRole(null);
      setInviteCode('');
    } else if (step === 3) {
      if (role === 'player') {
        setStep(2);
      } else {
        // Coach: check which sub-step
        if (coachSubStep === 2) {
          setCoachSubStep(1);
        } else {
          setStep(1);
          setRole(null);
          setCoachSubStep(1);
        }
      }
      // Don't clear form data when going back within coach registration
      if (role !== 'coach' || coachSubStep === 1) {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setClubName('');
        setCountry('');
        setAgeGroup('');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Logo - Only show on step 1 */}
          {step === 1 && (
            <View style={styles.logoContainer}>
              <Logo size="medium" />
            </View>
          )}

          {/* Header */}
          <View style={styles.header}>
            {step === 1 && (
              <>
                <Text style={styles.title}>Choose your role</Text>
                <Text style={styles.subtitle}>
                  Select how you want to use Spinta
                </Text>
              </>
            )}
            {step === 2 && (
              <>
                <Text style={styles.title}>Join a Club</Text>
                <Text style={styles.subtitle}>
                  Enter the invite code shared by your coach
                </Text>
              </>
            )}
            {step === 3 && role === 'player' && (
              <>
                <Text style={styles.title}>Player Information</Text>
                <Text style={styles.subtitle}>
                  Complete your player registration
                </Text>
              </>
            )}
            {step === 3 && role === 'coach' && coachSubStep === 1 && (
              <>
                <Text style={styles.title}>Coach Information</Text>
                <Text style={styles.subtitle}>
                  Set up your coach account
                </Text>
              </>
            )}
            {step === 3 && role === 'coach' && coachSubStep === 2 && (
              <>
                <Text style={styles.title}>Club Information</Text>
                <Text style={styles.subtitle}>
                  Tell us about your club
                </Text>
              </>
            )}
          </View>

          {/* Step 1: Role Selection */}
          {step === 1 && (
            <View style={styles.form}>
              <View style={styles.roleButtons}>
                {/* Coach Card - Image LEFT, Text RIGHT */}
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    role === 'coach' && styles.roleButtonSelected
                  ]}
                  onPress={() => handleRoleSelect('coach')}
                  disabled={isLoading}
                  activeOpacity={0.7}
                >
                  <View style={styles.roleButtonContentHorizontal}>
                    <Image
                      source={require('@/assets/images/5be67071b9167d07dbd957c0d9d2d6284c7b7075.png')}
                      style={styles.roleButtonImage}
                      resizeMode="contain"
                    />
                    <Text style={styles.roleButtonTitle}>Coach</Text>
                  </View>
                </TouchableOpacity>

                {/* "or" separator */}
                <Text style={styles.orText}>or</Text>

                {/* Player Card - Text LEFT, Image RIGHT */}
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    role === 'player' && styles.roleButtonSelected
                  ]}
                  onPress={() => handleRoleSelect('player')}
                  disabled={isLoading}
                  activeOpacity={0.7}
                >
                  <View style={styles.roleButtonContentHorizontalReverse}>
                    <Text style={styles.roleButtonTitle}>Player</Text>
                    <Image
                      source={require('@/assets/images/c0033141475f9734ac14cf46838e561d43e1cbb7.png')}
                      style={styles.roleButtonImage}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <Button
                variant="gradient"
                size="lg"
                onPress={handleRoleContinue}
                disabled={isLoading || !role}
                style={styles.continueButton}
              >
                Continue
              </Button>
            </View>
          )}

          {/* Step 2: Invite Code (Player Only) */}
          {step === 2 && role === 'player' && (
            <View style={styles.form}>
              {/* Progress Indicator */}
              <ProgressIndicator
                steps={[
                  { number: 1, label: 'Join Club' },
                  { number: 2, label: 'Player Info' },
                ]}
                currentStep={1}
              />

              {/* Key Icon */}
              <View style={styles.iconContainer}>
                <Text style={styles.keyIcon}>🔑</Text>
              </View>

              {/* Info Message */}
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  Your coach has shared a unique invite code with you. Enter it below to join your club.
                </Text>
              </View>

              <Input
                label="Invite Code"
                placeholder="XXXXXX"
                value={inviteCode}
                onChangeText={setInviteCode}
                autoCapitalize="characters"
                autoCorrect={false}
                editable={!isLoading}
              />

              <View style={styles.demoContainer}>
                <Text style={styles.demoText}>
                  Demo Code: SPINTA2025
                </Text>
              </View>

              <View style={styles.buttonGroup}>
                <Button
                  variant="outline"
                  size="lg"
                  onPress={handleBack}
                  disabled={isLoading}
                  style={styles.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="gradient"
                  size="lg"
                  onPress={handleInviteCodeNext}
                  disabled={isLoading}
                  style={styles.nextButton}
                >
                  Confirm & Join
                </Button>
              </View>
            </View>
          )}

          {/* Step 3: Registration Details */}
          {step === 3 && role === 'player' && (
            <View style={styles.form}>
              {/* Progress Indicator for Player */}
              <ProgressIndicator
                steps={[
                  { number: 1, label: 'Join Club' },
                  { number: 2, label: 'Player Info' },
                ]}
                currentStep={2}
              />

              {/* Profile Picture Upload */}
              <View style={styles.profilePictureSection}>
                <Text style={styles.profilePictureLabel}>Profile Picture</Text>
                <TouchableOpacity
                  style={styles.profilePictureContainer}
                  onPress={handlePickImage}
                  disabled={isLoading}
                >
                  {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profilePictureImage} />
                  ) : (
                    <View style={styles.profilePicturePlaceholder}>
                      <Text style={styles.profilePicturePlaceholderIcon}>📷</Text>
                      <Text style={styles.profilePicturePlaceholderText}>Add Photo</Text>
                    </View>
                  )}
                </TouchableOpacity>
                {profileImage && (
                  <TouchableOpacity onPress={() => setProfileImage(null)} style={styles.removePhotoButton}>
                    <Text style={styles.removePhotoText}>Remove Photo</Text>
                  </TouchableOpacity>
                )}
              </View>

              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                autoCorrect={false}
                editable={!isLoading}
              />

              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />

              <Input
                label="Password"
                placeholder="Enter your password (min. 6 characters)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                editable={!isLoading}
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                editable={!isLoading}
              />

              {/* Date of Birth */}
              <Text style={styles.fieldLabel}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
                disabled={isLoading}
              >
                <Text style={styles.datePickerText}>{formatDate(birthDate)}</Text>
                <Text style={styles.datePickerIcon}>📅</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={birthDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onDateChange}
                  maximumDate={new Date()}
                  minimumDate={new Date(1950, 0, 1)}
                />
              )}

              {/* Height and Weight Row */}
              <View style={styles.rowFields}>
                <View style={styles.halfField}>
                  <Input
                    label="Height (cm)"
                    placeholder="e.g., 175"
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="number-pad"
                    editable={!isLoading}
                  />
                </View>
                <View style={styles.halfField}>
                  <Input
                    label="Weight (kg)"
                    placeholder="e.g., 70"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="number-pad"
                    editable={!isLoading}
                  />
                </View>
              </View>

              {/* Position Dropdown */}
              <Text style={styles.fieldLabel}>Position</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShowPositionDropdown(!showPositionDropdown)}
                disabled={isLoading}
              >
                <Text style={position ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {position || 'Select position'}
                </Text>
                <Text style={styles.dropdownArrow}>{showPositionDropdown ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              {showPositionDropdown && (
                <View style={styles.dropdownList}>
                  {positions.map((p) => (
                    <TouchableOpacity
                      key={p}
                      style={[styles.dropdownItem, position === p && styles.dropdownItemSelected]}
                      onPress={() => {
                        setPosition(p);
                        setShowPositionDropdown(false);
                      }}
                    >
                      <Text style={[styles.dropdownItemText, position === p && styles.dropdownItemTextSelected]}>
                        {p}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Jersey Number */}
              <Input
                label="Jersey Number"
                placeholder="e.g., 10"
                value={jerseyNumber}
                onChangeText={setJerseyNumber}
                keyboardType="number-pad"
                maxLength={2}
                editable={!isLoading}
              />

              <View style={styles.buttonGroup}>
                <Button
                  variant="outline"
                  size="lg"
                  onPress={handleBack}
                  disabled={isLoading}
                  style={styles.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="gradient"
                  size="lg"
                  onPress={handleRegister}
                  loading={isLoading}
                  disabled={isLoading}
                  style={styles.nextButton}
                >
                  Sign Up
                </Button>
              </View>
            </View>
          )}

          {/* Step 3a: Coach Info (1 of 2) */}
          {step === 3 && role === 'coach' && coachSubStep === 1 && (
            <View style={styles.form}>
              {/* Progress Indicator */}
              <ProgressIndicator
                steps={[
                  { number: 1, label: 'Coach Info' },
                  { number: 2, label: 'Club Info' },
                ]}
                currentStep={1}
              />

              {/* Profile Picture Upload */}
              <View style={styles.profilePictureSection}>
                <Text style={styles.profilePictureLabel}>Profile Picture</Text>
                <TouchableOpacity
                  style={styles.profilePictureContainer}
                  onPress={handlePickImage}
                  disabled={isLoading}
                >
                  {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profilePictureImage} />
                  ) : (
                    <View style={styles.profilePicturePlaceholder}>
                      <Text style={styles.profilePicturePlaceholderIcon}>📷</Text>
                      <Text style={styles.profilePicturePlaceholderText}>Add Photo</Text>
                    </View>
                  )}
                </TouchableOpacity>
                {profileImage && (
                  <TouchableOpacity onPress={() => setProfileImage(null)} style={styles.removePhotoButton}>
                    <Text style={styles.removePhotoText}>Remove Photo</Text>
                  </TouchableOpacity>
                )}
              </View>

              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                autoCorrect={false}
                editable={!isLoading}
              />

              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />

              <Input
                label="Password"
                placeholder="Enter your password (min. 6 characters)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                editable={!isLoading}
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                editable={!isLoading}
              />

              {/* Date of Birth */}
              <Text style={styles.fieldLabel}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
                disabled={isLoading}
              >
                <Text style={styles.datePickerText}>{formatDate(birthDate)}</Text>
                <Text style={styles.datePickerIcon}>📅</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={birthDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onDateChange}
                  maximumDate={new Date()}
                  minimumDate={new Date(1950, 0, 1)}
                />
              )}

              {/* Gender */}
              <Text style={styles.fieldLabel}>Gender</Text>
              <View style={styles.genderRow}>
                <TouchableOpacity
                  style={[styles.genderOption, gender === 'male' && styles.genderOptionSelected]}
                  onPress={() => setGender('male')}
                  disabled={isLoading}
                >
                  <View style={[styles.radioCircle, gender === 'male' && styles.radioCircleSelected]}>
                    {gender === 'male' && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.genderText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.genderOption, gender === 'female' && styles.genderOptionSelected]}
                  onPress={() => setGender('female')}
                  disabled={isLoading}
                >
                  <View style={[styles.radioCircle, gender === 'female' && styles.radioCircleSelected]}>
                    {gender === 'female' && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.genderText}>Female</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonGroup}>
                <Button
                  variant="outline"
                  size="lg"
                  onPress={handleBack}
                  disabled={isLoading}
                  style={styles.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="gradient"
                  size="lg"
                  onPress={handleCoachInfoNext}
                  disabled={isLoading}
                  style={styles.nextButton}
                >
                  Continue
                </Button>
              </View>
            </View>
          )}

          {/* Step 3b: Club Info (2 of 2) */}
          {step === 3 && role === 'coach' && coachSubStep === 2 && (
            <View style={styles.form}>
              {/* Progress Indicator */}
              <ProgressIndicator
                steps={[
                  { number: 1, label: 'Coach Info' },
                  { number: 2, label: 'Club Info' },
                ]}
                currentStep={2}
              />

              <Input
                label="Club Name"
                placeholder="Enter your club name"
                value={clubName}
                onChangeText={setClubName}
                autoCorrect={false}
                editable={!isLoading}
              />

              {/* Country Dropdown with Search */}
              <Text style={styles.fieldLabel}>Country</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => {
                  setShowCountryDropdown(!showCountryDropdown);
                  setCountrySearch('');
                }}
                disabled={isLoading}
              >
                <Text style={country ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {country || 'Select country'}
                </Text>
                <Text style={styles.dropdownArrow}>{showCountryDropdown ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              {showCountryDropdown && (
                <View style={styles.dropdownList}>
                  <Input
                    placeholder="Search country..."
                    value={countrySearch}
                    onChangeText={setCountrySearch}
                    containerStyle={styles.searchInput}
                    autoFocus
                  />
                  <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                    {filteredCountries.map((c) => (
                      <TouchableOpacity
                        key={c}
                        style={[styles.dropdownItem, country === c && styles.dropdownItemSelected]}
                        onPress={() => {
                          setCountry(c);
                          setShowCountryDropdown(false);
                          setCountrySearch('');
                        }}
                      >
                        <Text style={[styles.dropdownItemText, country === c && styles.dropdownItemTextSelected]}>
                          {c}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    {filteredCountries.length === 0 && (
                      <Text style={styles.noResultsText}>No countries found</Text>
                    )}
                  </ScrollView>
                </View>
              )}

              {/* Age Group Dropdown */}
              <Text style={styles.fieldLabel}>Age Group/Level</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShowAgeGroupDropdown(!showAgeGroupDropdown)}
                disabled={isLoading}
              >
                <Text style={ageGroup ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {ageGroup || 'Select age group'}
                </Text>
                <Text style={styles.dropdownArrow}>{showAgeGroupDropdown ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              {showAgeGroupDropdown && (
                <View style={styles.dropdownList}>
                  <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                    {ageGroups.map((ag) => (
                      <TouchableOpacity
                        key={ag}
                        style={[styles.dropdownItem, ageGroup === ag && styles.dropdownItemSelected]}
                        onPress={() => {
                          setAgeGroup(ag);
                          setShowAgeGroupDropdown(false);
                        }}
                      >
                        <Text style={[styles.dropdownItemText, ageGroup === ag && styles.dropdownItemTextSelected]}>
                          {ag}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              <Input
                label="Stadium"
                placeholder="Enter stadium name"
                value={stadium}
                onChangeText={setStadium}
                autoCorrect={false}
                editable={!isLoading}
              />

              <View style={styles.buttonGroup}>
                <Button
                  variant="outline"
                  size="lg"
                  onPress={handleBack}
                  disabled={isLoading}
                  style={styles.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="gradient"
                  size="lg"
                  onPress={handleRegister}
                  loading={isLoading}
                  disabled={isLoading}
                  style={styles.nextButton}
                >
                  Sign Up
                </Button>
              </View>
            </View>
          )}

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Text style={styles.loginLink} onPress={handleLogin}>
              Log In
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingVertical: SPACING.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.mutedForeground,
    textAlign: 'center',
  },
  form: {
    marginBottom: SPACING.xl,
  },
  roleButtons: {
    gap: SPACING.md,
  },
  roleButton: {
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    ...SHADOWS.md,
  },
  roleButtonSelected: {
    backgroundColor: COLORS.creamBg,
    borderColor: COLORS.orange,
    borderWidth: 3,
  },
  roleButtonContent: {
    alignItems: 'center',
  },
  roleButtonContentHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roleButtonContentHorizontalReverse: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roleButtonImage: {
    width: 100,
    height: 100,
  },
  roleButtonTitle: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
  },
  orText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.mutedForeground,
    textAlign: 'center',
    marginVertical: SPACING.sm,
  },
  continueButton: {
    marginTop: SPACING.lg,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  keyIcon: {
    fontSize: 72,
  },
  infoBox: {
    backgroundColor: COLORS.creamBg,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  infoText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.foreground,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
  demoContainer: {
    marginTop: SPACING.md,
    padding: SPACING.sm,
    backgroundColor: COLORS.infoBg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  demoText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.info,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.foreground,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  loginLink: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.orange,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.foreground,
    marginBottom: SPACING.xs,
    marginTop: SPACING.sm,
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.sm,
  },
  datePickerText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.foreground,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  datePickerIcon: {
    fontSize: 20,
  },
  genderRow: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginBottom: SPACING.md,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  genderOptionSelected: {},
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.gray400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: COLORS.orange,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.orange,
  },
  genderText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.foreground,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.sm,
  },
  dropdownText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.foreground,
  },
  dropdownPlaceholder: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.mutedForeground,
  },
  dropdownArrow: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
  },
  dropdownList: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    maxHeight: 200,
    ...SHADOWS.md,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  dropdownItemSelected: {
    backgroundColor: COLORS.orangeBg,
  },
  dropdownItemText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.foreground,
  },
  dropdownItemTextSelected: {
    color: COLORS.orange,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  rowFields: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  halfField: {
    flex: 1,
  },
  searchInput: {
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  noResultsText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    textAlign: 'center',
    paddingVertical: SPACING.md,
  },
  profilePictureSection: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  profilePictureLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.foreground,
    marginBottom: SPACING.md,
    alignSelf: 'flex-start',
  },
  profilePictureContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: COLORS.gray100,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  profilePictureImage: {
    width: '100%',
    height: '100%',
  },
  profilePicturePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicturePlaceholderIcon: {
    fontSize: 40,
    marginBottom: SPACING.xs,
  },
  profilePicturePlaceholderText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  removePhotoButton: {
    marginTop: SPACING.sm,
  },
  removePhotoText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.error,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
});
