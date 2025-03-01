"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const OTPSelectionPage = () => {
    const router = useRouter();
  const [method, setMethod] = useState("");

  const handleSelect = () => {
    if (!method) return alert("Please select a method!");
    alert(`You chose ${method}. Redirecting to OTP Verification...`);
    // Simulate redirection to OTP Verification Page
    // Replace this with actual routing logic
    router.push("/auth/otp");
  };

  return (
    <div className="min-h-screen md:flex items-center justify-center bg-gray-100">
       <div className="min-w-[50%] bg-eweko_green_dark min-h-screen"></div>
       <div className="bg-white min-h-screen md:min-w-[50%] p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Choose OTP Method</h1>
        <div className="space-y-4">
          <Button
            variant={method === "email" ? "default" : "outline"}
            onClick={() => setMethod("email")}
            className="w-full h-[50px]"
          >
            Email
          </Button>
          <Button
            variant={method === "phone" ? "default" : "outline"}
            onClick={() => setMethod("phone")}
            className="w-full h-[50px]"
          >
            Phone
          </Button>
        </div>
        <Button variant="default" onClick={handleSelect} className="w-full mt-6 h-[50px] bg-eweko_green_dark">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OTPSelectionPage;