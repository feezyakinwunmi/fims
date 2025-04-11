// app/category/activity/[itemId]/page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams  } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StockLineChart } from '@/components/ui/LineChart';
import { StatCard } from '@/components/ui/StatCard';
import { inventoryAPI } from '@/lib/api';
import { Item, Activity } from "../../../../types/inventory" // or your path
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Edit, Trash2, Check, X, Save, Undo2 } from 'lucide-react';



const ItemActivityPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams<{ itemId: string }>();
  const [activities, setActivities] = useState<Activity[]>([]);
  const category = searchParams.get('category') || ''; 
  const [editingId, setEditingId] = useState<string | null>(null);
const [editedActivity, setEditedActivity] = useState<Partial<Activity> | null>(null);
const [showConfirmModal, setShowConfirmModal] = useState(false);


  const [filter, setFilter] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    search: string;
  }>({
    startDate: null,
    endDate: null,
    search: ''
  });

  const handleDateChange = (date: Date | null, field: 'startDate' | 'endDate') => {
    setFilter(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const API_URL = process.env.NEXT_PUBLIC_APIURL;
 

//edditin gfunction---------------------------------------------------------------------------------------\

  const handleEditClick = (activity: Activity) => {
    setEditingId(activity._id);
    setEditedActivity({ ...activity });
  };
  
  const handleEditChange = (field: keyof Activity, value: any) => {
    setEditedActivity(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const cancelEdit = () => {
    setEditingId(null);
    setEditedActivity(null);
  };
  // -----------------------------confirm edit ------------------------------------------------------
  const ConfirmModal = ({ 
    onConfirm, 
    onCancel 
  }: { 
    onConfirm: () => void; 
    onCancel: () => void 
  }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Confirm Changes</h3>
        <p className="mb-6">Are you sure you want to save these changes?</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm Changes</Button>
        </div>
      </div>
    </div>
  );
//------------------------------------------------------confirm save to backend--------------------
  const confirmSaveChanges = async () => {
    try {
      if (!editingId || !editedActivity) return;
  
      await inventoryAPI.updateActivity(editingId, editedActivity);
      
      // Update local state
      setActivities(prev => prev.map(a => 
        a._id === editingId ? { ...a, ...editedActivity } : a
      ));
      
      toast.success('Activity updated successfully');
      setShowConfirmModal(false);
      setEditingId(null);
      setEditedActivity(null);
    } catch (error) {
      toast.error('Failed to update activity');
      console.error(error);
    }
  };
  // Add this temporary debug code in your fetchData function:
// console.log(`Fetching item: ${API_URL}/${category}/${itemId}`);
// console.log(`Fetching activities: ${API_URL}/activities?itemId=${itemId}&category=${category}`);

  // Fetch item and activities
 // Fetch data
 useEffect(() => {
  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("user") || '';
      setLoading(true);
      
      // First fetch all items in the category
      const allItemsRes = await axios.get(`${API_URL}/${category}?userId=${userId}`);
      console.log('All items response:', allItemsRes);
      
      // Find the specific item by itemId
      const foundItem = allItemsRes.data.find((item: Item) => item._id === itemId);
      
      if (!foundItem) {
        throw new Error(`Item with ID ${itemId} not found in ${category} category`);
      }

      // Fetch activities for this item
      const activitiesRes = await axios.get(
        `${API_URL}/itemsactivity?itemId=${itemId}&category=${category}&userId=${userId}`
      );
      console.log('Activities response:', activitiesRes);

      // Set the item with proper defaults
      setItem({
        _id: foundItem._id,
        name: foundItem.name || 'Unnamed Item',
        quantity: Number(foundItem.quantity) || 0,
        currentStock: Number(foundItem.quantity) || 0,
        
       price: Number(foundItem.price) || 0,
        // Include any other necessary item properties
        ...foundItem
      });

      setActivities(activitiesRes.data || []);

    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to load data');
      } else {
        toast.error('Failed to load data');
      }
      console.error("Error fetching data:", error);
      setItem(null); // Clear item if there was an error
      setActivities([]); // Clear activities too
    } finally {
      setLoading(false);
    }
  };

  if (itemId && category) {
    fetchData();
  }
}, [itemId, category]);

  const handleReturn = async (activityId: string) => {
    try {
      await inventoryAPI.updateActivityReturn(activityId, true);
    
       // Find the activity
    const activity = activities.find(a => a._id === activityId);
    if (!activity || activity.type !== 'issue') return;

    // Calculate new currentStock
    if (!item) {
      throw new Error("Item data is not available");
    }
    const newCurrentStock = item.currentStock + activity.quantity;

    // Update item
    await axios.patch(`${API_URL}/${category}/${itemId}`, {
      currentStock: newCurrentStock,
    });
    
      setActivities(prev => prev.map(a => 
        a._id === activityId ? { ...a, returned: true } : a
      ));
      toast.success('Item marked as returned');
    } catch (error) {
      toast.error('Failed to update return status');
    }
  };

  const filteredActivities = activities.filter(activity => {
    // Search filter
    const matchesSearch = filter.search === '' || 
      activity.recipient.toLowerCase().includes(filter.search.toLowerCase()) ||
      activity.type.toLowerCase().includes(filter.search.toLowerCase());
    
    // Date filter
    const activityDate = new Date(activity.date);
    const matchesStartDate = !filter.startDate || activityDate >= filter.startDate;
    const matchesEndDate = !filter.endDate || activityDate <= filter.endDate;
    
    return matchesSearch && matchesStartDate && matchesEndDate;
  });


  if (loading) return <div>Loading...</div>;
  if (!item) return <div>Item not found</div>;


  return (
    <div className=" mt-[130px] mx-5  md:mx-auto   md:p-6">
     <div className="mb-8">
  <Button variant="outline" onClick={() => router.back()}>
    &larr; Back to Inventory
  </Button>
  <h1 className="text-3xl font-bold mt-4">
    {item?.name || 'Item'} Activity
    {!item?.name && <span className="text-red-500 text-sm">(Name not available)</span>}
  </h1>
  
  {item ? (
    <div className="xl:grid flex flex-nowrap grid-cols-4 gap-4 mt-4  overflow-x-auto ">
      <StatCard 
        label="Total Stock" 
        value={item.quantity ?? 0} 
      />
      <StatCard 

        label="Current Available" 
        value={item.currentStock ?? 0} 
      />
      <StatCard 
        label="Total Value" 
        value={`₦${ (item.totalSales + item.totalPurchases || 0).toLocaleString()}`} 
      />
      {category !== 'tools' && category !== 'supplies' && (
   <>
     <StatCard 
       label="Total Sales" 
       value={`₦${(item.totalSales|| 0).toLocaleString() }`} 
     />
     <StatCard 
       label="Total Purchases fee" 
       value={`₦${(item.totalPurchases || 0).toLocaleString()}`} 
     />
   </>
)}

    </div>
  ) : (
    <div className="text-red-500 mt-4">
      Item data not loaded. Please check:
      <ul className="list-disc pl-5 mt-2">
        <li>Your network connection</li>
        <li>API endpoint availability</li>
        <li>Console for detailed errors</li>
      </ul>
    </div>
  )}
</div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Input
      placeholder="Search transactions..."
      value={filter.search}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter({ ...filter, search: e.target.value })}
    />
    <DatePicker
      selected={filter.startDate}
      onChange={(date: Date | null) => handleDateChange(date, 'startDate')}
      selectsStart
      startDate={filter.startDate}
      endDate={filter.endDate}
      placeholderText="Start Date"
      className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
    />
    <DatePicker
      selected={filter.endDate}
      onChange={(date: Date | null) => handleDateChange(date, 'endDate')}
      selectsEnd
      startDate={filter.startDate}
      endDate={filter.endDate}
      minDate={filter.startDate || undefined}
      placeholderText="End Date"
      className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
    />
  </div>
</div>



      {/* Activity Table */}
      <div className="bg-white rounded-lg shadow">
  <div className="overflow-x-auto p-1"> {/* Added p-1 for mobile spacing */}
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-eweko_green_light rounded-lg ">
        <tr>
          {/* Make headers more spacious */}
          <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">Date / Time</th>
          <th className="px-3 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider whitespace-nowrap">Type</th>
          <th className="px-3 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider whitespace-nowrap">Quantity</th>
          <th className="px-3 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider whitespace-nowrap">
          Recipient
          </th>
          {category !== 'crops' && category !== 'livestock' && (   
            <th className="px-3 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider whitespace-nowrap">Returned ?</th>
          )}
          <th className="px-3 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider whitespace-nowrap">Amount per one</th>
          <th className="px-3 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider whitespace-nowrap">Total Amount</th>
          <th className="px-3 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider whitespace-nowrap">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredActivities.map((activity) => (
          <tr key={activity._id} className="hover:bg-gray-50">
            {/* More spacious cells with better padding */}
            <td className="px-3 py-4 whitespace-nowrap">
  {editingId === activity._id ? (
    <DatePicker
      selected={editedActivity?.date ? new Date(editedActivity.date) : new Date(activity.date)}
      onChange={(date) => handleEditChange('date', date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="MMMM d, yyyy h:mm aa"
      className="w-full p-1 border rounded"
    />
  ) : (
    <span className="text-sm text-gray-900">
      {new Date(activity.date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    </span>
  )}
</td>
             {/*------------------------------ Type ---------------------------*/}
    <td className="px-3 py-4 whitespace-nowrap">
      {editingId === activity._id ? (
        <Select
          value={editedActivity?.type || activity.type}
          onValueChange={(value) => handleEditChange('type', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="issue">Issue</SelectItem>
            <SelectItem value="sell">Sell</SelectItem>
            <SelectItem value="stockup">Stock Up</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${
          activity.type === 'stockup' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {activity.type}
        </span>
      )}
    </td>


           {/* Quantity */}
    <td className="px-3 py-4 whitespace-nowrap">
    {editingId === activity._id ? (
  <div className="grid grid-cols-3 gap-2">
    <div className="col-span-2">
      <Input
        type="number"
        value={editedActivity?.quantity || activity.quantity}
        onChange={(e) => handleEditChange('quantity', e.target.value)}
      />
    </div>
    <Select
      value={editedActivity?.unit || activity.unit}
      onValueChange={(unit) => handleEditChange('unit', unit)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Unit" />
      </SelectTrigger>
      <SelectContent>
      <SelectItem value="kg">Kilogram (kg)</SelectItem>
              <SelectItem value="g">Gram (g)</SelectItem>
              <SelectItem value="lbs">liter (L)</SelectItem>
              <SelectItem value="pcs">pieces (pcs)</SelectItem>
              <SelectItem value="L">MilliLiter (ml)</SelectItem>
              <SelectItem value="ctn">Carton</SelectItem>    
              <SelectItem value="crt">Crate</SelectItem>   
              <SelectItem value="b">Bottle</SelectItem>    
              <SelectItem value="bg">Bags</SelectItem>     
 
  
 
               </SelectContent>
    </Select>
  </div>
) : (
  <div>
    <span className="font-medium">{activity.quantity}</span>
    <span className="text-gray-500 text-[12px] ml-1">{activity.unit}</span>
  </div>
)}
    </td>


    {/* Recipient */}
    <td className="px-3 py-4 whitespace-nowrap">
      {editingId === activity._id ? (
        <Input
          value={editedActivity?.recipient || activity.recipient}
          onChange={(e) => handleEditChange('recipient', e.target.value)}
        />
      ) : (
        <span className="text-sm text-gray-900">{activity.recipient}</span>
      )}
    </td>


            {category !== 'crops' && category !== 'livestock' && (
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                {activity.type === 'issue' ? (
                  <input
                    type="checkbox"
                    checked={activity.returned}
                    onChange={() => handleReturn(activity._id)}
                    className="h-4 w-4 rounded text-green-600 focus:ring-green-500"
                  />
                ) : '---'}
              </td>
            )}


            {/* Price */}
    <td className="px-3 py-4 whitespace-nowrap">
      {editingId === activity._id ? (
        <Input
          type="number"
          value={editedActivity?.price || activity.price || ''}
          onChange={(e) => handleEditChange('price', e.target.value)}
          className="w-24"
        />
      ) : (
        <span className="text-sm text-gray-900">
          {activity.price ? `₦${activity.price.toLocaleString()}` : '---'}
        </span>
      )}
    </td>

            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
              ₦{((activity.price ?? 0) * activity.quantity).toLocaleString()}
            </td>
             {/* Actions */}
    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
      {editingId === activity._id ? (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowConfirmModal(true)}
          >
            Done
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={cancelEdit}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleEditClick(activity)}
          className="text-green-600 hover:text-green-900"
        >
         <Edit className="w-5 h-5" />
        </Button>
      )}
    </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      {/* Stock Trend Chart */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Stock Trend</h2>
        <StockLineChart
          data={activities
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map(activity => ({
              date: new Date(activity.date).toLocaleDateString(),
              value: activity.quantity * (activity.type === 'stockup' ? 1 : -1)
            }))}
          xKey="date"
          yKey="value"
        />
      </div>

      <AddActivityForm 
        itemId={itemId} 
        category={category} 
        name={item?.name}
        item={item}  // Add this prop

        onActivityAdded={() => {
          // Refresh activities after adding a new one
          const fetchActivities = async () => {
            const userId = localStorage.getItem("user") || '';
           
             // Re-fetch item
        const allItemsRes = await axios.get(`${API_URL}/${category}?userId=${userId}`);
        
      
        const foundItem = allItemsRes.data.find((item: Item) => item._id === itemId);
        setItem(foundItem);
  const activitiesRes = await inventoryAPI.getItemActivities(itemId as string, category as string, );
            setActivities(activitiesRes.data);
          
          };
          fetchActivities();
        }} 
      />
       {showConfirmModal && (
      <ConfirmModal
        onConfirm={confirmSaveChanges}
        onCancel={() => setShowConfirmModal(false)}
      />
    )}
    </div>
  );
};

const AddActivityForm = ({ itemId, category, name,item, onActivityAdded }: { itemId: string;  item: Item | null; category: string; name: string; onActivityAdded: () => void }) => {
    const [form, setForm] = useState({
        type: 'issue' as 'issue' | 'sell' |'stockup',
        quantity: '',
        price: '',
        recipient: '',
        description: '',
        date: new Date(),
        unit: 'pcs' // Default unit

      });
interface ActivityForm {
    type: string;
    quantity: string;
    recipient: string;
    description: string;
}

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!item) throw new Error("Item data not available");

      await inventoryAPI.createActivity({
        itemId,
        category,
        type: form.type,
        name: name ,
        quantity: Number(form.quantity),
        unit: form.unit,
        price: form.price ? Number(form.price) : undefined,
        recipient: form.recipient,
        description: form.description,
        editedBy: "Current User" // Replace with actual user from auth
      });

       // Calculate updates based on activity type
       let updatePayload = {};
       const quantity = Number(form.quantity);
       const price = Number(form.price || 0);
 
       switch(form.type) {
         case 'sell':
           updatePayload = {
             quantity: item.quantity - quantity,
             currentStock: item.currentStock - quantity,
             totalSales: (item.price || 0) + (quantity * price)
           };
           break;
           
         case 'stockup':
           updatePayload = {
             quantity: item.quantity + quantity,
             currentStock: item.currentStock + quantity,
             totalPurchases: (item.totalPurchases || 0) + (quantity * price)
           };
           break;
           
         case 'issue':
           updatePayload = {
             currentStock: item.currentStock - quantity
           };
           break;
       }
 
       // Update item with new values
       await axios.patch(`http://localhost:3002/${category}/${itemId}`, updatePayload);
      
      toast.success('Activity recorded successfully');
      onActivityAdded();
      setForm({
        type: 'issue',
        quantity: '',
        price: '',
        recipient: '',
        description: '',
        date: new Date(),
        unit: 'pcs'

      });
    } catch (error) {
      toast.error('Failed to record activity');
      console.error(error);
    }
  };






















  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Record New Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Activity Type</label>
            <Select
              value={form.type}
              onValueChange={(value: 'issue' | 'sell' | 'stockup') => 
                setForm({...form, type: value})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
              {category !== 'crops' && category !== 'livestock' && (
                <SelectItem value="issue">Issue</SelectItem>    )}

    {category !== 'tools' && category !== 'supplies' && (
      <SelectItem value="sell">Sell</SelectItem>
    )}
    <SelectItem value= 'stockup'>Stock up </SelectItem>
  </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <Input
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({...form, quantity: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price per unit </label>
            <Input
              type="number"
              value={form.price}
              onChange={(e) => setForm({...form, price: e.target.value})}
            />
          </div>
 <div>
          <label className="block text-sm font-medium mb-1">Unit</label>
          <Select
            value={form.unit}
            onValueChange={(value) => setForm({...form, unit: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="kg">Kilogram (kg)</SelectItem>
              <SelectItem value="g">Gram (g)</SelectItem>
              <SelectItem value="L">liter (L)</SelectItem>
              <SelectItem value="pcs">pieces (pcs)</SelectItem>
              <SelectItem value="ml">MilliLiter (ml)</SelectItem>
              <SelectItem value="ctn">Carton</SelectItem>    
              <SelectItem value="crt">Crate(s)</SelectItem>   
              <SelectItem value="b">Bottle</SelectItem>    
              <SelectItem value="bg">Bag(s)</SelectItem>  
            </SelectContent>
          </Select>
        </div>
          <div>
          <label className="block text-sm font-medium mb-1">
  {{
    sell: 'Sold To',
    stockup: 'Stored Where',
    issue: 'Issued To'
  }[form.type] || 'Sold To'} {/* Fallback to 'Sold To' if type doesn't match */}
</label>
            <Input
              value={form.recipient}
              onChange={(e) => setForm({...form, recipient: e.target.value})}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Date</label>
            <DatePicker
              selected={form.date}
              onChange={(date: Date | null) => date && setForm({...form, date})}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div> */}
        </div>

        <Button type="submit" className="w-full">
          Record Activity
        </Button>
      </form>
    </div>
  );


};

export default ItemActivityPage;