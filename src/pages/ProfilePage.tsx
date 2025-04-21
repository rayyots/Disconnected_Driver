
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { User, Settings, LogOut } from "lucide-react";

const ProfilePage: React.FC = () => {
  const { driver, logout } = useAuth();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!driver) {
    return (
      <AppLayout title="Profile">
        <div className="flex flex-col items-center py-16 animate-fade-in">
          <User className="h-20 w-20 text-[#9b87f5] mb-4" />
          <div className="text-xl text-gray-300 font-semibold">Logged Out</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Profile">
      <div className="space-y-6 max-w-xl mx-auto">
        <Card 
          className={`relative overflow-hidden border-none shadow-xl transform transition-all duration-500 ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{background: "linear-gradient(102.3deg, #9379fa 5.9%, #6E59A5 100%)"}}
        >
          <div className="absolute right-4 top-4 blur-2xl opacity-30 rounded-full w-28 h-28 bg-[#FFF7ED]" style={{zIndex:1}} />
          <CardHeader className="flex flex-row items-center gap-4 pb-2 bg-gradient-to-br from-[#7E69AB] via-[#8B5CF6] to-transparent rounded-t-md relative z-10">
            <img
              src={driver.avatarUrl || "https://randomuser.me/api/portraits/women/68.jpg"}
              alt="avatar"
              className={`w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover transition-all duration-700 ${
                animate ? 'rotate-0 scale-100' : 'rotate-180 scale-50'
              }`}
            />
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">{driver.name}</h3>
              <p className="text-gray-200 text-base font-mono">{driver.phone}</p>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div 
              className={`grid grid-cols-2 gap-4 mb-4 transition-all duration-500 ${
                animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="p-3 bg-[#F2FCE2] rounded-lg shadow-md flex flex-col items-center">
                <p className="text-[#403E43] text-xs font-semibold">Driver Rating</p>
                <p className="text-[#8B5CF6] font-extrabold text-2xl">{driver.rating}★</p>
              </div>
              <div className="p-3 bg-[#FEF7CD] rounded-lg shadow-md flex flex-col items-center">
                <p className="text-[#403E43] text-xs font-semibold">Total Rides</p>
                <p className="text-[#D946EF] font-extrabold text-2xl">{driver.totalRides}</p>
              </div>
            </div>
            {driver.carDetails && (
              <div 
                className={`mt-6 transition-all duration-500 ${
                  animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <h4 className="text-white font-medium mb-3 flex items-center gap-1">
                  <Settings className="inline w-4 h-4 mr-1 text-[#00C4CC]" />
                  Vehicle Information
                </h4>
                <div className="bg-[#F1F0FB] rounded-lg p-4 grid grid-cols-2 gap-y-3 text-sm shadow">
                  <div>
                    <p className="text-[#8E9196]">Model</p>
                    <p className="text-[#222222] font-semibold">{driver.carDetails.model}</p>
                  </div>
                  <div>
                    <p className="text-[#8E9196]">Color</p>
                    <p className="text-[#222222] font-semibold">{driver.carDetails.color}</p>
                  </div>
                  <div>
                    <p className="text-[#8E9196]">Plate</p>
                    <p className="text-[#222222] font-semibold">{driver.carDetails.plateNumber}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Button
          variant="destructive"
          className={`w-full font-semibold transform transition-all duration-500 ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
