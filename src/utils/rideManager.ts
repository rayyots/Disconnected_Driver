
import { ActiveRide, Ride, RideRequest, Rider } from "@/contexts/rideTypes";

/** Accept a ride request */
export function acceptRideUtil(
  id: string,
  rideRequests: RideRequest[],
  setActiveRide: (ar: ActiveRide) => void,
  setRideRequests: React.Dispatch<React.SetStateAction<RideRequest[]>>,
  playSound: (url: string, volume?: number) => void,
  showToast: (type: "success", msg: string, desc?: string, duration?: number) => void
) {
  const request = rideRequests.find((req) => req.id === id);
  if (!request) return;

  playSound("/sounds/accept.mp3", 0.5);

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

  showToast("success", "Ride accepted!", `Picking up ${request.rider.name}`, 3000);
}

/** Decline a ride request */
export function declineRideUtil(
  id: string,
  setRideRequests: React.Dispatch<React.SetStateAction<RideRequest[]>>,
  playSound: (url: string, volume?: number) => void,
  showToast: (type: "info", msg: string, desc?: string, duration?: number) => void
) {
  playSound("/sounds/decline.mp3", 0.4);

  setRideRequests((prev) => prev.filter((req) => req.id !== id));
  showToast("info", "Ride request declined", undefined, 2000);
}

/** Arrive at pickup location */
export function arriveAtPickupUtil(
  activeRide: ActiveRide | null,
  setActiveRide: (ar: ActiveRide) => void,
  playSound: (url: string, volume?: number) => void,
  showToast: (type: "success", msg: string, desc?: string, duration?: number) => void
) {
  if (!activeRide) return;
  playSound("/sounds/notification.mp3", 0.4);
  setActiveRide({ ...activeRide, status: "arrived" });
  showToast("success", "You've arrived at the pickup location!", undefined, 3000);
}

/** Start a ride */
export function startRideUtil(
  activeRide: ActiveRide | null,
  setActiveRide: (ar: ActiveRide) => void,
  playSound: (url: string, volume?: number) => void,
  showToast: (type: "success", msg: string, desc?: string, duration?: number) => void
) {
  if (!activeRide) return;
  playSound("/sounds/start.mp3", 0.4);
  setActiveRide({ ...activeRide, status: "in_progress" });
  showToast("success", "Ride started!", `Heading to ${activeRide.dropoffLocation.address}`, 3000);
}

/** Complete a ride */
export function completeRideUtil(
  activeRide: ActiveRide | null,
  setRideHistory: React.Dispatch<React.SetStateAction<Ride[]>>,
  setActiveRide: (ar: ActiveRide | null) => void,
  playSound: (url: string, volume?: number) => void,
  showToast: (type: "success", msg: string, desc?: string, duration?: number) => void
) {
  if (!activeRide) return;
  playSound("/sounds/complete.mp3", 0.5);

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

  showToast("success", `Ride completed! Earned EGP ${completedRide.fare.toFixed(2)}`, undefined, 4000);
}

/** Cancel a ride */
export function cancelRideUtil(
  activeRide: ActiveRide | null,
  setRideHistory: React.Dispatch<React.SetStateAction<Ride[]>>,
  setActiveRide: (ar: ActiveRide | null) => void,
  playSound: (url: string, volume?: number) => void,
  showToast: (type: "error", msg: string, desc?: string, duration?: number) => void
) {
  if (!activeRide) return;
  playSound("/sounds/cancel.mp3", 0.4);

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

  showToast("error", "Ride cancelled", undefined, 3000);
}
