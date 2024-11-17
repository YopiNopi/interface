import axios from 'axios';
import { Market } from '@/types/market';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.gpm.lol/api';
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || '73282af8f3d247ca9dfd90bccbe673d3';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

interface ApiResponse {
  items: Market[];
  // add other response fields if any
}

export const getActiveMarkets = async (): Promise<ApiResponse> => {
  try {
    const response = await api.post('/getActiveMarkets', {
      token: API_TOKEN
    });
    console.log('getActiveMarkets', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to get active markets:', error.response?.data || error.message);
    throw error;
  }
}
