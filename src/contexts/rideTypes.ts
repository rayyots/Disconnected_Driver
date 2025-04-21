
import { ReactNode } from "react";

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

export type RideStatus =
  | "pending"
  | "accepted"
  | "arrived"
  | "in_progress"
  | "completed"
  | "cancelled";

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
  rider?: Rider;
};

export type ActiveRide = {
  id: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  rider: Rider;
  fare: number;
  estimatedTime: number;
  distance: number;
  status: RideStatus;
};

export type RideContextType = {
  rideRequests: RideRequest[];
  activeRide: ActiveRide | null;
  rideHistory: Ride[];
  acceptRide: (id: string) => void;
  declineRide: (id: string) => void;
  arriveAtPickup: () => void;
  startRide: () => void;
  completeRide: () => void;
  cancelRide: () => void;
};

export type RideProviderProps = { children: ReactNode };
