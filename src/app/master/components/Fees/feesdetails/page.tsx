"use client";
import { useEffect, useState } from "react";
import Payment from "../payment";

interface PaymentData {
  Name: string;
  Email: string;
  Amount: string;
  paymentMethod?: string;
  method?: string;
  timestamp?: string;
  cardNumber?: string;
  ExpiryDate?: string;
  cvv?: string;
  cardHolder?: string;
  upiId?: string;
}

export default function FeesDetails() {
  const [paymentHistory, setPaymentHistory] = useState<PaymentData[]>([]);
  const [currentPayment, setCurrentPayment] = useState<PaymentData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Amount: "",
    method: "pay by cash"
  });
  
  useEffect(() => {
    console.log("All localStorage keys:", Object.keys(localStorage));
    const existingHistoryStr = localStorage.getItem("paymentHistory");
    console.log("Existing history string:", existingHistoryStr);
    const existingHistory = existingHistoryStr ? JSON.parse(existingHistoryStr) : [];
    setPaymentHistory(existingHistory);
    const currentPaymentStr = localStorage.getItem("currentPaymentData");
    console.log("Current payment string:", currentPaymentStr);
    
    if (currentPaymentStr) {
      try {
        const paymentData = JSON.parse(currentPaymentStr);
        paymentData.timestamp = new Date().toISOString();
        setCurrentPayment(paymentData);

        const updatedHistory = [...existingHistory, paymentData];
        console.log("Updated history:", updatedHistory);
        
        setPaymentHistory(updatedHistory);
        localStorage.setItem("paymentHistory", JSON.stringify(updatedHistory));
        localStorage.removeItem("currentPaymentData");
      } catch (error) {
        console.error("Error processing payment data:", error);
      }
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  
  const addTestPayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.Name || !formData.Email || !formData.Amount) {
      alert("Please fill all fields");
      return;
    }
    
    const paymentData: PaymentData = {
      Name: formData.Name,
      Email: formData.Email,
      Amount: formData.Amount,
      method: formData.method,
      paymentMethod: formData.method,
      timestamp: new Date().toISOString()
    };
    
    let updatedHistory;
    
    if (isEditing && editIndex !== null) {
      // Update existing payment
      updatedHistory = [...paymentHistory];
      updatedHistory[editIndex] = paymentData;
      
      setIsEditing(false);
      setEditIndex(null);
      alert("Payment updated successfully!");
    } else {
      // Add new payment
      updatedHistory = [...paymentHistory, paymentData];
      alert("Cash payment added successfully!");
    }
    
    setPaymentHistory(updatedHistory);
    localStorage.setItem("paymentHistory", JSON.stringify(updatedHistory));
    
    // Reset form
    setFormData({
      Name: "",
      Email: "",
      Amount: "",
      method: "pay by cash"
    });
    
    setShowForm(false);
  };
  
  const handleEdit = (index: number) => {
    const payment = paymentHistory[index];
    
    // Populate form with payment data
    setFormData({
      Name: payment.Name,
      Email: payment.Email,
      Amount: payment.Amount,
      method: payment.method || payment.paymentMethod || "pay by cash"
    });
    
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true);
  };
  
  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to delete this payment?")) {
      const updatedHistory = paymentHistory.filter((_, i) => i !== index);
      setPaymentHistory(updatedHistory);
      localStorage.setItem("paymentHistory", JSON.stringify(updatedHistory));
      
      // If we're currently editing this item, close the form
      if (isEditing && editIndex === index) {
        setIsEditing(false);
        setEditIndex(null);
        setShowForm(false);
        setFormData({
          Name: "",
          Email: "",
          Amount: "",
          method: "pay by cash"
        });
      }
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Details</h1>
        <button 
          onClick={() => {
            if (showForm && isEditing) {
              // If we're in edit mode and closing the form, reset everything
              setIsEditing(false);
              setEditIndex(null);
              setFormData({
                Name: "",
                Email: "",
                Amount: "",
                method: "pay by cash"
              });
            }
            setShowForm(!showForm);
          }}
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          {showForm ? 'Cancel' : 'Add Payment'}
          <span className="ml-2">{showForm ? '×' : '+'}</span>
        </button>
      </div>
      
      {showForm && (
        <div className="bg-gray-50 border rounded-lg p-6 mb-6 shadow-md animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Payment' : 'Add Cash Payment'}</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input
                  type="text"
                  name="Amount"
                  value={formData.Amount}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <p className="p-2 bg-blue-50 border rounded-md">{formData.method}</p>
              </div>
            </div>
            
            <button
              onClick={addTestPayment}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              type="submit"
            >
              {isEditing ? 'Update Payment' : 'Add Cash Payment'}
            </button>
          </form>
        </div>
      )}
      
      {currentPayment && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 shadow-md">
          <h2 className="text-lg font-semibold text-green-800 mb-2">Latest Payment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-medium">Name:</span> {currentPayment.Name}</p>
            <p><span className="font-medium">Email:</span> {currentPayment.Email}</p>
            <p><span className="font-medium">Amount:</span> ₹{currentPayment.Amount}</p>
            <p><span className="font-medium">Payment Method:</span> {currentPayment.paymentMethod || currentPayment.method}</p>
            <p><span className="font-medium">Date:</span> {new Date(currentPayment.timestamp || "").toLocaleString()}</p>
          </div>
        </div>
      )}
      
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>
      {paymentHistory.length === 0 ? (
        <p className="text-gray-500">No payment history available.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentHistory.map((payment, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{payment.Name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{payment.Email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{payment.Amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {payment.method === "pay by UPI" ? (
                      <div className="flex items-center gap-2">
                        <span>{payment.method || payment.paymentMethod || "Not specified"}</span>
                        {payment.upiId && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{payment.upiId}</span>}
                      </div>
                    ) : payment.method === "pay by card" ? (
                      <div className="flex items-center gap-2">
                        <span>{payment.method || payment.paymentMethod || "Not specified"}</span>
                        {payment.cardNumber && <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">****{payment.cardNumber.slice(-4)}</span>}
                      </div>
                    ) : (
                      <span>{payment.method || payment.paymentMethod || "Not specified"}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(payment.timestamp || "").toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-800 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Add this to your global CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}