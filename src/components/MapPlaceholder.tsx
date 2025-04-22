
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface MapPlaceholderProps {
  startAddress: string;
  endAddress: string;
  isPickup?: boolean;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ 
  startAddress, 
  endAddress,
  isPickup = true
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {Array.from({ length: 36 }).map((_, i) => (
          <View key={i} style={styles.gridCell} />
        ))}
      </View>
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="navigate" size={32} color="#00C4CC" />
        </View>
        <Text style={styles.title}>
          {isPickup ? 'Navigation to Pickup' : 'Navigation to Destination'}
        </Text>
        <Text style={styles.subtitle}>
          {isPickup ? 'Driving to pickup location' : 'Driving to destination'}
        </Text>
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>
            {isPickup ? 'Pickup' : 'Dropoff'} Location:
          </Text>
          <Text style={styles.addressText}>
            {isPickup ? startAddress : endAddress}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 256, // h-64 in tailwind is 16rem = 256px
    backgroundColor: '#111827',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  grid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCell: {
    width: '16.666%', // 6 columns
    height: '16.666%', // 6 rows
    borderWidth: 1,
    borderColor: '#374151',
  },
  content: {
    zIndex: 10,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#1f2937',
    borderRadius: 40,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 16,
  },
  addressContainer: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    maxWidth: 250,
  },
  addressLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  addressText: {
    color: 'white',
  },
});

export default MapPlaceholder;
