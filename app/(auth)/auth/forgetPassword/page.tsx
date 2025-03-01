"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPasswordPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [method, setMethod] = useState("");

  const handleSubmit = () => {
    if (!emailOrPhone || !method) return alert("Please fill all fields!");
    alert(`OTP sent to ${emailOrPhone} via ${method}. Redirecting to OTP Verification...`);
    // Simulate redirection to OTP Verification Page
    // Replace this with actual routing logic
  };

  return (
    <div className="min-h-screen md:flex items-center justify-center bg-gray-100">
 <div className="min-w-[50%] bg-eweko_green_dark min-h-screen"></div>
 <div className="bg-white min-h-screen md:min-w-[50%] p-8 rounded-lg shadow-md w-full">
            <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            placeholder="Email or Phone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
            className="mb-4 h-[50px]"
          />
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
          >
            <option value="">Select Method</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
          <Button variant="default" onClick={handleSubmit} className="w-full h-[50px] bg-eweko_green_dark">
            Send OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;