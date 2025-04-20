
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

// Types
export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Rider {
  id: string;
  name: string;
  rating: number;
  photoUrl?: string;
}

export interface RideRequest {
  id: string;
  rider: Rider;
  pickupLocation: Location;
  dropoffLocation: Location;
  fare: number;
  distance: number;
  estimatedTime: number;
  createdAt: Date;
}

export interface ActiveRide extends RideRequest {
  status: 'accepted' | 'arrived' | 'in_progress' | 'completed';
  startTime?: Date;
  endTime?: Date;
}

export type RideHistory = (ActiveRide & { completed: true })[];

// Mock data
const mockRideRequests: RideRequest[] = [
  {
    id: 'ride-1',
    rider: {
      id: 'rider-101',
      name: 'Alice',
      rating: 4.7,
    },
    pickupLocation: {
      lat: 40.7128,
      lng: -74.0060,
      address: '123 Broadway, New York, NY'
    },
    dropoffLocation: {
      lat: 40.7580,
      lng: -73.9855,
      address: '456 Park Ave, New York, NY'
    },
    fare: 18.50,
    distance: 3.2,
    estimatedTime: 15,
    createdAt: new Date()
  },
  {
    id: 'ride-2',
    rider: {
      id: 'rider-102',
      name: 'Bob',
      rating: 4.9,
    },
    pickupLocation: {
      lat: 40.7282,
      lng: -73.9942,
      address: '789 Grand St, Brooklyn, NY'
    },
    dropoffLocation: {
      lat: 40.7114,
      lng: -73.9568,
      address: '321 Metropolitan Ave, Brooklyn, NY'
    },
    fare: 12.75,
    distance: 2.1,
    estimatedTime: 10,
    createdAt: new Date(Date.now() - 120000) // 2 minutes ago
  }
];

const mockRideHistory: RideHistory = [
  {
    id: 'hist-1',
    rider: {
      id: 'rider-103',
      name: 'Charlie',
      rating: 4.5,
    },
    pickupLocation: {
      lat: 40.7328,
      lng: -73.9867,
      address: '555 Bedford Ave, Brooklyn, NY'
    },
    dropoffLocation: {
      lat: 40.7193,
      lng: -73.9552,
      address: '777 Lorimer St, Brooklyn, NY'
    },
    fare: 15.25,
    distance: 2.5,
    estimatedTime: 12,
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    status: 'completed',
    startTime: new Date(Date.now() - 86395000), // 1 day - 5 min ago
    endTime: new Date(Date.now() - 86388000), // 1 day - 12 min ago
    completed: true
  },
  {
    id: 'hist-2',
    rider: {
      id: 'rider-104',
      name: 'Dana',
      rating: 4.8,
    },
    pickupLocation: {
      lat: 40.7233,
      lng: -73.9879,
      address: '123 N 7th St, Brooklyn, NY'
    },
    dropoffLocation: {
      lat: 40.7033,
      lng: -73.9215,
      address: '456 Wythe Ave, Brooklyn, NY'
    },
    fare: 22.80,
    distance: 3.8,
    estimatedTime: 18,
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    status: 'completed',
    startTime: new Date(Date.now() - 172790000), // 2 days - 10 min ago
    endTime: new Date(Date.now() - 172770000), // 2 days - 30 min ago
    completed: true
  }
];

// Context type
interface RideContextType {
  rideRequests: RideRequest[];
  activeRide: ActiveRide | null;
  rideHistory: RideHistory;
  acceptRide: (rideId: string) => void;
  declineRide: (rideId: string) => void;
  arriveAtPickup: () => void;
  startRide: () => void;
  completeRide: () => void;
  cancelRide: () => void;
  isLoading: boolean;
}

const RideContext = createContext<RideContextType | undefined>(undefined);

export const RideProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { driver, isAuthenticated } = useAuth();
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([]);
  const [activeRide, setActiveRide] = useState<ActiveRide | null>(null);
  const [rideHistory, setRideHistory] = useState<RideHistory>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load ride data (simulating Firestore)
  useEffect(() => {
    if (isAuthenticated && driver?.isOnline) {
      // Load ride requests if driver is online
      setRideRequests(mockRideRequests);
      
      // Check for active ride in local storage
      const savedRide = localStorage.getItem('active_ride');
      if (savedRide) {
        try {
          const parsedRide = JSON.parse(savedRide);
          // Convert string dates back to Date objects
          parsedRide.createdAt = new Date(parsedRide.createdAt);
          if (parsedRide.startTime) parsedRide.startTime = new Date(parsedRide.startTime);
          if (parsedRide.endTime) parsedRide.endTime = new Date(parsedRide.endTime);
          setActiveRide(parsedRide);
        } catch (err) {
          console.error('Failed to parse saved ride', err);
          localStorage.removeItem('active_ride');
        }
      }
      
      // Load ride history
      setRideHistory(mockRideHistory);
    } else {
      // Clear ride data if driver is offline or not authenticated
      setRideRequests([]);
      setActiveRide(null);
    }
  }, [isAuthenticated, driver?.isOnline]);

  // Accept a ride request
  const acceptRide = (rideId: string) => {
    setIsLoading(true);
    
    // Find the requested ride
    const requestedRide = rideRequests.find(req => req.id === rideId);
    
    if (requestedRide) {
      // Convert to active ride
      const newActiveRide: ActiveRide = {
        ...requestedRide,
        status: 'accepted',
      };
      
      // Update state and local storage
      setActiveRide(newActiveRide);
      localStorage.setItem('active_ride', JSON.stringify(newActiveRide));
      
      // Remove from available requests
      setRideRequests(prev => prev.filter(req => req.id !== rideId));
      
      toast.success('Ride accepted! Navigate to pickup location.');
    }
    
    setIsLoading(false);
  };

  // Decline a ride request
  const declineRide = (rideId: string) => {
    setRideRequests(prev => prev.filter(req => req.id !== rideId));
    toast.info('Ride declined');
  };

  // Driver arrives at pickup location
  const arriveAtPickup = () => {
    if (activeRide && activeRide.status === 'accepted') {
      const updatedRide = {
        ...activeRide,
        status: 'arrived' as const
      };
      
      setActiveRide(updatedRide);
      localStorage.setItem('active_ride', JSON.stringify(updatedRide));
      
      toast.success('Arrived at pickup location');
    }
  };

  // Start the ride (passenger picked up)
  const startRide = () => {
    if (activeRide && activeRide.status === 'arrived') {
      const updatedRide = {
        ...activeRide,
        status: 'in_progress' as const,
        startTime: new Date()
      };
      
      setActiveRide(updatedRide);
      localStorage.setItem('active_ride', JSON.stringify(updatedRide));
      
      toast.success('Ride started');
    }
  };

  // Complete the ride
  const completeRide = () => {
    if (activeRide && activeRide.status === 'in_progress') {
      const completedRide = {
        ...activeRide,
        status: 'completed' as const,
        endTime: new Date(),
        completed: true as const
      };
      
      // Add to history
      setRideHistory(prev => [completedRide as any, ...prev]);
      
      // Clear active ride
      setActiveRide(null);
      localStorage.removeItem('active_ride');
      
      toast.success(`Ride completed! Earned $${completedRide.fare.toFixed(2)}`);
    }
  };

  // Cancel the ride (after acceptance)
  const cancelRide = () => {
    if (activeRide) {
      setActiveRide(null);
      localStorage.removeItem('active_ride');
      toast.error('Ride cancelled');
    }
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
        cancelRide,
        isLoading
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRide = (): RideContextType => {
  const context = useContext(RideContext);
  if (context === undefined) {
    throw new Error('useRide must be used within a RideProvider');
  }
  return context;
};
