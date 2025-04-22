
import React from 'react';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="p-2 text-gray-300 hover:text-white">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {isOpen ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </Button>
        </CollapsibleTrigger>
        {(dateRange.from || dateRange.to || statusFilter) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="text-xs text-gray-400 hover:text-white"
          >
            <X className="h-3 w-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      <CollapsibleContent className="mt-3 space-y-4">
        <div className="space-y-2">
          <Label className="text-sm text-gray-300">Date Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <div className="flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1 text-gray-400" />
                <Label className="text-xs text-gray-400">From</Label>
              </div>
              <Input
                type="date"
                value={formatDateForInput(dateRange.from)}
                onChange={handleFromDateChange}
                className="bg-gray-800 border-gray-600 text-white h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1 text-gray-400" />
                <Label className="text-xs text-gray-400">To</Label>
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
          <Label className="text-sm text-gray-300">Ride Status</Label>
          <ToggleGroup 
            type="single" 
            value={statusFilter || ""}
            onValueChange={(value) => setStatusFilter(value || null)}
            className="flex flex-wrap gap-1 justify-start"
          >
            <ToggleGroupItem value="completed" className="bg-gray-800 text-xs h-7 px-2">
              Completed
            </ToggleGroupItem>
            <ToggleGroupItem value="cancelled" className="bg-gray-800 text-xs h-7 px-2">
              Cancelled
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterRideHistory;
