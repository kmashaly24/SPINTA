import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Card } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';
import { mockPlayerData } from '@/data/mockData';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT, BORDER_RADIUS } from '@/constants/theme';

/**
 * Player Edit Profile Screen
 * Allows player to edit their profile information
 */
export default function PlayerEditProfileScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const player = mockPlayerData;

  const [name, setName] = useState(player.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [height, setHeight] = useState(player.height || '');
  const [weight, setWeight] = useState(player.weight || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Profile updated successfully!', [
        {
          text: 'OK',
          onPress: () => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/(player)/profile');
            }
          }
        }
      ]);
    }, 1000);
  };

  const handleCancel = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(player)/profile');
    }
  };

  const handleChangePhoto = () => {
    Alert.alert('Change Photo', 'This feature will be available soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Profile Photo */}
        <View style={styles.photoSection}>
          {player.image ? (
            <Image source={{ uri: player.image }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>
                {name?.charAt(0) || 'P'}
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={handleChangePhoto}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <Card style={styles.formCard}>
          <Input
            label="Full Name"
            placeholder="Enter your name"
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
            label="Height"
            placeholder="e.g., 180 cm"
            value={height}
            onChangeText={setHeight}
            autoCorrect={false}
            editable={!isLoading}
          />

          <Input
            label="Weight"
            placeholder="e.g., 75 kg"
            value={weight}
            onChangeText={setWeight}
            autoCorrect={false}
            editable={!isLoading}
          />
        </Card>

        {/* Save Button */}
        <Button
          variant="gradient"
          size="lg"
          onPress={handleSave}
          loading={isLoading}
          disabled={isLoading}
          style={styles.saveButton}
        >
          Save Changes
        </Button>

        {/* Bottom padding for navigation */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: LAYOUT.screenPaddingHorizontal,
    paddingTop: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  cancelText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.orange,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
  },
  placeholder: {
    width: 50,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.md,
  },
  avatarPlaceholder: {
    backgroundColor: COLORS.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.gray600,
  },
  changePhotoText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.orange,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  formCard: {
    marginBottom: SPACING.lg,
  },
  saveButton: {
    marginBottom: SPACING.xl,
  },
  bottomPadding: {
    height: LAYOUT.bottomNavHeight + LAYOUT.bottomNavSafeArea,
  },
});
