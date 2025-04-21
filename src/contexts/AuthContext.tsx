
import React, { createContext, useContext, useState, ReactNode } from "react";

type CarDetails = {
  model: string;
  color: string;
  plateNumber: string;
};

type Driver = {
  name: string;
  phone: string;
  rating: number;
  totalRides: number;
  carDetails?: CarDetails;
  avatarUrl?: string;
};

type AuthContextProps = {
  driver: Driver | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Dummy data for the public Profile page (safe to expose)
  const [driver, setDriver] = useState<Driver>({
    name: "Alexandra Foster",
    phone: "+1 (555) 483-2942",
    rating: 4.92,
    totalRides: 289,
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    carDetails: {
      model: "Toyota Camry 2021",
      color: "Deep Blue",
      plateNumber: "ABC-4567"
    }
  });

  // For the dummy app, just clear data (but page reload restores dummy info)
  const logout = () => {
    setDriver(null);
  };

  return (
    <AuthContext.Provider value={{ driver, logout }}>
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
