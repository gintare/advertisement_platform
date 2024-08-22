import axios from 'axios';
import { getDefaultToken } from './service';
const API_URL = import.meta.env.VITE_API_URL;

export const postData = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

export const postRegister = async (data) => {
  try {
    let response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

export const loginPost = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

export const postCategory = async (data) => {
  try {
    const userToken = getDefaultToken();
    const response = await axios.post(`${API_URL}/api/categories`, data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Cache-Control': 'no-cache',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save category: ${error.message}`);
  }
};

export const postAdvertisement = async (category_id, data) => {
  try {
    const userToken = getDefaultToken();
    const response = await axios.post(`${API_URL}/api/categories/${category_id}/advertisements`, data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Cache-Control': 'no-cache',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save advertisement: ${error.message}`);
  }
};

