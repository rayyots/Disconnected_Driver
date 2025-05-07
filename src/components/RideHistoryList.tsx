
import React, { useMemo, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList 
} from '@/utils/react-native-adapter';
import { useRide } from '@/contexts/RideContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilterRideHistory from './FilterRideHistory';

const RideHistoryList: React.FC = () => {
  const { rideHistory } = useRide();
  
  // Filter state
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Reset filters function
  const resetFilters = () => {
    setDateRange({ from: undefined, to: undefined });
    setStatusFilter(null);
  };
  
  // Format date for display - extracted outside the useMemo to avoid initialization issues
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Unknown';
    
    try {
      const now = new Date();
      const rideDate = new Date(date);
      
      // If ride was today, show "Today at [time]"
      if (
        rideDate.getDate() === now.getDate() &&
        rideDate.getMonth() === now.getMonth() &&
        rideDate.getFullYear() === now.getFullYear()
      ) {
        return `Today at ${rideDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
      
      // If ride was yesterday, show "Yesterday at [time]"
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      if (
        rideDate.getDate() === yesterday.getDate() &&
        rideDate.getMonth() === yesterday.getMonth() &&
        rideDate.getFullYear() === yesterday.getFullYear()
      ) {
        return `Yesterday at ${rideDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
      
      // Otherwise, show full date
      return rideDate.toLocaleDateString([], { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Invalid date';
    }
  };
  
  // Memoize formatted and filtered ride data - fixed the variable initialization issue
  const formattedRides = useMemo(() => {
    // First format the rides
    return rideHistory.map(ride => ({
      ...ride,
      formattedDate: formatDate(ride.endTime)
    })).filter(ride => {
      // Apply date range filter if set
      if (dateRange.from && ride.endTime) {
        const from = new Date(dateRange.from);
        from.setHours(0, 0, 0, 0);
        
        const rideDate = new Date(ride.endTime);
        if (rideDate < from) return false;
      }
      
      if (dateRange.to && ride.endTime) {
        const to = new Date(dateRange.to);
        to.setHours(23, 59, 59, 999);
        
        const rideDate = new Date(ride.endTime);
        if (rideDate > to) return false;
      }
      
      // Apply status filter if set
      if (statusFilter && ride.status !== statusFilter) {
        return false;
      }
      
      return true;
    });
  }, [rideHistory, dateRange, statusFilter]);
  
  const renderRideItem = ({ item }: { item: any }) => (
    <View style={styles.rideItem}>
      <View style={styles.rideHeader}>
        <View>
          <Text style={styles.passengerName}>{item.passengerName || 'Unknown Passenger'}</Text>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={12} color="#9ca3af" />
            <Text style={styles.dateText}>{item.formattedDate}</Text>
          </View>
        </View>
        <Text style={styles.fareText}>EGP {item.fare.toFixed(2)}</Text>
      </View>
      
      <View style={styles.locations}>
        <View style={styles.locationRow}>
          <View style={styles.locationDot}>
            <View style={styles.pickupDot} />
          </View>
          <Text style={styles.locationText}>{item.pickupLocation?.address || 'Unknown location'}</Text>
        </View>
        
        <View style={styles.locationRow}>
          <View style={styles.locationDot}>
            <View style={styles.dropoffDot} />
          </View>
          <Text style={styles.locationText}>{item.dropoffLocation?.address || 'Unknown location'}</Text>
        </View>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ride History</Text>
      </View>
      
      <FilterRideHistory 
        dateRange={dateRange}
        setDateRange={setDateRange}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onResetFilters={resetFilters}
      />
      
      {formattedRides.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No ride history matches your filters</Text>
        </View>
      ) : (
        <FlatList
          data={formattedRides}
          renderItem={renderRideItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
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
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: '#9ca3af',
  },
  rideItem: {
    padding: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#374151',
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#9ca3af',
    marginLeft: 4,
  },
  fareText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00C4CC',
  },
  locations: {
    marginTop: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
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
  locationText: {
    fontSize: 14,
    color: '#9ca3af',
    flex: 1,
  },
});

export default RideHistoryList;
