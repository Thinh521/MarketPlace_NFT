import axiosInstance from './axiosInstance';

export const toggleLikeRequest = async ({targetId, targetType}) => {
  try {
    const res = await axiosInstance.post('/api/like', {
      targetId,
      targetType,
    });

    return res.data;
  } catch (error) {
    console.error('Toggle like failed:', error);
    throw error.response?.data || {message: 'Toggle like failed'};
  }
};
