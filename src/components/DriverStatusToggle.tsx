
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

const DriverStatusToggle: React.FC = () => {
  const { driver, updateDriverStatus } = useAuth();
  
  const handleStatusChange = (value: boolean) => {
    updateDriverStatus(value);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Driver Status</Text>
        <Text style={styles.subtitle}>
          {driver?.isOnline ? 'You are online and can receive ride requests' : 'Go online to receive ride requests'}
        </Text>
      </View>
      <Switch 
        value={driver?.isOnline || false}
        onValueChange={handleStatusChange}
        trackColor={{ false: '#374151', true: '#00C4CC' }}
        thumbColor={'#ffffff'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
});

export default DriverStatusToggle;
