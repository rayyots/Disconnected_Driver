
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ActiveRide } from '@/contexts/RideContext';
import { Clock, Navigation, User, MapPin, Check } from 'lucide-react';

interface ActiveRideCardProps {
  ride: ActiveRide;
  onArriveAtPickup: () => void;
  onStartRide: () => void;
  onCompleteRide: () => void;
  onCancelRide: () => void;
}

const ActiveRideCard: React.FC<ActiveRideCardProps> = ({ 
  ride, 
  onArriveAtPickup,
  onStartRide,
  onCompleteRide,
  onCancelRide 
}) => {
  // Determine which buttons to show based on ride status
  const renderActionButtons = () => {
    switch (ride.status) {
      case 'accepted':
        return (
          <>
            <Button 
              variant="outline" 
              className="text-white border-gray-600 hover:bg-gray-700"
              onClick={onCancelRide}
            >
              Cancel Ride
            </Button>
            <Button 
              className="bg-[#00C4CC] hover:bg-[#00A8AF] text-white"
              onClick={onArriveAtPickup}
            >
              Arrived at Pickup
            </Button>
          </>
        );
      case 'arrived':
        return (
          <>
            <Button 
              variant="outline" 
              className="text-white border-gray-600 hover:bg-gray-700"
              onClick={onCancelRide}
            >
              Cancel Ride
            </Button>
            <Button 
              className="bg-[#00C4CC] hover:bg-[#00A8AF] text-white"
              onClick={onStartRide}
            >
              Start Ride
            </Button>
          </>
        );
      case 'in_progress':
        return (
          <Button 
            className="w-full bg-[#00C4CC] hover:bg-[#00A8AF] text-white"
            onClick={onCompleteRide}
          >
            Complete Ride
          </Button>
        );
      default:
        return null;
    }
  };
  
  // Determine header text based on ride status
  const getStatusHeader = () => {
    switch (ride.status) {
      case 'accepted':
        return 'Driving to pickup location';
      case 'arrived':
        return 'Waiting for passenger';
      case 'in_progress':
        return 'Ride in progress';
      case 'completed':
        return 'Ride completed';
      default:
        return 'Active ride';
    }
  };
  
  // Determine which location to highlight based on ride status
  const highlightPickup = ride.status === 'accepted';

  return (
    <Card className="w-full bg-gray-800 border-gray-700 overflow-hidden">
      <div className="bg-[#00C4CC] p-3 flex justify-between items-center">
        <h3 className="font-medium text-white">{getStatusHeader()}</h3>
        <div className="text-white font-bold">${ride.fare.toFixed(2)}</div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center mb-4">
          <div className="bg-gray-700 p-2 rounded-full mr-3">
            <User className="h-5 w-5 text-[#00C4CC]" />
          </div>
          <div>
            <h3 className="font-medium text-white">{ride.rider.name}</h3>
            <div className="text-sm text-gray-400">Rating: {ride.rider.rating}★</div>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className={`flex items-start ${highlightPickup ? 'bg-gray-700/30 p-2 rounded' : ''}`}>
            <div className="min-w-8 flex justify-center pt-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Pickup</div>
              <div className="text-white">{ride.pickupLocation.address}</div>
            </div>
          </div>
          
          <div className={`flex items-start ${!highlightPickup ? 'bg-gray-700/30 p-2 rounded' : ''}`}>
            <div className="min-w-8 flex justify-center pt-1">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Dropoff</div>
              <div className="text-white">{ride.dropoffLocation.address}</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{ride.estimatedTime} mins</span>
          </div>
          <div className="flex items-center">
            <Navigation className="h-4 w-4 mr-1" />
            <span>{ride.distance.toFixed(1)} mi</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-900 p-3 flex justify-between gap-3">
        {renderActionButtons()}
      </CardFooter>
    </Card>
  );
};

export default ActiveRideCard;
