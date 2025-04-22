
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";

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

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : undefined;
    setDateRange({ ...dateRange, from: date });
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : undefined;
    setDateRange({ ...dateRange, to: date });
  };

  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-gray-700 rounded-lg p-3 mb-4"
    >
      <div className="flex flex-row items-center justify-between">
        <CollapsibleTrigger asChild>
          <button className="p-2 flex flex-row items-center text-left bg-transparent border-0">
            <Filter className="h-4 w-4 mr-2 text-gray-300" />
            <span className="text-gray-300">Filters</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 ml-2 text-gray-300" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2 text-gray-300" />
            )}
          </button>
        </CollapsibleTrigger>
        {(dateRange.from || dateRange.to || statusFilter) && (
          <button
            onClick={onResetFilters}
            className="flex flex-row items-center bg-transparent border-0"
          >
            <X className="h-3 w-3 mr-1 text-gray-400" />
            <span className="text-xs text-gray-400">Reset</span>
          </button>
        )}
      </div>

      <CollapsibleContent className="mt-3 space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-300">Date Range</p>
          <div className="flex flex-row space-x-2">
            <div className="flex-1 space-y-1">
              <div className="flex flex-row items-center">
                <CalendarIcon className="h-3 w-3 mr-1 text-gray-400" />
                <span className="text-xs text-gray-400">From</span>
              </div>
              <Input
                type="date"
                value={formatDateForInput(dateRange.from)}
                onChange={handleFromDateChange}
                className="bg-gray-800 border-gray-600 text-white h-8 text-sm"
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex flex-row items-center">
                <CalendarIcon className="h-3 w-3 mr-1 text-gray-400" />
                <span className="text-xs text-gray-400">To</span>
              </div>
              <Input
                type="date"
                value={formatDateForInput(dateRange.to)}
                onChange={handleToDateChange}
                className="bg-gray-800 border-gray-600 text-white h-8 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-300">Ride Status</p>
          <ToggleGroup 
            type="single" 
            value={statusFilter || ""}
            onValueChange={(value) => setStatusFilter(value || null)}
            className="flex flex-row flex-wrap gap-1"
          >
            <ToggleGroupItem value="completed" className="bg-gray-800 text-xs h-7 px-2">
              <span>Completed</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="cancelled" className="bg-gray-800 text-xs h-7 px-2">
              <span>Cancelled</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterRideHistory;
