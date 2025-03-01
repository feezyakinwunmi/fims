"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string; // Added category property
}

interface DataTableProps {
    
  items: Item[];
}

const DataTable: React.FC<DataTableProps> = ({ items }) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Partial<Item>>({});
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const itemsPerPage = 20;
  
    const categories = ["Crops", "Livestock", "Equipment", "Supplies"];
  
    // Handle edit form submission
    const handleSave = () => {
      alert("Item Updated: " + JSON.stringify(selectedItem));
      setOpen(false); // Close the dialog after saving
    };
  
    // Paginate items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  
    // Pagination handlers
    const handlePrevious = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
  
    const handleNext = () => {
      if (indexOfLastItem < items.length) setCurrentPage(currentPage + 1);
    };
    const router = useRouter();
  return (
    <div className="">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="w-full bg-eweko_green/70">
        <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
            S/N
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
            Quantity
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
            Price
          </th>
          <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
      {currentItems.map((item, index) => (
          <tr key={item.id}>
            <td className="px-6 py-4 whitespace-nowrap">
                {indexOfFirstItem + index + 1}
              </td>
            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
            <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center space-x-2">
              {/* Edit Button */}
              <div className=""></div>
              <Dialog open={open} onOpenChange={setOpen} >
                <DialogTrigger asChild >
                  <Button variant="outline" size="sm">
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent >
                  <DialogHeader>
                    <DialogTitle>Edit Item</DialogTitle>
                    <DialogDescription>
                      Update the details of the selected item.
                    </DialogDescription>
                  </DialogHeader>
                  {/* Pre-filled Edit Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSave();
                    }}
                  >
                    {/* Name Input */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Item Name
                      </label>
                      <Input
                        type="text"
                        defaultValue={item.name}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    {/* Category Select */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <Select
                        value={selectedItem?.category || item.category}
                        onValueChange={(value) =>
                          setSelectedItem({
                            ...selectedItem,
                            category: value,
                          })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Quantity Input */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <Input
                        type="number"
                        defaultValue={item.quantity}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            quantity: Number(e.target.value),
                          })
                        }
                        required
                      />
                    </div>

                    {/* Price Input */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <Input
                        type="number"
                        defaultValue={item.price}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            price: Number(e.target.value),
                          })
                        }
                      />
                    </div>

                    {/* Save Button */}
                    <DialogFooter>
                      <Button variant="default" type="submit">
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              {/* Delete Button */}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => alert("Delete " + item.name)}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  
    <div className="flex justify-between mt-4 ">
    <Button className="bg-eweko_green_light" variant="outline" onClick={handlePrevious} disabled={currentPage === 1}>
      Previous
    </Button>
    <span>
      Page {currentPage} of {Math.ceil(items.length / itemsPerPage)}
    </span>
    <Button className="bg-eweko_green_light" variant="outline" onClick={handleNext} disabled={indexOfLastItem >= items.length}>
      Next
    </Button>
  </div>
</div>
  );
};

export default DataTable;