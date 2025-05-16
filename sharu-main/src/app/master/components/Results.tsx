"use client";
import Image from "next/image";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

// Student & Academic Data
const student = {
  name: "Mohamed Aslam.K",
  rollNo: "17958 : 21BAD051 : 9517202109034",
  Class: "11",
  Percentage: 91.05,
  Fails: 0,
  classRank: 3,
  batchRank: 3,
  image: "/parent2.jpg", // Replace with actual image URL
};

const ExamResults = [
  { Exam: "Exam1", Percentage: 88.8, month: "Aug 2021" },
  { Exam: "Exam2", Percentage: 85.7, month: "Nov 2021" },
  { Exam: "Exam3", Percentage: 94.9, month: "Feb 2022" },
];

const gradesData = {
  Exam1: [
    { code: "19B181", name: "Tamil", credit: 4, internal: 100, grade: "A+", yop: "AUG2021" },
    { code: "19HS101", name: "English", credit: 3, internal: 94, grade: "A", yop: "AUG2021" },
    { code: "19BS101", name: "Mathematics", credit: 4, internal: 100, grade: "O", yop: "AUG2021" },
    { code: "19BS102", name: "Chemistry", credit: 3, internal: 96, grade: "A+", yop: "AUG2021" },
    { code: "19CIE101", name: "Computer", credit: 3, internal: 98, grade: "A+", yop: "AUG2021" },
    { code: "19B181", name: "Physics", credit: 4, internal: 100, grade: "A+", yop: "AUG2021" },
    { code: "19CE151", name: "Computer Lab", credit: 1.5, internal: 94, grade: "A+", yop: "AUG2021" },
  ],
  Exam2: [
    { code: "19B181", name: "Tamil", credit: 4, internal: 100, grade: "A+", yop: "NOV2021" },
    { code: "19HS101", name: "English", credit: 3, internal: 90, grade: "A", yop: "NOV2021" },
    { code: "19BS101", name: "Mathematics", credit: 4, internal: 100, grade: "O", yop: "NOV2021" },
    { code: "19BS102", name: "Chemistry", credit: 3, internal: 97, grade: "A+", yop: "NOV2021" },
    { code: "19CIE101", name: "Computer", credit: 3, internal: 97, grade: "A+", yop: "NOV2021" },
    { code: "19B181", name: "Physics", credit: 4, internal: 100, grade: "A+", yop: "NOV2021" },
    { code: "19CE151", name: "Computer Lab", credit: 1.5, internal: 94, grade: "A+", yop: "NOV2021" },
  ],
  Exam3: [
    { code: "19B181", name: "Tamil", credit: 4, internal: 90, grade: "A+", yop: "FEB2022" },
    { code: "19HS101", name: "English", credit: 3, internal: 97, grade: "A", yop: "FEB2022" },
    { code: "19BS101", name: "Mathematics", credit: 4, internal: 100, grade: "O", yop: "FEB2022" },
    { code: "19BS102", name: "Chemistry", credit: 3, internal: 97, grade: "A+", yop: "FEB2022" },
    { code: "19CIE101", name: "Computer", credit: 3, internal: 96, grade: "A+", yop: "FEB2022" },
    { code: "19B181", name: "Physics", credit: 4, internal: 100, grade: "A+", yop: "FEB2022" },
    { code: "19CE151", name: "Computer Lab", credit: 1.5, internal: 95, grade: "A+", yop: "FEB2022" },
  ],
};

