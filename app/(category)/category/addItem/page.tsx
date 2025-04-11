// AddItemPage.tsx
"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { PlusIcon } from "@heroicons/react/24/outline";
import bg1 from "@/public/bg1.jpg";

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
    recipient: "", // Added recipient to the form state
    // openingStock: "",
    // openingPrice: "",
    // description: "",
    // returned: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userId = localStorage.getItem("user");
      if (!userId) throw new Error("User not authenticated");

      const payload = {
        ...form,
      //   quantity: Number(form.openingStock),
      // currentStock: Number(form.openingStock),
      //   price: Number(form.openingPrice),
        userId,
        [form.category === "Tools" || form.category === "Supplies" ? "issuedTo" : "soldTo"]: form.recipient
      };

      const endpoint = CATEGORY_ENDPOINTS[form.category];
      await axios.post(`${process.env.NEXT_PUBLIC_APIURL}/${endpoint}`, payload);
      
      toast.success("Item created successfully");
      router.push("/category");
    } catch (err) {
      toast.error("Failed to create item");
      console.error(err);       
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-[130px] bg-gray-100 p-4" style={{ backgroundImage: `url(${bg1.src})` }}>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Item Name</label>
            <Input name="name" value={form.name} onChange={handleInputChange} required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Category</label>
            <Select onValueChange={value => setForm(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(CATEGORY_ENDPOINTS).map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
{/* 
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Opening Stock</label>
            <Input type="number" name="openingStock" value={form.openingStock} onChange={handleInputChange} required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Opening Price</label>
            <Input type="number" name="openingPrice" value={form.openingPrice} onChange={handleInputChange} required />
          </div> */}

          {/* {form.category && (
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">
                {["Tools", "Supplies"].includes(form.category) ? "Issued To" : "Sold To"}
              </label>
              <Input
                name="recipient"
                value={form.recipient}
                onChange={handleInputChange}
                placeholder={`Enter ${["Tools", "Supplies"].includes(form.category) ? "recipient" : "buyer"} name`}
              />
            </div>
          )} */}
{/* 
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div> */}

          {/* <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="returned"
              checked={form.returned}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label className="text-sm font-bold text-gray-700">Returned</label>
          </div> */}

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()} className="w-full">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="w-full bg-green-700 text-white">
              {loading ? "Creating..." : "Add Item"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemPage;