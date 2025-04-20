
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Driver type
export interface Driver {
  id: string;
  name: string;
  phone: string;
  isOnline: boolean;
  carDetails?: {
    model: string;
    color: string;
    plateNumber: string;
  };
  earnings: number;
  totalRides: number;
  rating: number;
}

// Mock driver data (simulating Firebase response)
const mockDriver: Driver = {
  id: 'driver-123',
  name: 'John Driver',
  phone: '+1234567890',
  isOnline: false,
  carDetails: {
    model: 'Toyota Camry',
    color: 'Black',
    plateNumber: 'ABC-1234',
  },
  earnings: 1250.75,
  totalRides: 45,
  rating: 4.8,
};

interface AuthContextType {
  driver: Driver | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => void;
  updateDriverStatus: (isOnline: boolean) => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingVerification, setPendingVerification] = useState<boolean>(false);

  // Check if we have a saved session
  useEffect(() => {
    const savedDriver = localStorage.getItem('disconnected_driver');
    
    if (savedDriver) {
      try {
        setDriver(JSON.parse(savedDriver));
      } catch (err) {
        console.error('Failed to parse saved driver data', err);
        localStorage.removeItem('disconnected_driver');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (phone: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock phone verification (In real app, this would call Firebase Auth)
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if phone is registered as a driver
      if (phone === mockDriver.phone) {
        setPendingVerification(true);
        toast.success('OTP sent to your phone');
      } else {
        throw new Error('Phone number not registered as a driver');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      toast.error(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock OTP verification (In real app, this would call Firebase Auth)
      // For demo purposes, we'll use any 6-digit code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp.length === 6 && /^\d+$/.test(otp)) {
        setDriver(mockDriver);
        localStorage.setItem('disconnected_driver', JSON.stringify(mockDriver));
        toast.success('Login successful');
        return true;
      } else {
        throw new Error('Invalid OTP code');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify OTP');
      toast.error(err instanceof Error ? err.message : 'Failed to verify OTP');
      return false;
    } finally {
      setIsLoading(false);
      setPendingVerification(false);
    }
  };

  const logout = () => {
    setDriver(null);
    localStorage.removeItem('disconnected_driver');
    toast.info('Logged out successfully');
  };

  const updateDriverStatus = (isOnline: boolean) => {
    if (driver) {
      const updatedDriver = { ...driver, isOnline };
      setDriver(updatedDriver);
      localStorage.setItem('disconnected_driver', JSON.stringify(updatedDriver));
      toast.success(`You are now ${isOnline ? 'online' : 'offline'}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        driver,
        isAuthenticated: !!driver,
        isLoading,
        login,
        verifyOTP,
        logout,
        updateDriverStatus,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
