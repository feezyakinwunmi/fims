"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import fimslogo from "@/public/fimslogo.png";
import Link from "next/link";
import fimsrb from "@/public/fimsrb.png";



interface FormData {
  firstName: string;
  lastName: string;
  farmName: string;
  email: string;
  phone: string;
  password: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    farmName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      // Send a POST request to the NestJS backend
      const response = await axios.post("http://localhost:3002/auth/signup", {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        farmName: formData.farmName,
        phone: formData.phone,
      });

      // Handle successful sign-up
      console.log(response.data);
      alert("Sign-up successful! Redirecting...");
      // router.push("/auth/otp-selection"); // Redirect to OTP selection page
    } catch (error) {
      // Handle errors
      if ((error as any).response) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message || "Failed to sign up");
        } else {
          alert("An unexpected error occurred.");
        }
      } else {
        alert("An unexpected error occurred.");
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen  md:flex items-center bg-gray-100">
      {/* Left Side Background */}
      <div className=" md:block min-w-[50%] px-10 pt-[50px] md:pt-[100px] bg-eweko_green_dark h-screen">

      <h2 className="text-3xl font-bold text-white mb-4">
        Welcome to Fims!
      </h2>
      <p className="text-white mb-6">
        Your all-in-one solution for managing your farm inventory efficiently.
      </p>

      {/* Image or Illustration */}
      <div className="mb-6">
        <Image
          src={fimsrb} // Replace with your image path
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
       Already have an account ?{" "}
        <Link href="/auth/signin" className="text-green-600 hover:underline hover:text-white">
          Login now
        </Link>
      </p>
      </div>
      {/* Sign-Up Form */}
      <div className="bg-white min-h-screen md:min-w-[50%] p-8 rounded-lg shadow-md w-full md:w-96 mx-auto md:mx-0">
      <div className=" mx-auto flex items-center justify-center w-full"> 
      <Image
          src={fimslogo}
          alt="EwekoAggregate"
          className="w-[100px] md:w-[100px]   max-h-auto "
          loading="eager"
        />
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="h-[50px] w-full"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="h-[50px] w-full"
            />
          </div>

          {/* Farm Name */}
          <div className="mb-4">
            <Input
              type="text"
              name="farmName"
              placeholder="Farm Name"
              value={formData.farmName}
              onChange={handleInputChange}
              required
              className="h-[50px] w-full"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="h-[50px] w-full"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <Input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="h-[50px] w-full"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="h-[50px] w-full"
            />
          </div>

          {/* Submit Button */}
          <Button
            variant="default"
            type="submit"
            className="w-full h-[50px] bg-eweko_green_dark text-white hover:bg-eweko_green_hover transition-colors"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;