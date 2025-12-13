import axiosInstance from './axiosInstance';

export const getActivityRequest = async ({page = 1, limit = 10}) => {
  try {
    const res = await axiosInstance.get('/api/activity/all-activities', {
      params: {
        page,
        limit,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Get activity request failed:', error);
    throw error.response?.data || {message: 'Get activity request failed'};
  }
};
