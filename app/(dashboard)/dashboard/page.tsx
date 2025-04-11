"use client";

import axios from 'axios';
import { Bar, Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../lib/useAuth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from '@tanstack/react-query';
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  farmName: string;
  phone: string;
  createdAt: string;
}
const Dashboard = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [userId, setUserId] = useState<string | null>(null); // Store userId in state
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);



  const [keyMetrics, setKeyMetrics] = useState({
    totalItems: 0,
    lowStock: 0,
    totalValue: "₦0",
  });
  const [inventoryCategories, setInventoryCategories] = useState([
    { category: "Crops", count: 0 },
    { category: "Livestock", count: 0 },
    { category: "Tools", count: 0 },
    { category: "Supplies", count: 0 },
  ]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  interface Activity {
    activity: string;
    createdAt: string;
  }

  // Fetch userId from localStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user");
      setUserId(storedUserId);
    }
  }, []);

  // Redirect if user is not authenticated
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("user");

      if (!loading && (!token || !storedUserId)) {
        router.push("/auth/signin");
      }
    }
  }, [user, loading, router]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        console.log("No userId found, redirecting to signin");
        router.push("/auth/signin");
        return;
      }



      try {
        console.log("Fetching category data...");
        const categories = ["crops", "livestock", "tools", "supplies"];
        const categoryData = await Promise.all(
          categories.map(async (category) => {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_APIURL}/${category}?userId=${userId}`
            );
            return {
              category: category.charAt(0).toUpperCase() + category.slice(1),
              count: response.data.length,
            };
          })
        );

        const totalItems = categoryData.reduce((sum, item) => sum + item.count, 0);
        const lowStock = categoryData.reduce((sum, item) => sum + (item.count < 10 ? 1 : 0), 0);

        setKeyMetrics({
          totalItems,
          lowStock,
          totalValue: "₦0",
        });
        setInventoryCategories(categoryData);

        const activitiesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_APIURL}/activity?userId=${userId}`
        );
        setRecentActivities(activitiesResponse.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setKeyMetrics({ totalItems: 0, lowStock: 0, totalValue: "₦0" });
        setInventoryCategories([]);
        setRecentActivities([]);
      } finally {
        console.log("Data fetching complete, setting isLoading to false");
        setIsLoading(false);
      }
    };

    if (!loading && userId) {
      console.log("User is authenticated, fetching data...");
      fetchData();
    } else {
      console.log("User is not authenticated or still loading");
    }
  }, [loading, userId, router]);
  // Chart Data
  const barChartData = {
    labels: inventoryCategories.map((item) => item.category),
    datasets: [
      {
        label: "Inventory Count",
        data: inventoryCategories.map((item) => item.count),
        backgroundColor: [
          "rgba(75,192,192,0.6)",
          "rgba(54,162,235,0.6)",
          "rgba(255,206,86,0.6)",
          "rgba(201,203,207,0.6)",
        ],
        borderColor: [
          "rgba(75,192,192,1)",
          "rgba(54,162,235,1)",
          "rgba(255,206,86,1)",
          "rgba(201,203,207,1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Inventory Trend",
        data: [100, 120, 150, 180, 200, 220],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

    // console.log(userId, "userId from local");
    // console.log("Stored User ID:", localStorage.getItem('user'));

    // useEffect(() => {
    //   const storedUser = localStorage.getItem('user');
    //   if (storedUser) {
    //     const parsedUser = JSON.parse(storedUser); // Assuming 'user' is a JSON string
    //     setUserId(parsedUser._id); // or parsedUser.id depending on your data structure
    //   }
    // }, []);
  
    // 2. Fetch data when userId changes
    useEffect(() => {
      const fetchUserData = async () => {
        if (!userId) return; // Skip if no userId
  
        console.log("Fetching data for userId:", userId);
        setIsLoading(true);
        setError(null);
  
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_APIURL}/auth/${userId}`
          );
          setUserData(response.data);
          console.log("Fetch successful:", response.data);
        } catch (err) {
          const errorMessage = (axios.isAxiosError(err) && err.response?.data?.message) || 
                              (err instanceof Error && err.message) || 
                              "Failed to fetch user data";
          setError(errorMessage);
          console.error("Fetch error:", err);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchUserData();
    }, [userId]); // ✅ Runs whenever userId changes
  
    // Debugging
    console.log("Current userId:", userId);
    console.log("User data:", userData);
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen  mt-[130px] p-4 w-full bg-gray-100">
      <div className="bg-white px-4  lg:px-16 mx-auto shadow-lg rounded-lg p-6">

      {userData && (
        <div>  
           <h1 className="text-2xl text-eweko_green_dark font-bold mb-4 font-serif ">Welcome - <span className="text-2xl font-sans">{userData.firstName}  {userData.lastName}</span> </h1>
         
     
         </div>
      )}
      

        {/* Key Metrics */}
        <section className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 h-[200px] bg-eweko_green/70 shadow rounded-lg border border-gray-200">
              <p className="text-3xl font-bold text-eweko_green_dark">Total Items</p>
              <p className="text-xl font-medium text-white">{keyMetrics.totalItems} items</p>
            </div>
            <div className="p-4 h-[200px] bg-eweko_green/70 shadow rounded-lg border border-gray-200">
              <p className="text-3xl font-bold text-eweko_green_dark">Low Stock</p>
              <p className="text-xl font-medium text-white">{keyMetrics.lowStock} items</p>
            </div>
            <div className="p-4 h-[200px] bg-eweko_green/70  opacity-50  shadow rounded-lg border border-gray-200">
              <p className="text-2xl font-bold text-eweko_green_dark">Finance Total Income</p>
              <p className="text-xl font-medium text-white">{keyMetrics.totalValue}</p>
              <p className="text-lg lg:text-2xl font-bold text-white">Coming soon...</p>

              <p className="text-sm text-right d text-white">for the month</p>

            </div>
            <div className="p-4 h-[200px] bg-eweko_green/70 opacity-50 shadow rounded-lg border border-gray-200">
              <p className="text-2xl font-bold text-eweko_green_dark">Finance Total outflow</p>
              <p className="text-xl font-medium text-white">{keyMetrics.totalValue}</p>
              <p className="text-lg lg:text-2xl font-bold text-white">Coming soon...</p>

              <p className="text-sm text-right d text-white">for the month</p>
            </div>
          </div>
        </section>

        {/* Inventory Categories */}
        <section className="mb-6">
          <h2 className="text-md lg:text-2xl font-semibold mb-2">Inventory Categories</h2>
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Stock Levels by Category",
                },
              },
            }}
            className="w-full h-64"
          />
        </section>

        {/* Charts */}
        <section className="mb-6 bg-eweko_green/70 px-10 pt-5 h-auto">
          <h2 className=" text-md lg:text-3xl text-white font-semibold mb-2">Inventory Trends</h2>
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Inventory Trend Over Time",
                },
              },
            }}
            className="w-full text-white h-screen"
          />
        </section>

        {/* Recent Activities */}
        <section>
          <h2 className="text-3xl font-semibold mb-2">Recent Activities</h2>
          <ul className="space-y-2">
            {recentActivities.map((activity, index) => (
              <li
                key={index}
                className="flex justify-between bg-white shadow rounded p-4"
              >
                <span className="text-gray-800">{activity.activity}</span>
                <span className="text-sm text-gray-500">{activity.createdAt}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;