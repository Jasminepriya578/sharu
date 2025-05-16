"use client";
import { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, CartesianGrid, Legend 
} from "recharts";
import Image from "next/image";
import {
  User, Upload, Download, FileSpreadsheet, Award, AlertCircle,
  BookOpen, Check, ChevronDown, ChevronUp, X
} from "lucide-react";

// Mock data for demonstration
const studentData = {
  name: "Mohamed Aslam.K",
  regNumber: "21BAD051",
  class: "11",
  section: "A",
  percentage: 91.05,
  fails: 0,
  classRank: 3,
  batchRank: 3,
  image: "/parent2.jpg",
};

const exams = [
  { id: "weekly", name: "Weekly Test" },
  { id: "monthly", name: "Monthly Test" },
  { id: "yearly", name: "Yearly Test" },
];

const subjects = [
  { id: 1, code: "MAT101", name: "Mathematics" },
  { id: 2, code: "ENG101", name: "English" },
  { id: 3, code: "PHY101", name: "Physics" },
  { id: 4, code: "CHE101", name: "Chemistry" },
  { id: 5, code: "COM101", name: "Computer Science" },
  { id: 6, code: "TAM101", name: "Tamil" },
];

const studentMarks = {
  weekly: [
    { subject: "Mathematics", code: "MAT101", marks: 95, total: 100, average: 92.5, percentage: 95 },
    { subject: "English", code: "ENG101", marks: 88, total: 100, average: 84.2, percentage: 88 },
    { subject: "Physics", code: "PHY101", marks: 92, total: 100, average: 89.7, percentage: 92 },
    { subject: "Chemistry", code: "CHE101", marks: 89, total: 100, average: 86.3, percentage: 89 },
    { subject: "Computer Science", code: "COM101", marks: 97, total: 100, average: 94.1, percentage: 97 },
    { subject: "Tamil", code: "TAM101", marks: 84, total: 100, average: 82.8, percentage: 84 },
  ],
  monthly: [
    { subject: "Mathematics", code: "MAT101", marks: 92, total: 100, average: 90.1, percentage: 92 },
    { subject: "English", code: "ENG101", marks: 85, total: 100, average: 82.5, percentage: 85 },
    { subject: "Physics", code: "PHY101", marks: 94, total: 100, average: 91.2, percentage: 94 },
    { subject: "Chemistry", code: "CHE101", marks: 91, total: 100, average: 88.4, percentage: 91 },
    { subject: "Computer Science", code: "COM101", marks: 96, total: 100, average: 93.7, percentage: 96 },
    { subject: "Tamil", code: "TAM101", marks: 87, total: 100, average: 85.3, percentage: 87 },
  ],
  yearly: [
    { subject: "Mathematics", code: "MAT101", marks: 96, total: 100, average: 93.8, percentage: 96 },
    { subject: "English", code: "ENG101", marks: 90, total: 100, average: 87.4, percentage: 90 },
    { subject: "Physics", code: "PHY101", marks: 95, total: 100, average: 92.6, percentage: 95 },
    { subject: "Chemistry", code: "CHE101", marks: 93, total: 100, average: 90.2, percentage: 93 },
    { subject: "Computer Science", code: "COM101", marks: 98, total: 100, average: 95.8, percentage: 98 },
    { subject: "Tamil", code: "TAM101", marks: 89, total: 100, average: 86.9, percentage: 89 },
  ],
};

// Performance trend data
const performanceTrend = [
  { exam: "Weekly Test", percentage: 90.83 },
  { exam: "Monthly Test", percentage: 90.83 },
  { exam: "Yearly Test", percentage: 93.50 },
];

// Upcoming exams
const upcomingExams = [
  { name: "Science Mid-term", date: "June 10, 2025" },
  { name: "Math Assessment", date: "June 15, 2025" },
  { name: "Language Finals", date: "June 25, 2025" },
];

// Mock student list for teacher view
const studentList = [
  { id: 1, name: "Mohamed Aslam.K", regNumber: "21BAD051", class: "11", section: "A" },
  { id: 2, name: "Priya Sharma", regNumber: "21BAD052", class: "11", section: "A" },
  { id: 3, name: "Rahul Patel", regNumber: "21BAD053", class: "11", section: "A" },
  { id: 4, name: "Sneha Verma", regNumber: "21BAD054", class: "11", section: "A" },
  { id: 5, name: "Arun Kumar", regNumber: "21BAD055", class: "11", section: "A" },
];

