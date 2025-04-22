
import React from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  const { driver, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Profile</Text>
        
        <View style={styles.contentContainer}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {driver?.name ? driver.name.charAt(0) : 'D'}
              </Text>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.nameText}>{driver?.name || 'Driver Name'}</Text>
              <Text style={styles.ratingText}>Rating: {driver?.rating || 0} ★</Text>
            </View>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Driver Information</Text>
            
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={20} color="#9ca3af" />
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{driver?.email || 'driver@example.com'}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="car-outline" size={20} color="#9ca3af" />
              <Text style={styles.infoLabel}>Vehicle:</Text>
              <Text style={styles.infoValue}>{driver?.vehicle?.model || 'Unknown'}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="speedometer-outline" size={20} color="#9ca3af" />
              <Text style={styles.infoLabel}>Total Rides:</Text>
              <Text style={styles.infoValue}>{driver?.totalRides || 0}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={logout}
          >
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00C4CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  profileInfo: {
    marginLeft: 16,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  ratingText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#9ca3af',
    marginLeft: 8,
    width: 120,
  },
  infoValue: {
    fontSize: 16,
    color: 'white',
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
});

export default ProfileScreen;
