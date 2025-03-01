"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../../lib/auth-store";
import Image from "next/image";
import fimslogo from "@/public/fimslogo.png";
import Link from "next/link";
import fimsrb from "@/public/fimsrb.png";


import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Send a POST request to the NestJS backend
      const response = await axios.post("http://localhost:3002/auth/login", {
        email,
        password,
      });


      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.userId);
      
      // Force state update
      window.dispatchEvent(new Event('storage'));
     // Handle successful login
    //  const { token, user } = response.data;
    //  localStorage.setItem("token", token); // Save the token in localStorage
    //  login(user); // Update auth state with user details
     router.push("/dashboard"); // Redirect to dashboard
   } catch (error) {
     // Handle errors
     if (axios.isAxiosError(error) && error.response) {
       alert(error.response?.data?.message || "Invalid credentials");
     } else {
       alert("An unexpected error occurred.");
     }
     console.error(error);
   }
 };

  return (
    <div className="min-h-screen md:flex items-center justify-center bg-gray-100">
      {/* Left Side Background */}
      <div className=" md:block min-w-[50%]  pt-[50px] px-10 md:pt-[100px] bg-eweko_green_dark h-screen">

      <h2 className="text-3xl font-bold text-white mb-4">
        Welcome back!
      </h2>
      <p className="text-white mb-6">
        Your all-in-one solution for managing your farm inventory efficiently.
      </p>

      {/* Image or Illustration */}
      <div className="mb-6">
        <Image
          src={fimsrb}// Replace with your image path
          alt="Farm Illustration"
          width={300}
          height={350}
          className="mx-auto"
        />
      </div>

      {/* Key Features List */}
      <div className="text-left space-y-4">
        <div className="flex items-center">
          <span className="text-green-600 mr-2">✔️</span>
          <span className="text-white">Track crops, livestock, and equipment</span>
        </div>
        <div className="flex items-center">
          <span className="text-green-600 mr-2">✔️</span>
          <span className="text-white">Monitor inventory levels in real-time</span>
        </div>
        <div className="flex items-center">
          <span className="text-green-600 mr-2">✔️</span>
          <span className="text-white">Generate reports for better decision-making</span>
        </div>
      </div>

      {/* Call to Action */}
      <p className="mt-8 text-white">
        New to Fims?{" "}
        <Link href="/auth/signup" className="text-green-600 hover:underline hover:text-white">
          Sign up now
        </Link>
      </p>
      </div>

      {/* Login Form */}
      <div className="bg-white min-h-screen md:min-w-[50%] p-8 rounded-lg shadow-md w-full md:w-96 mx-auto md:mx-0">
     <div className=" mx-auto flex items-center justify-center w-full"> 
      <Image
          src={fimslogo}
          alt="EwekoAggregate"
          className="w-[200px] md:w-[300px]   max-h-auto "
          loading="eager"
        />
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-[50px] w-full"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-[50px] w-full"
            />
          </div>

          {/* Submit Button */}
          <Button
            variant="default"
            type="submit"
            className="w-full h-[50px] bg-eweko_green_dark text-white hover:bg-eweko_green_hover transition-colors"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging In..." : "Log In"} {/* Show loading text */}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;