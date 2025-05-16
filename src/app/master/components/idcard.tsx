"use client";
import React, { useState } from "react";
import { Search, Printer, Download, Check } from "lucide-react";

const IdCardGeneration = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  
  // Mock data for student list
  const students = [
    { id: 1, name: "Mohamed Aslam.K", rollNumber: "21BAD051", program: "Computer Science", batch: "2021-2025", imageUrl: "/parent2.jpg" },
    { id: 2, name: "Rahul Sharma", rollNumber: "21BAD052", program: "Computer Science", batch: "2021-2025", imageUrl: "/parent2.jpg" },
    { id: 3, name: "Priya Patel", rollNumber: "21BAD053", program: "Computer Science", batch: "2021-2025", imageUrl: "/parent2.jpg" },
    { id: 4, name: "Sarah Johnson", rollNumber: "21BAD054", program: "Computer Science", batch: "2021-2025", imageUrl: "/parent2.jpg" },
    { id: 5, name: "Abdul Rahman", rollNumber: "21BAD055", program: "Computer Science", batch: "2021-2025", imageUrl: "/parent2.jpg" },
  ];
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleStudentSelection = (studentId: number) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };
  
  const selectAllStudents = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">ID Card Generation</h2>
        <div className="flex gap-2">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={selectedStudents.length === 0}
            onClick={() => {
              // Print ID cards
              console.log("Printing ID cards for:", selectedStudents);
            }}
          >
            <Printer size={18} />
            <span>Print Selected ID Cards</span>
          </button>
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed"
            disabled={selectedStudents.length === 0}
            onClick={() => {
              // Download ID cards as PDF
              console.log("Downloading ID cards as PDF for:", selectedStudents);
            }}
          >
            <Download size={18} />
            <span>Download as PDF</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="flex gap-4 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search by name or roll number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
              onClick={selectAllStudents}
            >
              {selectedStudents.length === filteredStudents.length && filteredStudents.length > 0
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {filteredStudents.map((student) => (
            <div 
              key={student.id} 
              className={`border rounded-lg overflow-hidden cursor-pointer ${
                selectedStudents.includes(student.id) ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'
              }`}
              onClick={() => toggleStudentSelection(student.id)}
            >
              <div className="flex items-start p-4">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src={student.imageUrl}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-500">Roll No: {student.rollNumber}</p>
                  <p className="text-sm text-gray-500">{student.program}</p>
                  <p className="text-sm text-gray-500">{student.batch}</p>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    selectedStudents.includes(student.id) 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {selectedStudents.includes(student.id) && <Check size={16} />}
                  </div>
                </div>
              </div>
              
              {selectedStudents.includes(student.id) && (
                <div className="p-4 border-t border-gray-200 bg-blue-50">
                  <div className="text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Preview ID Card
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No students found matching your search criteria.
          </div>
        )}
      </div>
      
      {selectedStudents.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">ID Card Preview</h3>
          <div className="flex flex-wrap gap-4">
            {selectedStudents.map(id => {
              const student = students.find(s => s.id === id);
              if (!student) return null;
              return (
                <div key={id} className="w-80 h-48 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg overflow-hidden flex p-3 text-white">
                  <div className="w-1/3">
                    <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-white mb-2">
                      <img
                        src={student.imageUrl}
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs text-center bg-white text-blue-800 rounded py-1 font-bold">
                      2023-2024
                    </div>
                  </div>
                  <div className="w-2/3 pl-3">
                    <div className="mb-1">
                      <img src="/logo-placeholder.png" alt="School Logo" className="h-6" />
                    </div>
                    <h3 className="text-sm font-bold uppercase mb-2">STUDENT ID CARD</h3>
                    <div className="text-xs space-y-1">
                      <p className="font-semibold text-sm">{student.name}</p>
                      <p>Roll No: {student.rollNumber}</p>
                      <p>Program: {student.program}</p>
                      <p>Batch: {student.batch}</p>
                      <div className="mt-2 text-[10px]">
                        <p>If found, please return to:</p>
                        <p>School of Technology</p>
                        <p>Phone: +91 9876543210</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default IdCardGeneration;