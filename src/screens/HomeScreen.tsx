
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRide } from '@/contexts/RideContext';
import { useAuth } from '@/contexts/AuthContext';
import DriverStatusToggle from '@/components/DriverStatusToggle';
import RideRequestCard from '@/components/RideRequestCard';
import ActiveRideCard from '@/components/ActiveRideCard';
import MapPlaceholder from '@/components/MapPlaceholder';

const HomeScreen = () => {
  const { driver } = useAuth();
  const { 
    rideRequests, 
    activeRide, 
    acceptRide, 
    declineRide,
    arriveAtPickup,
    startRide,
    completeRide,
    cancelRide
  } = useRide();
  
  // Show message when offline
  if (!driver?.isOnline && !activeRide) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Home</Text>
          <View style={styles.contentContainer}>
            <DriverStatusToggle />
            
            <View style={styles.offlineContainer}>
              <Text style={styles.offlineTitle}>You're offline</Text>
              <Text style={styles.offlineText}>
                Go online to start receiving ride requests
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  // Show active ride if there is one
  if (activeRide) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Active Ride</Text>
          <View style={styles.contentContainer}>
            <DriverStatusToggle />
            
            <MapPlaceholder 
              startAddress={activeRide.pickupLocation.address}
              endAddress={activeRide.dropoffLocation.address}
              isPickup={activeRide.status === 'accepted'}
            />
            
            <ActiveRideCard 
              ride={activeRide}
              onArriveAtPickup={arriveAtPickup}
              onStartRide={startRide}
              onCompleteRide={completeRide}
              onCancelRide={cancelRide}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  // Show available ride requests
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.contentContainer}>
          <DriverStatusToggle />
          
          {rideRequests.length > 0 ? (
            <View style={styles.ridesContainer}>
              <Text style={styles.sectionTitle}>Available Rides</Text>
              {rideRequests.map(request => (
                <View key={request.id} style={styles.cardWrapper}>
                  <RideRequestCard 
                    request={request}
                    onAccept={acceptRide}
                    onDecline={declineRide}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noRidesContainer}>
              <Text style={styles.noRidesTitle}>No rides available</Text>
              <Text style={styles.noRidesText}>
                Stay online and you'll receive new ride requests here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A252F',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 24,
  },
  offlineContainer: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
  },
  offlineTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginBottom: 8,
  },
  offlineText: {
    color: '#9ca3af',
    textAlign: 'center',
  },
  ridesContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginBottom: 8,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  noRidesContainer: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
  },
  noRidesTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginBottom: 8,
  },
  noRidesText: {
    color: '#9ca3af',
    textAlign: 'center',
  },
});

export default HomeScreen;
