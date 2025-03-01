


"use client"

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../lib/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
 import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"; // Icons
 import ProtectedRoute from '@/components/ProtectedRoute'
 import bg2 from "@/public/bg2.jpg";


const categories = [
  { id: "crops", name: "Crops", icon: "🌾" },
  { id: "tools", name: "Tools", icon: "🛠️" },
  { id: "livestock", name: "Livestock", icon: "🐮" },
  { id: "supplies", name: "Supplies", icon: "📦" },
];
const userId = localStorage.getItem("user");



const fetchItemsByCategory = async (category: string) => {
  try {
    const userId = localStorage.getItem("user"); // Get user ID from localStorage
    console.log(category)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APIURL}/${category}?userId=${userId}`
    );

    
    return response.data;
  } catch (error) {
    toast.error("Error fetching items:");
    throw new Error("Failed to fetch items");
  }
}
const CategoriesPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("user");

    if (!loading) {
      
      // Redirect if any auth element is missing
      if (!token || !storedUserId) {
        router.push("/auth/signin");
      }
    }
  }, [user, loading, router]);

  // Fetch items effect
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("user");

    const fetchItems = async () => {
      if (!selectedCategory || !token || !storedUserId) return;

      setItemsLoading(true);
      setError(null);
      
      try {
        const data = await fetchItemsByCategory(selectedCategory);
        setItems(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            router.push("/auth/signin");
          }
          setError(err.response?.data.message || "Failed to load items");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setItemsLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategory, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading authentication...</div>;
  }

  return (
 
    <div className="min-h-screen mt-[130px] flex flex-col items-center justify-center bg-no-repeat bg-contain bg-gray-200 p-4" style={{ backgroundImage: `url(${bg2.src})` }}>
      <h1 className="text-3xl font-bold mb-6">Categories Inventory</h1>
      <p className="mb-6 text-center text-eweko_green">click on the category below to view the item's in the category</p>

      {/* Display Categories */}
      <div className="grid grid-cols-2 sm2:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            size="lg"
            className={`flex flex-col w-[150px] sm2:w-[150px] lg:w-[200px] sm2:h-[150px] lg:h-[150px] h-[150px] items-center justify-center space-y-2   hover:bg-eweko_green hover:text-white ${
              selectedCategory === category.id ? "bg-eweko_green text-white" : ""
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="text-4xl">{category.icon}</span>
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading State for Items */}
      {itemsLoading && (
        <div className="w-full max-w-2xl text-center p-4">Loading items...</div>
      )}

      {/* Display Items for Selected Category */}
      {selectedCategory && !itemsLoading && !error && (
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl font-bold mb-4">
            {categories.find((c) => c.id === selectedCategory)?.name} Items
          </h2>
          
          {items.length === 0 ? (
            <div className="text-center p-4 text-gray-500">
              No items found in this category
            </div>
          ) : (
            <table className="min-w-full rounded-t-lg divide-y divide-gray-200 bg-eweko_green_dark">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-white text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-white text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-white text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₦{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Add Item Button */}
          <div className="mt-6 flex justify-end">
            <Link href="/category/addItem">
              <Button
                variant="default"
                size="lg"
                className="flex items-center space-x-2 bg-eweko_green_dark hover:bg-eweko_green_light text-white"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Add Item</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
   
  );
};

export default CategoriesPage;