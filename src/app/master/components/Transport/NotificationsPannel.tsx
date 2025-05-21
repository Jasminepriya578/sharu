// src/app/master/components/Transport/NotificationsPannel.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

const NotificationsPannel = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  
  useEffect(() => {
    // In production, fetch from your API
    const fetchNotifications = async () => {
      try {
        // Mock data for development
        const mockNotifications = [
          {
            id: 'notif001',
            type: 'alert',
            message: 'Bus 1 is running 10 minutes late due to traffic',
            detail: 'Estimated arrival at School: 8:25 AM',
            timestamp: '2025-05-20T08:15:00',
            read: false
          },
          {
            id: 'notif002',
            type: 'info',
            message: 'Arun Kumar has boarded Bus 2',
            detail: 'Time: 8:10 AM at Nelson Road Stop',
            timestamp: '2025-05-20T08:10:00',
            read: true
          },
          {
            id: 'notif003',
            type: 'success',
            message: 'Priya Sharma has been dropped off at stop: Main Street',
            detail: 'Time: 4:30 PM - Confirmed by driver',
            timestamp: '2025-05-19T16:30:00',
            read: true
          },
          {
            id: 'notif004',
            type: 'alert',
            message: 'Route B has been modified due to road construction',
            detail: 'New route avoids Park Avenue. Estimated delay: 5 minutes',
            timestamp: '2025-05-19T07:30:00',
            read: true
          },
          {
            id: 'notif005',
            type: 'info',
            message: 'Bus 3 maintenance scheduled for this weekend',
            detail: 'May 22-23, 2025. Please reassign routes accordingly.',
            timestamp: '2025-05-18T14:45:00',
            read: true
          },
        ];
        
        setNotifications(mockNotifications);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getTypeStyles = (type) => {
    switch(type) {
      case 'alert':
        return 'bg-red-50 border-l-4 border-red-500';
      case 'success':
        return 'bg-green-50 border-l-4 border-green-500';
      case 'info':
        return 'bg-blue-50 border-l-4 border-blue-500';
      default:
        return 'bg-gray-50 border-l-4 border-gray-500';
    }
  };
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    return notification.type === activeFilter;
  });
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {notifications.filter(n => !n.read).length} new
            </span>
          </div>
          <button 
            onClick={markAllAsRead}
            className="text-blue-600 text-sm hover:text-blue-800"
          >
            Mark all as read
          </button>
        </div>
        
        {/* Filter tabs */}
        <div className="flex space-x-2 mb-6 pb-2 border-b border-gray-200">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 text-sm rounded ${
              activeFilter === 'all' 
                ? 'bg-blue-100 text-blue-800 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('unread')}
            className={`px-3 py-1 text-sm rounded ${
              activeFilter === 'unread' 
                ? 'bg-blue-100 text-blue-800 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setActiveFilter('alert')}
            className={`px-3 py-1 text-sm rounded ${
              activeFilter === 'alert' 
                ? 'bg-red-100 text-red-800 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setActiveFilter('info')}
            className={`px-3 py-1 text-sm rounded ${
              activeFilter === 'info' 
                ? 'bg-blue-100 text-blue-800 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Info
          </button>
          <button
            onClick={() => setActiveFilter('success')}
            className={`px-3 py-1 text-sm rounded ${
              activeFilter === 'success' 
                ? 'bg-green-100 text-green-800 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Success
          </button>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-500">Loading notifications...</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`${getTypeStyles(notification.type)} p-4 rounded-lg shadow-sm ${
                    notification.read ? 'opacity-80' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-white shadow-sm mr-3">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          notification.type === 'alert' ? 'bg-red-100 text-red-800' : 
                          notification.type === 'success' ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {notification.type === 'alert' ? 'Alert' : 
                          notification.type === 'success' ? 'Success' : 'Info'}
                        </span>
                        <div className="flex items-center text-gray-500 text-xs ml-2">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTime(notification.timestamp)}
                        </div>
                        {!notification.read && (
                          <span className="ml-2 bg-blue-500 h-2 w-2 rounded-full"></span>
                        )}
                      </div>
                      
                      <p className={`text-sm ${notification.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                        {notification.message}
                      </p>
                      
                      {notification.detail && (
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.detail}
                        </p>
                      )}
                    </div>
                    
                    {!notification.read && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="text-sm text-blue-600 hover:text-blue-800 whitespace-nowrap"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Bell className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No notifications found</p>
                <p className="text-gray-400 text-sm mt-1">
                  {activeFilter !== 'all' 
                    ? `Try changing your filter selection` 
                    : `You're all caught up!`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPannel;