"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const OTPVerificationPage = () => {
    const router = useRouter();
    const [otp, setOTP] = useState(["", "", "", "", "", ""]); // Array for each digit
  const [activeIndex, setActiveIndex] = useState(0); // Track active input box

  // Handle input changes
interface OTPInputChangeEvent {
    target: {
        value: string;
    };
}

const handleInputChange = (index: number, value: string): void => {
    const newOTP = [...otp];
    newOTP[index] = value;

    // Move to the next box if valid input
    if (value && index < 5) {
        setActiveIndex(index + 1);
    }

    setOTP(newOTP);
};

  // Handle backspace
const handleBackspace = (index: number): void => {
    if (index > 0) {
        setActiveIndex(index - 1);
    }
    const newOTP = [...otp];
    newOTP[index] = "";
    setOTP(newOTP);
};

  // Submit OTP
  const handleSubmit = () => {
    const fullOTP = otp.join("");
    if (fullOTP.length !== 6) return alert("Please enter a 6-digit OTP!");
    alert(`OTP Verified: ${fullOTP}. Redirecting to Success Page...`);
    // Simulate redirection to Success Page
    // Replace this with actual routing logic 
     router.push("/auth/authSucces");

  };

  return (
    <div className="min-h-screen md:flex items-center justify-center bg-gray-100">
      <div className="min-w-[50%] bg-eweko_green_dark min-h-screen"></div>
      <div className="bg-white min-h-screen  md:min-w-[50%] p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Verify OTP</h1>
        <p className="text-gray-600 mb-6 text-center">Enter the 6-digit code sent to your email/phone.</p>

        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              type="text"
              maxLength={1} // Allow only one character per box
              value={otp[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !otp[index]) {
                  handleBackspace(index);
                }
              }}
              onFocus={() => setActiveIndex(index)} // Focus handling
              className={`w-10 h-10 text-center text-2xl font-bold border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                activeIndex === index ? "border-blue-500" : ""
              }`}
            />
          ))}
        </div>
       
          <Button variant="default" onClick={handleSubmit} className="w-full h-[50px] bg-eweko_green_dark">
            Verify OTP
          </Button>
       
      </div>
    </div>
  );
};

export default OTPVerificationPage;