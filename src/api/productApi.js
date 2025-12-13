import axiosInstance from './axiosInstance';

// Get product detail
export const getOneProductRequest = async (
  productId,
  listingId = null,
  addressWallet = null,
) => {
  try {
    const res = await axiosInstance.get('/api/product/get-one', {
      params: {
        productId,
        listingId,
        addressWallet: addressWallet || undefined,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Get one product request failed:', error);
    throw error.response?.data || {message: 'Get one product request failed'};
  }
};

// Get all NFT products
export const getAllProductsRequest = async ({
  addressWallet,
  page = 1,
  limit = 10,
}) => {
  try {
    const res = await axiosInstance.get('/api/product/get-all', {
      params: {
        addressWallet: addressWallet || undefined,
        page,
        limit,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Get all products request failed:', error);
    throw error.response?.data || {message: 'Get all products request failed'};
  }
};

// Get all NFT products by user
export const getAllOwnedProductsRequest = async () => {
  try {
    const res = await axiosInstance.get('/api/product/get-all-owned');

    return res.data;
  } catch (error) {
    console.error('[API] getAllOwnedProductsRequest failed:', error);
    throw (
      error.response?.data || {message: 'Get all owned products request failed'}
    );
  }
};

// Get product activity by product
export const getProductActivityRequest = async productId => {
  try {
    const res = await axiosInstance.get(`/api/activity/get-all/${productId}`);

    return res.data;
  } catch (error) {
    console.error('getProductActivityRequest error:', error);
    throw error;
  }
};

// Get all sold products by user
export const getAllSoldProductsRequest = async () => {
  try {
    const res = await axiosInstance.get('/api/product/get-sold');

    return res.data;
  } catch (error) {
    console.error('[API] getAllSoldProductsRequest failed:', error);
    throw error.response?.data || {message: 'Get sold products request failed'};
  }
};

// Create product NFT
export const createProductRequest = async formData => {
  try {
    const form = new FormData();

    if (formData.image) {
      form.append('image', {
        uri: formData.image.uri,
        type: formData.image.type || 'image/jpeg',
        name: formData.image.fileName || 'upload.jpg',
      });
    }

    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('externalLink', formData.externalLink || '');
    form.append('supply', formData.supply);
    form.append('blockchain', formData.blockchain);

    if (typeof formData.price === 'number') {
      form.append('price', String(formData.price));
    }

    if (typeof formData.isFreeze === 'boolean') {
      form.append('isFreeze', String(formData.isFreeze));
    }

    if (formData.properties && formData.properties.length > 0) {
      formData.properties.forEach((prop, index) => {
        form.append(`properties[${index}][type]`, prop.type);
        form.append(`properties[${index}][name]`, prop.name);
      });
    }

    const res = await axiosInstance.post('/api/product', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.error('Create product request failed:', error);
    throw error.response?.data || {message: 'Create product request failed'};
  }
};

// Update Product NFT
export const updateProductRequest = async formData => {
  try {
    if (!formData.id) {
      throw new Error('Product ID is required');
    }

    const form = new FormData();
    form.append('id', formData.id);

    if (formData.name) form.append('name', formData.name);
    if (formData.description) form.append('description', formData.description);

    if (formData.image) {
      form.append('image', {
        uri: formData.image.uri,
        type: formData.image.type || 'image/jpeg',
        name: formData.image.fileName || 'upload.jpg',
      });
    }

    form.append('externalLink', formData.externalLink || '');
    if (typeof formData.price === 'number')
      form.append('price', formData.price);
    if (typeof formData.isFreeze === 'boolean')
      form.append('isFreeze', formData.isFreeze);

    if (formData.properties && formData.properties.length > 0) {
      formData.properties.forEach((prop, index) => {
        form.append(`properties[${index}][type]`, prop.type);
        form.append(`properties[${index}][name]`, prop.name);
      });
    }

    if (formData.supply) form.append('supply', formData.supply);
    if (formData.blockchain) form.append('blockchain', formData.blockchain);

    const res = await axiosInstance.put('/api/product', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('updateProductRequest', res.data);

    return res.data;
  } catch (error) {
    console.error('Update product request failed:', error);
    throw error.response?.data || {message: 'Update product request failed'};
  }
};
