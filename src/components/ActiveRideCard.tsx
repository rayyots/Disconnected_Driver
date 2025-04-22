
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Location {
  address: string;
  lat?: number;
  lng?: number;
}

interface Rider {
  name: string;
  rating: number;
}

interface ActiveRide {
  id: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  rider: Rider;
  fare: number;
  estimatedTime: number;
  distance: number;
  status: 'accepted' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';
}

interface ActiveRideCardProps {
  ride: ActiveRide;
  onArriveAtPickup: () => void;
  onStartRide: () => void;
  onCompleteRide: () => void;
  onCancelRide: () => void;
}

const ActiveRideCard: React.FC<ActiveRideCardProps> = ({ 
  ride, 
  onArriveAtPickup,
  onStartRide,
  onCompleteRide,
  onCancelRide 
}) => {
  // Determine which buttons to show based on ride status
  const renderActionButtons = () => {
    switch (ride.status) {
      case 'accepted':
        return (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onCancelRide}
            >
              <Text style={styles.cancelText}>Cancel Ride</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={onArriveAtPickup}
            >
              <Text style={styles.primaryButtonText}>Arrived at Pickup</Text>
            </TouchableOpacity>
          </View>
        );
      case 'arrived':
        return (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onCancelRide}
            >
              <Text style={styles.cancelText}>Cancel Ride</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={onStartRide}
            >
              <Text style={styles.primaryButtonText}>Start Ride</Text>
            </TouchableOpacity>
          </View>
        );
      case 'in_progress':
        return (
          <TouchableOpacity 
            style={styles.completeButton}
            onPress={onCompleteRide}
          >
            <Text style={styles.primaryButtonText}>Complete Ride</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };
  
  // Determine header text based on ride status
  const getStatusHeader = () => {
    switch (ride.status) {
      case 'accepted':
        return 'Driving to pickup location';
      case 'arrived':
        return 'Waiting for passenger';
      case 'in_progress':
        return 'Ride in progress';
      case 'completed':
        return 'Ride completed';
      default:
        return 'Active ride';
    }
  };
  
  // Determine which location to highlight based on ride status
  const highlightPickup = ride.status === 'accepted';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{getStatusHeader()}</Text>
        <Text style={styles.fareText}>EGP {ride.fare.toFixed(2)}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.userInfo}>
          <View style={styles.userIcon}>
            <Ionicons name="person" size={20} color="#00C4CC" />
          </View>
          <View>
            <Text style={styles.userName}>{ride.rider.name}</Text>
            <Text style={styles.userRating}>Rating: {ride.rider.rating}★</Text>
          </View>
        </View>
        
        <View style={styles.locations}>
          <View style={[
            styles.locationRow, 
            highlightPickup && styles.highlightedLocation
          ]}>
            <View style={styles.locationDot}>
              <View style={styles.pickupDot} />
            </View>
            <View>
              <Text style={styles.locationLabel}>Pickup</Text>
              <Text style={styles.locationAddress}>{ride.pickupLocation.address}</Text>
            </View>
          </View>
          
          <View style={[
            styles.locationRow, 
            !highlightPickup && styles.highlightedLocation
          ]}>
            <View style={styles.locationDot}>
              <View style={styles.dropoffDot} />
            </View>
            <View>
              <Text style={styles.locationLabel}>Dropoff</Text>
              <Text style={styles.locationAddress}>{ride.dropoffLocation.address}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.timeInfo}>
            <Ionicons name="time-outline" size={16} color="#9ca3af" />
            <Text style={styles.timeText}>{ride.estimatedTime} mins</Text>
          </View>
          <View style={styles.distanceInfo}>
            <Ionicons name="navigate-outline" size={16} color="#9ca3af" />
            <Text style={styles.distanceText}>{ride.distance.toFixed(1)} km</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actions}>
        {renderActionButtons()}
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
  header: {
    backgroundColor: '#00C4CC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  fareText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  locations: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  highlightedLocation: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)', // gray-700 with opacity
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
    backgroundColor: '#1f2937',
    padding: 12,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  cancelText: {
    color: 'white',
    fontWeight: '500',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#00C4CC',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#00C4CC',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default ActiveRideCard;
