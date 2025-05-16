"use client";

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

// Define TypeScript interfaces
interface Student {
  name: string;
  section: string;
  class: number;
  standard: string;
  rollNumber?: string; // Added roll number field
}

interface Subject {
  name: string;
  day: string;
  date: string;
}

interface ExamSchedule {
  className: string;
  section: string;
  subjects: Subject[];
}

interface HallTicket {
  student: Student;
  examSchedule: ExamSchedule;
  hallTicketNumber: string;
  examCenter: string;
  photo?: string; // For student photo (optional)
}

export default function HallTicketGenerator() {
  // State management
  const [students, setStudents] = useState<Student[]>([]);
  const [examSchedules, setExamSchedules] = useState<ExamSchedule[]>([]);
  const [hallTickets, setHallTickets] = useState<HallTicket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [examCenters, setExamCenters] = useState<string[]>([
    "Main Building", "Science Block", "Arts Block", "Commerce Block", "Engineering Block"
  ]);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [filteredHallTickets, setFilteredHallTickets] = useState<HallTicket[]>([]);
  
  // Function to handle student data file upload
  const handleStudentFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setLoading(true);
    setMessage("Processing student file...");
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const studentData = XLSX.utils.sheet_to_json(sheet);
        
        // Map the Excel data to our Student interface
        const parsedStudents = studentData.map((row: any, index: number) => ({
          name: row['Student Name'] || row['Name'] || '',
          section: row['Section'] || '',
          class: parseInt(row['Class'] || '0', 10),
          standard: row['Standard'] || '',
          rollNumber: row['Roll Number'] || `R${index + 1000}` // Use provided roll number or generate one
        }));
        
        // Filter out empty rows
        const validStudents = parsedStudents.filter(student => 
          student.name && student.section && student.standard
        );
        
        if (validStudents.length === 0) {
          setMessage("Error: No valid student data found. Please check your Excel format.");
          setLoading(false);
          return;
        }
        
        setStudents(validStudents);
        setMessage(`Successfully loaded ${validStudents.length} students.`);
        setLoading(false);
      } catch (error) {
        console.error("Error processing student file:", error);
        setMessage("Error processing the student file. Please check the format.");
        setLoading(false);
      }
    };
    
    reader.readAsArrayBuffer(file);
  };
  
  // Function to handle exam schedule file upload
  const handleScheduleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setLoading(true);
    setMessage("Processing exam schedule file...");
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Process all sheets (one per class-section)
        const allSchedules: ExamSchedule[] = [];
        
        workbook.SheetNames.forEach(sheetName => {
          const sheet = workbook.Sheets[sheetName];
          const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
          
          // Extract class and section from the first rows if available
          let className = "";
          let section = "";
          
          for (let i = 0; i < Math.min(3, rawData.length); i++) {
            const row = rawData[i] as string[];
            if (row[0] === "Class Name" && row[1]) {
              className = row[1].toString();
            }
            if (row[0] === "Section" && row[1]) {
              section = row[1].toString();
            }
          }
          
          // If class or section not found in header, try to extract from sheet name
          if (!className || !section) {
            const parts = sheetName.split("-");
            if (parts.length >= 2) {
              className = parts[0];
              section = parts[1].replace("Section", "");
            }
          }
          
          // Find the subject data (should be after the headers)
          let subjectStartRow = -1;
          for (let i = 0; i < rawData.length; i++) {
            const row = rawData[i] as string[];
            if (row[0] === "Subject Name" && row[1] === "Day" && row[2] === "Date") {
              subjectStartRow = i + 1;
              break;
            }
          }
          
          if (subjectStartRow !== -1 && className && section) {
            const subjects: Subject[] = [];
            
            for (let i = subjectStartRow; i < rawData.length; i++) {
              const row = rawData[i] as string[];
              if (row[0] && row[1] && row[2]) {
                subjects.push({
                  name: row[0].toString(),
                  day: row[1].toString(),
                  date: row[2].toString()
                });
              }
            }
            
            if (subjects.length > 0) {
              allSchedules.push({
                className,
                section,
                subjects
              });
            }
          }
        });
        
        if (allSchedules.length === 0) {
          setMessage("Error: No valid exam schedules found. Please check your Excel format.");
          setLoading(false);
          return;
        }
        
        setExamSchedules(allSchedules);
        setMessage(`Successfully loaded ${allSchedules.length} exam schedules.`);
        
        // If we have both students and schedules, generate hall tickets
        if (students.length > 0) {
          generateHallTickets(students, allSchedules);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error processing schedule file:", error);
        setMessage("Error processing the exam schedule file. Please check the format.");
        setLoading(false);
      }
    };
    
    reader.readAsArrayBuffer(file);
  };
  
  // Generate hall tickets when both students and schedules are available
  useEffect(() => {
    if (students.length > 0 && examSchedules.length > 0) {
      generateHallTickets(students, examSchedules);
    }
  }, [students, examSchedules]);
  
  // Filter hall tickets when a student is selected
  useEffect(() => {
    if (selectedStudent) {
      const filtered = hallTickets.filter(ticket => ticket.student.name === selectedStudent);
      setFilteredHallTickets(filtered);
    } else {
      setFilteredHallTickets(hallTickets);
    }
  }, [selectedStudent, hallTickets]);
  
  // Generate hall tickets based on students and exam schedules
  const generateHallTickets = (students: Student[], schedules: ExamSchedule[]) => {
    setLoading(true);
    setMessage("Generating hall tickets...");
    
    const tickets: HallTicket[] = [];
    
    students.forEach(student => {
      // Find matching schedule for this student
      const matchingSchedule = schedules.find(
        schedule => schedule.className === student.standard && schedule.section === student.section
      );
      
      if (matchingSchedule) {
        // Assign a random exam center from the list
        const examCenter = examCenters[Math.floor(Math.random() * examCenters.length)];
        
        // Generate a unique hall ticket number
        const hallTicketNumber = `HT${new Date().getFullYear()}-${student.standard}${student.section}-${student.rollNumber || Math.floor(Math.random() * 10000)}`;
        
        tickets.push({
          student,
          examSchedule: matchingSchedule,
          hallTicketNumber,
          examCenter
        });
      }
    });
    
    setHallTickets(tickets);
    setFilteredHallTickets(tickets);
    setMessage(`Successfully generated ${tickets.length} hall tickets.`);
    setLoading(false);
  };
  
  // Export all hall tickets to a single Excel file
  const exportAllHallTickets = () => {
    if (hallTickets.length === 0) {
      setMessage("No hall tickets to export. Please upload student data and exam schedules first.");
      return;
    }
    
    try {
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      
      // Create a sheet with all hall tickets (summary)
      const summaryData = [
        ["Hall Ticket Number", "Student Name", "Roll Number", "Class", "Section", "Exam Center"]
      ];
      
      hallTickets.forEach(ticket => {
        summaryData.push([
          ticket.hallTicketNumber,
          ticket.student.name,
          ticket.student.rollNumber || "",
          ticket.student.standard,
          ticket.student.section,
          ticket.examCenter
        ]);
      });
      
      const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, summaryWs, "All Hall Tickets");
      
      // Create individual sheets for each class-section
      const classSectionMap: Record<string, HallTicket[]> = {};
      
      hallTickets.forEach(ticket => {
        const key = `${ticket.student.standard}-${ticket.student.section}`;
        if (!classSectionMap[key]) {
          classSectionMap[key] = [];
        }
        classSectionMap[key].push(ticket);
      });
      
      // Add class-section specific sheets
      for (const key in classSectionMap) {
        const ticketsForClassSection = classSectionMap[key];
        
        if (ticketsForClassSection.length > 0) {
          const classData = [
            ["Hall Ticket Number", "Student Name", "Roll Number", "Exam Center"]
          ];
          
          ticketsForClassSection.forEach(ticket => {
            classData.push([
              ticket.hallTicketNumber,
              ticket.student.name,
              ticket.student.rollNumber || "",
              ticket.examCenter
            ]);
          });
          
          const classWs = XLSX.utils.aoa_to_sheet(classData);
          XLSX.utils.book_append_sheet(wb, classWs, key);
        }
      }
      
      // Generate Excel file and trigger download
      XLSX.writeFile(wb, `AllHallTickets.xlsx`);
      setMessage("Successfully exported all hall tickets.");
    } catch (error) {
      console.error("Error exporting hall tickets:", error);
      setMessage("An error occurred while exporting the hall tickets.");
    }
  };
  
  // Print an individual hall ticket
  const printHallTicket = (ticket: HallTicket) => {
    // Create a printable version of the hall ticket
    const printContent = document.createElement('div');
    printContent.innerHTML = `
      <div style="font-family: Arial; max-width: 800px; margin: 0 auto; padding: 20px; border: 2px solid #000;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="margin: 0;">EXAMINATION HALL TICKET</h1>
          <h2 style="margin: 10px 0;">${new Date().getFullYear()} Examinations</h2>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div>
            <p><strong>Hall Ticket No:</strong> ${ticket.hallTicketNumber}</p>
            <p><strong>Student Name:</strong> ${ticket.student.name}</p>
            <p><strong>Roll Number:</strong> ${ticket.student.rollNumber || "N/A"}</p>
            <p><strong>Class:</strong> ${ticket.student.standard}</p>
            <p><strong>Section:</strong> ${ticket.student.section}</p>
          </div>
          <div style="border: 1px dashed #000; width: 120px; height: 150px; display: flex; justify-content: center; align-items: center;">
            <p>Student Photo</p>
          </div>
        </div>
        
        <div>
          <p><strong>Exam Center:</strong> ${ticket.examCenter}</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">Subject</th>
              <th style="border: 1px solid #000; padding: 8px;">Date</th>
              <th style="border: 1px solid #000; padding: 8px;">Day</th>
              <th style="border: 1px solid #000; padding: 8px;">Invigilator Sign</th>
            </tr>
          </thead>
          <tbody>
            ${ticket.examSchedule.subjects.map(subject => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${subject.name}</td>
                <td style="border: 1px solid #000; padding: 8px;">${subject.date}</td>
                <td style="border: 1px solid #000; padding: 8px;">${subject.day}</td>
                <td style="border: 1px solid #000; padding: 8px;"></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div style="display: flex; justify-content: space-between; margin-top: 30px;">
          <div style="text-align: center;">
            <div style="border-top: 1px solid #000; padding-top: 5px; width: 150px;">
              Student Signature
            </div>
          </div>
          <div style="text-align: center;">
            <div style="border-top: 1px solid #000; padding-top: 5px; width: 150px;">
              Principal Signature
            </div>
          </div>
        </div>
        
        <div style="margin-top: 30px; border-top: 1px dashed #000; padding-top: 10px;">
          <h3>Instructions:</h3>
          <ol style="padding-left: 20px;">
            <li>Please bring this hall ticket to every examination.</li>
            <li>Arrive at the examination center at least 30 minutes before the exam start time.</li>
            <li>Mobile phones and electronic devices are strictly prohibited in the examination hall.</li>
            <li>Students without a hall ticket will not be allowed to appear for the exam.</li>
            <li>Follow all instructions given by the invigilator.</li>
          </ol>
        </div>
      </div>
    `;
    
    // Open a new window and print
    const printWindow = window.open('', '', 'height=800,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Hall Ticket</title></head><body>');
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      
      // Print after a slight delay to ensure content is loaded
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    } else {
      alert("Please allow pop-ups to print the hall ticket.");
    }
  };
  
  // Export a single hall ticket to a PDF-like format (Excel)
  const exportSingleHallTicket = (ticket: HallTicket) => {
    try {
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      
      // Format the data for Excel
      const hallTicketData = [
        ["EXAMINATION HALL TICKET", "", "", ""],
        [`${new Date().getFullYear()} Examinations`, "", "", ""],
        ["", "", "", ""],
        ["Hall Ticket No:", ticket.hallTicketNumber, "", "PHOTO"],
        ["Student Name:", ticket.student.name, "", ""],
        ["Roll Number:", ticket.student.rollNumber || "N/A", "", ""],
        ["Class:", ticket.student.standard, "", ""],
        ["Section:", ticket.student.section, "", ""],
        ["Exam Center:", ticket.examCenter, "", ""],
        ["", "", "", ""],
        ["Subject", "Date", "Day", "Invigilator Sign"]
      ];
      
      // Add subject data
      ticket.examSchedule.subjects.forEach(subject => {
        hallTicketData.push([subject.name, subject.date, subject.day, ""]);
      });
      
      // Add signature lines
      hallTicketData.push(
        ["", "", "", ""],
        ["", "", "", ""],
        ["Student Signature", "", "Principal Signature", ""],
        ["", "", "", ""],
        ["Instructions:", "", "", ""],
        ["1. Please bring this hall ticket to every examination.", "", "", ""],
        ["2. Arrive at the examination center at least 30 minutes before the exam start time.", "", "", ""],
        ["3. Mobile phones and electronic devices are strictly prohibited in the examination hall.", "", "", ""],
        ["4. Students without a hall ticket will not be allowed to appear for the exam.", "", "", ""],
        ["5. Follow all instructions given by the invigilator.", "", "", ""]
      );
      
      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet(hallTicketData);
      
      // Add some styling (merge cells for title)
      ws['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }, // Title
        { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } }, // Subtitle
      ];
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, "Hall Ticket");
      
      // Generate Excel file and trigger download
      XLSX.writeFile(wb, `HallTicket-${ticket.student.name}.xlsx`);
    } catch (error) {
      console.error("Error exporting single hall ticket:", error);
      setMessage("An error occurred while exporting the hall ticket.");
    }
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Hall Ticket Generator</h1>
      
      {/* File Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Upload Student Data</h2>
          <input 
            type="file" 
            accept=".xlsx,.xls,.csv" 
            onChange={handleStudentFileUpload}
            disabled={loading}
            className="block w-full mb-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-sm text-gray-600">
            Upload an Excel file containing student data (name, section, class, standard, roll number).
          </p>
        </div>
        
        <div className="p-6 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Upload Exam Schedules</h2>
          <input 
            type="file" 
            accept=".xlsx,.xls" 
            onChange={handleScheduleFileUpload}
            disabled={loading}
            className="block w-full mb-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-sm text-gray-600">
            Upload the exam schedule Excel file generated from the Timetable Generator.
          </p>
        </div>
      </div>
      
      {/* Status Messages */}
      {loading && (
        <div className="mb-6 p-4 rounded-lg bg-blue-50 text-blue-700">
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>{message}</p>
          </div>
        </div>
      )}
      
      {message && !loading && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}
      
      {/* Export All Button */}
      {hallTickets.length > 0 && (
        <div className="mb-8 flex justify-between items-center">
          <button 
            onClick={exportAllHallTickets}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium ${
              loading 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            Export All Hall Tickets
          </button>
          
          {/* Student Filter */}
          <div className="flex items-center">
            <label htmlFor="studentFilter" className="mr-2">Filter by Student:</label>
            <select
              id="studentFilter"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="border rounded-lg p-2"
            >
              <option value="">All Students</option>
              {students.map((student, idx) => (
                <option key={idx} value={student.name}>{student.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      
      {/* Hall Tickets Display */}
      {filteredHallTickets.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Generated Hall Tickets</h2>
          <div className="grid grid-cols-1 gap-6">
            {filteredHallTickets.map((ticket, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{ticket.student.name}</h3>
                    <p className="text-gray-600">Hall Ticket: {ticket.hallTicketNumber}</p>
                    <p className="text-gray-600">Class: {ticket.student.standard}, Section: {ticket.student.section}</p>
                    <p className="text-gray-600">Roll Number: {ticket.student.rollNumber || "N/A"}</p>
                    <p className="text-gray-600">Exam Center: {ticket.examCenter}</p>
                  </div>
                  <div className="border border-dashed p-4 w-32 h-40 flex items-center justify-center">
                    <span className="text-gray-400">Photo</span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 text-left border font-medium">Subject</th>
                        <th className="p-2 text-left border font-medium">Date</th>
                        <th className="p-2 text-left border font-medium">Day</th>
                        <th className="p-2 text-left border font-medium">Invigilator</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ticket.examSchedule.subjects.map((subject, sIdx) => (
                        <tr key={sIdx}>
                          <td className="p-2 border">{subject.name}</td>
                          <td className="p-2 border">{subject.date}</td>
                          <td className="p-2 border">{subject.day}</td>
                          <td className="p-2 border"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-start gap-4">
                  <button 
                    onClick={() => printHallTicket(ticket)} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Print Hall Ticket
                  </button>
                  
                  <button 
                    onClick={() => exportSingleHallTicket(ticket)} 
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Export as Excel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div className="p-6 border rounded-lg bg-yellow-50">
        <h2 className="text-xl font-semibold mb-3 text-yellow-800">How to Use</h2>
        <ol className="list-decimal list-inside text-yellow-700 space-y-2 pl-4">
          <li>Upload student data using the first file input (name, section, class, standard, roll number).</li>
          <li>Upload exam schedules from the Timetable Generator using the second file input.</li>
          <li>Hall tickets will be automatically generated and displayed below.</li>
          <li>Use the filter dropdown to find a specific student's hall ticket.</li>
          <li>Click "Print Hall Ticket" to print an individual hall ticket.</li>
          <li>Click "Export as Excel" to download a single hall ticket in Excel format.</li>
          <li>Click "Export All Hall Tickets" to download all hall tickets as a single Excel file.</li>
        </ol>
        <p className="mt-4 text-yellow-700">
          <strong>Note:</strong> This component works best when used with the Genetic Algorithm Exam Timetable Generator.
        </p>
      </div>
    </div>
  );
}