import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium', style }) => {
  const logoWidth = size === 'small' ? 120 : size === 'large' ? 280 : 200;
  const logoHeight = logoWidth * 0.35; // Maintain aspect ratio

  return (
    <View style={[styles.container, { width: logoWidth, height: logoHeight }, style]}>
      <Image
        source={require('@/assets/images/a75db9bcda9eef7ef085e5ac795127525955e73f.png')}
        style={[styles.logoImage, { width: logoWidth, height: logoHeight }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
});
