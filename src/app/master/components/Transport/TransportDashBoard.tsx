// src/app/master/components/Transport/TransportDashBoard.tsx
"use client";

import React, { useState } from 'react';
import LiveTracking from './LiveTracking'; // Make sure this matches your file name
import StudentScanInterface from './StudentScanInterface';
import NotificationsPannel from './NotificationsPannel'; // Make sure this matches your file name
import AdminControls from './AdminControls';

const TransportDashBoard = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('tracking');
  
  // Different views based on user role (admin, driver, parent)
  const renderDashboardView = () => {
    switch(activeTab) {
      case 'tracking':
        return <LiveTracking />;
      case 'scan':
        return <StudentScanInterface />;
      case 'notifications':
        return <NotificationsPannel />;
      case 'admin':
        return userRole === 'admin' ? <AdminControls /> : <div>Access restricted</div>;
      default:
        return <LiveTracking />;
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('tracking')}
          className={`px-4 py-2 font-medium ${activeTab === 'tracking' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
        >
          Live Tracking
        </button>
        {userRole === 'driver' && (
          <button 
            onClick={() => setActiveTab('scan')}
            className={`px-4 py-2 font-medium ${activeTab === 'scan' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Student Check-in
          </button>
        )}
        <button 
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 font-medium ${activeTab === 'notifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
        >
          Notifications
        </button>
        {userRole === 'admin' && (
          <button 
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 font-medium ${activeTab === 'admin' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Admin Controls
          </button>
        )}
      </div>
      <div className="p-4">
        {renderDashboardView()}
      </div>
    </div>
  );
};

export default TransportDashBoard;