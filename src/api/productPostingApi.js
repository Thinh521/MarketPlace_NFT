import axiosInstance from './axiosInstance';

export const sellProductRequest = async data => {
  try {
    const payload = {
      id: data.id,
      price: data.price,
      type: data.type === 'onAuction' ? 'onAuction' : 'buyNow',
      quantity: parseInt(data.quantity, 10),
    };

    if (data.type === 'onAuction') {
      payload.startTime = data.startTime;
      payload.endTime = data.endTime;
    }

    const res = await axiosInstance.put('/api/product/post-product', payload);

    console.log('sellProductRequest', res.data);

    return res.data;
  } catch (error) {
    console.error('sellProductRequest failed:', error);
    throw error.response?.data || {message: 'Sell product request failed'};
  }
};
