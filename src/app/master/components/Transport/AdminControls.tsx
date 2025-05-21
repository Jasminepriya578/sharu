// src/app/master/components/Transport/AdminControls.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, MapPin, MessageSquare, FileText, ChevronRight, AlertTriangle, CheckCircle, Truck, Users, Map, BarChart2 } from 'lucide-react';

const AdminControls = () => {
  const [buses, setBuses] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('buses');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // In production, fetch from your API
    const fetchData = async () => {
      try {
        // Mock data for development
        const mockBuses = [
          { id: 'bus001', name: 'Bus 1', capacity: 35, currentStudents: 25, status: 'active', driver: 'John Doe', route: 'Route A' },
          { id: 'bus002', name: 'Bus 2', capacity: 30, currentStudents: 18, status: 'active', driver: 'Jane Smith', route: 'Route B' },
          { id: 'bus003', name: 'Bus 3', capacity: 40, currentStudents: 0, status: 'maintenance', driver: 'N/A', route: 'N/A' },
        ];
        
        const mockDrivers = [
          { id: 'driver001', name: 'John Doe', phone: '555-1234', assignedBus: 'Bus 1', status: 'on-duty' },
          { id: 'driver002', name: 'Jane Smith', phone: '555-5678', assignedBus: 'Bus 2', status: 'on-duty' },
          { id: 'driver003', name: 'Michael Johnson', phone: '555-9012', assignedBus: 'None', status: 'available' },
        ];
        
        const mockRoutes = [
          { id: 'route001', name: 'Route A', stops: 12, students: 25, assignedBus: 'Bus 1', schedule: 'Morning & Evening' },
          { id: 'route002', name: 'Route B', stops: 10, students: 18, assignedBus: 'Bus 2', schedule: 'Morning & Evening' },
          { id: 'route003', name: 'Route C', stops: 8, students: 15, assignedBus: 'None', schedule: 'Not Active' },
        ];
        
        setBuses(mockBuses);
        setDrivers(mockDrivers);
        setRoutes(mockRoutes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter data based on search term
  const filteredBuses = buses.filter(bus => 
    bus.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    bus.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.route.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredDrivers = drivers.filter(driver => 
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    driver.assignedBus.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredRoutes = routes.filter(route => 
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    route.assignedBus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status badge component
  const StatusBadge = ({ status, type }) => {
    let bgColor, textColor, icon;
    
    if (type === 'bus') {
      if (status === 'active') {
        bgColor = 'bg-emerald-100';
        textColor = 'text-emerald-800';
        icon = <CheckCircle className="w-3 h-3 mr-1" />;
      } else if (status === 'maintenance') {
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        icon = <AlertTriangle className="w-3 h-3 mr-1" />;
      } else {
        bgColor = 'bg-amber-100';
        textColor = 'text-amber-800';
        icon = <AlertTriangle className="w-3 h-3 mr-1" />;
      }
    } else if (type === 'driver') {
      if (status === 'on-duty') {
        bgColor = 'bg-emerald-100';
        textColor = 'text-emerald-800';
        icon = <CheckCircle className="w-3 h-3 mr-1" />;
      } else if (status === 'off-duty') {
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
        icon = null;
      } else {
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        icon = null;
      }
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {icon}
        {status}
      </span>
    );
  };
  
  const renderTab = () => {
    switch(activeTab) {
      case 'buses':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search buses..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="h-4 w-4 mr-2" />
                Add New Bus
              </button>
            </div>
            
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bus
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Driver
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Route
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBuses.length > 0 ? (
                      filteredBuses.map((bus) => (
                        <tr key={bus.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <Truck className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{bus.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{bus.capacity} seats</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {bus.currentStudents}
                              <span className="text-gray-500 ml-1">/ {bus.capacity}</span>
                            </div>
                            <div className="w-24 mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-600 rounded-full" 
                                style={{ width: `${(bus.currentStudents / bus.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={bus.status} type="bus" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {bus.driver}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {bus.route}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-4">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <MapPin className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                          No buses found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'drivers':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search drivers..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="h-4 w-4 mr-2" />
                Add New Driver
              </button>
            </div>
            
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Driver
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned Bus
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDrivers.length > 0 ? (
                      filteredDrivers.map((driver) => (
                        <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                <Users className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {driver.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {driver.assignedBus !== 'None' ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                                {driver.assignedBus}
                              </span>
                            ) : (
                              <span className="text-gray-500">None</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={driver.status} type="driver" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-4">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <MessageSquare className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                          No drivers found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'routes':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search routes..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="h-4 w-4 mr-2" />
                Add New Route
              </button>
            </div>
            
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Route Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stops
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned Bus
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schedule
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRoutes.length > 0 ? (
                      filteredRoutes.map((route) => (
                        <tr key={route.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <Map className="h-4 w-4 text-purple-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{route.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{route.stops} stops</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{route.students} students</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {route.assignedBus !== 'None' ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                                {route.assignedBus}
                              </span>
                            ) : (
                              <span className="text-gray-500">None</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {route.schedule}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-4">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Map className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          No routes found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'reports':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Dashboard Overview</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Total Students Transported</p>
                        <p className="mt-1 text-3xl font-semibold text-blue-900">43</p>
                      </div>
                      <div className="bg-blue-200 p-3 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-blue-600">
                      <span className="font-medium">↑ 12%</span> from last week
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 shadow-sm border border-emerald-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-emerald-600">On-Time Rate</p>
                        <p className="mt-1 text-3xl font-semibold text-emerald-900">98%</p>
                      </div>
                      <div className="bg-emerald-200 p-3 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-emerald-600">
                      <span className="font-medium">↑ 3%</span> from last month
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 shadow-sm border border-amber-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-amber-600">Absent Students</p>
                        <p className="mt-1 text-3xl font-semibold text-amber-900">3</p>
                      </div>
                      <div className="bg-amber-200 p-3 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-amber-600" />
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-amber-600">
                      <span className="font-medium">↓ 2</span> from yesterday
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Reports & Analytics</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <a href="#" className="block group">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 group-hover:bg-gray-100 transition duration-150">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900">Daily Transport Log</h4>
                          <p className="text-xs text-gray-500 mt-1">Detailed log of all transport activity for today</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </a>
                  
                  <a href="#" className="block group">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 group-hover:bg-gray-100 transition duration-150">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <BarChart2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900">Monthly Attendance Report</h4>
                          <p className="text-xs text-gray-500 mt-1">Student attendance statistics for the month</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </a>
                  
                  <a href="#" className="block group">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 group-hover:bg-gray-100 transition duration-150">
                      <div className="flex items-center">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Map className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900">Route Performance Analysis</h4>
                          <p className="text-xs text-gray-500 mt-1">Efficiency metrics for all transport routes</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </a>
                  
                  <a href="#" className="block group">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 group-hover:bg-gray-100 transition duration-150">
                      <div className="flex items-center">
                        <div className="bg-amber-100 p-2 rounded-lg">
                          <Users className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900">Driver Performance Report</h4>
                          <p className="text-xs text-gray-500 mt-1">Safety and efficiency metrics for drivers</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Select a tab</div>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Transport Admin Dashboard</h2>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('buses')}
           className={`flex items-center px-5 py-4 font-medium text-sm border-b ${
              activeTab === 'buses' 
                ? 'text-blue-600 border-blue-600' 
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            } transition-colors`}
          >
            <Truck className="h-5 w-5 mr-2" />
            Buses
          </button>
          <button 
            onClick={() => setActiveTab('drivers')}
            className={`flex items-center px-5 py-4 font-medium text-sm border-b ${
              activeTab === 'drivers' 
                ? 'text-blue-600 border-blue-600' 
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            } transition-colors`}
          >
            <Users className="h-5 w-5 mr-2" />
            Drivers
          </button>
          <button 
            onClick={() => setActiveTab('routes')}
            className={`flex items-center px-5 py-4 font-medium text-sm border-b ${
              activeTab === 'routes' 
                ? 'text-blue-600 border-blue-600' 
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            } transition-colors`}
          >
            <Map className="h-5 w-5 mr-2" />
            Routes
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={`flex items-center px-5 py-4 font-medium text-sm border-b ${
              activeTab === 'reports' 
                ? 'text-blue-600 border-blue-600' 
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            } transition-colors`}
          >
            <BarChart2 className="h-5 w-5 mr-2" />
            Reports
          </button>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-500">Loading data...</p>
            </div>
          ) : (
            renderTab()
          )}
        </div>
      </div>
      
      {/* Quick Stats Section */}
      {activeTab !== 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{buses.length}</h3>
                <p className="text-sm text-gray-500">Total Buses</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Active</span>
                <span className="font-medium">{buses.filter(b => b.status === 'active').length}</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(buses.filter(b => b.status === 'active').length / buses.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{drivers.length}</h3>
                <p className="text-sm text-gray-500">Total Drivers</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">On Duty</span>
                <span className="font-medium">{drivers.filter(d => d.status === 'on-duty').length}</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(drivers.filter(d => d.status === 'on-duty').length / drivers.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Map className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{routes.length}</h3>
                <p className="text-sm text-gray-500">Total Routes</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Active Routes</span>
                <span className="font-medium">{routes.filter(r => r.schedule !== 'Not Active').length}</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${(routes.filter(r => r.schedule !== 'Not Active').length / routes.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-4">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <FileText className="h-4 w-4 mr-2 text-gray-500" />
          Export Data
        </button>
        
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
          Report Issue
        </button>
        
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Map className="h-4 w-4 mr-2 text-blue-500" />
          View Master Map
        </button>
      </div>
    </div>
  );
};

export default AdminControls;