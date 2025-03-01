"use client"

import React, { useState, useEffect } from "react";

const ComingSoonPage = () => {
  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date("2025-10-01T00:00:00").getTime(); // Set your launch date here

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="min-h-screen mt-[130px] flex flex-col items-center justify-center bg-gradient-to-br from-eweko_green_dark to-eweko_green_light text-white">
      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center">
        We're Coming Soon!
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-2xl text-center max-w-md mb-12">
        Our website is currently under construction. We'll be launching soon
        with exciting new features. Stay tuned!
      </p>

      {/* Countdown Timer */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Launch in:</h2>
        <div className="flex space-x-4">
          <div className="p-4 bg-white/10 rounded-lg">
            <span className="text-3xl font-bold">{timeLeft.days}</span>
            <span className="block text-sm">Days</span>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <span className="text-3xl font-bold">{timeLeft.hours}</span>
            <span className="block text-sm">Hours</span>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <span className="text-3xl font-bold">{timeLeft.minutes}</span>
            <span className="block text-sm">Minutes</span>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <span className="text-3xl font-bold">{timeLeft.seconds}</span>
            <span className="block text-sm">Seconds</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button className="px-8 py-3 bg-white text-eweko_green_light font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300">
        Get Notified
      </button>
    </div>
  );
};

export default ComingSoonPage;