import axiosInstance from './axiosInstance';

export const getCurrentUserRequest = async () => {
  try {
    const res = await axiosInstance.get('/api/user');

    return res.data;
  } catch (error) {
    console.error('getCurrentUserRequest API error:', error);
    throw error.response?.data || {message: 'Failed to fetch user'};
  }
};

export const getUserProfileRequest = async addressWallet => {
  try {
    const res = await axiosInstance.get('/api/user/get-profile', {
      params: {addressWallet},
    });

    return res.data;
  } catch (error) {
    console.error('Get profile request failed:', error);
    throw error.response?.data || {message: 'Get profile request failed'};
  }
};

export const updateUserProfileRequest = async data => {
  try {
    const formData = new FormData();

    formData.append('userName', data.userName);
    formData.append('fullName', data.fullName);
    formData.append('bio', data.bio);

    if (data.avatar) {
      formData.append('avatar', {
        uri: data.avatar.uri,
        type: data.avatar.type || 'image/jpeg',
        name: data.avatar.fileName || 'avatar.jpg',
      });
    }

    const res = await axiosInstance.put('/api/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.error('Update profile request failed:', error);
    throw error;
  }
};
