
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  let height;
  
  switch (size) {
    case 'sm':
      height = 32; // 8 * 4 (h-8)
      break;
    case 'md':
      height = 48; // 12 * 4 (h-12)
      break;
    case 'lg':
      height = 96; // 24 * 4 (h-24)
      break;
    default:
      height = 48;
  }
  
  const fontSize = height * 0.42;
  
  return (
    <View style={[styles.container, { height }]}>
      <Text style={[styles.text, { fontSize }]}>
        <Text style={styles.whiteText}>Disconnected</Text>
        <Text style={styles.accentText}>Driver</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  whiteText: {
    color: 'white',
  },
  accentText: {
    color: '#00C4CC',
  },
});

export default Logo;
