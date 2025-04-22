
import { Driver } from "@/contexts/AuthContext";
import { Ride } from "@/contexts/rideTypes";

export const driverProfiles: Driver[] = [
  {
    id: "driver-001",
    name: "John Smith",
    phone: "555-123-4567",
    email: "john.smith@example.com",
    rating: 4.8,
    totalRides: 1284,
    vehicle: {
      model: "Tesla Model 3",
      color: "Black",
      plateNumber: "EV-2023",
    },
    isOnline: true,
    earnings: 4850.75,
  },
  {
    id: "driver-002",
    name: "Emily Johnson",
    phone: "555-987-6543",
    email: "emily.j@example.com",
    rating: 4.9,
    totalRides: 843,
    vehicle: {
      model: "Toyota Prius",
      color: "Silver",
      plateNumber: "ECO-123",
    },
    isOnline: false,
    earnings: 3120.50,
  },
  {
    id: "driver-003",
    name: "Michael Chen",
    phone: "555-456-7890",
    email: "m.chen@example.com",
    rating: 4.7,
    totalRides: 652,
    vehicle: {
      model: "Honda Civic",
      color: "Blue",
      plateNumber: "HC-7890",
    },
    isOnline: false,
    earnings: 2790.25,
  },
  {
    id: "driver-004",
    name: "Sofia Garcia",
    phone: "555-789-0123",
    email: "sofia.g@example.com",
    rating: 4.6,
    totalRides: 421,
    vehicle: {
      model: "Chevrolet Bolt",
      color: "White",
      plateNumber: "BOLT-21",
    },
    isOnline: true,
    earnings: 1950.75,
  },
  {
    id: "driver-005",
    name: "David Wilson",
    phone: "555-234-5678",
    email: "d.wilson@example.com",
    rating: 4.5,
    totalRides: 375,
    vehicle: {
      model: "Ford Escape",
      color: "Red",
      plateNumber: "FE-5678",
    },
    isOnline: true,
    earnings: 1675.50,
  },
];

// Generate a random ride history for a given driver ID
export const generateRideHistory = (driverId: string): Ride[] => {
  // Generate a set of past rides for the driver
  const pastRides: Ride[] = [
    {
      id: "ride-001",
      pickupLocation: { 
        address: "Park Avenue",
        lat: 37.7749,
        lng: -122.4194
      },
      dropoffLocation: { 
        address: "Downtown Square",
        lat: 37.7899,
        lng: -122.4021
      },
      passengerName: "Alex Johnson",
      passengerRating: 4.7,
      fare: 25.50,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      status: "completed",
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 25), // 25 mins after pickup
      distance: 3.2,
    },
    {
      id: "ride-002",
      pickupLocation: { 
        address: "Central Mall",
        lat: 37.7833,
        lng: -122.4167
      },
      dropoffLocation: { 
        address: "Green Heights",
        lat: 37.7923,
        lng: -122.4321
      },
      passengerName: "Sarah Lee",
      passengerRating: 4.9,
      fare: 18.75,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      status: "completed",
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 15), // 15 mins after pickup
      distance: 2.1,
    },
    {
      id: "ride-003",
      pickupLocation: { 
        address: "Tech Park",
        lat: 37.7849,
        lng: -122.4294
      },
      dropoffLocation: { 
        address: "Harbor View",
        lat: 37.8079,
        lng: -122.4094
      },
      passengerName: "Michael Brown",
      passengerRating: 4.5,
      fare: 32.20,
      date: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
      status: "completed",
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 10 + 1000 * 60 * 28), // 28 mins after pickup
      distance: 3.8,
    },
    {
      id: "ride-004",
      pickupLocation: { 
        address: "Sunset Apartments",
        lat: 37.7569,
        lng: -122.4334
      },
      dropoffLocation: { 
        address: "City Hospital",
        lat: 37.7629,
        lng: -122.4584
      },
      passengerName: "Jessica Wilson",
      passengerRating: 4.8,
      fare: 15.30,
      date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      status: "completed",
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 5 + 1000 * 60 * 12), // 12 mins after pickup
      distance: 1.5,
    },
    {
      id: "ride-005",
      pickupLocation: { 
        address: "Grand Hotel",
        lat: 37.7879,
        lng: -122.4074
      },
      dropoffLocation: { 
        address: "Airport Terminal",
        lat: 37.7639,
        lng: -122.3924
      },
      passengerName: "Robert Zhang",
      passengerRating: 4.6,
      fare: 45.80,
      date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: "completed",
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 35), // 35 mins after pickup
      distance: 5.7,
    },
    {
      id: "ride-006",
      pickupLocation: { 
        address: "University Campus",
        lat: 37.7749,
        lng: -122.4194
      },
      dropoffLocation: { 
        address: "Tech Park",
        lat: 37.7849,
        lng: -122.4294
      },
      passengerName: "Emma Davis",
      passengerRating: 4.7,
      fare: 12.50,
      date: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      status: "cancelled",
      endTime: new Date(Date.now() - 1000 * 60 * 25), // 25 mins ago
      distance: 1.2,
    }
  ];
  
  // Filter based on driver ID if needed
  // In this simple implementation, we're just returning the same set for any driver ID
  // but in a real app, you would filter rides based on the driver ID
  
  return pastRides;
};
