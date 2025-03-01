"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const ChangePasswordPage = () => {
    const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (!newPassword || !confirmPassword) return alert("Please fill all fields!");
    if (newPassword !== confirmPassword) return alert("Passwords do not match!");
    alert("Password Changed Successfully! Redirecting to Success Page...");
    // Simulate redirection to Success Page
    // Replace this with actual routing logic
    router.push("/auth/authSucces");
  };

  return (
    <div className="min-h-screen md:flex items-center justify-center bg-gray-100">
 <div className="min-w-[50%] bg-eweko_green_dark min-h-screen"></div>
 <div className="bg-white min-h-screen md:min-w-[50%] p-8 rounded-lg shadow-md w-full">
            <h1 className="text-2xl font-bold mb-6 text-center">Change Password</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mb-4 h-[50px]"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mb-4 h-[50px]"
          />
          <Button variant="default" onClick={handleSubmit} className="w-full h-[50px] bg-eweko_green_dark">
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;