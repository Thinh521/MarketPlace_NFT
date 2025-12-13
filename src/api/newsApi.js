import axiosInstance from './axiosInstance';

export const getAllNewsRequest = async () => {
  try {
    const res = await axiosInstance.get('/api/news/get-all');

    return res.data;
  } catch (error) {
    console.error('Get all news request failed:', error);
    throw error.response?.data || {message: 'Get all news request failed'};
  }
};
