// lib/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_APIURL;


// src/types/inventory.ts
export interface Activity {
  _id: string;
  itemId: string;
  category: string;
  type: 'issue' | 'sell' | 'stockup';
  name: string;
  quantity: number;
  price?: number;
  recipient: string;
  description?: string;
  returned?: boolean;
  editedBy: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  unit ?: string; // default if not provided
}
const updateActivity = async (
  activityId: string,
  updateData: {
    type?: string;
    quantity?: number;
    price?: number;
    recipient?: string;
    description?: string;
    returned?: boolean;
    date?: Date;
    unit?: string; // default if not provided
  }
): Promise<Activity> => {
  const userId = localStorage.getItem('user') || '';
  const response = await axios.patch(`${API_URL}/itemsactivity/${activityId}`, updateData, {
  });
  return response.data.data;
};
export const inventoryAPI = {
  // Activities
  createActivity: (data: {
    itemId: string;
    category: string;
    type: 'issue' | 'sell' | 'stockup';
    name: string;
    quantity: number;
    price?: number;
    recipient: string;
    description?: string;
    editedBy: string;
    unit?: string; // default if not provided
  }) => axios.post(`${API_URL}/itemsactivity`, data),

  getItemActivities: (itemId: string, category: string,) => 
    axios.get(`${API_URL}/itemsactivity`, { params: { itemId, category 
    } }),

  updateActivityReturn: (activityId: string, returned: boolean) =>
    axios.patch(`${API_URL}/itemsactivity/${activityId}/return`, { returned }),

  // Items
  getItem: (itemId: string, category: string) => 
    axios.get(`${API_URL}/${category}/${itemId}`),

  updateActivity

};