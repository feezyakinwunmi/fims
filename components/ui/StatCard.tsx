import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard = ({ label, value, icon, className }: StatCardProps) => {
  return (
    <div className={`bg-white hover:bg-eweko_green_light/75 hover:text-white p-4 rounded-lg shadow border border-gray-200 
      w-full min-w-full  // Full width on mobile
      sm:min-w-[300px] sm:w-auto  // Horizontal scroll on desktop
      h-[150px] flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-medium ">{label}</h3>
        {icon && <div className="text-xl sm:text-2xl ">{icon}</div>}
      </div>
      <p className="mt-2 text-2xl sm:text-3xl font-semibold ">
        {value}
      </p>
    </div>
  );
};