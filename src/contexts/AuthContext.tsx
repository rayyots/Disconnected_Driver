
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Driver type definition
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

// Simulated database of drivers
const driversDB: Driver[] = [
  {
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
  },
  {
    id: 'driver-124',
    name: 'Sarah Smith',
    phone: '+1987654321',
    isOnline: false,
    carDetails: {
      model: 'Honda Civic',
      color: 'Silver',
      plateNumber: 'XYZ-9876',
    },
    earnings: 980.50,
    totalRides: 32,
    rating: 4.9,
  }
];

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
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for saved session
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
      
      // Modified: Skip driver check to always accept any phone number
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Always accept the phone number and proceed to OTP
      setPendingPhone(phone);
      toast.success('OTP sent to your phone');
      
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
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Modified: Accept any 6-digit OTP
      if (otp.length === 6 && pendingPhone) {
        // If driver exists in DB, use that data
        let authenticatedDriver = driversDB.find(d => d.phone === pendingPhone);
        
        // If driver doesn't exist, create a new mock driver
        if (!authenticatedDriver) {
          authenticatedDriver = {
            id: `driver-${Math.floor(Math.random() * 1000)}`,
            name: "Test Driver",
            phone: pendingPhone,
            isOnline: false,
            carDetails: {
              model: "Test Car",
              color: "Blue",
              plateNumber: "TEST-123",
            },
            earnings: 0,
            totalRides: 0,
            rating: 5.0
          };
          // Add to simulated DB (optional, not needed for this implementation)
          // driversDB.push(authenticatedDriver);
        }
        
        setDriver(authenticatedDriver);
        localStorage.setItem('disconnected_driver', JSON.stringify(authenticatedDriver));
        setPendingPhone(null);
        toast.success('Login successful');
        navigate('/');
        return true;
      }
      
      throw new Error('Invalid OTP code');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify OTP');
      toast.error(err instanceof Error ? err.message : 'Failed to verify OTP');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setDriver(null);
    localStorage.removeItem('disconnected_driver');
    navigate('/auth');
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
