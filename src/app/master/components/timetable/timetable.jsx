import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';

export default function Timetable() {
  // Define state variables
  const [timetableData, setTimetableData] = useState([]);
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [availableSections, setAvailableSections] = useState([]);
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [userRole, setUserRole] = useState("student"); // "student", "teacher", or "admin"
  const [rawExcelData, setRawExcelData] = useState([]);
  const [showRawData, setShowRawData] = useState(false);

  // Define days and time slots
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    { startTime: "9:00", endTime: "9:45" },
    { startTime: "9:50", endTime: "10:35" },
    { startTime: "10:40", endTime: "11:25" },
    { startTime: "11:40", endTime: "12:25" },
    { startTime: "12:30", endTime: "13:15" },
    { startTime: "14:00", endTime: "14:45" },
    { startTime: "14:50", endTime: "15:35" }
  ];

  // Subject colors mapping
  const subjectColors = {
    "Mathematics": "bg-blue-100",
    "English": "bg-green-100",
    "Science": "bg-yellow-100",
    "History": "bg-purple-100",
    "Computer Science": "bg-pink-100",
    "Physical Education": "bg-orange-100",
    "Chemistry": "bg-red-100",
    "Physics": "bg-indigo-100",
    "Biology": "bg-teal-100",
    "Geography": "bg-emerald-100",
    "Arts": "bg-lime-100",
    "Music": "bg-amber-100",
    "Foreign Language": "bg-cyan-100"
  };

  // Load timetable data and user preferences from localStorage on component mount
  useEffect(() => {
    loadTimetableData();
    loadUserRole();

    // Show animation after initial load
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Effect to update available sections when standard changes or timetable data updates
  useEffect(() => {
    if (selectedStandard) {
      const sections = getAvailableSectionsForStandard(selectedStandard);
      setAvailableSections(sections);
      
      // If current section is not available in the new standard, select the first one
      if (sections.length > 0 && !sections.includes(selectedSection)) {
        setSelectedSection(sections[0]);
        localStorage.setItem("selectedSection", sections[0]);
      }
    }
  }, [selectedStandard, timetableData]);

  // Effect to update available teachers when timetable data updates
  useEffect(() => {
    const teachers = getAvailableTeachers();
    setAvailableTeachers(teachers);
    
    // Set default teacher if none selected
    if (teachers.length > 0 && (!selectedTeacher || !teachers.includes(selectedTeacher))) {
      setSelectedTeacher(teachers[0]);
      localStorage.setItem("selectedTeacher", teachers[0]);
    }
  }, [timetableData]);

  // Load user role from localStorage
  const loadUserRole = () => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
  };

  // Handle role change
  const handleRoleChange = (role) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);
    
    // Add animation effect on role change
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Load timetable data
  const loadTimetableData = () => {
    const storedTimetable = localStorage.getItem("timetableData");
    const storedRawData = localStorage.getItem("rawExcelData");
    
    if (storedRawData) {
      try {
        setRawExcelData(JSON.parse(storedRawData));
      } catch (error) {
        console.error("Error loading raw excel data:", error);
      }
    }
    
    if (storedTimetable) {
      try {
        const allData = JSON.parse(storedTimetable);
        setTimetableData(allData);
        
        // Get available standards from data
        const standards = getAvailableStandards(allData);
        
        // Load saved preferences
        const storedStandard = localStorage.getItem("selectedStandard");
        const storedSection = localStorage.getItem("selectedSection");
        const storedTeacher = localStorage.getItem("selectedTeacher");
        
        // Set standard (either from storage or default to first available)
        if (storedStandard && standards.includes(storedStandard)) {
          setSelectedStandard(storedStandard);
        } else if (standards.length > 0) {
          setSelectedStandard(standards[0]);
          localStorage.setItem("selectedStandard", standards[0]);
        }
        
        // Section will be set by the useEffect after standard is set
        if (storedSection) {
          setSelectedSection(storedSection);
        }
        
        // Set teacher if stored
        if (storedTeacher) {
          setSelectedTeacher(storedTeacher);
        }
      } catch (error) {
        console.error("Error loading timetable data:", error);
      }
    }
  };

  // Extract available standards from data
  const getAvailableStandards = (data) => {
    const standardsMap = {};
    
    data.forEach(entry => {
      if (entry.standard) {
        standardsMap[entry.standard] = true;
      }
    });
    
    return Object.keys(standardsMap).sort((a, b) => {
      // Try to sort numerically if possible
      const numA = parseInt(a);
      const numB = parseInt(b);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      // Otherwise, sort alphabetically
      return a.localeCompare(b);
    });
  };

  // Extract available sections for a given standard
  const getAvailableSectionsForStandard = (standard) => {
    const sectionsMap = {};
    
    timetableData.forEach(entry => {
      if (entry.standard === standard && entry.section) {
        sectionsMap[entry.section] = true;
      }
    });
    
    return Object.keys(sectionsMap).sort();
  };

  // Extract available teachers from data
  const getAvailableTeachers = () => {
    const teachersMap = {};
    
    timetableData.forEach(entry => {
      if (entry.teacher) {
        teachersMap[entry.teacher] = true;
      }
    });
    
    return Object.keys(teachersMap).sort();
  };

  // Handle standard change
  const handleStandardChange = (standard) => {
    setSelectedStandard(standard);
    localStorage.setItem("selectedStandard", standard);
    
    // Add animation effect on standard change
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Handle section change
  const handleSectionChange = (section) => {
    setSelectedSection(section);
    localStorage.setItem("selectedSection", section);
    
    // Add animation effect on section change
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Handle teacher change
  const handleTeacherChange = (teacher) => {
    setSelectedTeacher(teacher);
    localStorage.setItem("selectedTeacher", teacher);
    
    // Add animation effect on teacher change
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Get the color for a subject
  const getSubjectColor = (subjectName) => {
    return subjectColors[subjectName] || "bg-gray-100";
  };

  // Get entry for a specific day, period, standard and section (for student view)
  const getEntryForStudentView = (day, periodIndex) => {
    return timetableData.find(entry => 
      entry.day === day && 
      entry.periodIndex === periodIndex && 
      entry.standard === selectedStandard &&
      entry.section === selectedSection
    );
  };

  // Get entry for a specific day and period for a teacher (for teacher view)
  const getEntryForTeacherView = (day, periodIndex) => {
    return timetableData.find(entry => 
      entry.day === day && 
      entry.periodIndex === periodIndex && 
      entry.teacher === selectedTeacher
    );
  };

  // Process Excel file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus("Reading file...");

    const reader = new FileReader();
    
    reader.onload = (evt) => {
      try {
        const data = evt.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        setUploadStatus("Processing data...");
        
        const timetableEntries = [];
        const rawData = [];
        
        // Process each sheet
        workbook.SheetNames.forEach(sheetName => {
          // Get the worksheet
          const worksheet = workbook.Sheets[sheetName];
          
          // Convert to JSON
          const sheetData = XLSX.utils.sheet_to_json(worksheet);
          
          // Store raw data
          rawData.push(...sheetData);
          
          // Process the data with the new structure
          sheetData.forEach(row => {
            // Check if the row has the expected structure
            if (row["Lecture ID"] && row["Lecture Name"] && row["Lecture Subject"] && row["Classes Taught"]) {
              // Parse Classes Taught to extract standard and section
              const classInfo = row["Classes Taught"].toString().trim();
              
              if (classInfo) {
                // Extract standard (numeric part) and section (alphabetic part)
                const standardMatch = classInfo.match(/^\d+/);
                const sectionMatch = classInfo.match(/[a-zA-Z]+$/);
                
                if (standardMatch && sectionMatch) {
                  const standard = standardMatch[0];
                  const section = sectionMatch[0].toLowerCase();
                  const teacher = row["Teacher"] ? row["Teacher"].toString().trim() : "Unassigned";
                  
                  // For this example, we'll assign lectures to periods based on a simple pattern
                  days.forEach((day, dayIndex) => {
                    // Assign this lecture to a specific period based on its ID
                    const lectureIdNum = parseInt(row["Lecture ID"].toString().replace(/\D/g, ''));
                    const periodIndex = (lectureIdNum + dayIndex) % timeSlots.length;
                    
                    timetableEntries.push({
                      day: day,
                      periodIndex: periodIndex,
                      subject: row["Lecture Subject"],
                      room: `Room ${100 + parseInt(lectureIdNum)}`, // Placeholder room number
                      lectureId: row["Lecture ID"],
                      lectureName: row["Lecture Name"],
                      standard: standard,
                      section: section,
                      teacher: teacher
                    });
                  });
                }
              }
            }
          });
        });
        
        // Update state and save to localStorage
        setTimetableData(timetableEntries);
        localStorage.setItem("timetableData", JSON.stringify(timetableEntries));
        
        // Store raw data
        setRawExcelData(rawData);
        localStorage.setItem("rawExcelData", JSON.stringify(rawData));
        
        setUploadStatus("Upload successful!");
        setTimeout(() => {
          setShowUploadModal(false);
          setUploadStatus(null);
          setIsUploading(false);
        }, 1500);
        
      } catch (error) {
        console.error("Error processing Excel file:", error);
        setUploadStatus("Error: " + error.message);
        setIsUploading(false);
      }
    };
    
    reader.onerror = () => {
      setUploadStatus("Error reading file");
      setIsUploading(false);
    };
    
    reader.readAsBinaryString(file);
  };

  // Handle download of sample Excel template
  const handleDownloadTemplate = () => {
    // Create a template workbook
    const wb = XLSX.utils.book_new();
    
    // Sample data matching the required structure
    const sampleData = [
      { "Lecture ID": "L0001", "Lecture Name": "Cellular Biology", "Lecture Subject": "Science", "Classes Taught": "7a", "Teacher": "Dr. Smith" },
      { "Lecture ID": "L0002", "Lecture Name": "Algebra Fundamentals", "Lecture Subject": "Mathematics", "Classes Taught": "7a", "Teacher": "Ms. Johnson" },
      { "Lecture ID": "L0003", "Lecture Name": "Literary Analysis", "Lecture Subject": "English", "Classes Taught": "7a", "Teacher": "Mr. Brown" },
      { "Lecture ID": "L0004", "Lecture Name": "Chemistry Basics", "Lecture Subject": "Chemistry", "Classes Taught": "8b", "Teacher": "Dr. Adams" },
      { "Lecture ID": "L0005", "Lecture Name": "World History", "Lecture Subject": "History", "Classes Taught": "8b", "Teacher": "Mrs. Wilson" },
      { "Lecture ID": "L0006", "Lecture Name": "Computer Programming", "Lecture Subject": "Computer Science", "Classes Taught": "9c", "Teacher": "Mr. Davis" }
    ];
    
    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(sampleData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Lectures");
    
    // Generate Excel file
    XLSX.writeFile(wb, "timetable_template.xlsx");
  };

  // Get all unique subjects from the timetable data for the current standard and section
  const getCurrentClassSubjects = () => {
    const filteredData = timetableData.filter(
      entry => entry.standard === selectedStandard && entry.section === selectedSection
    );
    const uniqueSubjects = [...new Set(filteredData.map(entry => entry.subject))];
    return uniqueSubjects;
  };

  // Get all unique subjects taught by the selected teacher
  const getTeacherSubjects = () => {
    const filteredData = timetableData.filter(
      entry => entry.teacher === selectedTeacher
    );
    const uniqueSubjects = [...new Set(filteredData.map(entry => entry.subject))];
    return uniqueSubjects;
  };

  // Get all unique classes taught by the selected teacher
  const getTeacherClasses = () => {
    const filteredData = timetableData.filter(
      entry => entry.teacher === selectedTeacher
    );
    const classesMap = {};
    
    filteredData.forEach(entry => {
      const classKey = `${entry.standard}-${entry.section.toUpperCase()}`;
      classesMap[classKey] = true;
    });
    
    return Object.keys(classesMap).sort();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4 md:mb-0 animate-slide-in-left">
            {userRole === "teacher" ? "Teacher Timetable" : userRole === "admin" ? "Admin Timetable Management" : "Student Timetable"}
          </h1>
          <div className="flex space-x-2">
            {userRole === "admin" && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-colors animate-slide-in-right flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                Upload Timetable
              </button>
            )}
            {userRole === "admin" && (
              <button
                onClick={() => setShowRawData(!showRawData)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-colors animate-slide-in-right flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                </svg>
                {showRawData ? 'Hide Raw Data' : 'Show Raw Data'}
              </button>
            )}
          </div>
        </div>

        {/* Raw Excel Data Table (Admin View) */}
        {userRole === "admin" && showRawData && rawExcelData.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 overflow-x-auto animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Excel Data</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lecture ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lecture Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lecture Subject</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes Taught</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rawExcelData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row["Lecture ID"]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row["Lecture Name"]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubjectColor(row["Lecture Subject"])}`}>
                        {row["Lecture Subject"]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row["Classes Taught"]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row["Teacher"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Role Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Select Role</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleRoleChange("student")}
              className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                userRole === "student" 
                  ? "bg-indigo-600 text-white shadow-md" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Student
              </div>
            </button>
            <button
              onClick={() => handleRoleChange("teacher")}
              className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                userRole === "teacher" 
                  ? "bg-indigo-600 text-white shadow-md" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Teacher
              </div>
            </button>
            <button
              onClick={() => handleRoleChange("admin")}
              className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                userRole === "admin" 
                  ? "bg-indigo-600 text-white shadow-md" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Admin
              </div>
            </button>
          </div>
        </div>

        {/* Selection Controls - Different based on role */}
        {userRole === "student" && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Standard Selection */}
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Select Standard</h2>
                <div className="flex flex-wrap gap-2">
                  {getAvailableStandards(timetableData).map((standard) => (
                    <button
                      key={standard}
                      onClick={() => handleStandardChange(standard)}
                      className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                        selectedStandard === standard 
                          ? "bg-indigo-600 text-white shadow-md" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {standard}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Section Selection */}
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Select Section</h2>
                <div className="flex flex-wrap gap-2">
                  {availableSections.map((section) => (
                    <button
                      key={section}
                      onClick={() => handleSectionChange(section)}
                      className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                        selectedSection === section 
                          ? "bg-indigo-600 text-white shadow-md" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {section.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {userRole === "teacher" && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Select Teacher</h2>
            <div className="flex flex-wrap gap-2">
              {availableTeachers.map((teacher) => (
                <button
                  key={teacher}
                  onClick={() => handleTeacherChange(teacher)}
                  className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                    selectedTeacher === teacher 
                      ? "bg-indigo-600 text-white shadow-md" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {teacher}
                </button>
              ))}
            </div>
          </div>
        )}

        {userRole === "admin" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Standard/Section Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
              <div className="space-y-4">
                {/* Standard Selection */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-3">Select Standard</h2>
                  <div className="flex flex-wrap gap-2">
                    {getAvailableStandards(timetableData).map((standard) => (
                      <button
                        key={standard}
                        key={standard}
                        onClick={() => handleStandardChange(standard)}
                        className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                          selectedStandard === standard 
                            ? "bg-indigo-600 text-white shadow-md" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {standard}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Section Selection */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-3">Select Section</h2>
                  <div className="flex flex-wrap gap-2">
                    {availableSections.map((section) => (
                      <button
                        key={section}
                        onClick={() => handleSectionChange(section)}
                        className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                          selectedSection === section 
                            ? "bg-indigo-600 text-white shadow-md" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {section.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Teacher Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Select Teacher</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {availableTeachers.map((teacher) => (
                  <button
                    key={teacher}
                    onClick={() => handleTeacherChange(teacher)}
                    className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                      selectedTeacher === teacher 
                        ? "bg-indigo-600 text-white shadow-md" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {teacher}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        {userRole === "student" && selectedStandard && selectedSection && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Class Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-in-left">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Class Information</h3>
              <p className="text-gray-600">Standard: <span className="font-medium text-indigo-600">{selectedStandard}</span></p>
              <p className="text-gray-600">Section: <span className="font-medium text-indigo-600">{selectedSection.toUpperCase()}</span></p>
            </div>
            
            {/* Subjects Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {getCurrentClassSubjects().map((subject, index) => (
                  <span 
                    key={index} 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubjectColor(subject)}`}
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Total Periods Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Weekly Periods</h3>
              <p className="text-3xl font-bold text-indigo-600">
                {timetableData.filter(entry => 
                  entry.standard === selectedStandard && 
                  entry.section === selectedSection
                ).length}
              </p>
            </div>
          </div>
        )}

        {userRole === "teacher" && selectedTeacher && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Teacher Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-in-left">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Teacher Information</h3>
              <p className="text-gray-600">Name: <span className="font-medium text-indigo-600">{selectedTeacher}</span></p>
            </div>
            
            {/* Subjects Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Subjects Taught</h3>
              <div className="flex flex-wrap gap-2">
                {getTeacherSubjects().map((subject, index) => (
                  <span 
                    key={index} 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubjectColor(subject)}`}
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Classes Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Classes Taught</h3>
              <div className="flex flex-wrap gap-2">
                {getTeacherClasses().map((classInfo, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {classInfo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Timetable Display */}
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${isLoading ? 'animate-pulse' : 'animate-fade-in'}`}>
          {/* Main timetable */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Time</th>
                  {days.map(day => (
                    <th key={day} className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeSlot, periodIndex) => (
                  <tr key={periodIndex} className={periodIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900 border-r border-b border-gray-200">
                      {timeSlot.startTime} - {timeSlot.endTime}
                    </td>
                    {days.map(day => {
                      // Get the appropriate entry based on user role
                      const entry = userRole === "teacher" 
                        ? getEntryForTeacherView(day, periodIndex)
                        : getEntryForStudentView(day, periodIndex);
                      
                      return (
                        <td key={day} className="py-3 px-6 text-sm border-r border-b border-gray-200">
                          {entry ? (
                            <div className={`p-2 rounded ${getSubjectColor(entry.subject)}`}>
                              <div className="font-medium text-gray-900">{entry.subject}</div>
                              <div className="text-xs text-gray-600">{entry.lectureName}</div>
                              {userRole === "student" && (
                                <div className="text-xs text-gray-500">Teacher: {entry.teacher}</div>
                              )}
                              {userRole === "teacher" && (
                                <div className="text-xs text-gray-500">
                                  Class: {entry.standard}-{entry.section.toUpperCase()}
                                </div>
                              )}
                              <div className="text-xs text-gray-500">Room: {entry.room}</div>
                            </div>
                          ) : (
                            <div className="text-center text-xs text-gray-400">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-slide-up">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Upload Timetable Data
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Upload an Excel file with the timetable data. The Excel file should have the following columns:
                        </p>
                        <ul className="mt-2 list-disc list-inside text-sm text-gray-500">
                          <li>Lecture ID</li>
                          <li>Lecture Name</li>
                          <li>Lecture Subject</li>
                          <li>Classes Taught (e.g., "7a" for Standard 7, Section A)</li>
                          <li>Teacher</li>
                        </ul>
                        <div className="mt-4">
                          <button
                            onClick={handleDownloadTemplate}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                            Download Template
                          </button>
                        </div>
                        {uploadStatus && (
                          <div className={`mt-4 p-2 rounded-md ${
                            uploadStatus.startsWith("Error") 
                              ? "bg-red-50 text-red-800"
                              : "bg-blue-50 text-blue-800"
                          }`}>
                            <p className="text-sm">{uploadStatus}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <label className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      className="sr-only"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                    {isUploading ? 'Uploading...' : 'Select Excel File'}
                  </label>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Data Placeholder */}
        {timetableData.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center animate-fade-in">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No timetable data available</h3>
            <p className="mt-2 text-sm text-gray-500">
              {userRole === "admin" 
                ? "Please upload an Excel file with timetable data."
                : "Please contact your administrator to upload the timetable data."}
            </p>
            {userRole === "admin" && (
              <div className="mt-6">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  Upload Timetable
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm animate-fade-in">
          <p>School Timetable Management System © {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}