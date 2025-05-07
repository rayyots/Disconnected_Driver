
import { Driver } from '@/contexts/AuthContext';
import { Ride, RideStatus } from '@/contexts/RideContext';

export const driverProfiles: Driver[] = [
  {
    id: "driver1",
    name: "Laila Fady",
    phone: "01234567890",
    rating: 4.92,
    totalRides: 289,
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    carDetails: {
      model: "Toyota Camry 2021",
      color: "Deep Blue",
      plateNumber: " ع س 1234"
    },
    isOnline: false,
    earnings: 2843.75
  },
  {
    id: "driver2",
    name: "Omar Rayyan",
    phone: "01111128379",
    rating: 4.87,
    totalRides: 427,
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    carDetails: {
      model: "Honda Accord 2022",
      color: "Silver",
      plateNumber: "ل ب س 1234"
    },
    isOnline: false,
    earnings: 4125.50
  },
  {
    id: "driver3",
    name: "Salmesh Elshazly",
    phone: "01200008122",
    rating: 4.95,
    totalRides: 512,
    avatarUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    carDetails: {
      model: "Tesla Model 3",
      color: "Red",
      plateNumber: "خ خ 5678"
    },
    isOnline: false,
    earnings: 5237.25
  },
  {
    id: "driver4",
    name: "Fady Fady",
    phone: "01117812350",
    rating: 4.795,
    totalRides: 194,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    carDetails: {
      model: "Ford Escape 2021",
      color: "White",
      plateNumber: "ب س 9876"
    },
    isOnline: false,
    earnings: 2105.50
  },
  {
    id: "driver5",
    name: "Omnia Hamada",
    phone: "01212121212",
    rating: 4.91,
    totalRides: 351,
    avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    carDetails: {
      model: "Hyundai Tucson 2022",
      color: "Forest Green",
      plateNumber: "ت س 1234"
    },
    isOnline: false,
    earnings: 3750.75
  }
];

// Create unique ride histories for each driver
export const generateRideHistory = (driverId: string): Ride[] => {
  const baseRides: Ride[] = [
    {
      id: "ride1",
      pickupLocation: { address: "Kilo mart" },
      dropoffLocation: { address: "Maadi center" },
      fare: 15.75,
      date: new Date(2025, 3, 18, 9, 30),
      status: "completed" as RideStatus,
      passengerName: "Laila Fouda",
      distance: 4.2
    },
    {
      id: "ride2",
      pickupLocation: { address: "Sina" },
      dropoffLocation: { address: "Ganoub Sina" },
      fare: 23.50,
      date: new Date(2025, 3, 19, 14, 15),
      status: "completed" as RideStatus,
      passengerName: "Eman Ali",
      distance: 7.8
    },
    {
      id: "ride3",
      pickupLocation: { address: "Cairo University" },
      dropoffLocation: { address: "City Square" },
      fare: 12.25,
      date: new Date(2025, 3, 20, 17, 45),
      status: "completed" as RideStatus,
      passengerName: "Mohamed Ali",
      distance: 3.5
    },
    {
      id: "ride4",
      pickupLocation: { address: "Wahmy" },
      dropoffLocation: { address: " BLBAN" },
      fare: 30.00,
      date: new Date(2025, 3, 21, 8, 0),
      status: "completed" as RideStatus,
      passengerName: "Sarah Abdo",
      distance: 9.1
    }
  ];

  // Customize rides based on driver ID to create unique histories
  switch(driverId) {
    case "driver1":
      return [
        ...baseRides,
        {
          id: "ride5",
          pickupLocation: { address: "CFC Mall" },
          dropoffLocation: { address: "New Giza" },
          fare: 18.25,
          date: new Date(2025, 3, 21, 19, 30),
          status: "completed" as RideStatus,
          passengerName: "Dina Ahmed",
          distance: 5.3
        }
      ];
    case "driver2":
      return [
        ...baseRides.slice(1),
        {
          id: "ride6",
          pickupLocation: { address: "Eslsca University" },
          dropoffLocation: { address: "Street 44" },
          fare: 27.50,
          date: new Date(2025, 3, 21, 12, 15),
          status: "completed" as RideStatus,
          passengerName: "Judy bashar",
          distance: 8.7
        },
        {
          id: "ride7",
          pickupLocation: { address: "Downtown Mall" },
          dropoffLocation: { address: "5th Settlememnt" },
          fare: 22.00,
          date: new Date(2025, 3, 21, 15, 45),
          status: "completed" as RideStatus,
          passengerName: "Ahmed Saleh",
          distance: 6.5
        }
      ];
    case "driver3":
      return [
        ...baseRides,
        {
          id: "ride8",
          pickupLocation: { address: "Airport Terminal" },
          dropoffLocation: { address: "Grand Hotel Plaza" },
          fare: 45.75,
          date: new Date(2025, 3, 21, 20, 0),
          status: "completed",
          passengerName: "Tamer Hossam",
          distance: 12.3
        },
        {
          id: "ride9",
          pickupLocation: { address: "Medical Center" },
          dropoffLocation: { address: "Park View" },
          fare: 32.25,
          date: new Date(2025, 3, 21, 17, 30),
          status: "completed",
          passengerName: "Laila Ahmed",
          distance: 9.8
        }
      ];
    case "driver4":
      return baseRides.slice(0, 3);
    case "driver5":
      return [
        ...baseRides.slice(2),
        {
          id: "ride10",
          pickupLocation: { address: "O1 Shopping Mall" },
          dropoffLocation: { address: "Maadi" },
          fare: 19.50,
          date: new Date(2025, 3, 21, 14, 0),
          status: "completed",
          passengerName: "Khaled Mohamed",
          distance: 5.7
        }
      ];
    default:
      return baseRides;
  }
};
