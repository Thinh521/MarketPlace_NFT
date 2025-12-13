import axiosInstance from './axiosInstance';

export const toggleFollowRequest = async ({followingAddressWallet}) => {
  try {
    const res = await axiosInstance.post('/api/follow', {
      followingAddressWallet,
    });

    return res.data;
  } catch (error) {
    console.error('Toggle follow failed:', error);
    throw error.response?.data || {message: 'Toggle follow failed'};
  }
};
