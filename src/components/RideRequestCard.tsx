
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { RideRequest } from '@/contexts/RideContext';
import { Clock, Navigation, User } from 'lucide-react';

interface RideRequestCardProps {
  request: RideRequest;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

const RideRequestCard: React.FC<RideRequestCardProps> = ({ 
  request, 
  onAccept, 
  onDecline 
}) => {
  return (
    <Card className="w-full bg-gray-800 border-gray-700 overflow-hidden animate-slide-in">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="bg-gray-700 p-2 rounded-full mr-3">
              <User className="h-5 w-5 text-[#00C4CC]" />
            </div>
            <div>
              <h3 className="font-medium text-white">{request.rider.name}</h3>
              <div className="text-sm text-gray-400">Rating: {request.rider.rating}★</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[#00C4CC] font-bold">${request.fare.toFixed(2)}</div>
            <div className="text-sm text-gray-400">{request.distance.toFixed(1)} miles</div>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-start">
            <div className="min-w-8 flex justify-center pt-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Pickup</div>
              <div className="text-white">{request.pickupLocation.address}</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="min-w-8 flex justify-center pt-1">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Dropoff</div>
              <div className="text-white">{request.dropoffLocation.address}</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{request.estimatedTime} mins</span>
          </div>
          <div className="flex items-center">
            <Navigation className="h-4 w-4 mr-1" />
            <span>{request.distance.toFixed(1)} mi</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-900 p-3 flex justify-between gap-3">
        <Button 
          variant="outline" 
          className="w-1/2 border-gray-600 text-white hover:bg-gray-700"
          onClick={() => onDecline(request.id)}
        >
          Decline
        </Button>
        <Button 
          className="w-1/2 bg-[#00C4CC] hover:bg-[#00A8AF] text-white"
          onClick={() => onAccept(request.id)}
        >
          Accept
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RideRequestCard;
