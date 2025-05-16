import React, { useState } from 'react';
import { Calendar, Clock, User, Bookmark, Award } from 'lucide-react';

interface AttendanceSummary {
  presentDays: number;
  absentDays: number;
  lateDays: number;
  halfDays: number;
  totalWorkingDays: number;
  percentage: number;
}

interface StudentData {
  name: string;
  class: string;
  rollNo: string;
  admissionNo: string;
  photo: string;
  currentMonthAttendance: AttendanceSummary;
  yearlyAttendance: AttendanceSummary;
}

interface MonthlyAttendance {
  month: string;
  working: number;
  present: number;
  percentage: number;
}

type DailyAttendanceStatus = 'present' | 'absent' | 'late' | 'half-day' | 'holiday' | string;

interface DailyAttendanceRecord {
  date: string;
  day: string;
  status: DailyAttendanceStatus;
}

const StudentAttendanceComponent: React.FC = () => {
  // Sample student data
  const [studentData, setStudentData] = useState<StudentData>({
    name: "Aslam",
    class: "Class 8B",
    rollNo: "14",
    admissionNo: "ADM2023084",
    photo: "/parent2.jpg",
    currentMonthAttendance: {
      presentDays: 18,
      absentDays: 2,
      lateDays: 1,
      halfDays: 1,
      totalWorkingDays: 22,
      percentage: 81.8
    },
    yearlyAttendance: {
      presentDays: 176,
      absentDays: 15,
      lateDays: 8,
      halfDays: 5,
      totalWorkingDays: 204,
      percentage: 86.3
    }
  });

  // Monthly attendance data
  const [monthlyData, setMonthlyData] = useState<MonthlyAttendance[]>([
    { month: "April", working: 22, present: 20, percentage: 90.9 },
    { month: "May", working: 18, present: 16, percentage: 88.9 },
    { month: "June", working: 16, present: 13, percentage: 81.3 },
    { month: "July", working: 22, present: 20, percentage: 90.9 },
    { month: "August", working: 21, present: 17, percentage: 81.0 },
    { month: "September", working: 20, present: 18, percentage: 90.0 },
    { month: "October", working: 18, present: 15, percentage: 83.3 },
    { month: "November", working: 20, present: 17, percentage: 85.0 },
    { month: "December", working: 16, present: 14, percentage: 87.5 },
    { month: "January", working: 20, present: 19, percentage: 95.0 },
    { month: "February", working: 22, present: 18, percentage: 81.8 },
  ]);

  // Daily attendance history for the selected month
  const [selectedMonth, setSelectedMonth] = useState<string>("February");
  const [dailyAttendance, setDailyAttendance] = useState<DailyAttendanceRecord[]>([
    { date: "2025-02-01", day: "Sat", status: "present" },
    { date: "2025-02-02", day: "Sun", status: "holiday" },
    { date: "2025-02-03", day: "Mon", status: "present" },
    { date: "2025-02-04", day: "Tue", status: "present" },
    { date: "2025-02-05", day: "Wed", status: "present" },
    { date: "2025-02-06", day: "Thu", status: "absent" },
    { date: "2025-02-07", day: "Fri", status: "present" },
    { date: "2025-02-08", day: "Sat", status: "present" },
    { date: "2025-02-09", day: "Sun", status: "holiday" },
    { date: "2025-02-10", day: "Mon", status: "present" },
    { date: "2025-02-11", day: "Tue", status: "present" },
    { date: "2025-02-12", day: "Wed", status: "present" },
    { date: "2025-02-13", day: "Thu", status: "half-day" },
    { date: "2025-02-14", day: "Fri", status: "present" },
    { date: "2025-02-15", day: "Sat", status: "present" },
    { date: "2025-02-16", day: "Sun", status: "holiday" },
    { date: "2025-02-17", day: "Mon", status: "present" },
    { date: "2025-02-18", day: "Tue", status: "present" },
    { date: "2025-02-19", day: "Wed", status: "absent" },
    { date: "2025-02-20", day: "Thu", status: "present" },
    { date: "2025-02-21", day: "Fri", status: "late" },
    { date: "2025-02-22", day: "Sat", status: "present" },
    { date: "2025-02-23", day: "Sun", status: "holiday" },
    { date: "2025-02-24", day: "Mon", status: "present" },
    { date: "2025-02-25", day: "Tue", status: "present" },
    { date: "2025-02-26", day: "Wed", status: "present" },
    { date: "2025-02-27", day: "Thu", status: "present" },
    { date: "2025-02-28", day: "Fri", status: "present" },
  ]);

  // Handler for month selection
  const handleMonthSelect = (month: string): void => {
    setSelectedMonth(month);
    // In a real app, you might fetch daily attendance data for the selected month here
  };

  // Function to get status color based on percentage
  const getStatusColor = (percentage: number): { bg: string; text: string; gradient: string } => {
    if (percentage >= 90) return { 
      bg: 'bg-emerald-500', 
      text: 'text-emerald-700',
      gradient: 'from-emerald-400 to-emerald-600'
    };
    if (percentage >= 75) return { 
      bg: 'bg-amber-500', 
      text: 'text-amber-700',
      gradient: 'from-amber-400 to-amber-600'
    };
    return { 
      bg: 'bg-rose-500', 
      text: 'text-rose-700',
      gradient: 'from-rose-400 to-rose-600'
    };
  };

  // Function to get status color for daily attendance
  const getDayStatusColor = (status: DailyAttendanceStatus): string => {
    switch (status) {
      case 'present': return 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white';
      case 'absent': return 'bg-gradient-to-r from-rose-400 to-rose-600 text-white';
      case 'late': return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      case 'half-day': return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
      case 'holiday': return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  // Function to format date for better display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Calculate current month name
  const getCurrentMonth = (): string => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { month: 'long' });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-b from-indigo-50 to-white rounded-xl shadow-xl">
      {/* Student Profile Header */}
      <div className="flex flex-col md:flex-row items-center mb-8 p-6 bg-white rounded-xl shadow-md border border-indigo-100">
        <div className="mr-6 mb-4 md:mb-0 relative">
          <img 
            src={studentData.photo} 
            alt={studentData.name} 
            className="h-24 w-24 rounded-full object-cover border-4 border-indigo-200 shadow-md"
          />
          <div className="absolute bottom-0 right-0 h-6 w-6 bg-emerald-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">{studentData.name}</h1>
          <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-600 gap-2 md:gap-4">
            <div className="flex items-center justify-center md:justify-start">
              <Bookmark size={16} className="text-indigo-500 mr-1" />
              <span>{studentData.class}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <User size={16} className="text-indigo-500 mr-1" />
              <span>Roll No: {studentData.rollNo}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Award size={16} className="text-indigo-500 mr-1" />
              <span>Adm No: {studentData.admissionNo}</span>
            </div>
          </div>
        </div>
        <div className="md:ml-auto mt-4 md:mt-0 bg-indigo-100 rounded-lg px-4 py-2 flex items-center">
          <Calendar size={18} className="text-indigo-600 mr-2" />
          <span className="text-indigo-700 font-medium">Academic Year 2024-25</span>
        </div>
      </div>
      
      {/* Attendance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Current Month Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-indigo-100 transition-all hover:shadow-lg">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Calendar size={20} className="mr-2" />
                {getCurrentMonth()} Attendance
              </h2>
              <div className="bg-white text-indigo-600 rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg shadow-md">
                {studentData.currentMonthAttendance.percentage}%
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-4 rounded-full bg-gradient-to-r ${getStatusColor(studentData.currentMonthAttendance.percentage).gradient}`} 
                  style={{ width: `${studentData.currentMonthAttendance.percentage}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-gradient-to-b from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                <div className="text-green-800 font-bold text-xl">{studentData.currentMonthAttendance.presentDays}</div>
                <div className="text-xs text-green-700 font-medium">Present</div>
              </div>
              <div className="bg-gradient-to-b from-red-50 to-red-100 p-3 rounded-lg border border-red-200">
                <div className="text-red-800 font-bold text-xl">{studentData.currentMonthAttendance.absentDays}</div>
                <div className="text-xs text-red-700 font-medium">Absent</div>
              </div>
              <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 p-3 rounded-lg border border-yellow-200">
                <div className="text-yellow-800 font-bold text-xl">{studentData.currentMonthAttendance.lateDays}</div>
                <div className="text-xs text-yellow-700 font-medium">Late</div>
              </div>
              <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                <div className="text-blue-800 font-bold text-xl">{studentData.currentMonthAttendance.halfDays}</div>
                <div className="text-xs text-blue-700 font-medium">Half Day</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Yearly Attendance Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-indigo-100 transition-all hover:shadow-lg">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Clock size={20} className="mr-2" />
                Yearly Attendance
              </h2>
              <div className="bg-white text-indigo-600 rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg shadow-md">
                {studentData.yearlyAttendance.percentage}%
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-4 rounded-full bg-gradient-to-r ${getStatusColor(studentData.yearlyAttendance.percentage).gradient}`} 
                  style={{ width: `${studentData.yearlyAttendance.percentage}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center mb-3">
              <div className="bg-gradient-to-b from-indigo-50 to-indigo-100 p-3 rounded-lg border border-indigo-200">
                <div className="text-indigo-800 font-bold text-xl">{studentData.yearlyAttendance.totalWorkingDays}</div>
                <div className="text-xs text-indigo-700 font-medium">Working Days</div>
              </div>
              <div className="bg-gradient-to-b from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                <div className="text-green-800 font-bold text-xl">{studentData.yearlyAttendance.presentDays}</div>
                <div className="text-xs text-green-700 font-medium">Days Present</div>
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-medium">
                Academic Year 2024-2025 (April - March)
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Monthly Attendance Table */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Calendar size={20} className="mr-2 text-indigo-600" />
            Monthly Attendance Summary
          </h2>
          <div className="text-sm text-gray-500">
            Showing {monthlyData.length} months
          </div>
        </div>
        <div className="overflow-hidden shadow-md rounded-xl border border-indigo-100">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                <th scope="col" className="py-4 pl-6 pr-3 text-left text-sm font-semibold">Month</th>
                <th scope="col" className="px-3 py-4 text-center text-sm font-semibold">Working Days</th>
                <th scope="col" className="px-3 py-4 text-center text-sm font-semibold">Days Present</th>
                <th scope="col" className="px-3 py-4 text-center text-sm font-semibold">Percentage</th>
                <th scope="col" className="px-3 py-4 text-center text-sm font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {monthlyData.map((month, index) => (
                <tr 
                  key={month.month} 
                  className={`${month.month === selectedMonth ? 'bg-indigo-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
                    transition-colors duration-150 hover:bg-indigo-50`}
                >
                  <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">{month.month}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-center">{month.working}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-center">{month.present}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      getStatusColor(month.percentage).bg === 'bg-emerald-500'
                        ? 'bg-emerald-100 text-emerald-800'
                        : getStatusColor(month.percentage).bg === 'bg-amber-500'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {month.percentage}%
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                    <button 
                      className={`inline-flex items-center px-3 py-1 rounded-md ${
                        month.month === selectedMonth 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                      }`}
                      onClick={() => handleMonthSelect(month.month)}
                    >
                      {month.month === selectedMonth ? 'Viewing' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Daily Attendance History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Clock size={20} className="mr-2 text-indigo-600" />
            Daily Attendance for {selectedMonth}
          </h2>
          <div className="text-sm bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 font-medium">
            {dailyAttendance.filter(day => day.status !== 'holiday').length} School Days
          </div>
        </div>
        
        {/* Calendar View */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-gray-700 py-2 bg-gray-100 rounded-t-lg">
              {day}
            </div>
          ))}
          
          {/* Generate empty slots for days before the 1st of the month */}
          {Array.from({ length: new Date(dailyAttendance[0].date).getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className="h-16 bg-gray-50 rounded-lg"></div>
          ))}
          
          {/* Actual calendar days */}
          {dailyAttendance.map((record) => (
            <div 
              key={record.date} 
              className={`h-16 rounded-lg overflow-hidden border ${
                record.status === 'holiday' 
                  ? 'bg-gray-100 border-gray-200' 
                  : 'bg-white border-gray-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all'
              }`}
            >
              <div className="h-full flex flex-col">
                <div className="text-right text-xs p-1 font-medium text-gray-500">
                  {new Date(record.date).getDate()}
                </div>
                <div className="flex-grow flex items-center justify-center">
                  {record.status !== 'holiday' && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDayStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  )}
                  {record.status === 'holiday' && (
                    <span className="text-xs text-gray-500 font-medium">Holiday</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Detailed List View */}
        <div className="overflow-hidden shadow-md rounded-xl border border-indigo-100">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                <th scope="col" className="py-4 pl-6 pr-3 text-left text-sm font-semibold">Date</th>
                <th scope="col" className="px-3 py-4 text-left text-sm font-semibold">Day</th>
                <th scope="col" className="px-3 py-4 text-center text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {dailyAttendance.map((record, index) => (
                <tr 
                  key={record.date}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
                    transition-colors duration-150 hover:bg-indigo-50 ${record.status === 'holiday' ? 'text-gray-500' : ''}`}
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 text-sm font-medium text-gray-900">
                    {formatDate(record.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-900">{record.day}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-center">
                    <span className={`inline-flex items-center justify-center w-24 px-3 py-1 rounded-full text-xs font-medium ${getDayStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Status Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Status Legend</h3>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-400 to-emerald-600 text-white">
              present
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-rose-400 to-rose-600 text-white">
              absent
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-400 to-amber-600 text-white">
              late
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-400 to-blue-600 text-white">
              half-day
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800">
              holiday
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceComponent;