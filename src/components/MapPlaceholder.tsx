
import React from 'react';
import { Navigation } from 'lucide-react';

interface MapPlaceholderProps {
  startAddress: string;
  endAddress: string;
  isPickup?: boolean;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ 
  startAddress, 
  endAddress,
  isPickup = true
}) => {
  return (
    <div className="w-full h-64 bg-gray-800 rounded-lg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[#1A252F] grid grid-cols-6 grid-rows-6">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-gray-700" />
          ))}
        </div>
      </div>
      
      <div className="z-10 text-center">
        <div className="bg-gray-700 rounded-full p-3 inline-flex mb-4">
          <Navigation className="h-8 w-8 text-[#00C4CC]" />
        </div>
        <h3 className="text-white font-medium text-lg mb-1">
          {isPickup ? 'Navigation to Pickup' : 'Navigation to Destination'}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {isPickup ? 'Driving to pickup location' : 'Driving to destination'}
        </p>
        <div className="bg-gray-700 rounded-lg p-3 max-w-xs">
          <div className="text-sm text-gray-400">
            {isPickup ? 'Pickup' : 'Dropoff'} Location:
          </div>
          <div className="text-white">
            {isPickup ? startAddress : endAddress}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPlaceholder;
