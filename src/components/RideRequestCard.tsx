
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Define the RideRequest type locally if it's not exported
interface Location {
  address: string;
  lat?: number;
  lng?: number;
}

interface Rider {
  name: string;
  rating: number;
}

interface RideRequest {
  id: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  rider: Rider;
  fare: number;
  estimatedTime: number;
  distance: number;
}

interface RideRequestCardProps {
  request: RideRequest;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

const RideRequestCard: React.FC<RideRequestCardProps> = ({ 
  request, 
  onAccept, 
  onDecline 
}) => {
  // Add safety checks to handle potentially undefined properties
  const riderName = request?.rider?.name || 'Unknown';
  const riderRating = request?.rider?.rating || 0;
  const fare = request?.fare || 0;
  const distance = request?.distance || 0;
  const estimatedTime = request?.estimatedTime || 0;
  const pickupAddress = request?.pickupLocation?.address || 'Unknown location';
  const dropoffAddress = request?.dropoffLocation?.address || 'Unknown location';
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.userIcon}>
              <Ionicons name="person" size={20} color="#00C4CC" />
            </View>
            <View>
              <Text style={styles.userName}>{riderName}</Text>
              <Text style={styles.userRating}>Rating: {riderRating}★</Text>
            </View>
          </View>
          <View style={styles.fareInfo}>
            <Text style={styles.fare}>EGP {fare.toFixed(2)}</Text>
            <Text style={styles.distance}>{distance.toFixed(1)} Km</Text>
          </View>
        </View>
        
        <View style={styles.locations}>
          <View style={styles.locationRow}>
            <View style={styles.locationDot}>
              <View style={styles.pickupDot} />
            </View>
            <View>
              <Text style={styles.locationLabel}>Pickup</Text>
              <Text style={styles.locationAddress}>{pickupAddress}</Text>
            </View>
          </View>
          
          <View style={styles.locationRow}>
            <View style={styles.locationDot}>
              <View style={styles.dropoffDot} />
            </View>
            <View>
              <Text style={styles.locationLabel}>Dropoff</Text>
              <Text style={styles.locationAddress}>{dropoffAddress}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.timeInfo}>
            <Ionicons name="time-outline" size={16} color="#9ca3af" />
            <Text style={styles.timeText}>{estimatedTime} mins</Text>
          </View>
          <View style={styles.distanceInfo}>
            <Ionicons name="navigate-outline" size={16} color="#9ca3af" />
            <Text style={styles.distanceText}>{distance.toFixed(1)} km</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.declineButton}
          onPress={() => onDecline(request.id)}
        >
          <Text style={styles.declineText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.acceptButton}
          onPress={() => onAccept(request.id)}
        >
          <Text style={styles.acceptText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    backgroundColor: '#1f2937',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  userRating: {
    fontSize: 14,
    color: '#9ca3af',
  },
  fareInfo: {
    alignItems: 'flex-end',
  },
  fare: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00C4CC',
  },
  distance: {
    fontSize: 14,
    color: '#9ca3af',
  },
  locations: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  locationDot: {
    width: 32,
    alignItems: 'center',
    paddingTop: 4,
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981', // green-500
  },
  dropoffDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444', // red-500
  },
  locationLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  locationAddress: {
    fontSize: 14,
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#9ca3af',
    marginLeft: 4,
  },
  distanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    color: '#9ca3af',
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    padding: 12,
  },
  declineButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  declineText: {
    color: 'white',
    fontWeight: '500',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#00C4CC',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
  },
  acceptText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default RideRequestCard;
