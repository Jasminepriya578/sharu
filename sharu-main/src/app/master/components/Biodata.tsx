"use client";
import React, { useState } from "react";


const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const studentData = {
    name: "Mohamed Aslam.K",
    gender: "M",
    dob: "22/05/2004",
    admissionNumber: "17958",
    rollNumber: "21BAD051",
    registerNumber: "951720219034",
    aadharNumber: "810490190306",
    applicationNumber: "25666",
    applicationDate: "09/10/2021",
    emisNo: "9000461043",
    admissionDate: "13/10/2021",
    class: "12",
    program: "Computer Science",
    section: "A",
    batch: "2021-2025",
    quota: "GQ",
    yearOfAdmission: "2021",
    fatherName: "Kathar Hussain A (Phone Number - 7373294577)",
    motherName: "Rabiyathum Alifisha (Phone Number - 9951235737)",
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
    mobile: "9952235737",
    landline: "-",
    bankDetails: {
      accountNo: "093100982012356",
      accountType: "Savings",
      bankName: "Tamilnad Mercantile Bank Limited",
      branch: "SIMMAKKAL, MADURAI",
      ifsc: "TMBL0000093",
    },
    hostelDetails: {
      hostellerType: "Day Scholar",
      hostelName: "NA",
      roomDetails: "NA",
    },
    academicQualification: {
      qualification: "HSC",
      school: "KVT Mat.Hr.Sec.School",
      marks: {
        tamil: 94.12,
        science: 92.91,
        social: 93.77,
        maths: 91.67,
        english: 89.9,
        total: "458.71 / 500.0",
      },
    },
    academicPerformance: {
      percentage: "93.12",
      cutoff: "185.11 / 200.00",
      rank: "3 / 60",
      credits: "146.5 / 162.00",
    },
    imageUrl: "/parent2.jpg", // Replace with actual image URL
  };

  // Group student profile data into sections for better organization
  const personalInfo = {
    "Student Name": studentData.name,
    "Date of Birth": studentData.dob,
    Gender: studentData.gender,
    "Blood Group": studentData.bloodGroup,
    Nationality: studentData.nationality,
    Religion: studentData.religion,
    Community: studentData.community,
    Caste: studentData.caste,
  };

  const academicInfo = {
    "Roll Number": studentData.rollNumber,
    "Register Number": studentData.registerNumber,
    "Admission Number": studentData.admissionNumber,
    Program: studentData.program,
    Class: studentData.class,
    Section: studentData.section,
    Batch: studentData.batch,
    "Year of Admission": studentData.yearOfAdmission,
    "Admission Date": studentData.admissionDate,
    Quota: studentData.quota,
    "Advisor Name": studentData.advisorName,
  };

  const contactInfo = {
    "Father's Name": studentData.fatherName,
    "Mother's Name": studentData.motherName,
    "Mobile Number": studentData.mobile,
    "Landline Number": studentData.landline,
    Address: studentData.address,
    City: studentData.city,
    District: studentData.district,
    Pincode: studentData.pincode,
    State: studentData.state,
    Country: studentData.country,
  };

  const hostelInfo = {
    "Hosteller Type": studentData.hostelDetails.hostellerType,
    "Hostel Name": studentData.hostelDetails.hostelName,
    "Room Details": studentData.hostelDetails.roomDetails,
  };

  // Custom field rendering function
  const renderFields = (fields) => {
    return Object.entries(fields).map(([key, value]) => (
      <div key={key} className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-100">
        <dt className="text-sm font-medium text-gray-600">{key}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{value}</dd>
      </div>
    ));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with student name and image */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">{studentData.name}</h1>
            <p className="text-blue-100">
              {studentData.program} - {studentData.batch}
            </p>
          </div>
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={studentData.imageUrl}
                alt={studentData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-green-500 px-2 py-1 rounded-full text-xs text-white font-semibold">
              Active
            </div>
          </div>
        </div>

        {/* Academic Performance Highlights */}
        <div className="bg-indigo-50 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <p className="text-xs text-gray-500 uppercase">Percentage</p>
              <p className="text-2xl font-bold text-indigo-600">{studentData.academicPerformance.percentage}%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <p className="text-xs text-gray-500 uppercase">Cutoff</p>
              <p className="text-2xl font-bold text-indigo-600">{studentData.academicPerformance.cutoff.split('/')[0]}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <p className="text-xs text-gray-500 uppercase">Rank</p>
              <p className="text-2xl font-bold text-indigo-600">{studentData.academicPerformance.rank.split('/')[0]}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <p className="text-xs text-gray-500 uppercase">Credits</p>
              <p className="text-2xl font-bold text-indigo-600">{studentData.academicPerformance.credits.split('/')[0]}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: "profile", label: "Student Profile" },
              { id: "academic", label: "Academic Performance" },
              { id: "disciplinary", label: "Disciplinary Record" },
              { id: "scholarship", label: "Scholarship" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="px-4 py-6">
          {activeTab === "profile" && (
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  <span className="border-b-2 border-indigo-500 pb-2">Personal Information</span>
                </h3>
                <dl className="bg-gray-50 rounded-lg overflow-hidden divide-y divide-gray-100">
                  {renderFields(personalInfo)}
                </dl>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  <span className="border-b-2 border-indigo-500 pb-2">Academic Information</span>
                </h3>
                <dl className="bg-gray-50 rounded-lg overflow-hidden divide-y divide-gray-100">
                  {renderFields(academicInfo)}
                </dl>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  <span className="border-b-2 border-indigo-500 pb-2">Contact Information</span>
                </h3>
                <dl className="bg-gray-50 rounded-lg overflow-hidden divide-y divide-gray-100">
                  {renderFields(contactInfo)}
                </dl>
              </div>

              

              {/* Hostel Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  <span className="border-b-2 border-indigo-500 pb-2">Hostel Information</span>
                </h3>
                <dl className="bg-gray-50 rounded-lg overflow-hidden divide-y divide-gray-100">
                  {renderFields(hostelInfo)}
                </dl>
              </div>
            </div>
          )}

          {activeTab === "academic" && (
            <div className="space-y-8">
              {/* Academic Qualifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  <span className="border-b-2 border-indigo-500 pb-2">Academic Qualification</span>
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Qualification</p>
                      <p className="text-lg font-semibold">{studentData.academicQualification.qualification}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">School</p>
                      <p className="text-lg font-semibold">{studentData.academicQualification.school}</p>
                    </div>
                  </div>
                  
                  {/* Marks Chart */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Subject-wise Marks</h4>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {Object.keys(studentData.academicQualification.marks).map((subject) => (
                              <th
                                key={subject}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {subject}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            {Object.entries(studentData.academicQualification.marks).map(([subject, mark]) => (
                              <td key={subject} className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-2 w-16 bg-gray-200 rounded-full mr-2">
                                    <div
                                      className="h-2 bg-indigo-500 rounded-full"
                                      style={{ 
                                        width: subject === "total" 
                                          ? `${(parseFloat(mark.split('/')[0]) / parseFloat(mark.split('/')[1])) * 100}%` 
                                          : `${mark}%` 
                                      }}
                                    ></div>
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {mark}
                                  </div>
                                </div>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Performance */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  <span className="border-b-2 border-indigo-500 pb-2">Academic Performance</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(studentData.academicPerformance).map(([key, value]) => (
                    <div key={key} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-gray-500 uppercase text-xs">{key.replace(/([A-Z])/g, " $1")}</p>
                      <div className="flex items-end mt-2">
                        <p className="text-2xl font-bold text-gray-800">{value.split("/")[0]}</p>
                        {value.includes("/") && (
                          <p className="text-gray-500 ml-1 mb-1">/ {value.split("/")[1]}</p>
                        )}
                      </div>
                      <div className="mt-4 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-indigo-500 rounded-full"
                          style={{
                            width: value.includes("/")
                              ? `${(parseFloat(value.split("/")[0]) / parseFloat(value.split("/")[1])) * 100}%`
                              : `${parseFloat(value)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "disciplinary" && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-green-100 text-green-800 p-4 rounded-lg flex items-center">
                <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <p className="font-semibold">Good Standing</p>
                  <p className="text-sm">No disciplinary actions recorded.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "scholarship" && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Scholarship Information</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Scholarship details will be displayed here once they become available.
                </p>
                <button className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Apply for Scholarship
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;