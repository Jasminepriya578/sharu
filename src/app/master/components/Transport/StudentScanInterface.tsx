// src/app/master/components/Transport/StudentScanInterface.tsx
"use client";

import React, { useState } from 'react';

const StudentScanInterface = () => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [recentScans, setRecentScans] = useState([]);
  const [manualId, setManualId] = useState('');
  
  // Simulate QR code scanning
  const startScanner = () => {
    setScanning(true);
    
    // Simulate a scan after 2 seconds
    setTimeout(() => {
      const mockStudentId = 'STU' + Math.floor(1000 + Math.random() * 9000);
      handleScanResult(mockStudentId);
      setScanning(false);
    }, 2000);
  };
  
  const handleScanResult = (studentId) => {
    // Mock successful scan
    const mockResult = {
      success: true,
      student: {
        id: studentId,
        name: 'Student Name',
        grade: '10th',
        section: 'A',
        timestamp: new Date().toLocaleTimeString()
      }
    };
    
    setScanResult(mockResult);
    
    if (mockResult.success) {
      setRecentScans(prev => [mockResult.student, ...prev].slice(0, 10));
    }
  };
  
  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualId) return;
    
    // Mock result for manual entry
    const mockResult = {
      success: true,
      student: {
        id: manualId,
        name: 'Manual Student',
        grade: '9th',
        section: 'B',
        timestamp: new Date().toLocaleTimeString()
      }
    };
    
    setScanResult(mockResult);
    
    if (mockResult.success) {
      setRecentScans(prev => [mockResult.student, ...prev].slice(0, 10));
      setManualId('');
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Student Check-in</h2>
      
      <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
        {scanning ? (
          <div className="w-full max-w-sm">
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <div className="animate-pulse text-gray-500">Scanning...</div>
            </div>
            <button 
              onClick={() => setScanning(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
            >
              Cancel Scan
            </button>
          </div>
        ) : (
          <button 
            onClick={startScanner}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium"
          >
            Scan Student ID
          </button>
        )}
        
        {scanResult && (
          <div className={`mt-4 p-4 rounded-lg w-full ${scanResult.success ? 'bg-green-100' : 'bg-red-100'}`}>
            {scanResult.success ? (
              <>
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 font-medium">Student verified!</span>
                </div>
                <p>Name: {scanResult.student.name}</p>
                <p>Grade: {scanResult.student.grade} {scanResult.student.section}</p>
                <p>Time: {scanResult.student.timestamp}</p>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="ml-2 font-medium">Verification failed</span>
                </div>
                <p>{scanResult.error}</p>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold mb-4">Manual ID Entry</h3>
        <form onSubmit={handleManualSubmit} className="flex">
          <input
            type="text"
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2"
            placeholder="Enter student ID"
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
          >
            Submit
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold mb-4">Recent Check-ins</h3>
        {recentScans.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {recentScans.map((student, index) => (
              <div key={index} className="py-2">
                <div className="flex justify-between">
                  <span className="font-medium">{student.name}</span>
                  <span className="text-sm text-gray-600">{student.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600">ID: {student.id} | {student.grade} {student.section}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recent check-ins</p>
        )}
      </div>
    </div>
  );
};

export default StudentScanInterface;