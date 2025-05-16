"use client"
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  isPositive?: boolean;
}

const StatCard = ({ title, value, icon, change, isPositive }: StatCardProps) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative h-full p-8 bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 transform transition-all duration-300 hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <div className="flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-600">{title}</h3>
              <p className="mt-2 text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {value}
              </p>
            </div>
          </div>
          {change && (
            <div className={`flex items-center px-3 py-1 rounded-full ${
              isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              <span className="text-sm font-semibold">
                {isPositive ? '↑' : '↓'} {change}
              </span>
            </div>
          )}
        </div>
        {change && (
          <div className="mt-6 flex items-center text-sm text-gray-500">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${
                  isPositive ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: change }}
              ></div>
            </div>
            <span className="ml-3">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;