export default function Result() {
  // State variables
  const [userRole, setUserRole] = useState("teacher"); // "teacher" or "student"
  const [selectedTab, setSelectedTab] = useState("student-dashboard");
  const [selectedExam, setSelectedExam] = useState("weekly");
  const [selectedStudent, setSelectedStudent] = useState(studentList[0]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState({
    studentName: "",
    regNumber: "",
    class: "",
    section: "",
    courseCode: "",
    subjectName: "",
    marks: "",
    totalMarks: "100",
    examType: "weekly",
  });

  // Toggle between teacher and student role (for demo purposes)
  const toggleRole = () => {
    setUserRole(userRole === "teacher" ? "student" : "teacher");
    setSelectedTab(userRole === "teacher" ? "student-dashboard" : "enter-marks");
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      studentName: "",
      regNumber: "",
      class: "",
      section: "",
      courseCode: "",
      subjectName: "",
      marks: "",
      totalMarks: "100",
      examType: "weekly",
    });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
    
    // Here you would process the file
    // This is a simplified example:
    if (file) {
      console.log("File uploaded:", file.name);
      // In a real app, you would need to process this file
      // You could use the built-in FileReader API or a library like PapaParse
    }
  };

  // Calc
  // ulate overall statistics
  const calculateOverallStats = (examType) => {
    const marks = studentMarks[examType];
    const totalMarks = marks.reduce((sum, subject) => sum + subject.marks, 0);
    const totalPossible = marks.reduce((sum, subject) => sum + subject.total, 0);
    const overallPercentage = (totalMarks / totalPossible) * 100;
    const failedSubjects = marks.filter(subject => subject.marks < 40).length;
    
    return {
      totalMarks,
      totalPossible,
      overallPercentage: overallPercentage.toFixed(2),
      failedSubjects,
    };
  };

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

  // Helper function to get grade
  const getGrade = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    if (marks >= 40) return "D";
    return "F";
  };

  // Render the teacher view for entering marks
  const renderTeacherMarksEntry = () => (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Enter Student Marks</h2>
          <p className="text-sm text-gray-500">Manually enter marks for a student</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Name</label>
                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="Enter student name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="regNumber" className="block text-sm font-medium text-gray-700">Registration Number</label>
                <input
                  id="regNumber"
                  name="regNumber"
                  type="text"
                  value={formData.regNumber}
                  onChange={handleInputChange}
                  placeholder="Enter registration number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
                <input
                  id="class"
                  name="class"
                  type="text"
                  value={formData.class}
                  onChange={handleInputChange}
                  placeholder="Enter class"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="section" className="block text-sm font-medium text-gray-700">Section</label>
                <input
                  id="section"
                  name="section"
                  type="text"
                  value={formData.section}
                  onChange={handleInputChange}
                  placeholder="Enter section"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">Course Code</label>
                <input
                  id="courseCode"
                  name="courseCode"
                  type="text"
                  value={formData.courseCode}
                  onChange={handleInputChange}
                  placeholder="Enter course code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">Subject Name</label>
                <input
                  id="subjectName"
                  name="subjectName"
                  type="text"
                  value={formData.subjectName}
                  onChange={handleInputChange}
                  placeholder="Enter subject name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="examType" className="block text-sm font-medium text-gray-700">Exam Type</label>
                <select
                  id="examType"
                  name="examType"
                  value={formData.examType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="weekly">Weekly Test</option>
                  <option value="monthly">Monthly Test</option>
                  <option value="yearly">Yearly Test</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="marks" className="block text-sm font-medium text-gray-700">Marks Obtained</label>
                <input
                  id="marks"
                  name="marks"
                  type="number"
                  value={formData.marks}
                  onChange={handleInputChange}
                  placeholder="Enter marks"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="totalMarks" className="block text-sm font-medium text-gray-700">Total Marks</label>
                <input
                  id="totalMarks"
                  name="totalMarks"
                  type="number"
                  value={formData.totalMarks}
                  onChange={handleInputChange}
                  placeholder="Enter total marks"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Marks
            </button>
          </form>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Upload Excel Sheet</h2>
          <p className="text-sm text-gray-500">Upload an Excel sheet to bulk import marks</p>
        </div>
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="mb-4 font-medium">Drag & drop your Excel file here or click to browse</p>
            <input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center gap-2"
              onClick={() => document.getElementById("file-upload").click()}
            >
              <Upload size={16} /> Browse Files
            </button>
            {uploadedFile && (
              <div className="mt-4 text-sm text-gray-600">
                <p>File: {uploadedFile.name}</p>
                <button className="mt-2 bg-indigo-100 text-indigo-700 py-1 px-3 rounded-md text-sm inline-flex items-center gap-1 hover:bg-indigo-200">
                  <Check size={14} /> Process File
                </button>
              </div>
            )}
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Upload format examples:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>• For Weekly Tests: Student Name | Reg Number | Class | Section | Course Code | Subject Name | Weekly | Total | Average | Percentage</p>
              <p>• For Monthly Tests: Student Name | Reg Number | Class | Section | Course Code | Subject Name | Monthly | Total | Average | Percentage</p>
              <p>• For Yearly Tests: Student Name | Reg Number | Class | Section | Course Code | Subject Name | Yearly | Total | Average | Percentage</p>
            </div>
            <button className="mt-4 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center gap-2">
              <Download size={16} /> Download Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the student list for teachers
  const renderStudentList = () => (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Student Reports</h2>
          <p className="text-sm text-gray-500">View and manage student marks and reports</p>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center justify-between">
            <div className="flex gap-3 items-center">
              <label htmlFor="class-filter" className="text-sm font-medium text-gray-700">Filter by:</label>
              <select className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-32">
                <option value="class-11">Class 11</option>
                <option value="class-12">Class 12</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-32">
                <option value="section-a">Section A</option>
                <option value="section-b">Section B</option>
              </select>
            </div>
            <input 
              type="search" 
              placeholder="Search by name or reg number..." 
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 max-w-xs"
            />
          </div>
          
          <div className="rounded-md border overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reg Number</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentList.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.regNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.section}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => {
                          setSelectedStudent(student);
                          setSelectedTab("student-dashboard");
                        }}
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the student dashboard view
  const renderStudentDashboard = () => {
    const stats = calculateOverallStats(selectedExam);
    
    return (
      <div className="container mx-auto p-4">
        {/* Student Info Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
            <h1 className="text-white text-2xl font-bold text-center">Student Academic Dashboard</h1>
          </div>
          
          <div className="md:flex p-6">
            {/* Student Basic Info */}
            <div className="md:w-1/4 flex flex-col items-center justify-center mb-4 md:mb-0">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-100 shadow-md bg-gray-200 flex items-center justify-center">
                <User className="h-20 w-20 text-gray-400" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-800">{studentData.name}</h2>
              <p className="text-gray-600">{studentData.regNumber}</p>
              <p className="text-gray-600">Class: {studentData.class} | Section: {studentData.section}</p>
            </div>
            
            {/* Performance Highlights */}
            <div className="md:w-3/4 md:pl-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Performance Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 uppercase">Overall</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {stats.overallPercentage > 90 ? 'Excellent' : stats.overallPercentage > 80 ? 'Very Good' : stats.overallPercentage > 70 ? 'Good' : 'Average'}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600">{stats.overallPercentage}%</p>
                  <div className="mt-2 h-1 w-full bg-gray-200 rounded-full">
                    <div 
                      className="h-1 bg-indigo-500 rounded-full" 
                      style={{ width: `${stats.overallPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase">Class Rank</p>
                  <div className="flex items-end">
                    <p className="text-2xl font-bold text-indigo-600">{studentData.classRank}</p>
                    <p className="text-sm text-gray-500 ml-1 mb-1">/ 60</p>
                  </div>
                  <div className="mt-2 flex items-center">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <p className="text-xs text-gray-500 ml-1">Top 5%</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase">Total Marks</p>
                  <div className="flex items-end">
                    <p className="text-2xl font-bold text-indigo-600">{stats.totalMarks}</p>
                    <p className="text-sm text-gray-500 ml-1 mb-1">/ {stats.totalPossible}</p>
                  </div>
                  <div className="mt-2 flex items-center">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <p className="text-xs text-gray-500 ml-1">{selectedExam.charAt(0).toUpperCase() + selectedExam.slice(1)} Test</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase">Failed Subjects</p>
                  <p className="text-2xl font-bold text-green-600">{stats.failedSubjects}</p>
                  <div className="mt-2 flex items-center">
                    {stats.failedSubjects === 0 ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        <p className="text-xs text-green-600 ml-1">All Passed!</p>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <p className="text-xs text-red-600 ml-1">Needs improvement</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Exam Selection and Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Exam Selection & Performance Chart */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Performance Trend</h3>
                <p className="text-sm text-gray-500">View your performance across different exams</p>
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-600 mr-2">Exam:</label>
                <select 
                  value={selectedExam} 
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-40"
                >
                  <option value="weekly">Weekly Test</option>
                  <option value="monthly">Monthly Test</option>
                  <option value="yearly">Yearly Test</option>
                </select>
              </div>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="exam" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="percentage"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Subject Performance Chart */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-700">Subject Performance</h3>
              <p className="text-sm text-gray-500">Your performance in each subject for {selectedExam.charAt(0).toUpperCase() + selectedExam.slice(1)} Test</p>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={studentMarks[selectedExam]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="marks" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Detailed Marks Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-700">Detailed Marks</h3>
            <p className="text-sm text-gray-500">
              {selectedExam.charAt(0).toUpperCase() + selectedExam.slice(1)} Test Results
            </p>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Code</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentMarks[selectedExam].map((subject, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{subject.code}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{subject.subject}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">{subject.marks}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">{subject.total}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center">
                        <div className="h-2 w-16 bg-gray-200 rounded-full mr-2">
                          <div 
                            className="h-2 bg-indigo-500 rounded-full" 
                            style={{ width: `${subject.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700">{subject.percentage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        subject.marks >= 90 ? "bg-green-100 text-green-800" :
                        subject.marks >= 80 ? "bg-blue-100 text-blue-800" :
                        subject.marks >= 70 ? "bg-yellow-100 text-yellow-800" :
                        subject.marks >= 60 ? "bg-orange-100 text-orange-800" :
                        subject.marks >= 40 ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {getGrade(subject.marks)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={2} className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">Overall</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900 text-center">{stats.totalMarks}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900 text-center">{stats.totalPossible}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900 text-center">{stats.overallPercentage}%</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      Number(stats.overallPercentage) >= 90 ? "bg-green-100 text-green-800" :
                      Number(stats.overallPercentage) >= 80 ? "bg-blue-100 text-blue-800" :
                      Number(stats.overallPercentage) >= 70 ? "bg-yellow-100 text-yellow-800" :
                      Number(stats.overallPercentage) >= 60 ? "bg-orange-100 text-orange-800" :
                      Number(stats.overallPercentage) >= 40 ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {getGrade(Number(stats.overallPercentage))}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        {/* Additional Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Academic Standing Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg overflow-hidden text-white p-6">
            <h3 className="font-bold text-lg mb-2">Academic Standing</h3>
            <p className="text-indigo-100 mb-4">Based on current performance</p>
            <div className="flex items-center mt-2">
              <Award className="h-8 w-8 mr-3" />
              <div>
                <p className="font-bold text-xl">
                  {stats.overallPercentage > 90 ? 'Excellent' : 
                   stats.overallPercentage > 80 ? 'Very Good' : 
                   stats.overallPercentage > 70 ? 'Good' : 
                   stats.overallPercentage > 60 ? 'Satisfactory' : 
                   'Needs Improvement'}
                </p>
                <p className="text-indigo-100 text-sm">
                  {studentData.classRank <= 3 ? 'Top 5% of the class' : 
                   studentData.classRank <= 6 ? 'Top 10% of the class' : 
                   studentData.classRank <= 12 ? 'Top 20% of the class' : 
                   'Average performance'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Upcoming Exams Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-3">Upcoming Exams</h3>
            <ul className="space-y-3">
              {upcomingExams.map((exam, index) => (
                <li key={index} className="flex items-center p-2 border-b">
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    index === 0 ? "bg-red-500" : 
                    index === 1 ? "bg-yellow-500" : 
                    "bg-blue-500"
                  }`}></span>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{exam.name}</p>
                    <p className="text-xs text-gray-500">{exam.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Improvement Areas Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-3">Areas for Improvement</h3>
            <div className="space-y-4">
              {studentMarks[selectedExam]
                .sort((a, b) => a.marks - b.marks)
                .slice(0, 3)
                .map((subject, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-gray-700">{subject.subject}</p>
                      <p className="text-xs text-gray-500">{subject.marks}%</p>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full">
                      <div 
                        className={`h-1 rounded-full ${
                          subject.marks < 40 ? "bg-red-500" :
                          subject.marks < 60 ? "bg-orange-500" :
                          "bg-indigo-500"
                        }`} 
                        style={{ width: `${subject.marks}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {subject.marks < 40 ? "Critical improvement needed" :
                       subject.marks < 60 ? "Needs improvement" :
                       "Good, but can improve further"}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6">
      <div className="container mx-auto">
        {/* Role toggle for demonstration purposes */}
        <div className="flex justify-end mb-4">
          <button 
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm text-sm"
            onClick={toggleRole}
          >
            {userRole === "teacher" ? <User size={14} /> : <BookOpen size={14} />}
            Switch to {userRole === "teacher" ? "Student" : "Teacher"} View
          </button>
        </div>
        
        {userRole === "teacher" ? (
          <div>
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="flex border-b">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    selectedTab === "enter-marks" 
                      ? "border-b-2 border-indigo-500 text-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setSelectedTab("enter-marks")}
                >
                  Enter Marks
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    selectedTab === "student-dashboard" 
                      ? "border-b-2 border-indigo-500 text-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setSelectedTab("student-dashboard")}
                >
                  Student Reports
                </button>
              </div>
            </div>
            
            {selectedTab === "enter-marks" ? renderTeacherMarksEntry() : renderStudentDashboard()}
          </div>
        ) : (
          // Student can only view their dashboard
          renderStudentDashboard()
        )}
      </div>
    </div>
  );
}