"use client"; 

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, Book, Phone, Mail, Home, Calendar, FileText, Upload, CheckCircle, Download, Printer } from 'lucide-react';

const AdmissionFormPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const formRef = useRef(null);

  const totalSteps = 2; // Reduced to 2 steps only

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Application submitted successfully!");
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print(); // Most browsers will show a save as PDF option
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center">
      {/* Navigation Bar - Only visible when not printing */}
      
      {/* Main Content with padding top to account for fixed navbar */}
      <div className="w-full max-w-4xl mx-auto pt-24 px-4 pb-16 print:pt-8">
        {/* Form Header with Progress Indicator and Print/Download buttons */}
        <div className="mb-8 text-center relative">
          <div className="flex justify-between items-center mb-4 print:hidden">
            <h1 className="text-3xl font-bold text-blue-900">
              Application Form for Admission
            </h1>
            <div className="flex space-x-2">
              <button 
                onClick={handlePrint}
                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition"
              >
                <Printer size={18} /> Print
              </button>
              <button 
                onClick={handleDownload}
                className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg transition"
              >
                <Download size={18} /> Download
              </button>
            </div>
          </div>
          
          {/* Print-only header */}
          <div className="hidden print:block text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-900">
              School Admission Application Form
            </h1>
            <p className="text-gray-600 mt-2">Reference ID: APP-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}</p>
          </div>
          
          {/* Progress Bar - Hide when printing */}
          <div className="w-full max-w-md mx-auto print:hidden">
            <div className="flex justify-between mb-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col items-center ${i+1 <= step ? 'text-blue-700' : 'text-gray-400'}`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                      i+1 < step ? 'bg-green-500 text-white' : i+1 === step ? 'bg-blue-600 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {i+1 < step ? <CheckCircle size={16} /> : i+1}
                  </div>
                  <span className="text-xs font-medium hidden sm:block">
                    {i === 0 ? 'Student Details' : 'Parent Details'}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Step 1: Student Details */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600 animate-fadeIn print:shadow-none print:border-none">
              <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                <User className="mr-2" size={24} /> Student Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Upload Student Photo *</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 print:hidden">
                      <label className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue border-dashed cursor-pointer hover:bg-blue-50 transition">
                        <Upload className="w-8 h-8 text-blue-500" />
                        <span className="mt-2 text-base leading-normal">Select a photo</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handlePhotoChange}
                          required
                        />
                      </label>
                    </div>
                    
                    {photoPreview && (
                      <div className="w-24 h-24 relative">
                        <div className="absolute inset-0 rounded-lg overflow-hidden border-2 border-blue-500">
                          <div 
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${photoPreview})` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 print:hidden">Upload a clear passport size photo (JPEG/PNG, max 2MB)</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Registration Number *</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    placeholder="Enter registration number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Branch *</label>
                  <select 
                    name="branch"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Branch --</option>
                    <option value="Main Campus">Main Campus</option>
                    <option value="Sub Campus">Sub Campus</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Gender *</label>
                  <select 
                    name="gender"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Gender --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Date of Birth *</label>
                  <div className="relative">
                    <Calendar className="absolute top-3 left-3 text-gray-500" size={20} />
                    <input
                      type="date"
                      name="dob"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Class Applying For *</label>
                  <select 
                    name="classApplying"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Class --</option>
                    <option value="4th">4th Standard</option>
                    <option value="5th">5th Standard</option>
                    <option value="6th">6th Standard</option>
                    <option value="7th">7th Standard</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Parent/Guardian Details */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600 animate-fadeIn print:shadow-none print:border-none">
              <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                <User className="mr-2" size={24} /> Parent/Guardian Details
              </h2>

              {/* Primary Contact */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Primary Contact Person *</label>
                  <input
                    type="text"
                    name="primaryContact"
                    placeholder="Name of the Parent/Guardian"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Relation *</label>
                  <select 
                    name="relation"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Choose Relation --</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>
              </div>

              {/* Parent Details */}
              <div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Parent's Full Name *</label>
                    <input
                      type="text"
                      name="parentName"
                      placeholder="Full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      placeholder="Current occupation"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute top-3 left-3 text-gray-500" size={20} />
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone number"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute top-3 left-3 text-gray-500" size={20} />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-1">
                  <label className="text-sm font-medium text-gray-700">Residential Address *</label>
                  <div className="relative">
                    <Home className="absolute top-3 left-3 text-gray-500" size={20} />
                    <textarea 
                      name="address"
                      placeholder="Enter complete address"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[100px]"
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* QR Code Section - Custom for each step */}
          {step === 1 && (
            <div className="mt-6 bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-400 print:mt-8 print:border-none print:p-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 md:mr-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Have Questions?</h3>
                  <p className="text-gray-600">Scan this QR code to get more information about our admission process or to inquire about your application status.</p>
                </div>
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                  {/* This would be replaced with an actual QR code image for inquiries */}
                  <svg viewBox="0 0 100 100" width="100" height="100">
                    <rect x="10" y="10" width="80" height="80" fill="white" />
                    <rect x="20" y="20" width="20" height="20" fill="black" />
                    <rect x="60" y="20" width="20" height="20" fill="black" />
                    <rect x="20" y="60" width="20" height="20" fill="black" />
                    <rect x="45" y="45" width="10" height="10" fill="black" />
                    <rect x="65" y="65" width="15" height="15" fill="black" />
                    <rect x="30" y="45" width="5" height="5" fill="black" />
                    <rect x="65" y="45" width="5" height="5" fill="black" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="mt-6 bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600 print:mt-8 print:border-none print:p-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 md:mr-4">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">Payment Required</h3>
                  <p className="text-gray-600">Please scan this QR code to make the admission form payment of ₹500. Your application will be processed after payment confirmation.</p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Payment Methods: UPI, Net Banking, Credit/Debit Card</p>
                    <p className="text-sm font-medium text-green-600 mt-1">Application ID: APP-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}</p>
                  </div>
                </div>
                <div className="w-40 h-40 bg-white border-2 border-green-500 rounded-lg p-2 flex items-center justify-center">
                  {/* This would be replaced with an actual QR code image for payment */}
                  <svg viewBox="0 0 100 100" width="100" height="100">
                    <rect x="10" y="10" width="80" height="80" fill="white" />
                    <rect x="20" y="20" width="20" height="20" fill="black" />
                    <rect x="60" y="20" width="20" height="20" fill="black" />
                    <rect x="20" y="60" width="20" height="20" fill="black" />
                    <rect x="65" y="60" width="5" height="5" fill="black" />
                    <rect x="75" y="60" width="5" height="5" fill="black" />
                    <rect x="65" y="70" width="5" height="5" fill="black" />
                    <rect x="75" y="70" width="5" height="5" fill="black" />
                    <rect x="40" y="40" width="20" height="20" fill="black" />
                    <rect x="30" y="45" width="5" height="5" fill="black" />
                    <rect x="65" y="45" width="5" height="5" fill="black" />
                    <rect x="37" y="30" width="8" height="8" fill="black" />
                    <rect x="55" y="30" width="8" height="8" fill="black" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Print-only Declaration Section */}
          <div className="hidden print:block mt-8 border-t-2 pt-4">
            <h3 className="font-bold text-lg mb-2">Declaration:</h3>
            <p className="text-sm">I hereby declare that all the information provided in this application form is true and correct to the best of my knowledge. I understand that any false or misleading information may result in the rejection of this application or dismissal from the school.</p>
            <div className="mt-6 grid grid-cols-2 gap-8">
              <div>
                <p className="mb-8">Date: ___________________</p>
                <p>Parent's Signature: ___________________</p>
              </div>
              <div>
                <p className="mb-8">Place: ___________________</p>
                <p>Student's Signature: ___________________</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons - Hide when printing */}
          <div className="flex justify-between mt-6 print:hidden">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
            ) : (
              <div></div>
            )}
            
            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center"
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                className={`px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Application
                    <CheckCircle className="ml-2" size={20} />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Print-only styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 1cm;
          }
          body {
            font-size: 12pt;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:border-none {
            border: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:pt-8 {
            padding-top: 2rem !important;
          }
          .print\\:mt-8 {
            margin-top: 2rem !important;
          }
          .print\\:p-4 {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdmissionFormPage;