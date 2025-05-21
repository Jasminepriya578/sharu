// src/app/master/components/Transport/index.tsx
"use client";

import React, { useState, useEffect } from 'react';
import TransportDashBoard from './TransportDashBoard'; 
import ParentInterface from './ParentInterface';

const Transport = () => {
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In production, fetch user role from your authentication system
    const fetchUserRole = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user role (would come from your auth system)
      // Options: 'admin', 'driver', 'parent'
      setUserRole('admin');
      setLoading(false);
    };
    
    fetchUserRole();
  }, []);
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transport Management</h1>
        <p className="text-gray-600">Manage school transportation system</p>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading transport module...</p>
          </div>
        </div>
      ) : (
        <>
          {userRole === 'parent' ? (
            <ParentInterface />
          ) : (
            <TransportDashBoard userRole={userRole} />
          )}
        </>
      )}
    </div>
  );
};

export default Transport;