// Helper function to get grade color
const getGradeColor = (grade) => {
  switch (grade) {
    case "O": return "bg-purple-100 text-purple-800";
    case "A+": return "bg-green-100 text-green-800";
    case "A": return "bg-blue-100 text-blue-800";
    case "B+": return "bg-yellow-100 text-yellow-800";
    case "B": return "bg-orange-100 text-orange-800";
    case "C": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

// Calculate average for each subject across exams
const calculateSubjectAverages = () => {
  const subjects = {};
  
  // Get all unique subjects
  Object.values(gradesData).forEach(examData => {
    examData.forEach(course => {
      if (!subjects[course.name]) {
        subjects[course.name] = { name: course.name, scores: [] };
      }
      subjects[course.name].scores.push(course.internal);
    });
  });
  
  // Calculate averages
  Object.keys(subjects).forEach(subject => {
    const scores = subjects[subject].scores;
    subjects[subject].average = scores.reduce((a, b) => a + b, 0) / scores.length;
  });
  
  return Object.values(subjects);
};

export default function StudentDashboard() {
  const [selectedExam, setSelectedExam] = useState("Exam1");
  const subjectAverages = calculateSubjectAverages();
  
  // Find the selected exam's percentage for display
  const selectedExamData = ExamResults.find(exam => exam.Exam === selectedExam);
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-semibold">{`${label}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="container mx-auto">
        {/* Header with Student Info */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
            <h1 className="text-white text-2xl font-bold text-center">Student Academic Dashboard</h1>
          </div>
          
          <div className="md:flex p-6">
            {/* Student Photo */}
            <div className="md:w-1/4 flex flex-col items-center justify-center mb-4 md:mb-0">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-100 shadow-md">
                <Image
                  src={student.image}
                  alt={student.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-800">{student.name}</h2>
              <p className="text-gray-600">{student.rollNo}</p>
              <p className="text-gray-600">Class: {student.Class}</p>
            </div>
            
            {/* Performance Highlights */}
            <div className="md:w-3/4 md:pl-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Performance Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 uppercase">Overall</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">Excellent</span>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600">{student.Percentage}%</p>
                  <div className="mt-2 h-1 w-full bg-gray-200 rounded-full">
                    <div 
                      className="h-1 bg-indigo-500 rounded-full" 
                      style={{ width: `${student.Percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase">Class Rank</p>
                  <div className="flex items-end">
                    <p className="text-2xl font-bold text-indigo-600">{student.classRank}</p>
                    <p className="text-sm text-gray-500 ml-1 mb-1">/ 60</p>
                  </div>
                  <div className="mt-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15 3.707V5a1 1 0 012 0v-3a1 1 0 01-1-1h-3a1 1 0 010 2h1.293L13 4.293l-.707-.707A1 1 0 0112 2zm.707 10.293a1 1 0 00-1.414 0L10.586 13l-1.293-1.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-gray-500 ml-1">Top 5%</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase">Batch Rank</p>
                  <div className="flex items-end">
                    <p className="text-2xl font-bold text-indigo-600">{student.batchRank}</p>
                    <p className="text-sm text-gray-500 ml-1 mb-1">/ 120</p>
                  </div>
                  <div className="mt-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15 3.707V5a1 1 0 012 0v-3a1 1 0 01-1-1h-3a1 1 0 010 2h1.293L13 4.293l-.707-.707A1 1 0 0112 2zm.707 10.293a1 1 0 00-1.414 0L10.586 13l-1.293-1.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-gray-500 ml-1">Top 3%</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase">Failed Subjects</p>
                  <p className="text-2xl font-bold text-green-600">{student.Fails}</p>
                  <div className="mt-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-green-600 ml-1">All Passed!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Exam-wise Performance Chart */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-700">Exam Performance Trend</h3>
              <p className="text-sm text-gray-500">Performance across all exams</p>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={ExamResults}>
                  <XAxis dataKey="Exam" tick={{ fontSize: 12 }} />
                  <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="Percentage" stroke="#4f46e5" strokeWidth={2} dot={{ r: 6, fill: "#4f46e5" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Subject-wise Performance Chart */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-700">Subject Averages</h3>
              <p className="text-sm text-gray-500">Average performance across all subjects</p>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={subjectAverages}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="average" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Exam Details Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Exam Details</h3>
              <p className="text-sm text-gray-500">
                {selectedExamData?.month} - {selectedExamData?.Percentage}%
              </p>
            </div>
            <div className="flex items-center">
              <label className="text-sm text-gray-600 mr-2">Select Exam:</label>
              <select
                className="p-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
              >
                {ExamResults.map((exam) => (
                  <option key={exam.Exam} value={exam.Exam}>{exam.Exam} - {exam.month}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Grades Table */}
          <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Internal</th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">YOP</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {gradesData[selectedExam].map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{course.code}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{course.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{course.credit}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-2 w-16 bg-gray-200 rounded-full mr-2">
                          <div 
                            className="h-2 bg-indigo-500 rounded-full" 
                            style={{ width: `${course.internal}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700">{course.internal}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getGradeColor(course.grade)}`}>
                        {course.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{course.yop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg overflow-hidden text-white p-6">
            <h3 className="font-bold text-lg mb-2">Academic Standing</h3>
            <p className="text-indigo-100 mb-4">Based on current performance</p>
            <div className="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-bold text-xl">Excellent</p>
                <p className="text-indigo-100 text-sm">Top 5% of the class</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Upcoming Exams</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-700">Mid-term Exam - Apr 15, 2022</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-700">Lab Assessment - Apr 20, 2022</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-700">Final Project Due - May 10, 2022</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Improvement Areas</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-700">English</p>
                  <p className="text-xs text-gray-500">90.3%</p>
                </div>
                <div className="h-1 w-full bg-gray-200 rounded-full">
                  <div className="h-1 bg-indigo-500 rounded-full" style={{ width: "90.3%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-700">Tamil</p>
                  <p className="text-xs text-gray-500">93.4%</p>
                </div>
                <div className="h-1 w-full bg-gray-200 rounded-full">
                  <div className="h-1 bg-indigo-500 rounded-full" style={{ width: "93.4%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-700">Computer Lab</p>
                  <p className="text-xs text-gray-500">94.3%</p>
                </div>
                <div className="h-1 w-full bg-gray-200 rounded-full">
                  <div className="h-1 bg-indigo-500 rounded-full" style={{ width: "94.3%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}