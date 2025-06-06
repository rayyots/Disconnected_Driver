import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useRide } from '@/contexts/RideContext';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';

const RideHistoryList: React.FC = () => {
  const { rideHistory } = useRide();
  
  // Format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Unknown';
    
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
  };
  
  if (!rideHistory || rideHistory.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-medium text-white">Ride History</h3>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-400">
            <p>No ride history yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-medium text-white">Ride History</h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-700">
          {rideHistory.map(ride => {
            // Add safety checks for potentially undefined properties
            const passengerName = ride?.passengerName || 'Unknown';
            const pickupAddress = ride?.pickupLocation?.address || 'Unknown location';
            const dropoffAddress = ride?.dropoffLocation?.address || 'Unknown location';
            const fare = ride?.fare || 0;
            
            return (
              <div key={ride.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-white">{passengerName}</h4>
                    <div className="flex items-center text-sm text-gray-400">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      <span>{formatDate(ride.endTime)}</span>
                    </div>
                  </div>
                  <div className="text-[#00C4CC] font-bold">EGP {fare.toFixed(2)}</div>
                </div>
                
                <div className="mt-3 space-y-2">
                  <div className="flex items-start">
                    <div className="min-w-8 flex justify-center pt-1">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm text-gray-400">{pickupAddress}</div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="min-w-8 flex justify-center pt-1">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    </div>
                    <div className="text-sm text-gray-400">{dropoffAddress}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RideHistoryList;
