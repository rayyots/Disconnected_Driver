
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';

const DriverStatusToggle: React.FC = () => {
  const { driver, updateDriverStatus } = useAuth();
  
  const handleStatusChange = (checked: boolean) => {
    updateDriverStatus(checked);
  };
  
  return (
    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
      <div>
        <p className="text-white font-medium">Driver Status</p>
        <p className="text-sm text-gray-400">
          {driver?.isOnline ? 'You are online and can receive ride requests' : 'Go online to receive ride requests'}
        </p>
      </div>
      <Switch 
        checked={driver?.isOnline || false}
        onCheckedChange={handleStatusChange}
        className="data-[state=checked]:bg-[#00C4CC]"
      />
    </div>
  );
};

export default DriverStatusToggle;
