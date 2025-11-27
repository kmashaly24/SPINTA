import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Card } from '@/components/ui';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

/**
 * Coach Chatbot Screen
 * AI coaching assistant interface
 */

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function CoachChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI coaching assistant. I can help you with training plans, player analysis, tactics, and more. How can I assist you today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response (replace with real API call)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand you're asking about "${inputText}". This is a demo response. In the production app, this would connect to your AI coaching assistant API to provide personalized insights about your team, players, tactics, and training recommendations.`,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const quickPrompts = [
    { title: 'Analyze our last match', description: 'Get match insights', icon: '📊' },
    { title: 'Create training plan', description: 'Custom drills & exercises', icon: '🏋️' },
    { title: 'Suggest tactics', description: 'Formation & strategy', icon: '⚽' },
    { title: 'Player performance review', description: 'Individual analysis', icon: '👤' },
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInputText(prompt);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header with AI Avatar */}
        <View style={styles.header}>
          <View style={styles.aiAvatarContainer}>
            <View style={styles.aiAvatar}>
              <Text style={styles.aiAvatarIcon}>⚡</Text>
            </View>
          </View>
          <Text style={styles.title}>AI Coach Assistant</Text>
          <Text style={styles.subtitle}>Your tactical companion</Text>
        </View>

        {/* Messages */}
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.isBot ? styles.botBubble : styles.userBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.isBot ? styles.botText : styles.userText,
                ]}
              >
                {message.text}
              </Text>
              <Text
                style={[
                  styles.timestamp,
                  message.isBot ? styles.botTimestamp : styles.userTimestamp,
                ]}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          ))}

          {isLoading && (
            <View style={[styles.messageBubble, styles.botBubble]}>
              <Text style={styles.loadingText}>Thinking...</Text>
            </View>
          )}

          {/* Quick Prompts - 2x2 Grid */}
          {messages.length === 1 && (
            <View style={styles.quickPromptsContainer}>
              <Text style={styles.quickPromptsTitle}>Quick prompts</Text>
              <View style={styles.quickPromptsGrid}>
                {quickPrompts.map((prompt, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickPromptCard}
                    onPress={() => handleQuickPrompt(prompt.title)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.quickPromptIcon}>{prompt.icon}</Text>
                    <Text style={styles.quickPromptTitle}>{prompt.title}</Text>
                    <Text style={styles.quickPromptDescription}>{prompt.description}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <Input
            placeholder="Ask me anything..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
            returnKeyType="send"
            containerStyle={styles.inputWrapper}
            editable={!isLoading}
            multiline={false}
            autoCapitalize="sentences"
            autoCorrect={true}
            blurOnSubmit={false}
          />
          <Button
            variant="gradient"
            size="md"
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
            style={styles.sendButton}
          >
            Send
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    padding: LAYOUT.screenPaddingHorizontal,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    alignItems: 'center',
  },
  aiAvatarContainer: {
    marginBottom: SPACING.sm,
  },
  aiAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiAvatarIcon: {
    fontSize: 28,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: LAYOUT.screenPaddingHorizontal,
    paddingBottom: SPACING.xl,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.gray100,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
  },
  messageText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    lineHeight: TYPOGRAPHY.fontSize.base * TYPOGRAPHY.lineHeight.normal,
  },
  botText: {
    color: COLORS.foreground,
  },
  userText: {
    color: COLORS.primaryForeground,
  },
  timestamp: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginTop: SPACING.xs / 2,
  },
  botTimestamp: {
    color: COLORS.mutedForeground,
  },
  userTimestamp: {
    color: COLORS.primaryForeground,
    opacity: 0.7,
  },
  loadingText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.mutedForeground,
    fontStyle: 'italic',
  },
  quickPromptsContainer: {
    marginTop: SPACING.lg,
  },
  quickPromptsTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: SPACING.md,
  },
  quickPromptsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  quickPromptCard: {
    width: '48%',
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    ...SHADOWS.sm,
  },
  quickPromptIcon: {
    fontSize: 24,
    marginBottom: SPACING.xs,
  },
  quickPromptTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 2,
  },
  quickPromptDescription: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.mutedForeground,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: LAYOUT.screenPaddingHorizontal,
    paddingBottom: 80,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    gap: SPACING.sm,
  },
  inputWrapper: {
    flex: 1,
    marginBottom: 0,
  },
  sendButton: {
    minWidth: 80,
  },
});
