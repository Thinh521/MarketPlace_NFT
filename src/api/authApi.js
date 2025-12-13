import axiosInstance from './axiosInstance';

export const loginRequest = async addressWallet => {
  try {
    const res = await axiosInstance.post('/api/authentication/login', {
      addressWallet,
    });
    return res.data;
  } catch (error) {
    console.error('Login request failed:', error);
    throw error.response?.data || {message: 'Login request failed'};
  }
};

export const signatureRequest = async (addressWallet, signature) => {
  try {
    const res = await axiosInstance.post('/api/authentication/signature', {
      addressWallet,
      signature,
    });
    return res.data;
  } catch (error) {
    console.error('Signature request failed:', error);
    throw error.response?.data || {message: 'Signature request failed'};
  }
};
