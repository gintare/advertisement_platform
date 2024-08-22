import axios from 'axios';
import { getDefaultToken } from './service';
const API_URL = import.meta.env.VITE_API_URL;

export const getAllData = async () => {
  try {
    const resp = await axios.get(API_URL);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getOne = async (id) => {
  try {
    const resp = await axios.get(`${API_URL}/${id}`);
    return resp.data;
  } catch (error) {
    console.error(`Error fetching data for ID ${id}: ${error.message}`);
  }
};

export const getCategries = async () => {
  try {
    const userToken = getDefaultToken();
    const resp = await axios.get(`${API_URL}/api/categories`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Cache-Control': 'no-cache',
      },
    });
    return resp.data;
  } catch (error) {
    console.error(`Error fetching data : ${error.message}`);
  }
};

export const getAdvertisements = async () => {
  try {
    const resp = await axios.get(`${API_URL}/api/advertisements`);
    return resp.data;
  } catch (error) {
    console.error(`Error fetching data : ${error.message}`);
  }
};
