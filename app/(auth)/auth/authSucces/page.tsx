"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SuccessPage = () => {
  const handleRedirect = () => {
    alert("Redirecting to Login Page...");
    // Simulate redirection to Login Page
    // Replace this with actual routing logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-6">Registration Successful!</h1>
        <p className="text-gray-600 mb-6">You can now log in to your account.</p>
<Link href="/auth/signin">
<Button variant="default" onClick={handleRedirect} className="w-full h-[50px] bg-eweko_green_dark">
          Go to Login
        </Button>
</Link>
        
      </div>
    </div>
  );
};

export default SuccessPage;