
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { driverProfiles } from "@/data/drivers";
import { toast } from "@/components/ui/sonner";

export type CarDetails = {
  model: string;
  color: string;
  plateNumber: string;
};

export type Driver = {
  id: string;
  name: string;
  phone: string;
  rating: number;
  totalRides: number;
  carDetails?: CarDetails;
  avatarUrl?: string;
  isOnline: boolean;
  earnings: number;
};

type AuthContextProps = {
  driver: Driver | null;
  allDrivers: Driver[];
  login: (driverId: string) => void;
  logout: () => void;
  updateDriverStatus: (status: boolean) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Local storage key for saving the authenticated driver
const DRIVER_STORAGE_KEY = "driver_ride_app_auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [allDrivers] = useState<Driver[]>(driverProfiles);
  const [driver, setDriver] = useState<Driver | null>(null);

  // Check for saved driver on initial load
  useEffect(() => {
    const savedDriverId = localStorage.getItem(DRIVER_STORAGE_KEY);
    if (savedDriverId) {
      const foundDriver = allDrivers.find(d => d.id === savedDriverId);
      if (foundDriver) {
        setDriver(foundDriver);
        toast.success(`Welcome back, ${foundDriver.name}!`);
      }
    }
  }, [allDrivers]);

  const isAuthenticated = !!driver;

  // Login with specific driver
  const login = (driverId: string) => {
    const selectedDriver = allDrivers.find(d => d.id === driverId);
    if (selectedDriver) {
      setDriver(selectedDriver);
      localStorage.setItem(DRIVER_STORAGE_KEY, driverId);
      
      // Play login sound
      const loginSound = new Audio("/sounds/login.mp3");
      loginSound.volume = 0.5;
      loginSound.play().catch(e => console.log("Audio play failed:", e));
      
      toast.success(`Welcome, ${selectedDriver.name}!`, {
        duration: 3000,
      });
    }
  };

  // Toggle driver online status
  const updateDriverStatus = (status: boolean) => {
    if (!driver) return;
    
    setDriver(prev => {
      if (!prev) return prev;
      
      // Play status change sound
      const statusSound = new Audio(status ? "/sounds/online.mp3" : "/sounds/offline.mp3");
      statusSound.volume = 0.3;
      statusSound.play().catch(e => console.log("Audio play failed:", e));
      
      return { ...prev, isOnline: status };
    });
    
    toast(status ? "You are now online" : "You are now offline", {
      duration: 2000,
    });
  };

  // For the dummy app, clear data and remove from local storage
  const logout = () => {
    // Play logout sound
    const logoutSound = new Audio("/sounds/logout.mp3");
    logoutSound.volume = 0.5;
    logoutSound.play().catch(e => console.log("Audio play failed:", e));
    
    setDriver(null);
    localStorage.removeItem(DRIVER_STORAGE_KEY);
    toast.info("You have been logged out", {
      duration: 3000,
    });
  };

  return (
    <AuthContext.Provider value={{ 
      driver, 
      allDrivers,
      login, 
      logout, 
      updateDriverStatus, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
