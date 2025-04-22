
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRide } from '@/contexts/RideContext';

const EarningsSummary: React.FC = () => {
  const { driver } = useAuth();
  const { rideHistory } = useRide();
  const [animation] = useState(new Animated.Value(0));
  
  // Trigger animation on mount
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  
  // Calculate earnings for different time periods
  const todayEarnings = rideHistory
    .filter(ride => {
      const today = new Date();
      const rideDate = new Date(ride.date || new Date());
      return (
        rideDate.getDate() === today.getDate() &&
        rideDate.getMonth() === today.getMonth() &&
        rideDate.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, ride) => sum + ride.fare, 0);
    
  const weekEarnings = rideHistory
    .filter(ride => {
      const today = new Date();
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const rideDate = new Date(ride.date || new Date());
      return rideDate >= lastWeek;
    })
    .reduce((sum, ride) => sum + ride.fare, 0);
  
  // Default value if driver.earnings is undefined
  const totalEarnings = driver?.earnings || 0;
  
  const animatedStyle = (delay: number) => {
    return {
      opacity: animation,
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0],
          }),
        },
      ],
    };
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Earnings Summary</Text>
        <View style={styles.titleUnderline} />
      </View>
      
      <View style={styles.grid}>
        <Animated.View 
          style={[styles.card, animatedStyle(100)]}
        >
          <Text style={styles.cardLabel}>Today</Text>
          <Text style={styles.cardValue}>EGP {todayEarnings.toFixed(2)}</Text>
        </Animated.View>
        
        <Animated.View 
          style={[styles.card, animatedStyle(200)]}
        >
          <Text style={styles.cardLabel}>This Week</Text>
          <Text style={styles.cardValue}>EGP {weekEarnings.toFixed(2)}</Text>
        </Animated.View>
        
        <Animated.View 
          style={[styles.card, animatedStyle(300)]}
        >
          <Text style={styles.cardLabel}>Total Earnings</Text>
          <Text style={styles.cardValue}>EGP {totalEarnings.toFixed(2)}</Text>
        </Animated.View>
        
        <Animated.View 
          style={[styles.card, animatedStyle(400)]}
        >
          <Text style={styles.cardLabel}>Completed Rides</Text>
          <Text style={styles.cardValue}>{driver?.totalRides || 0}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#374151',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    position: 'relative',
  },
  titleUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    width: '25%',
    height: 4,
    backgroundColor: '#9b87f5',
    borderRadius: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  card: {
    width: '48%',
    backgroundColor: '#1f2937',
    borderRadius: 8,
    padding: 16,
    margin: '1%',
  },
  cardLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default EarningsSummary;
