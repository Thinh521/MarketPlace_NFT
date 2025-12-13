import axiosInstance from './axiosInstance';

export const updateProductView = async productId => {
  try {
    const res = await axiosInstance.put('/api/view', {productId});

    return res.data;
  } catch (error) {
    console.error('Update product view request failed:', error);
    throw (
      error.response?.data || {message: 'Update product view request failed'}
    );
  }
};
