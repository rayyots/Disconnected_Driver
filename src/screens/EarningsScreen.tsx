
import React from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  ScrollView 
} from 'react-native';
import EarningsSummary from '@/components/EarningsSummary';
import RideHistoryList from '@/components/RideHistoryList';

const EarningsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Earnings</Text>
        <View style={styles.contentContainer}>
          <EarningsSummary />
          <View style={styles.spacer} />
          <RideHistoryList />
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
  },
  spacer: {
    height: 24,
  },
});

export default EarningsScreen;
