// src/app/master/components/Transport/LiveTracking.tsx
"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Truck, Users, Clock, Navigation, Route, User, Search, RefreshCw, Info } from 'lucide-react';

// Dynamic import to avoid SSR issues with Leaflet
const MapWithNoSSR = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-gray-100 flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-3"></div>
      <p className="text-gray-500">Loading map...</p>
    </div>
  )
});

const LiveTracking = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBus, setSelectedBus] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  
  useEffect(() => {
    // Mock data for development
    const mockData = [
      { 
        id: 'bus001', 
        name: 'Bus 1', 
        position: [13.0827, 80.2707], // Chennai
        studentsOnboard: 25,
        capacity: 35,
        driver: 'John Doe',
        route: 'Route A',
        eta: '8:45 AM',
        speed: '40 km/h',
        status: 'active',
        lastStop: 'Central Station',
        nextStop: 'School',
        updated: '2 min ago'
      },
      { 
        id: 'bus002', 
        name: 'Bus 2', 
        position: [13.0900, 80.2800], 
        studentsOnboard: 18,
        capacity: 30,
        driver: 'Jane Smith',
        route: 'Route B',
        eta: '8:50 AM',
        speed: '35 km/h',
        status: 'active',
        lastStop: 'Market Road',
        nextStop: 'School',
        updated: '1 min ago'
      },
      { 
        id: 'bus003', 
        name: 'Bus 3', 
        position: [13.0950, 80.2600], 
        studentsOnboard: 22,
        capacity: 35,
        driver: 'Michael Brown',
        route: 'Route C',
        eta: '8:55 AM',
        speed: '30 km/h',
        status: 'delayed',
        lastStop: 'Park Avenue',
        nextStop: 'School',
        updated: '3 min ago'
      },
    ];
    
    setBuses(mockData);
    setLoading(false);
    setLastUpdated(new Date());
    
    // Set up real-time updates (using polling for now)
    const interval = setInterval(() => {
      // In production, fetch actual data
      setLastUpdated(new Date());
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  const refreshData = () => {
    setLoading(true);
    // In production, fetch actual data
    setTimeout(() => {
      setLoading(false);
      setLastUpdated(new Date());
    }, 1000);
  };
  
  const filteredBuses = buses.filter(bus => 
    bus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.route.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Generate status badge for buses
  const BusStatusBadge = ({ status }) => {
    let bgColor, textColor, statusText;
    
    switch(status) {
      case 'active':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        statusText = 'Active';
        break;
      case 'delayed':
        bgColor = 'bg-amber-100';
        textColor = 'text-amber-800';
        statusText = 'Delayed';
        break;
      case 'inactive':
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
        statusText = 'Inactive';
        break;
      default:
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        statusText = status;
    }
    
    return (
      <span className={`${bgColor} ${textColor} text-xs px-2.5 py-1 rounded-full font-medium`}>
        {statusText}
      </span>
    );
  };
  
  // Bus Details Card
  const BusDetailsCard = ({ bus }) => (
    <div className="bg-white rounded-lg shadow-md p-5 mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <Truck className="h-5 w-5 mr-2 text-blue-600" />
          {bus.name} Details
        </h3>
        <BusStatusBadge status={bus.status} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="col-span-2 bg-blue-50 p-3 rounded-lg flex items-center">
          <Navigation className="h-5 w-5 text-blue-600 mr-2" />
          <div>
            <div className="text-sm text-blue-800 font-medium">Current Location</div>
            <div className="text-sm text-blue-600">
              {bus.lastStop} → {bus.nextStop}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col border-l-2 border-gray-200 pl-3">
          <span className="text-xs text-gray-500">Driver</span>
          <span className="text-sm font-medium flex items-center">
            <User className="h-3 w-3 mr-1 text-gray-500" />
            {bus.driver}
          </span>
        </div>
        
        <div className="flex flex-col border-l-2 border-gray-200 pl-3">
          <span className="text-xs text-gray-500">Speed</span>
          <span className="text-sm font-medium">{bus.speed}</span>
        </div>
        
        <div className="flex flex-col border-l-2 border-gray-200 pl-3">
          <span className="text-xs text-gray-500">Route</span>
          <span className="text-sm font-medium flex items-center">
            <Route className="h-3 w-3 mr-1 text-gray-500" />
            {bus.route}
          </span>
        </div>
        
        <div className="flex flex-col border-l-2 border-gray-200 pl-3">
          <span className="text-xs text-gray-500">ETA</span>
          <span className="text-sm font-medium flex items-center">
            <Clock className="h-3 w-3 mr-1 text-gray-500" />
            {bus.eta}
          </span>
        </div>
        
        <div className="col-span-2">
          <span className="text-xs text-gray-500">Students</span>
          <div className="flex items-center mt-1">
            <Users className="h-4 w-4 text-blue-600 mr-2" />
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span>{bus.studentsOnboard} students onboard</span>
                <span className="font-medium">{Math.round((bus.studentsOnboard / bus.capacity) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(bus.studentsOnboard / bus.capacity) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-2 text-right text-xs text-gray-500">
          Last updated: {bus.updated}
        </div>
      </div>
      
      <div className="mt-4 flex justify-end space-x-2">
        <button className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          View Route
        </button>
        <button className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors flex items-center">
          <Users className="h-3 w-3 mr-1" />
          Student List
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            Live Bus Tracking
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitoring {buses.length} buses in real-time
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search buses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button 
            onClick={refreshData}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Refresh data"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          
          <div className="hidden md:flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button 
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 text-sm ${
                viewMode === 'map' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Map View
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm ${
                viewMode === 'list' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              List View
            </button>
          </div>
        </div>
      </div>
      
      {/* Last updated status */}
      <div className="flex items-center text-xs text-gray-500">
        <Clock className="h-3 w-3 mr-1" />
        Last updated: {lastUpdated.toLocaleTimeString()}
        <button 
          onClick={refreshData}
          className="ml-2 text-blue-600 hover:text-blue-800"
        >
          Refresh
        </button>
      </div>
      
      {/* Main content */}
      <div className={`flex ${viewMode === 'list' ? 'flex-col' : 'flex-col md:flex-row'} gap-6`}>
        {/* Map container */}
        {viewMode === 'map' && (
          <div className="w-full md:w-2/3 h-[500px] bg-gray-100 rounded-lg overflow-hidden shadow-md">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-3"></div>
                <p className="text-gray-500">Loading map...</p>
              </div>
            ) : (
              <MapWithNoSSR buses={filteredBuses} onBusSelect={setSelectedBus} />
            )}
          </div>
        )}
        
        {/* Bus list container */}
        <div className={viewMode === 'list' ? 'w-full' : 'w-full md:w-1/3'}>
          {viewMode === 'list' ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200 p-4">
                <h3 className="text-lg font-medium text-gray-900">All Buses</h3>
              </div>
              <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-3"></div>
                    <p>Loading buses...</p>
                  </div>
                ) : filteredBuses.length > 0 ? (
                  filteredBuses.map(bus => (
                    <div 
                      key={bus.id}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedBus(bus)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <Truck className="h-5 w-5 text-blue-600 mr-2" />
                            <h4 className="text-md font-medium text-gray-900">{bus.name}</h4>
                            <BusStatusBadge status={bus.status} />
                          </div>
                          <div className="mt-1 text-sm text-gray-500">Route: {bus.route}</div>
                          <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {bus.studentsOnboard}/{bus.capacity}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              ETA: {bus.eta}
                            </span>
                            <span className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {bus.driver}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-right">
                          <div className="text-gray-500">Last updated:</div>
                          <div>{bus.updated}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <Info className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No buses found matching your search</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Bus Status</h3>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-3"></div>
                    <p>Loading buses...</p>
                  </div>
                ) : filteredBuses.length > 0 ? (
                  <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
                    {filteredBuses.map(bus => (
                      <div 
                        key={bus.id}
                        className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                          selectedBus?.id === bus.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
                        }`}
                        onClick={() => setSelectedBus(bus)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-full mr-3">
                              <Truck className="h-4 w-4 text-blue-600" />
                            </div>
                            <h4 className="font-medium">{bus.name}</h4>
                          </div>
                          <BusStatusBadge status={bus.status} />
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                          <div className="flex items-center text-gray-600">
                            <Route className="h-3 w-3 mr-1" />
                            {bus.route}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="h-3 w-3 mr-1" />
                            {bus.studentsOnboard}/{bus.capacity}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-3 w-3 mr-1" />
                            {bus.eta}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Info className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No buses found matching your search</p>
                  </div>
                )}
              </div>
              
              {selectedBus && <BusDetailsCard bus={selectedBus} />}
            </>
          )}
        </div>
      </div>
      
      {/* Selected bus details in list view */}
      {viewMode === 'list' && selectedBus && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200 p-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Bus Details</h3>
            <button 
              onClick={() => setSelectedBus(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          <div className="p-4">
            <BusDetailsCard bus={selectedBus} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTracking;