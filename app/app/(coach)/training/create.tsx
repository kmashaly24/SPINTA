import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Card } from '@/components/ui';
import { mockPlayers } from '@/data/mockData';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT, BORDER_RADIUS } from '@/constants/theme';

/**
 * Create Training Plan Screen
 * Form to assign new training plans to players
 * PDF page 19
 */
export default function CreateTrainingPlanScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [coachNotes, setCoachNotes] = useState('');
  const [exercises, setExercises] = useState([
    { name: '', sets: '', reps: '', minutes: '' },
  ]);

  const players = mockPlayers.filter(p => p.isLinked && p.name);
  const trainingTypes = [
    'Shooting',
    'Passing',
    'Dribbling',
    'Fitness',
    'Strength',
    'Recovery',
  ];

  const handleAddExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', minutes: '' }]);
  };

  const handleRemoveExercise = (index: number) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, i) => i !== index));
    }
  };

  const handleExerciseChange = (index: number, field: string, value: string) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a training plan title');
      return;
    }
    if (!selectedPlayer) {
      Alert.alert('Error', 'Please select a player');
      return;
    }
    if (!selectedType) {
      Alert.alert('Error', 'Please select a training type');
      return;
    }
    if (!exercises[0].name.trim()) {
      Alert.alert('Error', 'Please add at least one exercise');
      return;
    }

    // In a real app, this would save to the backend
    Alert.alert(
      'Training Plan Created',
      `Training plan "${title}" has been assigned to the player.`,
      [
        {
          text: 'OK',
          onPress: () => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/(coach)/club');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/(coach)/club');
            }
          }}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Training Plan</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Training Info */}
        <Text style={styles.sectionTitle}>Training Info</Text>
        <Card style={styles.formCard}>
          <Input
            label="Training Plan Title"
            placeholder="e.g., Weekly Shooting Drills"
            value={title}
            onChangeText={setTitle}
          />
        </Card>

        {/* Select Player */}
        <Text style={styles.sectionTitle}>Select Player</Text>
        <Card style={styles.formCard}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.playerScrollView}
          >
            {players.map((player) => (
              <TouchableOpacity
                key={player.id}
                style={[
                  styles.playerOption,
                  selectedPlayer === player.id && styles.playerOptionSelected,
                ]}
                onPress={() => setSelectedPlayer(player.id)}
              >
                <View style={styles.playerAvatar}>
                  <Text style={styles.playerAvatarText}>
                    {player.jerseyNumber}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.playerName,
                    selectedPlayer === player.id && styles.playerNameSelected,
                  ]}
                  numberOfLines={1}
                >
                  {player.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Card>

        {/* Training Type */}
        <Text style={styles.sectionTitle}>Training Type</Text>
        <Card style={styles.formCard}>
          <View style={styles.typeGrid}>
            {trainingTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeOption,
                  selectedType === type && styles.typeOptionSelected,
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={[
                    styles.typeText,
                    selectedType === type && styles.typeTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Exercises */}
        <Text style={styles.sectionTitle}>Exercises</Text>
        {exercises.map((exercise, index) => (
          <Card key={index} style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseNumber}>Exercise {index + 1}</Text>
              {exercises.length > 1 && (
                <TouchableOpacity
                  onPress={() => handleRemoveExercise(index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>

            <Input
              label="Exercise Name"
              placeholder="e.g., One-on-One Finishing"
              value={exercise.name}
              onChangeText={(value) => handleExerciseChange(index, 'name', value)}
            />

            <View style={styles.exerciseRow}>
              <View style={styles.exerciseField}>
                <Input
                  label="Sets"
                  placeholder="3"
                  value={exercise.sets}
                  onChangeText={(value) => handleExerciseChange(index, 'sets', value)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.exerciseField}>
                <Input
                  label="Reps"
                  placeholder="10"
                  value={exercise.reps}
                  onChangeText={(value) => handleExerciseChange(index, 'reps', value)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.exerciseField}>
                <Input
                  label="Minutes"
                  placeholder="15"
                  value={exercise.minutes}
                  onChangeText={(value) => handleExerciseChange(index, 'minutes', value)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </Card>
        ))}

        <TouchableOpacity style={styles.addExerciseButton} onPress={handleAddExercise}>
          <Text style={styles.addExerciseText}>+ Add Another Exercise</Text>
        </TouchableOpacity>

        {/* Coach Notes */}
        <Text style={styles.sectionTitle}>Coach Notes (Optional)</Text>
        <Card style={styles.formCard}>
          <Input
            label="Notes for Player"
            placeholder="Add any instructions or tips for the player..."
            value={coachNotes}
            onChangeText={setCoachNotes}
            multiline
            numberOfLines={4}
          />
        </Card>

        {/* Submit Button */}
        <Button
          variant="gradient"
          size="lg"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Assign Training Plan
        </Button>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    flex: 1,
  },
  backText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.orange,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    flex: 2,
    textAlign: 'center',
  },
  headerRight: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  formCard: {
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  playerScrollView: {
    marginHorizontal: -SPACING.xs,
  },
  playerOption: {
    alignItems: 'center',
    padding: SPACING.sm,
    marginHorizontal: SPACING.xs,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 80,
  },
  playerOptionSelected: {
    borderColor: COLORS.orange,
    backgroundColor: COLORS.orangeBg,
  },
  playerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  playerAvatarText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.gray600,
  },
  playerName: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.mutedForeground,
    textAlign: 'center',
    maxWidth: 70,
  },
  playerNameSelected: {
    color: COLORS.orange,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  typeOption: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.gray100,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeOptionSelected: {
    backgroundColor: COLORS.orangeBg,
    borderColor: COLORS.orange,
  },
  typeText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.mutedForeground,
  },
  typeTextSelected: {
    color: COLORS.orange,
  },
  exerciseCard: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  exerciseNumber: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
  },
  removeButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  removeButtonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.error,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  exerciseRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  exerciseField: {
    flex: 1,
  },
  addExerciseButton: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.gray300,
    marginBottom: SPACING.md,
  },
  addExerciseText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.orange,
  },
  submitButton: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  bottomPadding: {
    height: SPACING['2xl'],
  },
});
