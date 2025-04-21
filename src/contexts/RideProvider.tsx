
import React, { createContext, useContext, useState, useEffect } from "react";
import { generateRideHistory } from "@/data/drivers";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import {
  RideContextType,
  Ride,
  ActiveRide,
  RideRequest,
  Rider,
  RideProviderProps,
  RideStatus,
  Location,
} from "./rideTypes";

const RideContext = createContext<RideContextType | undefined>(undefined);

const dummyRideRequests: RideRequest[] = [
  {
    id: "request1",
    pickupLocation: {
      address: "CFC Mall",
      lat: 37.7749,
      lng: -122.4194,
    },
    dropoffLocation: {
      address: "Downtown Mall",
      lat: 37.7922,
      lng: -122.3984,
    },
    rider: {
      name: "Marawan Mohsen",
      rating: 4.8,
    },
    fare: 51.75,
    estimatedTime: 12,
    distance: 4.2,
  },
  {
    id: "request2",
    pickupLocation: {
      address: "District 5",
      lat: 37.7835,
      lng: -122.3967,
    },
    dropoffLocation: {
      address: "Maadi Club",
      lat: 37.7938,
      lng: -122.3968,
    },
    rider: {
      name: "Esraa Ahmed",
      rating: 4.9,
    },
    fare: 120.9,
    estimatedTime: 20,
    distance: 2.8,
  },
];

export const RideProvider = ({ children }: RideProviderProps) => {
  const { driver } = useAuth();
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([]);
  const [activeRide, setActiveRide] = useState<ActiveRide | null>(null);
  const [rideHistory, setRideHistory] = useState<Ride[]>([]);

  useEffect(() => {
    if (driver) {
      const driverHistory = generateRideHistory(driver.id);
      setRideHistory(driverHistory);

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

  useEffect(() => {
    if (driver && driver.isOnline) {
      setRideRequests(dummyRideRequests);
    } else {
      setRideRequests([]);
    }
  }, [driver?.isOnline]);

  const acceptRide = (id: string) => {
    const request = rideRequests.find((req) => req.id === id);
    if (!request) return;

    const acceptSound = new Audio("/sounds/accept.mp3");
    acceptSound.volume = 0.5;
    acceptSound.play().catch((e) => console.log("Audio play failed:", e));

    const newActiveRide: ActiveRide = {
      id: request.id,
      pickupLocation: request.pickupLocation,
      dropoffLocation: request.dropoffLocation,
      rider: request.rider,
      fare: request.fare,
      estimatedTime: request.estimatedTime,
      distance: request.distance,
      status: "accepted",
    };

    setActiveRide(newActiveRide);
    setRideRequests((prev) => prev.filter((req) => req.id !== id));

    toast.success("Ride accepted!", {
      description: `Picking up ${request.rider.name}`,
      duration: 3000,
    });
  };

  const declineRide = (id: string) => {
    const declineSound = new Audio("/sounds/decline.mp3");
    declineSound.volume = 0.4;
    declineSound.play().catch((e) => console.log("Audio play failed:", e));

    setRideRequests((prev) => prev.filter((req) => req.id !== id));
    toast.info("Ride request declined", { duration: 2000 });
  };

  const arriveAtPickup = () => {
    if (!activeRide) return;

    const notifySound = new Audio("/sounds/notification.mp3");
    notifySound.volume = 0.4;
    notifySound.play().catch((e) => console.log("Audio play failed:", e));

    setActiveRide({
      ...activeRide,
      status: "arrived",
    });

    toast.success("You've arrived at the pickup location!", { duration: 3000 });
  };

  const startRide = () => {
    if (!activeRide) return;

    const startSound = new Audio("/sounds/start.mp3");
    startSound.volume = 0.4;
    startSound.play().catch((e) => console.log("Audio play failed:", e));

    setActiveRide({
      ...activeRide,
      status: "in_progress",
    });

    toast.success("Ride started!", {
      description: `Heading to ${activeRide.dropoffLocation.address}`,
      duration: 3000,
    });
  };

  const completeRide = () => {
    if (!activeRide) return;

    const completeSound = new Audio("/sounds/complete.mp3");
    completeSound.volume = 0.5;
    completeSound.play().catch((e) => console.log("Audio play failed:", e));

    // Convert ActiveRide to Ride with required props.
    const completedRide: Ride = {
      id: activeRide.id,
      pickupLocation: activeRide.pickupLocation,
      dropoffLocation: activeRide.dropoffLocation,
      passengerName: activeRide.rider.name,
      passengerRating: activeRide.rider.rating,
      fare: activeRide.fare,
      status: "completed",
      endTime: new Date(),
      date: new Date(),
      distance: activeRide.distance,
      rider: activeRide.rider,
    };

    setRideHistory((prev) => [completedRide, ...prev]);
    setActiveRide(null);

    toast.success(`Ride completed! Earned EGP ${completedRide.fare.toFixed(2)}`, {
      duration: 4000,
    });
  };

  const cancelRide = () => {
    if (!activeRide) return;

    const cancelSound = new Audio("/sounds/cancel.mp3");
    cancelSound.volume = 0.4;
    cancelSound.play().catch((e) => console.log("Audio play failed:", e));

    // Convert ActiveRide to Ride with required props.
    const cancelledRide: Ride = {
      id: activeRide.id,
      pickupLocation: activeRide.pickupLocation,
      dropoffLocation: activeRide.dropoffLocation,
      passengerName: activeRide.rider.name,
      passengerRating: activeRide.rider.rating,
      fare: activeRide.fare,
      status: "cancelled",
      endTime: new Date(),
      date: new Date(),
      distance: activeRide.distance,
      rider: activeRide.rider,
    };

    setRideHistory((prev) => [cancelledRide, ...prev]);
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
        cancelRide,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => {
  const context = useContext(RideContext);
  if (context === undefined) {
    throw new Error("useRide must be used within a RideProvider");
  }
  return context;
};
