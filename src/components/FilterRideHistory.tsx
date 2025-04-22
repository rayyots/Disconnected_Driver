
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { DatePickerInput } from '@/components/ui/date-picker-input';
import { Filter, ChevronDown, ChevronUp, X, Calendar } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

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
  const [isOpen, setIsOpen] = React.useState(false);

  const handleFromDateChange = (date: Date | undefined) => {
    setDateRange({ ...dateRange, from: date });
  };

  const handleToDateChange = (date: Date | undefined) => {
    setDateRange({ ...dateRange, to: date });
  };

  const formatDateForDisplay = (date: Date | undefined): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-gray-700 rounded-lg p-3 mb-4"
    >
      <StyledView className="flex-row items-center justify-between">
        <CollapsibleTrigger asChild>
          <StyledTouchableOpacity className="p-2 flex-row items-center">
            <Filter className="h-4 w-4 mr-2 text-gray-300" />
            <StyledText className="text-gray-300">Filters</StyledText>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 ml-2 text-gray-300" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2 text-gray-300" />
            )}
          </StyledTouchableOpacity>
        </CollapsibleTrigger>
        {(dateRange.from || dateRange.to || statusFilter) && (
          <StyledTouchableOpacity
            onPress={onResetFilters}
            className="flex-row items-center"
          >
            <X className="h-3 w-3 mr-1 text-gray-400" />
            <StyledText className="text-xs text-gray-400">Reset</StyledText>
          </StyledTouchableOpacity>
        )}
      </StyledView>

      <CollapsibleContent className="mt-3 space-y-4">
        <StyledView className="space-y-2">
          <StyledText className="text-sm text-gray-300">Date Range</StyledText>
          <StyledView className="flex-row space-x-2">
            <StyledView className="flex-1 space-y-1">
              <StyledView className="flex-row items-center">
                <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                <StyledText className="text-xs text-gray-400">From</StyledText>
              </StyledView>
              <DatePickerInput
                value={dateRange.from}
                onChange={handleFromDateChange}
                className="bg-gray-800 border-gray-600 text-white h-8 text-sm"
              />
            </StyledView>
            <StyledView className="flex-1 space-y-1">
              <StyledView className="flex-row items-center">
                <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                <StyledText className="text-xs text-gray-400">To</StyledText>
              </StyledView>
              <DatePickerInput
                value={dateRange.to}
                onChange={handleToDateChange}
                className="bg-gray-800 border-gray-600 text-white h-8 text-sm"
              />
            </StyledView>
          </StyledView>
        </StyledView>

        <StyledView className="space-y-2">
          <StyledText className="text-sm text-gray-300">Ride Status</StyledText>
          <ToggleGroup 
            type="single" 
            value={statusFilter || ""}
            onValueChange={(value) => setStatusFilter(value || null)}
            className="flex-row flex-wrap gap-1"
          >
            <ToggleGroupItem value="completed" className="bg-gray-800 text-xs h-7 px-2">
              <StyledText>Completed</StyledText>
            </ToggleGroupItem>
            <ToggleGroupItem value="cancelled" className="bg-gray-800 text-xs h-7 px-2">
              <StyledText>Cancelled</StyledText>
            </ToggleGroupItem>
          </ToggleGroup>
        </StyledView>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterRideHistory;
