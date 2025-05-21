// src/app/master/components/Transport/ParentInterface.tsx
"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with Leaflet
const MapWithNoSSR = dynamic(() => import('./ParentMapComponent'), {
  ssr: false,
  loading: () => <div className="h-72 bg-gray-100 flex items-center justify-center">Loading map...</div>
});

const ParentInterface = () => {
  const [childData, setChildData] = useState(null);
  const [busLocation, setBusLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [travelHistory, setTravelHistory] = useState([]);
  
  useEffect(() => {
    // In production, fetch from your API
    const fetchChildData = async () => {
      try {
        // Mock data for development
        const mockChildData = {
          name: 'Alex Smith',
          grade: '8th',
          section: 'B',
          busNo: 'Bus 1',
          routeName: 'Route A',
          pickupPoint: 'Nelson Road',
          pickupTime: '8:15 AM',
          dropTime: '4:30 PM',
          status: 'onboard', // onboard, dropped, waiting
          lastScan: '8:17 AM'
        };
        
        const mockBusLocation = {
          position: [13.0827, 80.2707],
          speed: '35 km/h',
          eta: '10 mins',
          distanceToHome: '2.3 km'
        };
        
        const mockTravelHistory = [
          { date: '2025-05-19', pickupTime: '8:16 AM', dropTime: '4:32 PM', status: 'completed' },
          { date: '2025-05-18', pickupTime: '8:14 AM', dropTime: '4:35 PM', status: 'completed' },
          { date: '2025-05-17', pickupTime: '8:20 AM', dropTime: '4:31 PM', status: 'completed' },
          { date: '2025-05-16', pickupTime: '8:19 AM', dropTime: '4:33 PM', status: 'completed' },
          { date: '2025-05-15', pickupTime: '-', dropTime: '-', status: 'absent' },
        ];
        
        setChildData(mockChildData);
        setBusLocation(mockBusLocation);
        setTravelHistory(mockTravelHistory);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchChildData();
  }, []);
  
  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'onboard': return 'text-green-600 bg-green-100';
      case 'dropped': return 'text-blue-600 bg-blue-100';
      case 'waiting': return 'text-yellow-600 bg-yellow-100';
      case 'absent': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Your Child's Transport</h2>
      
      {loading ? (
        <div className="text-center py-8">Loading data...</div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="font-bold text-lg">{childData.name}</h3>
                <p className="text-gray-600">{childData.grade} {childData.section}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(childData.status)}`}>
                  {childData.status === 'onboard' ? 'On Bus' : 
                   childData.status === 'dropped' ? 'Dropped Off' : 
                   childData.status === 'waiting' ? 'Waiting for Pickup' : 'Status Unknown'}
                </span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Bus Details</h4>
                <p className="text-gray-600">Bus: {childData.busNo}</p>
                <p className="text-gray-600">Route: {childData.routeName}</p>
                <p className="text-gray-600">Pickup Point: {childData.pickupPoint}</p>
              </div>
              <div>
                <h4 className="font-medium">Today's Schedule</h4>
                <p className="text-gray-600">Pickup Time: {childData.pickupTime}</p>
                <p className="text-gray-600">Drop Time: {childData.dropTime}</p>
                <p className="text-gray-600">Last Scanned: {childData.lastScan}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h3 className="font-bold p-4">Live Bus Location</h3>
            <div className="h-72">
              {/* Map component will be rendered here */}
              <MapWithNoSSR 
                busPosition={busLocation.position}
                busInfo={{
                  speed: busLocation.speed,
                  eta: busLocation.eta,
                  distanceToHome: busLocation.distanceToHome
                }}
              />
            </div>
            <div className="p-4 bg-blue-50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Estimated Time of Arrival</p>
                  <p className="text-2xl font-bold">{busLocation.eta}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Distance to Home</p>
                  <p className="text-2xl font-bold">{busLocation.distanceToHome}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold mb-4">Travel History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Pickup Time</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Drop Time</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {travelHistory.map((record, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm">{record.date}</td>
                      <td className="px-4 py-2 text-sm">{record.pickupTime}</td>
                      <td className="px-4 py-2 text-sm">{record.dropTime}</td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          record.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          record.status === 'absent' ? 'bg-gray-100 text-gray-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status === 'completed' ? 'Completed' : 
                           record.status === 'absent' ? 'Absent' : record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ParentInterface;