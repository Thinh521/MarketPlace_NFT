import axiosInstance from './axiosInstance';

export const getAllArtistApi = async ({
  timeRange = '24h',
  sortBy = 'all',
  page = 1,
  limit = 10,
}) => {
  try {
    const res = await axiosInstance.get('/api/user/get-all-artist', {
      params: {
        timeRange,
        sortBy,
        page,
        limit,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Get all artist failed:', error);
    throw error.response?.data || {message: 'Get all artist failed'};
  }
};
