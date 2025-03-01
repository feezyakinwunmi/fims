

"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import bg1 from "@/public/bg1.jpg";
// Category to API endpoint mapping
const CATEGORY_ENDPOINTS: { [key: string]: string } = {
  "Crops": "crops",
  "Livestock": "livestock",
  "Tools": "tools",
  "Supplies": "supplies"
};

const AddItemPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = ["Crops", "Livestock", "Tools", "Supplies"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleCancel = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/"); // Fallback to homepage
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userId = localStorage.getItem("user");
      if (!userId) throw new Error("User not authenticated");

      const { name, category, quantity, price } = form;
      
      if (!CATEGORY_ENDPOINTS[category]) {
        throw new Error("Invalid category selection");
      }

      const endpoint = CATEGORY_ENDPOINTS[category];
      const payload = {
        name,
        quantity: Number(quantity),
        price: Number(price),
        userId
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APIURL}/${endpoint}`,
        payload
      );
toast.success("Items created successfully");
      if (response.status === 201) {
        toast.success("Items created successfully");

        router.push("/category");
      }
    } catch (err) {
      console.error("Creation error:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Failed to create item");
      } else {
        setError("Failed to create item");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-[130px] bg-gray-100 p-4" style={{ backgroundImage: `url(${bg1.src})` }}>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 ">Add New Item</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
           <div className="mb-4">
            <label className="block text-sm font-bold  text-gray-700">
               Item Name
            </label>
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full h-12  "

              placeholder="Enter item name"
              required
            />
          </div>
          {/* Category Select */}
          <div className="mb-4">
            <label className="block text-sm font-bold  text-gray-700">
              Category
            </label>
            <Select
              value={form.category}
              onValueChange={(value: string) =>
                setForm({ ...form, category: value })
              }
            >
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category: string) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity Input */}
          <div className="mb-4">
            <label className="block text-sm font-bold  text-gray-700">
              Quantity
            </label>
            <Input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleInputChange}
              placeholder="Enter quantity"
              className="w-full h-12"

              required
            />
           </div>

          {/* Price Input */}
          <div className="mb-4">
            <label className="block text-sm font-bold  text-gray-700">
              Price
            </label>
            <Input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="w-full h-12"
            />
          </div>
          <div className=" flex justify-between gap-6" >
          <Button 
            variant="default"  
            className="w-full h-12 bg-eweko_green_dark text-white hover:bg-eweko_green_light transition-colors"
           onClick={handleCancel}
          >
           cancel
          </Button>
           <Button 
            variant="default" 
            type="submit" 
            className="w-full h-12 bg-eweko_green_dark text-white hover:bg-eweko_green_light transition-colors"
            disabled={loading}
          >
            {loading ? "Creating..." : "Add Item"}
          </Button>
          </div>
         
        </form>
      </div>
    </div>
  );
};

export default AddItemPage;