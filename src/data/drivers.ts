
import { Driver } from '@/contexts/AuthContext';
import { Ride, RideStatus } from '@/contexts/RideContext';

export const driverProfiles: Driver[] = [
  {
    id: "driver1",
    name: "Alexandra Foster",
    phone: "+1 (555) 483-2942",
    rating: 4.92,
    totalRides: 289,
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    carDetails: {
      model: "Toyota Camry 2021",
      color: "Deep Blue",
      plateNumber: "ABC-4567"
    },
    isOnline: false,
    earnings: 2843.75
  },
  {
    id: "driver2",
    name: "Marcus Chen",
    phone: "+1 (555) 112-3789",
    rating: 4.87,
    totalRides: 427,
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    carDetails: {
      model: "Honda Accord 2022",
      color: "Silver",
      plateNumber: "XYZ-8901"
    },
    isOnline: false,
    earnings: 4125.50
  },
  {
    id: "driver3",
    name: "Sophia Rodriguez",
    phone: "+1 (555) 329-6710",
    rating: 4.95,
    totalRides: 512,
    avatarUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    carDetails: {
      model: "Tesla Model 3",
      color: "Red",
      plateNumber: "ELT-5432"
    },
    isOnline: false,
    earnings: 5237.25
  },
  {
    id: "driver4",
    name: "James Wilson",
    phone: "+1 (555) 778-1235",
    rating: 4.79,
    totalRides: 194,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    carDetails: {
      model: "Ford Escape 2021",
      color: "White",
      plateNumber: "FRD-9876"
    },
    isOnline: false,
    earnings: 2105.50
  },
  {
    id: "driver5",
    name: "Olivia Johnson",
    phone: "+1 (555) 663-4501",
    rating: 4.91,
    totalRides: 351,
    avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    carDetails: {
      model: "Hyundai Tucson 2022",
      color: "Forest Green",
      plateNumber: "HYN-1122"
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
      pickupLocation: { address: "123 Main St" },
      dropoffLocation: { address: "456 Market St" },
      fare: 15.75,
      date: new Date(2025, 3, 18, 9, 30),
      status: "completed" as RideStatus,
      passengerName: "John Smith",
      distance: 4.2
    },
    {
      id: "ride2",
      pickupLocation: { address: "789 Park Ave" },
      dropoffLocation: { address: "101 Downtown Blvd" },
      fare: 23.50,
      date: new Date(2025, 3, 19, 14, 15),
      status: "completed" as RideStatus,
      passengerName: "Emma Davis",
      distance: 7.8
    },
    {
      id: "ride3",
      pickupLocation: { address: "202 College St" },
      dropoffLocation: { address: "303 Union Square" },
      fare: 12.25,
      date: new Date(2025, 3, 20, 17, 45),
      status: "completed" as RideStatus,
      passengerName: "Michael Johnson",
      distance: 3.5
    },
    {
      id: "ride4",
      pickupLocation: { address: "404 Pine St" },
      dropoffLocation: { address: "505 Broadway" },
      fare: 30.00,
      date: new Date(2025, 3, 21, 8, 0),
      status: "completed" as RideStatus,
      passengerName: "Sarah Williams",
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
          pickupLocation: { address: "606 Sunset Blvd" },
          dropoffLocation: { address: "707 Ocean Ave" },
          fare: 18.25,
          date: new Date(2025, 3, 21, 19, 30),
          status: "completed" as RideStatus,
          passengerName: "David Miller",
          distance: 5.3
        }
      ];
    case "driver2":
      return [
        ...baseRides.slice(1),
        {
          id: "ride6",
          pickupLocation: { address: "808 Tech Park" },
          dropoffLocation: { address: "909 Innovation Dr" },
          fare: 27.50,
          date: new Date(2025, 3, 21, 12, 15),
          status: "completed" as RideStatus,
          passengerName: "Jennifer Lee",
          distance: 8.7
        },
        {
          id: "ride7",
          pickupLocation: { address: "110 Medical Center" },
          dropoffLocation: { address: "111 Research Blvd" },
          fare: 22.00,
          date: new Date(2025, 3, 21, 15, 45),
          status: "completed" as RideStatus,
          passengerName: "Robert Chen",
          distance: 6.5
        }
      ];
    case "driver3":
      return [
        ...baseRides,
        {
          id: "ride8",
          pickupLocation: { address: "212 Airport Terminal" },
          dropoffLocation: { address: "313 Hotel Plaza" },
          fare: 45.75,
          date: new Date(2025, 3, 21, 20, 0),
          status: "completed",
          passengerName: "Thomas Garcia",
          distance: 12.3
        },
        {
          id: "ride9",
          pickupLocation: { address: "414 Conference Center" },
          dropoffLocation: { address: "515 Business Park" },
          fare: 32.25,
          date: new Date(2025, 3, 21, 17, 30),
          status: "completed",
          passengerName: "Lisa Martinez",
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
          pickupLocation: { address: "616 Shopping Mall" },
          dropoffLocation: { address: "717 Residential Complex" },
          fare: 19.50,
          date: new Date(2025, 3, 21, 14, 0),
          status: "completed",
          passengerName: "Kevin Taylor",
          distance: 5.7
        }
      ];
    default:
      return baseRides;
  }
};
