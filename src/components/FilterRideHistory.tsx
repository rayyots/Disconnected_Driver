
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface FilterRideHistoryProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  setDateRange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  onResetFilters: () => void;
}

const FilterRideHistory: React.FC<FilterRideHistoryProps> = ({
  dateRange,
  setDateRange,
  statusFilter,
  setStatusFilter,
  onResetFilters
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFromDateChange = (dateString: string) => {
    const date = dateString ? new Date(dateString) : undefined;
    setDateRange({ ...dateRange, from: date });
  };

  const handleToDateChange = (dateString: string) => {
    const date = dateString ? new Date(dateString) : undefined;
    setDateRange({ ...dateRange, to: date });
  };

  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };
  
  const hasActiveFilters = dateRange.from || dateRange.to || statusFilter;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.triggerButton}
          onPress={() => setIsOpen(!isOpen)}
        >
          <Ionicons name="filter" size={16} color="#9ca3af" />
          <Text style={styles.triggerText}>Filters</Text>
          <Ionicons 
            name={isOpen ? "chevron-up" : "chevron-down"} 
            size={16} 
            color="#9ca3af" 
          />
        </TouchableOpacity>
        
        {hasActiveFilters && (
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={onResetFilters}
          >
            <Ionicons name="close" size={12} color="#9ca3af" />
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      {isOpen && (
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Date Range</Text>
            <View style={styles.dateInputs}>
              <View style={styles.dateInputContainer}>
                <View style={styles.dateLabel}>
                  <Ionicons name="calendar" size={12} color="#9ca3af" />
                  <Text style={styles.dateLabelText}>From</Text>
                </View>
                <TextInput
                  style={styles.dateInput}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#6b7280"
                  value={formatDateForInput(dateRange.from)}
                  onChangeText={handleFromDateChange}
                />
              </View>
              
              <View style={styles.dateInputContainer}>
                <View style={styles.dateLabel}>
                  <Ionicons name="calendar" size={12} color="#9ca3af" />
                  <Text style={styles.dateLabelText}>To</Text>
                </View>
                <TextInput
                  style={styles.dateInput}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#6b7280"
                  value={formatDateForInput(dateRange.to)}
                  onChangeText={handleToDateChange}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ride Status</Text>
            <View style={styles.statusButtons}>
              <TouchableOpacity 
                style={[
                  styles.statusButton,
                  statusFilter === 'completed' && styles.activeStatusButton
                ]}
                onPress={() => setStatusFilter(statusFilter === 'completed' ? null : 'completed')}
              >
                <Text style={styles.statusButtonText}>Completed</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.statusButton,
                  statusFilter === 'cancelled' && styles.activeStatusButton
                ]}
                onPress={() => setStatusFilter(statusFilter === 'cancelled' ? null : 'cancelled')}
              >
                <Text style={styles.statusButtonText}>Cancelled</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triggerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  triggerText: {
    color: '#9ca3af',
    marginHorizontal: 8,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  resetText: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 4,
  },
  content: {
    marginTop: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 8,
  },
  dateInputs: {
    flexDirection: 'row',
    gap: 8,
  },
  dateInputContainer: {
    flex: 1,
  },
  dateLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateLabelText: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 4,
  },
  dateInput: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 4,
    color: 'white',
    height: 32,
    fontSize: 14,
    paddingHorizontal: 8,
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  statusButton: {
    backgroundColor: '#111827',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    height: 28,
  },
  activeStatusButton: {
    backgroundColor: '#00C4CC',
  },
  statusButtonText: {
    fontSize: 12,
    color: 'white',
  },
});

export default FilterRideHistory;
