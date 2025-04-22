
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { driverProfiles } from "@/data/drivers";

export type Vehicle = {
  model: string;
  color: string;
  plateNumber: string;
};

export type Driver = {
  id: string;
  name: string;
  phone: string;
  email: string;
  rating: number;
  totalRides: number;
  vehicle?: Vehicle;
  avatarUrl?: string;
  isOnline: boolean;
  earnings: number;
};

type AuthContextProps = {
  driver: Driver | null;
  allDrivers: Driver[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateDriverStatus: (status: boolean) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const DRIVER_STORAGE_KEY = "driver_ride_app_auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [allDrivers] = useState<Driver[]>(driverProfiles);
  const [driver, setDriver] = useState<Driver | null>(null);

  useEffect(() => {
    // In a React Native environment, we would use AsyncStorage instead of localStorage
    // We're leaving this as is for simplicity
    if (typeof localStorage !== 'undefined') {
      const savedDriverId = localStorage.getItem(DRIVER_STORAGE_KEY);
      if (savedDriverId) {
        const foundDriver = allDrivers.find(d => d.id === savedDriverId);
        if (foundDriver) {
          setDriver(foundDriver);
          console.log(`Welcome back, ${foundDriver.name}!`);
        }
      }
    }
  }, [allDrivers]);

  const isAuthenticated = !!driver;

  // Login with email/password and return a Promise for async/await usage in UI
  const login = async (email: string, password: string) => {
    // For demo purposes, we're just using the first driver
    const selectedDriver = allDrivers[0];
    if (selectedDriver) {
      setDriver(selectedDriver);
      
      // In React Native, we would use AsyncStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(DRIVER_STORAGE_KEY, selectedDriver.id);
      }
      
      console.log(`Welcome, ${selectedDriver.name}!`);
    } else {
      throw new Error('Invalid login');
    }
  };

  const updateDriverStatus = (status: boolean) => {
    if (!driver) return;
    setDriver(prev => {
      if (!prev) return prev;
      return { ...prev, isOnline: status };
    });
    
    console.log(status ? "You are now online" : "You are now offline");
  };

  const logout = () => {
    setDriver(null);
    
    // In React Native, we would use AsyncStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(DRIVER_STORAGE_KEY);
    }
    
    console.log("You have been logged out");
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
