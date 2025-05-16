"use client"; 

import React, { useState, useRef, useEffect } from "react";
import { 
  User, Calendar, Upload, CheckCircle, Download, 
  Printer, ArrowRight, ArrowLeft, CreditCard,
  AlertCircle, Check, X, Info
} from 'lucide-react';
import Script from 'next/script';

const AdmissionFormPage = () => {
  // State for tracking the current step
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [admissionId, setAdmissionId] = useState("");
  const fileInputRef = useRef(null);
  const [paymentId, setPaymentId] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    studentName: "",
    age: "",
    address: "",
    class: "",
    dateOfBirth: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    mobileNumber: "",
    email: "",
    gender: "",
    aadharNumber: "",
    nationality: "Indian",
    religion: "",
    state: "",
    district: "",
    pincode: ""
  });

  // Handle Razorpay script loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.Razorpay) {
        setRazorpayLoaded(true);
      }
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle photo upload
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

  // Generate Admission ID based on student name and random number
  const generateAdmissionId = () => {
    const namePrefix = formData.studentName.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${namePrefix}${randomNum}`;
  };

  // Function to handle payment process with Razorpay
  const handlePayment = () => {
    setIsLoading(true);
    
    // For testing purposes, we'll move straight to step 2 to show progress
    setStep(2);
    
    // Simulate API call to your backend to create a Razorpay order
    setTimeout(() => {
      // Check if Razorpay is loaded properly
      if (typeof window.Razorpay === 'undefined') {
        console.error("Razorpay not loaded");
        alert("Payment gateway failed to load. Please refresh the page.");
        setIsLoading(false);
        setStep(1); // Go back to step 1
        return;
      }
      
      // In a real implementation, your server would create an order and return order_id
      // For demo, we'll use a direct approach
      try {
        // Create a mock order response (this would come from your backend in production)
        const orderData = {
          amount: 50000, // Amount in paisa (₹500)
          currency: "INR",
          receipt: "rcpt_" + Math.floor(Math.random() * 10000),
          // In production, you'd get a real order_id from your server
          id: "order_" + Math.floor(Math.random() * 10000000)
        };
        
        const options = {
          key: "rzp_test_vUDxPR4KCCSzBV", // Replace with a test key that works (this is a sample test key)
          amount: orderData.amount,
          currency: orderData.currency,
          name: "EduAdmin School",
          description: "Admission Application Fee",
          image: "https://example.com/your_logo", // Replace with your school logo
          order_id: orderData.id, // Would come from backend in production
          handler: function(response) {
            // Payment successful
            console.log("Payment successful", response);
            setPaymentId(response.razorpay_payment_id || "test_payment_id");
            
            // Generate and set the admission ID
            const newAdmissionId = generateAdmissionId();
            setAdmissionId(newAdmissionId);
            
            // Move to step 3 (payment successful)
            setIsLoading(false);
            setStep(3);
          },
          prefill: {
            name: formData.studentName || "Student Name",
            email: formData.email || "student@example.com",
            contact: formData.mobileNumber || "9876543210"
          },
          notes: {
            address: formData.address || "Student Address"
          },
          theme: {
            color: "#3B82F6" // Blue color matching your UI
          },
          modal: {
            ondismiss: function() {
              console.log("Payment modal dismissed");
              // If payment modal is dismissed without payment
              setIsLoading(false);
              setStep(1); // Go back to step 1
            }
          }
        };
        
        // For test/development mode, bypass actual Razorpay
        // This is just for testing when you don't have a proper Razorpay setup
        if (process.env.NODE_ENV !== 'production') {
          console.log("Development mode: Simulating successful payment");
          // Simulate successful payment after 2 seconds
          setTimeout(() => {
            const mockResponse = {
              razorpay_payment_id: "pay_" + Math.random().toString(36).substring(2, 15),
              razorpay_order_id: orderData.id,
              razorpay_signature: "signature_" + Math.random().toString(36).substring(2, 15)
            };
            setPaymentId(mockResponse.razorpay_payment_id);
            const newAdmissionId = generateAdmissionId();
            setAdmissionId(newAdmissionId);
            setIsLoading(false);
            setStep(3);
          }, 2000);
          return;
        }
        
        // Initialize Razorpay
        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function(response) {
          console.error("Payment failed", response.error);
          alert(`Payment failed: ${response.error.description}`);
          setIsLoading(false);
          setStep(1); // Go back to step 1
        });
        
        // Open Razorpay payment modal
        paymentObject.open();
      } catch (error) {
        console.error("Error initializing Razorpay", error);
        alert("There was an error setting up the payment. Please try again later.");
        setIsLoading(false);
        setStep(1); // Go back to step 1
      }
    }, 1500);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission to database
    setTimeout(() => {
      setIsLoading(false);
      // Move to final confirmation step
      setStep(5);
    }, 2000);
  };

  // Function to download form as PDF
  const handleDownloadPDF = () => {
    // In a real implementation, this would generate a PDF
    // For now, we'll just simulate it
    alert("PDF download functionality would be implemented here");
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Load Razorpay Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
      />
      
      {/* Progress Tracker */}
      <div className="w-full max-w-4xl mx-auto pt-6 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
            School Admission Portal
          </h1>
          
          <div className="flex justify-between items-center mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between w-full mb-2 px-4">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div 
                key={stepNumber} 
                className={`flex flex-col items-center ${
                  stepNumber <= step ? 'text-blue-700' : 'text-gray-400'
                }`}
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    stepNumber < step 
                      ? 'bg-green-500 text-white' 
                      : stepNumber === step 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200'
                  }`}
                >
                  {stepNumber < step ? <Check size={20} /> : stepNumber}
                </div>
                <span className="text-xs font-medium text-center">
                  {stepNumber === 1 && "Basic Details"}
                  {stepNumber === 2 && "Payment"}
                  {stepNumber === 3 && "Admission ID"}
                  {stepNumber === 4 && "Complete Form"}
                  {stepNumber === 5 && "Confirmation"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Basic Student Details + Payment Button */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-blue-600 animate-fadeIn">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Basic Student Details</h2>
            <p className="text-gray-600 mb-6">Please enter your child's details to begin the admission process.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Student Full Name *</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter age"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter full address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Class Applying For *</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                >
                  <option value="">-- Select Class --</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-8 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    A payment of ₹500 is required to proceed with the admission process. This is a non-refundable application fee.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => handlePayment()}
                disabled={!formData.studentName || !formData.age || !formData.address || !formData.class || isLoading}
                className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center ${
                  (!formData.studentName || !formData.age || !formData.address || !formData.class || isLoading) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Pay Now <CreditCard className="ml-2" size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Processing (Simulated) */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6 flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Processing Payment</h2>
              <p className="text-gray-600 mb-8">Please wait while we process your payment...</p>
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        )}

        {/* Step 3: Payment Success & Admission ID Generation */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6 flex flex-col items-center">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Successful!</h2>
              <p className="text-gray-600">Thank you for your payment of ₹500</p>
              {paymentId && (
                <p className="text-sm text-gray-500 mt-2">Payment ID: {paymentId}</p>
              )}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 w-full max-w-md text-center">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Your Admission ID</h3>
              <div className="text-3xl font-bold text-blue-700 mb-2 tracking-wider">{admissionId}</div>
              <p className="text-sm text-gray-600 mb-4">Please save this ID for future reference</p>
            </div>
            
            <button
              onClick={() => setStep(4)}
              className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center"
            >
              Continue to Admission Form <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        )}

        {/* Step 4: Complete Admission Form */}
        {step === 4 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-blue-900">Complete Admission Form</h2>
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md">
                  ID: <span className="font-semibold">{admissionId}</span>
                </div>
                <button
                  onClick={handleDownloadPDF}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md flex items-center"
                >
                  <Download size={18} className="mr-1" /> Download
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Photo Upload Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Student Photo</h3>
                <div className="flex items-center space-x-6">
                  <div 
                    onClick={triggerFileInput}
                    className="w-32 h-36 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
                  >
                    {photoPreview ? (
                      <img 
                        src={photoPreview} 
                        alt="Student" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500 text-center">Upload passport size photo</p>
                      </>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Requirements:</p>
                    <ul className="text-xs text-gray-500 list-disc list-inside space-y-1">
                      <li>Recent passport size photograph</li>
                      <li>Clear face visibility</li>
                      <li>Plain background</li>
                      <li>File format: JPG, PNG</li>
                      <li>Max size: 1MB</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Form Sections */}
              <div className="space-y-12">
                {/* Personal Details Section */}
                <div className="border-b border-gray-200 pb-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        readOnly
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Age *</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        readOnly
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      >
                        <option value="">-- Select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Admission ID</label>
                      <input
                        type="text"
                        value={admissionId}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-medium"
                        readOnly
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Class Applying For *</label>
                      <input
                        type="text"
                        name="class"
                        value={formData.class}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        readOnly
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Aadhar Number *</label>
                      <input
                        type="text"
                        name="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={handleInputChange}
                        placeholder="XXXX XXXX XXXX"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Nationality *</label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Religion</label>
                      <input
                        type="text"
                        name="religion"
                        value={formData.religion}
                        onChange={handleInputChange}
                        placeholder="Religion"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Parent/Guardian Details */}
                <div className="border-b border-gray-200 pb-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Parent/Guardian Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Father's Name *</label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        placeholder="Father's full name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Mother's Name *</label>
                      <input
                        type="text"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleInputChange}
                        placeholder="Mother's full name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Guardian's Name</label>
                      <input
                        type="text"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleInputChange}
                        placeholder="If applicable"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Mobile Number *</label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Email ID</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Address Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Address Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2 md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">Home Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        rows={2}
                        readOnly
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">District *</label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="District"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">PIN Code *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit PIN code"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Declaration */}
              <div className="mt-8 border-t border-gray-200 pt-8">
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                      required
                    />
                  </div>
                  <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-700">
                    I declare that all the information provided above is true and correct to the best of my knowledge. 
                    I understand that providing false information may result in cancellation of admission.
                  </label>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center"
                  >
                    <ArrowLeft className="mr-2" size={16} /> Back
                  </button>
                  
                  <button
                    type="submit"
                    className={`px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Application <Check className="ml-2" size={20} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Admission Form Submitted Successfully!</h2>
            <p className="text-lg text-gray-600 mb-6">Thank you for submitting your application.</p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Admission ID:</span>
                <span className="font-bold text-blue-700">{admissionId}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Student Name:</span>
                <span className="font-medium">{formData.studentName}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Class:</span>
                <span className="font-medium">{formData.class}</span>
              </div>
              {paymentId && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Payment ID:</span>
                  <span className="font-medium text-green-600">{paymentId}</span>
                </div>
              )}
            </div>
            
            <div className="text-gray-600 text-sm mb-8">
              <p className="mb-2">We'll review your application and get in touch with you soon.</p>
              <p>Please save your Admission ID for future reference.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleDownloadPDF}
                className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition flex items-center justify-center"
              >
                <Download size={20} className="mr-2" /> Download Application
              </button>
              
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center justify-center"
              >
                <User size={20} className="mr-2" /> New Admission
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionFormPage;