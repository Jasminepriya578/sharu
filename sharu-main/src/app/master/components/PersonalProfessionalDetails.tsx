"use client";
import React, { useState } from "react";
import { 
  User, 
  BookOpen, 
  Briefcase, 
  Building, 
  UsersRound, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Home, 
  Bookmark, 
  UserPlus, 
  Heart, 
  GraduationCap, 
  Award, 
  FileText, 
  Edit, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";

const PersonalProfessionalDetails = () => {
  // State to manage expanded/collapsed sections
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    family: true,
    academic: true,
    address: true,
    bank: true,
    health: true,
    documents: true
  });

  // Toggle section visibility
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Student data object
  const studentData = {
    // Personal Information
    personal: {
      name: "Mohamed Aslam.K",
      gender: "Male",
      dob: "22/05/2004",
      age: "20",
      bloodGroup: "O+",
      religion: "Muslim",
      community: "BCM",
      nationality: "Indian",
      motherTongue: "Tamil",
      languagesKnown: "Tamil, English, Hindi",
      identificationMarks: "Mole on right cheek",
      hobbies: "Reading, Cricket, Chess",
      skills: "Programming, Public Speaking",
    },
    
    // Family Information
    family: {
      fatherName: "Kathar Hussain A",
      fatherOccupation: "Business",
      fatherEducation: "B.Com",
      fatherIncome: "₹650,000 per annum",
      fatherPhone: "123456789",
      fatherEmail: "katharhussain@example.com",
      
      motherName: "Rabiyathum Alifisha",
      motherOccupation: "Homemaker",
      motherEducation: "B.A.",
      motherIncome: "-",
      motherPhone: "123456789",
      motherEmail: "rabiyathum@example.com",
      
      guardianName: "Kathar Hussain A",
      guardianRelation: "Father",
      guardianPhone: "123456789",
      guardianEmail: "katharhussain@example.com",
      
      siblings: [
        {
          name: "Abdullah K",
          age: "17",
          education: "12th Standard",
          occupation: "Student"
        }
      ]
    },
    
    // Academic Information
    academic: {
      currentEducation: {
        institution: "Queen Mira",
        program: "12",
        rollNumber: "21BAD051",
        registerNumber: "951720219034",
        admissionNumber: "17958",
        yearOfAdmission: "2021",
        admissionDate: "13/10/2021",
        quota: "GQ",
        emisNo: "9000461043",
        advisorName: "Dr.P.Thendral, Asso. Professor/AIDS",
      },
      previousEducation: [
        {
          level: "Secondary (10th)",
          institution: "KVT Mat.Hr.Sec.School",
          board: "Tamil Nadu State Board",
          yearOfPassing: "2019",
          percentage: "95.8%",
          subjects: "All subjects"
        }
      ],
      achievements: [
        "School topper in 10th standard examinations",
        "District level chess championship winner (2018)",
        "Participated in National Science Olympiad (2019)",
        "Best outgoing student award in school (2021)"
      ]
    },
    
    // Address Information
    address: {
      permanent: {
        doorNo: "143",
        street: "Jeevanagar 1st street",
        area: "Jaihindpuram",
        city: "Madurai",
        district: "Madurai",
        state: "Tamil Nadu",
        pincode: "625011",
        country: "India"
      },
      correspondence: {
        doorNo: "143",
        street: "Jeevanagar 1st street",
        area: "Jaihindpuram",
        city: "Madurai",
        district: "Madurai",
        state: "Tamil Nadu",
        pincode: "625011",
        country: "India"
      },
      hostel: {
        hostellerType: "Day Scholar",
        hostelName: "N/A",
        roomNumber: "N/A",
        blockName: "N/A"
      }
    },
    
    // Bank Details
    bank: {
      accountNumber: "092356",
      accountType: "Savings",
      bankName: "Tamilnad Mercantile Bank Limited",
      branch: "SIMMAKKAL, MADURAI",
      ifscCode: "T093",
      micrCode: "62001",
      accountHolderName: "Mohamed Aslam K"
    },
    
    // Health Information
    health: {
      height: "175 cm",
      weight: "68 kg",
      bloodGroup: "O+",
      allergies: "None",
      chronicConditions: "None",
      emergencyContact: {
        name: "Kathar Hussain A",
        relation: "Father",
        phone: "7373294577"
      },
      vaccinationDetails: [
        {
          name: "COVID-19",
          date: "15/05/2022",
          dose: "2nd Dose"
        }
      ]
    },
    
    // Contact Information
    contact: {
      mobile: "9952235737",
      email: "aslam.k@example.com",
      landline: "-",
      alternatePhone: "7373294577",
      personalEmail: "aslam.personal@example.com"
    },
    
    // Document Information
    documents: [
      { name: "Aadhar Card", uploaded: true, verificationStatus: "Verified" },
      { name: "10th Certificate", uploaded: true, verificationStatus: "Verified" },
      { name: "Transfer Certificate", uploaded: true, verificationStatus: "Verified" },
      { name: "Community Certificate", uploaded: true, verificationStatus: "Pending" },
      { name: "Income Certificate", uploaded: false, verificationStatus: "Not Uploaded" },
      { name: "Medical Certificate", uploaded: true, verificationStatus: "Verified" },
      { name: "Passport Size Photos", uploaded: true, verificationStatus: "Verified" }
    ]
  };

  // Helper function to format field names
  const formatFieldName = (key) => {
    return key.replace(/([A-Z])/g, ' $1').trim().charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').trim().slice(1);
  };

  // Section rendering components with enhanced styling
  const SectionHeader = ({ icon: Icon, title, section, hasToggle = true }) => (
    <div className="flex justify-between items-center mb-5 border-b pb-3">
      <h2 className="text-xl font-semibold flex items-center text-gray-800">
        <Icon className="mr-3 text-blue-600" size={22} /> {title}
      </h2>
      {hasToggle && (
        <button 
          onClick={() => toggleSection(section)} 
          className="text-gray-500 hover:bg-gray-100 rounded-full p-1 transition-colors duration-200"
          aria-label={expandedSections[section] ? "Collapse section" : "Expand section"}
        >
          {expandedSections[section] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      )}
    </div>
  );

  const DataField = ({ label, value }) => (
    <div className="flex flex-col mb-4">
      <span className="text-sm text-gray-500 mb-1">{label}</span>
      <span className="font-medium text-gray-800">{value || "-"}</span>
    </div>
  );

  const SectionCard = ({ children, className = "" }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 ease-in-out">
      {children}
    </div>
  );

  const Badge = ({ text, color = "blue" }) => {
    const colorClasses = {
      blue: "bg-blue-100 text-blue-800",
      green: "bg-green-100 text-green-800",
      purple: "bg-purple-100 text-purple-800",
      red: "bg-red-100 text-red-800",
      yellow: "bg-yellow-100 text-yellow-800",
      gray: "bg-gray-100 text-gray-800"
    };
    
    return (
      <span className={`px-3 py-1 ${colorClasses[color]} rounded-full text-sm font-medium`}>
        {text}
      </span>
    );
  };

  // Section rendering functions with enhanced aesthetic components
  const renderPersonalInfo = () => (
    <SectionCard>
      <SectionHeader icon={User} title="Personal Information" section="personal" />
      
      {expandedSections.personal && (
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(studentData.personal).map(([key, value]) => (
            <DataField key={key} label={formatFieldName(key)} value={value} />
          ))}
        </div>
      )}
    </SectionCard>
  );
  
  const renderFamilyInfo = () => (
    <SectionCard>
      <SectionHeader icon={UsersRound} title="Family Information" section="family" />
      
      {expandedSections.family && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700 border-l-4 border-blue-500 pl-3">Father's Details</h3>
            <div className="grid md:grid-cols-2 gap-5 pl-2">
              {['fatherName', 'fatherOccupation', 'fatherEducation', 'fatherIncome', 'fatherPhone', 'fatherEmail'].map(key => (
                <DataField 
                  key={key} 
                  label={formatFieldName(key.replace('father', ''))} 
                  value={studentData.family[key]} 
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700 border-l-4 border-pink-500 pl-3">Mother's Details</h3>
            <div className="grid md:grid-cols-2 gap-5 pl-2">
              {['motherName', 'motherOccupation', 'motherEducation', 'motherIncome', 'motherPhone', 'motherEmail'].map(key => (
                <DataField 
                  key={key} 
                  label={formatFieldName(key.replace('mother', ''))} 
                  value={studentData.family[key]} 
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700 border-l-4 border-green-500 pl-3">Guardian's Details</h3>
            <div className="grid md:grid-cols-2 gap-5 pl-2">
              {['guardianName', 'guardianRelation', 'guardianPhone', 'guardianEmail'].map(key => (
                <DataField 
                  key={key} 
                  label={formatFieldName(key.replace('guardian', ''))} 
                  value={studentData.family[key]} 
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700 border-l-4 border-purple-500 pl-3">Siblings</h3>
            <div className="space-y-4 pl-2">
              {studentData.family.siblings.map((sibling, index) => (
                <div key={index} className="p-4 border rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <h4 className="font-medium text-gray-800 mb-3">{sibling.name} ({sibling.age})</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <DataField label="Education" value={sibling.education} />
                    <DataField label="Occupation" value={sibling.occupation} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
  
  const renderAcademicInfo = () => (
    <SectionCard>
      <SectionHeader icon={BookOpen} title="Academic Information" section="academic" />
      
      {expandedSections.academic && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700 border-l-4 border-blue-500 pl-3">Current Education</h3>
            <div className="grid md:grid-cols-2 gap-5 pl-2">
              {Object.entries(studentData.academic.currentEducation).map(([key, value]) => (
                <DataField key={key} label={formatFieldName(key)} value={value} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700 border-l-4 border-green-500 pl-3">Previous Education</h3>
            <div className="space-y-4 pl-2">
              {studentData.academic.previousEducation.map((edu, index) => (
                <div key={index} className="p-4 border rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <h4 className="font-medium text-gray-800 mb-3">{edu.level} - {edu.institution}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(edu)
                      .filter(([key]) => key !== 'level' && key !== 'institution')
                      .map(([key, value]) => (
                        <DataField key={key} label={formatFieldName(key)} value={value} />
                      ))
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700 border-l-4 border-yellow-500 pl-3">Achievements</h3>
            <ul className="list-disc pl-8 space-y-2">
              {studentData.academic.achievements.map((achievement, index) => (
                <li key={index} className="text-gray-700">{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </SectionCard>
  );
  
  const renderAddressInfo = () => (
    <SectionCard>
      <SectionHeader icon={MapPin} title="Address Information" section="address" />
      
      {expandedSections.address && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700 border-l-4 border-blue-500 pl-3">Permanent Address</h3>
            <div className="grid md:grid-cols-2 gap-5 pl-2">
              {Object.entries(studentData.address.permanent).map(([key, value]) => (
                <DataField key={key} label={formatFieldName(key)} value={value} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700 border-l-4 border-green-500 pl-3">Correspondence Address</h3>
            <div className="grid md:grid-cols-2 gap-5 pl-2">
              {Object.entries(studentData.address.correspondence).map(([key, value]) => (
                <DataField key={key} label={formatFieldName(key)} value={value} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700 border-l-4 border-purple-500 pl-3">Hostel Details</h3>
            <div className="grid md:grid-cols-2 gap-5 pl-2">
              {Object.entries(studentData.address.hostel).map(([key, value]) => (
                <DataField key={key} label={formatFieldName(key)} value={value} />
              ))}
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
  
  const renderBankInfo = () => (
    <SectionCard>
      <SectionHeader icon={CreditCard} title="Bank Details" section="bank" />
      
      {expandedSections.bank && (
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(studentData.bank).map(([key, value]) => (
            <DataField key={key} label={formatFieldName(key)} value={value} />
          ))}
        </div>
      )}
    </SectionCard>
  );
  
  const renderHealthInfo = () => (
    <SectionCard>
      <SectionHeader icon={Heart} title="Health Information" section="health" />
      
      {expandedSections.health && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(studentData.health)
              .filter(([key]) => key !== 'emergencyContact' && key !== 'vaccinationDetails')
              .map(([key, value]) => (
                <DataField key={key} label={formatFieldName(key)} value={value} />
              ))}
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700 border-l-4 border-red-500 pl-3">Emergency Contact</h3>
            <div className="grid md:grid-cols-3 gap-5 pl-2">
              {Object.entries(studentData.health.emergencyContact).map(([key, value]) => (
                <DataField key={key} label={formatFieldName(key)} value={value} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700 border-l-4 border-blue-500 pl-3">Vaccination Details</h3>
            <div className="space-y-4 pl-2">
              {studentData.health.vaccinationDetails.map((vac, index) => (
                <div key={index} className="p-4 border rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <div className="grid md:grid-cols-3 gap-4">
                    <DataField label="Vaccine" value={vac.name} />
                    <DataField label="Date" value={vac.date} />
                    <DataField label="Dose" value={vac.dose} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
  
  const renderDocumentsInfo = () => (
    <SectionCard>
      <SectionHeader icon={FileText} title="Documents" section="documents" />
      
      {expandedSections.documents && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Document Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Verification
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentData.documents.map((doc, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap border-r">
                    <div className="font-medium text-gray-900">{doc.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${doc.uploaded ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {doc.uploaded ? 'Uploaded' : 'Not Uploaded'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      doc.verificationStatus === 'Verified' ? 'bg-green-100 text-green-800' : 
                      doc.verificationStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {doc.verificationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {doc.uploaded ? (
                      <div className="flex space-x-3">
                        <button className="text-blue-600 hover:text-blue-900 font-medium">View</button>
                        <button className="text-red-600 hover:text-red-900 font-medium">Delete</button>
                      </div>
                    ) : (
                      <button className="text-green-600 hover:text-green-900 font-medium">Upload</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
  
  const renderContactInfo = () => (
    <SectionCard>
      <SectionHeader icon={Phone} title="Contact Information" section="contact" hasToggle={false} />
      
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(studentData.contact).map(([key, value]) => (
          <DataField key={key} label={formatFieldName(key)} value={value} />
        ))}
      </div>
    </SectionCard>
  );
  
  return (
    <div className="container mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Student Profile</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
        <img 
                  src={studentData.imageUrl} 
                  alt={studentData.name} 
                  className="w-full h-full object-cover"
                />
              
              </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{studentData.personal.name}</h2>
            <p className="text-gray-600 text-lg mb-1">{studentData.academic.currentEducation.program}</p>
            <p className="text-gray-500 mb-3">{studentData.academic.currentEducation.institution}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge text={`Roll No: ${studentData.academic.currentEducation.rollNumber}`} color="blue" />
              <Badge text={`Batch: ${studentData.academic.currentEducation.batch || 'N/A'}`} color="green" />
              <Badge text={`Class: ${studentData.academic.currentEducation.class || 'N/A'}`} color="purple" />
            </div>
          </div>
          <div className="md:ml-auto mt-4 md:mt-0">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-md transition-colors duration-200">
              <Edit size={18} /> Edit Profile
            </button>
          </div>
        </div>
      </div>
      
      {renderPersonalInfo()}
      {renderContactInfo()}
      {renderFamilyInfo()}
      {renderAcademicInfo()}
      {renderAddressInfo()}
      {renderBankInfo()}
      {renderHealthInfo()}
      {renderDocumentsInfo()}
    </div>
  );
};

export default PersonalProfessionalDetails;