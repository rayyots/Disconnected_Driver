
import React from 'react';
import AppLayout from '@/components/AppLayout';
import DriverStatusToggle from '@/components/DriverStatusToggle';
import RideRequestCard from '@/components/RideRequestCard';
import ActiveRideCard from '@/components/ActiveRideCard';
import MapPlaceholder from '@/components/MapPlaceholder';
import { useRide } from '@/contexts/RideContext';
import { useAuth } from '@/contexts/AuthContext';

const HomePage: React.FC = () => {
  const { driver } = useAuth();
  const { 
    rideRequests, 
    activeRide, 
    acceptRide, 
    declineRide,
    arriveAtPickup,
    startRide,
    completeRide,
    cancelRide
  } = useRide();
  
  // Show message when offline
  if (!driver?.isOnline && !activeRide) {
    return (
      <AppLayout title="Home">
        <div className="space-y-6">
          <DriverStatusToggle />
          
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <h3 className="text-xl font-medium text-white mb-2">You're offline</h3>
            <p className="text-gray-400">
              Go online to start receiving ride requests
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }
  
  // Show active ride if there is one
  if (activeRide) {
    return (
      <AppLayout title="Active Ride">
        <div className="space-y-6">
          <DriverStatusToggle />
          
          <MapPlaceholder 
            startAddress={activeRide.pickupLocation.address}
            endAddress={activeRide.dropoffLocation.address}
            isPickup={activeRide.status === 'accepted'}
          />
          
          <ActiveRideCard 
            ride={activeRide}
            onArriveAtPickup={arriveAtPickup}
            onStartRide={startRide}
            onCompleteRide={completeRide}
            onCancelRide={cancelRide}
          />
        </div>
      </AppLayout>
    );
  }
  
  // Show available ride requests
  return (
    <AppLayout title="Home">
      <div className="space-y-6">
        <DriverStatusToggle />
        
        {rideRequests.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-white">Available Rides</h2>
            {rideRequests.map(request => (
              <RideRequestCard 
                key={request.id}
                request={request}
                onAccept={acceptRide}
                onDecline={declineRide}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <h3 className="text-xl font-medium text-white mb-2">No rides available</h3>
            <p className="text-gray-400">
              Stay online and you'll receive new ride requests here
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default HomePage;
