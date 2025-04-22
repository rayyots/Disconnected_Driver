import React, { createContext, useContext, useState, useEffect } from "react";
import { generateRideHistory } from "@/data/drivers";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import { useAudio } from "@/hooks/useAudio";
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
import {
  acceptRideUtil,
  declineRideUtil,
  arriveAtPickupUtil,
  startRideUtil,
  completeRideUtil,
  cancelRideUtil,
} from "@/utils/rideManager";

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
  const { playSound } = useAudio();

  function showToast(
    type: "success" | "error" | "info",
    title: string,
    description?: string,
    duration = 3000
  ) {
    if (type === "success") {
      toast.success(title, { description, duration });
    } else if (type === "error") {
      toast.error(title, { description, duration });
    } else {
      toast.info(title, { description, duration });
    }
  }

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

  const acceptRide = (id: string) =>
    acceptRideUtil(
      id,
      rideRequests,
      setActiveRide,
      setRideRequests,
      playSound,
      (type, msg, desc, duration) => showToast(type, msg, desc, duration)
    );

  const declineRide = (id: string) =>
    declineRideUtil(
      id,
      setRideRequests,
      playSound,
      (type, msg, desc, duration) => showToast(type, msg, desc, duration)
    );

  const arriveAtPickup = () =>
    arriveAtPickupUtil(
      activeRide,
      setActiveRide,
      playSound,
      (type, msg, desc, duration) => showToast(type, msg, desc, duration)
    );

  const startRide = () =>
    startRideUtil(
      activeRide,
      setActiveRide,
      playSound,
      (type, msg, desc, duration) => showToast(type, msg, desc, duration)
    );

  const completeRide = () =>
    completeRideUtil(
      activeRide,
      setRideHistory,
      setActiveRide,
      playSound,
      (type, msg, desc, duration) => showToast(type, msg, desc, duration)
    );

  const cancelRide = () =>
    cancelRideUtil(
      activeRide,
      setRideHistory,
      setActiveRide,
      playSound,
      (type, msg, desc, duration) => showToast(type, msg, desc, duration)
    );

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
