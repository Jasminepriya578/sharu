"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    cardNumber: "",
    ExpiryDate: "",
    cvv: "",
    cardHolder: "",
    Amount: "100", 
    upiId: "", 
  });

  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      let month = value.slice(0, 2);
      let year = value.slice(2, 4);
      if (parseInt(month, 10) > 12) month = "12";
      value = year ? `${month}/${year}` : month;
    }
    setFormData({ ...formData, ExpiryDate: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    
    const paymentData = {
      ...formData,
      paymentMethod: paymentMethod  
    };
    
    console.log("Storing payment data:", paymentData);
    localStorage.setItem("currentPaymentData", JSON.stringify(paymentData));
    
    setFormData({
      Name: "",
      Email: "",
      cardNumber: "",
      ExpiryDate: "",
      cvv: "",
      cardHolder: "",
      Amount: "100",
      upiId: "",
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white mt-10 p-6   rounded-lg shadow-md w-full sm:w-96">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">Payment</h2>
      
      <div className="mt-4 mb-4">
        <div className="text-sm font-medium text-gray-600">Payment Method</div>
        <div className="grid grid-cols-4 gap-2 mt-2">
          <div 
            className={`border rounded-md p-2 text-center cursor-pointer ${paymentMethod === "card" ? "border-blue-900 bg-blue-50" : ""}`}
            onClick={() => setPaymentMethod("card")}
          >
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div className="text-xs mt-1">Card</div>
          </div>
          
          <div 
            className={`border rounded-md p-2 text-center cursor-pointer ${paymentMethod === "upi-gpay" ? "border-blue-900 bg-blue-50" : ""}`}
            onClick={() => setPaymentMethod("upi-gpay")}
          >
            <div className="flex justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 16.5L3 13.5L6 10.5L9 13.5L6 16.5Z" fill="#28B446"/>
                <path d="M18 6.5L15 3.5L12 6.5L15 9.5L18 6.5Z" fill="#EA4335"/>
                <path d="M18 16.5L15 13.5L12 16.5L15 19.5L18 16.5Z" fill="#FBBC04"/>
                <path d="M6 6.5L3 9.5L6 12.5L9 9.5L6 6.5Z" fill="#4285F4"/>
                <path d="M13.5 10L10.5 13L13.5 16L16.5 13L13.5 10Z" fill="#4285F4" fillOpacity="0.3"/>
              </svg>
            </div>
            <div className="text-xs mt-1">Google Pay</div>
          </div>
          <div 
            className={`border rounded-md p-2 text-center cursor-pointer ${paymentMethod === "upi-phonepe" ? "border-blue-900 bg-blue-50" : ""}`}
            onClick={() => setPaymentMethod("upi-phonepe")}
          >
            <div className="flex justify-center h-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#5F259F"/>
                <path d="M14.5 8h-5c-0.276 0-0.5 0.224-0.5 0.5v7c0 0.276 0.224 0.5 0.5 0.5h1.5v-3h2v3h1.5c0.276 0 0.5-0.224 0.5-0.5v-7c0-0.276-0.224-0.5-0.5-0.5z" fill="white"/>
              </svg>
            </div>
            <div className="text-xs mt-1">PhonePe</div>
          </div>
        
          <div 
            className={`border rounded-md p-2 text-center cursor-pointer ${paymentMethod === "netbanking" ? "border-blue-900 bg-blue-50" : ""}`}
            onClick={() => setPaymentMethod("netbanking")}
          >
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="8" width="18" height="12" rx="2"/>
                <path d="M12 2L19 8H5L12 2Z"/>
                <line x1="7" y1="14" x2="7" y2="14"/>
                <line x1="12" y1="14" x2="12" y2="14"/>
                <line x1="17" y1="14" x2="17" y2="14"/>
                <line x1="7" y1="17" x2="17" y2="17"/>
              </svg>
            </div>
            <div className="text-xs mt-1">NetBanking</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            name="Name"
            className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your name"
            value={formData.Name}
            onChange={handleChange}
            required
          />

          <label className="block text-sm font-medium text-gray-600 mt-2">Email</label>
          <input
            type="email"
            name="Email"
            className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />

          {paymentMethod === "card" && (
            <>
              <label className="block text-sm font-medium text-gray-600 mt-2">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="1234 5678 9012 3456"
                maxLength={16}
                value={formData.cardNumber}
                onChange={handleChange}
              />
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Expiry Date</label>
                  <input
                    type="text"
                    name="ExpiryDate"
                    className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="MM/YY"
                    value={formData.ExpiryDate}
                    onChange={handleExpiryChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="123"
                    maxLength={3}
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {(paymentMethod === "upi-gpay" || paymentMethod === "upi-phonepe") && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-600">UPI ID</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="upiId"
                  className="flex-grow mt-2 p-2 border rounded-l-md focus:ring-2 focus:ring-indigo-500"
                  placeholder={paymentMethod === "upi-gpay" ? "example@okicici" : "example@ybl"}
                  value={formData.upiId}
                  onChange={handleChange}
                />
                <div className="mt-2 px-3 py-2 bg-gray-100 border border-l-0 rounded-r-md">
                  {paymentMethod === "upi-gpay" ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 16.5L3 13.5L6 10.5L9 13.5L6 16.5Z" fill="#28B446"/>
                      <path d="M18 6.5L15 3.5L12 6.5L15 9.5L18 6.5Z" fill="#EA4335"/>
                      <path d="M18 16.5L15 13.5L12 16.5L15 19.5L18 16.5Z" fill="#FBBC04"/>
                      <path d="M6 6.5L3 9.5L6 12.5L9 9.5L6 6.5Z" fill="#4285F4"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#5F259F"/>
                      <path d="M14.5 8h-5c-0.276 0-0.5 0.224-0.5 0.5v7c0 0.276 0.224 0.5 0.5 0.5h1.5v-3h2v3h1.5c0.276 0 0.5-0.224 0.5-0.5v-7c0-0.276-0.224-0.5-0.5-0.5z" fill="white"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "netbanking" && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-600">Select Bank</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {[
                  { name: "SBI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/200px-SBI-logo.svg.png" },
                  { name: "HDFC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png" },
                  { name: "ICICI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/ICICI_Bank_Logo.svg/200px-ICICI_Bank_Logo.svg.png" },
                  { name: "Axis", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/200px-Axis_Bank_logo.svg.png" },
                  { name: "PNB", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Punjab_National_Bank_Logo.svg/200px-Punjab_National_Bank_Logo.svg.png" },
                  { name: "Others", logo: "" }
                ].map((bank) => (
                  <div key={bank.name} className="border rounded-md p-2 text-center cursor-pointer hover:bg-blue-50 flex flex-col items-center justify-center">
                    {bank.name !== "Others" ? (
                      <div className="h-5 flex items-center justify-center mb-1">
                        <div className="text-xs font-semibold">{bank.name}</div>
                      </div>
                    ) : (
                      <div className="h-5 flex items-center justify-center mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    )}
                    <div className="text-xs">{bank.name === "Others" ? "More Banks" : ""}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <label className="block text-sm font-medium text-gray-600 mt-4">Amount</label>
          <input
            type="text"
            name="Amount"
            className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Amount"
            value={formData.Amount}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full mt-6 p-3 bg-blue-900 border rounded-md focus:ring-2 focus:ring-indigo-500 text-white hover:bg-blue-800 transition"
          >
            Pay ₹{formData.Amount}
          </button>
        </div>
      </form>
    </div>
  );
}