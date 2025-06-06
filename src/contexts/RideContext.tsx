import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateRideHistory } from '@/data/drivers';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export type Location = {
  address: string;
  lat?: number;
  lng?: number;
};

export type Rider = {
  name: string;
  rating: number;
};

export type RideRequest = {
  id: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  rider: Rider;
  fare: number;
  estimatedTime: number;
  distance: number;
};

export type RideStatus = 'pending' | 'accepted' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';

export type Ride = {
  id: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  passengerName: string;
  passengerRating?: number;
  fare: number;
  date?: Date;
  status: RideStatus;
  startTime?: Date;
  endTime?: Date;
  distance: number;
};

type RideContextType = {
  rideRequests: RideRequest[];
  activeRide: Ride | null;
  rideHistory: Ride[];
  acceptRide: (id: string) => void;
  declineRide: (id: string) => void;
  arriveAtPickup: () => void;
  startRide: () => void;
  completeRide: () => void;
  cancelRide: () => void;
};

const RideContext = createContext<RideContextType | undefined>(undefined);

const dummyRideRequests: RideRequest[] = [
  {
    id: 'request1',
    pickupLocation: {
      address: 'Sakr Koreesh Mall',
      lat: 37.7749,
      lng: -122.4194
    },
    dropoffLocation: {
      address: 'Maadi Center',
      lat: 37.7922,
      lng: -122.3984
    },
    rider: {
      name: 'Sameer William',
      rating: 4.8
    },
    fare: 15.75,
    estimatedTime: 12,
    distance: 4.2
  },
  {
    id: 'request2',
    pickupLocation: {
      address: 'Downtown mall',
      lat: 37.7835,
      lng: -122.3967
    },
    dropoffLocation: {
      address: 'Post Office',
      lat: 37.7938,
      lng: -122.3968
    },
    rider: {
      name: 'Salah Ahmed',
      rating: 4.9
    },
    fare: 12.50,
    estimatedTime: 8,
    distance: 2.8
  }
];

export const RideProvider = ({ children }: { children: ReactNode }) => {
  const { driver } = useAuth();
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([]);
  const [activeRide, setActiveRide] = useState<Ride | null>(null);
  const [rideHistory, setRideHistory] = useState<Ride[]>([]);

  // Load personalized ride history when driver changes
  useEffect(() => {
    if (driver) {
      const driverHistory = generateRideHistory(driver.id);
      setRideHistory(driverHistory);
      
      // Only show ride requests if driver is online
      if (driver.isOnline) {
        setRideRequests(dummyRideRequests);
      } else {
        setRideRequests([]);
      }
    } else {
      setRideHistory([]);
      setRideRequests([]);
    }
  }, [driver]);

  // Update ride requests when driver goes online/offline
  useEffect(() => {
    if (driver && driver.isOnline) {
      setRideRequests(dummyRideRequests);
    } else {
      setRideRequests([]);
    }
  }, [driver?.isOnline]);

  const acceptRide = (id: string) => {
    const request = rideRequests.find(req => req.id === id);
    if (!request) return;
    
    // Play accept sound
    const acceptSound = new Audio("/sounds/accept.mp3");
    acceptSound.volume = 0.5;
    acceptSound.play().catch(e => console.log("Audio play failed:", e));
    
    const newRide: Ride = {
      id: request.id,
      pickupLocation: request.pickupLocation,
      dropoffLocation: request.dropoffLocation,
      passengerName: request.rider.name,
      passengerRating: request.rider.rating,
      fare: request.fare,
      status: 'accepted',
      startTime: new Date(),
      distance: request.distance
    };
    
    setActiveRide(newRide);
    setRideRequests(prev => prev.filter(req => req.id !== id));
    
    toast.success("Ride accepted!", {
      description: `Picking up ${request.rider.name}`,
      duration: 3000,
    });
  };
  
  const declineRide = (id: string) => {
    // Play decline sound
    const declineSound = new Audio("/sounds/decline.mp3");
    declineSound.volume = 0.4;
    declineSound.play().catch(e => console.log("Audio play failed:", e));
    
    setRideRequests(prev => prev.filter(req => req.id !== id));
    toast.info("Ride request declined", { duration: 2000 });
  };
  
  const arriveAtPickup = () => {
    if (!activeRide) return;
    
    // Play notification sound
    const notifySound = new Audio("/sounds/notification.mp3");
    notifySound.volume = 0.4;
    notifySound.play().catch(e => console.log("Audio play failed:", e));
    
    setActiveRide({
      ...activeRide,
      status: 'arrived'
    });
    
    toast.success("You've arrived at the pickup location!", { duration: 3000 });
  };
  
  const startRide = () => {
    if (!activeRide) return;
    
    // Play start ride sound
    const startSound = new Audio("/sounds/start.mp3");
    startSound.volume = 0.4;
    startSound.play().catch(e => console.log("Audio play failed:", e));
    
    setActiveRide({
      ...activeRide,
      status: 'in_progress',
      startTime: new Date()
    });
    
    toast.success("Ride started!", {
      description: `Heading to ${activeRide.dropoffLocation.address}`,
      duration: 3000,
    });
  };
  
  const completeRide = () => {
    if (!activeRide) return;
    
    // Play complete sound
    const completeSound = new Audio("/sounds/complete.mp3");
    completeSound.volume = 0.5;
    completeSound.play().catch(e => console.log("Audio play failed:", e));
    
    const completedRide: Ride = {
      ...activeRide,
      status: 'completed',
      endTime: new Date()
    };
    
    setRideHistory(prev => [completedRide, ...prev]);
    setActiveRide(null);
    
    toast.success(`Ride completed! Earned EGP ${completedRide.fare.toFixed(2)}`, {
      duration: 4000,
    });
  };
  
  const cancelRide = () => {
    if (!activeRide) return;
    
    // Play cancel sound
    const cancelSound = new Audio("/sounds/cancel.mp3");
    cancelSound.volume = 0.4;
    cancelSound.play().catch(e => console.log("Audio play failed:", e));
    
    const cancelledRide: Ride = {
      ...activeRide,
      status: 'cancelled',
      endTime: new Date()
    };
    
    setRideHistory(prev => [cancelledRide, ...prev]);
    setActiveRide(null);
    
    toast.error("Ride cancelled", { duration: 3000 });
  };
  
  return (
    <RideContext.Provider
      value={{
        rideRequests,
        activeRide,
        rideHistory,
        acceptRide,
        declineRide,
        arriveAtPickup,
        startRide,
        completeRide,
        cancelRide
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => {
  const context = useContext(RideContext);
  if (context === undefined) {
    throw new Error('useRide must be used within a RideProvider');
  }
  return context;
};
