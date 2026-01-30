// src/services/markerService.ts
// Ensure axios is installed: run `npm install axios` in your project root
import axios from 'axios';

export interface WeatherMarker {
  id?: string;
  label: string;
  latitude: number;
  longitude: number;
  createdAt?: string;
}

// Use environment variable for API base URL, fallback to local proxy path
// Use environment variable for API base URL with fallback
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001';
const API_URL = `${API_BASE_URL}/api/WeatherMarkers`;

export const getMarkers = async (): Promise<WeatherMarker[]> => {
    try {
        const res = await axios.get(API_URL);
        return res.data as WeatherMarker[];
    } catch (error) {
        console.error('Failed to fetch markers:', error);
        return [];        
    }
};

export const addMarker = async (marker: Omit<WeatherMarker, 'id' | 'createdAt'>): Promise<WeatherMarker> => {
    try {
    const res = await axios.post(API_URL, marker);
  return res.data as WeatherMarker;
    }
    catch (error) {
        console.error('Failed to add marker:', error);
         throw error;
    }
};

export const deleteMarker = async (id: string) => {
  
  try {
      await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
      console.error('Failed to delete marker:', error);
  }
};

export const updateMarker = async (id: string, marker: Omit<WeatherMarker, 'id' | 'createdAt'>) => {
  await axios.put(`${API_URL}/${id}`, marker);
};
