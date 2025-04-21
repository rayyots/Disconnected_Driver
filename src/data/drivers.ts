
import { Driver } from '@/contexts/AuthContext';
import { Ride, RideStatus } from '@/contexts/RideContext';

export const driverProfiles: Driver[] = [
  {
    id: "driver1",
    name: "Omar Mahmoud",
    phone: "01118692999",
    rating: 4.92,
    totalRides: 289,
    avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg",
    carDetails: {
      model: "Toyota Corolla 2022",
      color: "Grey",
      plateNumber: "ب ل ت -4567"
    },
    isOnline: false,
    earnings: 2843.75
  },
  {
    id: "driver2",
    name: "Mohammed Samy",
    phone: "01234567890",
    rating: 4.87,
    totalRides: 427,
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    carDetails: {
      model: "Honda Civic 2016",
      color: "Silver",
      plateNumber: "خ ق ي-8901"
    },
    isOnline: false,
    earnings: 4125.50
  },
  {
    id: "driver3",
    name: "Mayar Hossam",
    phone: "01112345678",
    rating: 4.95,
    totalRides: 512,
    avatarUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    carDetails: {
      model: "Chevrolet Aveo 2018",
      color: "Red",
      plateNumber: "ا ت ف-5432"
    },
    isOnline: false,
    earnings: 5237.25
  },
  {
    id: "driver4",
    name: "Hamza Ahmed",
    phone: "01098765432",
    rating: 4.79,
    totalRides: 194,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    carDetails: {
      model: "Ford Focus 2020",
      color: "White",
      plateNumber: "ح ر ص-9876"
    },
    isOnline: false,
    earnings: 2105.50
  },
  {
    id: "driver5",
    name: "Sara Khaled",
    phone: "01567890123",
    rating: 4.91,
    totalRides: 351,
    avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    carDetails: {
      model: "Hyundai Elantra 2021",
      color: "Black",
      plateNumber: "و و ح-1122"
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
      pickupLocation: { address: "Downtown Mall" },
      dropoffLocation: { address: "Ibn Elsham" },
      fare: 55.75,
      date: new Date(2025, 3, 18, 9, 30),
      status: "completed" as RideStatus,
      passengerName: "Moamen Zakaria",
      distance: 4.2
    },
    {
      id: "ride2",
      pickupLocation: { address: "CFC mall" },
      dropoffLocation: { address: "Mahmoud-Elfar" },
      fare: 47.50,
      date: new Date(2025, 3, 19, 14, 15),
      status: "completed" as RideStatus,
      passengerName: "Ahmed Zaki",
      distance: 7.8
    },
    {
      id: "ride3",
      pickupLocation: { address: "Airport Terminal 3" },
      dropoffLocation: { address: "Zamalek" },
      fare: 120.25,
      date: new Date(2025, 3, 20, 17, 45),
      status: "completed" as RideStatus,
      passengerName: "Mahmoud Ellithy",
      distance: 3.5
    },
    {
      id: "ride4",
      pickupLocation: { address: "Tolip Elnarges" },
      dropoffLocation: { address: "Elshorouk" },
      fare: 200.00,
      date: new Date(2025, 3, 21, 8, 0),
      status: "completed" as RideStatus,
      passengerName: "Ibrahim Morsi",
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
          pickupLocation: { address: "Ain Shams Hospital" },
          dropoffLocation: { address: "Park View" },
          fare: 180.25,
          date: new Date(2025, 3, 21, 19, 30),
          status: "completed" as RideStatus,
          passengerName: "Ali Hassan",
          distance: 5.3
        }
      ];
    case "driver2":
      return [
        ...baseRides.slice(1),
        {
          id: "ride6",
          pickupLocation: { address: "Metropolitan" },
          dropoffLocation: { address: "Mountain View" },
          fare: 62.50,
          date: new Date(2025, 3, 21, 12, 15),
          status: "completed" as RideStatus,
          passengerName: "Karma Saeed",
          distance: 8.7
        },
        {
          id: "ride7",
          pickupLocation: { address: "Maadi" },
          dropoffLocation: { address: "KFC Maadi" },
          fare: 42.00,
          date: new Date(2025, 3, 21, 15, 45),
          status: "completed" as RideStatus,
          passengerName: "Adham Amr",
          distance: 6.5
        }
      ];
    case "driver3":
      return [
        ...baseRides,
        {
          id: "ride8",
          pickupLocation: { address: "Airport Terminal 2" },
          dropoffLocation: { address: "Grand Hotel Plaza" },
          fare: 45.75,
          date: new Date(2025, 3, 21, 20, 0),
          status: "completed",
          passengerName: "Zad Asran",
          distance: 12.3
        },
        {
          id: "ride9",
          pickupLocation: { address: "Capital Conference Center" },
          dropoffLocation: { address: "Cairo Business Park" },
          fare: 32.25,
          date: new Date(2025, 3, 21, 17, 30),
          status: "completed",
          passengerName: "Hossam Elshazly",
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
          pickupLocation: { address: "City stars Mall" },
          dropoffLocation: { address: "Egyptian Chinese University" },
          fare: 99.50,
          date: new Date(2025, 3, 21, 14, 0),
          status: "completed",
          passengerName: "Sherwet Gabr",
          distance: 5.7
        }
      ];
    default:
      return baseRides;
  }
};
