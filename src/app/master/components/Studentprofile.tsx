// StudentList.tsx
"use client";
import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  ChevronRight,
  Edit,
  Save,
  X,
  Trash2,
  Plus
} from "lucide-react";

const StudentList = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    standard: "",
    section: "",
    program: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    id: 0,
    name: "",
    gender: "M",
    dob: "",
    admissionNumber: "",
    rollNumber: "",
    registerNumber: "",
    applicationNumber: "",
    applicationDate: "",
    emisNo: "",
    admissionDate: "",
    class: "",
    program: "",
    section: "",
    batch: "2021-2025",
    quota: "GQ",
    yearOfAdmission: "2021",
    fatherName: "",
    fatherPhone: "",
    motherName: "",
    motherPhone: "",
    advisorName: "",
    community: "",
    caste: "",
    religion: "",
    nationality: "Indian",
    bloodGroup: "",
    address: "",
    city: "",
    district: "",
    pincode: "",
    state: "",
    country: "India",
    mobile: "",
    landline: "-",
    email: "",
    imageUrl: "/placeholder.jpg",
    status: "Active",
  });

  // Sample data for multiple students
  const [studentsData, setStudentsData] = useState([
    {
      id: 1,
      name: "Mohamed Aslam.K",
      gender: "M",
      dob: "22/05/2004",
      admissionNumber: "17958",
      rollNumber: "21BAD051",
      registerNumber: "951720219034",
      applicationNumber: "25666",
      applicationDate: "09/10/2021",
      emisNo: "90461043",
      admissionDate: "13/10/2021",
      class: "12",
      program: "Computer Science",
      section: "A",
      batch: "2021-2025",
      quota: "GQ",
      yearOfAdmission: "2021",
      fatherName: "Kathar Hussain A",
      fatherPhone: "73734577",
      motherName: " Alifisha",
      motherPhone: "99535737",
      advisorName: "Dr.P.Thendral, Asso. Professor/AIDS",
      community: "BCM",
      caste: "Lebbai",
      religion: "Muslim",
      nationality: "Indian",
      bloodGroup: "O+",
      address: "143, Jeevanagar 1st street, Jaihindpuram, (Home)",
      city: "Madurai",
      district: "Madurai",
      pincode: "625011",
      state: "Tamil Nadu",
      country: "India",
      mobile: "99235737",
      landline: "-",
      email: "aslam.k@example.com",
      imageUrl: "/parent2.jpg",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      gender: "M",
      dob: "15/08/2003",
      admissionNumber: "17959",
      rollNumber: "21BAD052",
      registerNumber: "951720219035",
      applicationNumber: "25667",
      applicationDate: "10/10/2021",
      emisNo: "90461044",
      admissionDate: "13/10/2021",
      class: "12",
      program: "Computer Science",
      section: "A",
      batch: "2021-2025",
      quota: "GQ",
      yearOfAdmission: "2021",
      fatherName: "Vijay Sharma",
      fatherPhone: "98765432",
      motherName: "Priya Sharma",
      motherPhone: "87654321",
      advisorName: "Dr. Rajesh Kumar, Asso. Professor/AIDS",
      community: "FC",
      caste: "Brahmin",
      religion: "Hindu",
      nationality: "Indian",
      bloodGroup: "A+",
      address: "45, Gandhi Nagar, Anna Salai",
      city: "Chennai",
      district: "Chennai",
      pincode: "600001",
      state: "Tamil Nadu",
      country: "India",
      mobile: "98765432",
      landline: "-",
      email: "rahul.s@example.com",
      imageUrl: "/parent1.jpg",
      status: "Active",
    },
    {
      id: 3,
      name: "Priya Patel",
      gender: "F",
      dob: "03/12/2004",
      admissionNumber: "17960",
      rollNumber: "21BAD053",
      registerNumber: "951720219036",
      applicationNumber: "25668",
      applicationDate: "08/10/2021",
      emisNo: "90461045",
      admissionDate: "14/10/2021",
      class: "11",
      program: "Biology",
      section: "B",
      batch: "2021-2025",
      quota: "MQ",
      yearOfAdmission: "2021",
      fatherName: "Rajesh Patel",
      fatherPhone: "88776655",
      motherName: "Meena Patel",
      motherPhone: "99887766",
      advisorName: "Dr. Anitha S, Asso. Professor/Biology",
      community: "OC",
      caste: "Patel",
      religion: "Hindu",
      nationality: "Indian",
      bloodGroup: "B+",
      address: "22, Lake View Road, T. Nagar",
      city: "Chennai",
      district: "Chennai",
      pincode: "600017",
      state: "Tamil Nadu",
      country: "India",
      mobile: "77889900",
      landline: "-",
      email: "priya.p@example.com",
      imageUrl: "/parent3.jpg",
      status: "Active",
    },
    {
      id: 4,
      name: "John Michael",
      gender: "M",
      dob: "10/02/2004",
      admissionNumber: "17961",
      rollNumber: "21BAD054",
      registerNumber: "951720219037",
      applicationNumber: "25669",
      applicationDate: "07/10/2021",
      emisNo: "90461046",
      admissionDate: "12/10/2021",
      class: "11",
      program: "Physics",
      section: "C",
      batch: "2021-2025",
      quota: "GQ",
      yearOfAdmission: "2021",
      fatherName: "David Michael",
      fatherPhone: "66778899",
      motherName: "Susan Michael",
      motherPhone: "55667788",
      advisorName: "Dr. Robert J, Asso. Professor/Physics",
      community: "BCM",
      caste: "Christian",
      religion: "Christian",
      nationality: "Indian",
      bloodGroup: "AB+",
      address: "78, Church Street, Nungambakkam",
      city: "Chennai",
      district: "Chennai",
      pincode: "600034",
      state: "Tamil Nadu",
      country: "India",
      mobile: "90908080",
      landline: "-",
      email: "john.m@example.com",
      imageUrl: "/parent4.jpg",
      status: "Active",
    },
    {
      id: 5,
      name: "Fatima Begum",
      gender: "F",
      dob: "25/09/2003",
      admissionNumber: "17962",
      rollNumber: "21BAD055",
      registerNumber: "951720219038",
      applicationNumber: "25670",
      applicationDate: "05/10/2021",
      emisNo: "90461047",
      admissionDate: "11/10/2021",
      class: "12",
      program: "Chemistry",
      section: "B",
      batch: "2021-2025",
      quota: "MQ",
      yearOfAdmission: "2021",
      fatherName: "Abdul Rahman",
      fatherPhone: "99001122",
      motherName: "Ayesha Begum",
      motherPhone: "88990011",
      advisorName: "Dr. Farid Khan, Asso. Professor/Chemistry",
      community: "BCM",
      caste: "Muslim",
      religion: "Muslim",
      nationality: "Indian",
      bloodGroup: "O-",
      address: "112, Mosque Street, Triplicane",
      city: "Chennai",
      district: "Chennai",
      pincode: "600005",
      state: "Tamil Nadu",
      country: "India",
      mobile: "77665544",
      landline: "-",
      email: "fatima.b@example.com",
      imageUrl: "/parent5.jpg",
      status: "Inactive",
    }
  ]);

  // Get unique values for filters
  const getUniqueValues = (key) => {
    return [...new Set(studentsData.map(student => student[key]))];
  };

  // Filter students based on search and filters
  const filteredStudents = studentsData.filter(student => {
    // Search query filter
    const searchMatch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      student.id.toString().includes(searchQuery);
    
    // Apply additional filters
    const classMatch = filters.standard ? student.class === filters.standard : true;
    const sectionMatch = filters.section ? student.section === filters.section : true;
    const programMatch = filters.program ? student.program === filters.program : true;
    
    return searchMatch && classMatch && sectionMatch && programMatch;
  });

  // Handle selecting a student
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setEditMode(false);
    setEditedStudent(null);
  };

  // Handle back button click
  const handleBack = () => {
    setSelectedStudent(null);
    setEditMode(false);
    setEditedStudent(null);
    setIsAddingStudent(false);
  };

  // Handle edit mode
  const handleEditMode = () => {
    setEditMode(true);
    setEditedStudent({...selectedStudent});
  };

  // Handle save changes
  const handleSaveChanges = () => {
    // Update the student data
    const updatedStudents = studentsData.map(student => 
      student.id === editedStudent.id ? editedStudent : student
    );
    
    setStudentsData(updatedStudents);
    setSelectedStudent(editedStudent);
    setEditMode(false);
    
    // Show success notification
    alert("Student profile updated successfully!");
  };

  // Handle input change for edited student
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent({
      ...editedStudent,
      [name]: value
    });
  };

  // Handle new student input change
  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value
    });
  };

  // Handle adding new student
  const handleAddStudent = () => {
    setIsAddingStudent(true);
    setSelectedStudent(null);
    setEditMode(false);
  };

  // Handle saving new student
  const handleSaveNewStudent = () => {
    // Generate a new ID (in a real app, this would come from the backend)
    const newId = Math.max(...studentsData.map(student => student.id)) + 1;
    
    const studentWithId = {
      ...newStudent,
      id: newId
    };
    
    // Add new student to the data
    setStudentsData([...studentsData, studentWithId]);
    
    // Reset states
    setNewStudent({
      id: 0,
      name: "",
      gender: "M",
      dob: "",
      admissionNumber: "",
      rollNumber: "",
      registerNumber: "",
      applicationNumber: "",
      applicationDate: "",
      emisNo: "",
      admissionDate: "",
      class: "",
      program: "",
      section: "",
      batch: "2021-2025",
      quota: "GQ",
      yearOfAdmission: "2021",
      fatherName: "",
      fatherPhone: "",
      motherName: "",
      motherPhone: "",
      advisorName: "",
      community: "",
      caste: "",
      religion: "",
      nationality: "Indian",
      bloodGroup: "",
      address: "",
      city: "",
      district: "",
      pincode: "",
      state: "",
      country: "India",
      mobile: "",
      landline: "-",
      email: "",
      imageUrl: "/placeholder.jpg",
      status: "Active",
    });
    setIsAddingStudent(false);
    
    // Show success notification
    alert("New student added successfully!");
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedStudent(null);
  };

  // Handle delete student
  const handleDeleteStudent = (student) => {
    setStudentToDelete(student);
    setDeleteConfirmation(true);
  };

  // Confirm delete student
  const confirmDeleteStudent = () => {
    if (!studentToDelete) return;
    
    // Remove student from data
    const updatedStudents = studentsData.filter(student => student.id !== studentToDelete.id);
    setStudentsData(updatedStudents);
    
    // Reset states
    setDeleteConfirmation(false);
    setStudentToDelete(null);
    setSelectedStudent(null);
    
    // Show success notification
    alert("Student deleted successfully!");
  };

  // Cancel delete confirmation
  const cancelDeleteConfirmation = () => {
    setDeleteConfirmation(false);
    setStudentToDelete(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {deleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
              <p className="mb-6">
                Are you sure you want to delete {studentToDelete?.name}? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDeleteConfirmation}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteStudent}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      
        {selectedStudent ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6">
            {/* Back button */}
            <button 
              onClick={handleBack} 
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ChevronRight className="rotate-180 mr-1" size={16} />
              Back to Student List
            </button>

            {/* Student Profile Header */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {editMode ? "Edit Student Profile" : "Student Profile"}
              </h2>
              <div className="flex space-x-2">
                {!editMode ? (
                  <>
                    <button
                      onClick={handleEditMode}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit size={16} className="mr-2" />
                      Edit Profile
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(selectedStudent)}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </button>
                  </>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveChanges}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      <X size={16} className="mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Student Profile Content */}
            {editMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editedStudent.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={editedStudent.gender}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="text"
                      name="dob"
                      value={editedStudent.dob}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                    <input
                      type="text"
                      name="bloodGroup"
                      value={editedStudent.bloodGroup}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      value={editedStudent.nationality}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                {/* Academic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Academic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admission Number</label>
                    <input
                      type="text"
                      name="admissionNumber"
                      value={editedStudent.admissionNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={editedStudent.rollNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                    <input
                      type="text"
                      name="class"
                      value={editedStudent.class}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                    <input
                      type="text"
                      name="section"
                      value={editedStudent.section}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                    <input
                      type="text"
                      name="program"
                      value={editedStudent.program}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Contact Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      value={editedStudent.mobile}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editedStudent.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      value={editedStudent.address}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={3}
                    />
                  </div>
                </div>
                
                {/* Family Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Family Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                    <input
                      type="text"
                      name="fatherName"
                      value={editedStudent.fatherName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Father's Phone</label>
                    <input
                      type="text"
                      name="fatherPhone"
                      value={editedStudent.fatherPhone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                    <input
                      type="text"
                      name="motherName"
                      value={editedStudent.motherName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Phone</label>
                    <input
                      type="text"
                      name="motherPhone"
                      value={editedStudent.motherPhone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student image and basic info */}
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full bg-gray-200 mb-4 overflow-hidden">
                    <img 
                      src={selectedStudent.imageUrl || "/placeholder.jpg"} 
                      alt={selectedStudent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                  <p className="text-gray-600">ID: {selectedStudent.id}</p>
                  <p className="text-gray-600">Roll No: {selectedStudent.rollNumber}</p>
                  <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {selectedStudent.status}
                  </div>
                </div>
                
                {/* Student details */}
                <div className="grid grid-cols-1 gap-6">
                  {/* Academic information */}
                  <div className="border p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-lg mb-3 border-b pb-2">Academic Information</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-sm text-gray-600">Class:</span>
                        <p className="font-medium">{selectedStudent.class}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Section:</span>
                        <p className="font-medium">{selectedStudent.section}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Program:</span>
                        <p className="font-medium">{selectedStudent.program}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Batch:</span>
                        <p className="font-medium">{selectedStudent.batch}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Admission No:</span>
                        <p className="font-medium">{selectedStudent.admissionNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Register No:</span>
                        <p className="font-medium">{selectedStudent.registerNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Personal information */}
                <div className="border p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-3 border-b pb-2">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-sm text-gray-600">Gender:</span>
                      <p className="font-medium">{selectedStudent.gender === 'M' ? 'Male' : selectedStudent.gender === 'F' ? 'Female' : 'Other'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Date of Birth:</span>
                      <p className="font-medium">{selectedStudent.dob}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Religion:</span>
                      <p className="font-medium">{selectedStudent.religion}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Nationality:</span>
                      <p className="font-medium">{selectedStudent.nationality}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Community:</span>
                      <p className="font-medium">{selectedStudent.community}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Blood Group:</span>
                      <p className="font-medium">{selectedStudent.bloodGroup}</p>
                    </div>
                  </div>
                </div>
                
                {/* Contact information */}
                <div className="border p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-3 border-b pb-2">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-sm text-gray-600">Mobile:</span>
                      <p className="font-medium">{selectedStudent.mobile}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Email:</span>
                      <p className="font-medium">{selectedStudent.email}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-gray-600">Address:</span>
                      <p className="font-medium">{selectedStudent.address}</p>
                      <p className="font-medium">{selectedStudent.city}, {selectedStudent.state}, {selectedStudent.pincode}</p>
                    </div>
                  </div>
                </div>
                
                {/* Family information */}
                <div className="border p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-3 border-b pb-2">Family Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-sm text-gray-600">Father's Name:</span>
                      <p className="font-medium">{selectedStudent.fatherName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Father's Phone:</span>
                      <p className="font-medium">{selectedStudent.fatherPhone}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Mother's Name:</span>
                      <p className="font-medium">{selectedStudent.motherName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Mother's Phone:</span>
                      <p className="font-medium">{selectedStudent.motherPhone}</p>
                    </div>
                  </div>
                </div>
                
                {/* Additional information */}
                <div className="border p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-3 border-b pb-2">Additional Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-sm text-gray-600">Advisor:</span>
                      <p className="font-medium">{selectedStudent.advisorName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Year of Admission:</span>
                      <p className="font-medium">{selectedStudent.yearOfAdmission}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Quota:</span>
                      <p className="font-medium">{selectedStudent.quota}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">EMIS No:</span>
                      <p className="font-medium">{selectedStudent.emisNo}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Page Header */}
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Student Management</h1>
                <p className="text-gray-600">View, search and manage student information</p>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="relative w-full md:w-1/3 mb-3 md:mb-0">
                  <input
                    type="text"
                    placeholder="Search by name, ID or roll number"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-all duration-200"
                >
                  <Filter size={16} className="mr-2" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Class Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                      <select 
                        value={filters.standard} 
                        onChange={e => setFilters({...filters, standard: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">All Classes</option>
                        {getUniqueValues("class").map(value => (
                          <option key={value} value={value}>Class {value}</option>
                        ))}
                      </select>
                    </div>

                    {/* Section Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                      <select 
                        value={filters.section} 
                        onChange={e => setFilters({...filters, section: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">All Sections</option>
                        {getUniqueValues("section").map(value => (
                          <option key={value} value={value}>Section {value}</option>
                        ))}
                      </select>
                    </div>

                    {/* Program Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                      <select 
                        value={filters.program} 
                        onChange={e => setFilters({...filters, program: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">All Programs</option>
                        {getUniqueValues("program").map(value => (
                          <option key={value} value={value}>{value}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Student Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Section
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map(student => (
                      <tr 
                        key={student.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleSelectStudent(student)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                              <img 
                                src={student.imageUrl || "/placeholder.jpg"} 
                                alt={student.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.rollNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.section}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.program}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectStudent(student);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        No students found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentList;