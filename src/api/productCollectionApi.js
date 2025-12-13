import axiosInstance from './axiosInstance';

// Get product collection by user
export const getProductCollectionRequest = async () => {
  try {
    const res = await axiosInstance.get('/api/collection/get-all-owned');

    return res.data;
  } catch (error) {
    console.error('Get product collection request failed:', error);
    throw (
      error.response?.data || {message: 'Get product collection request failed'}
    );
  }
};

// Get all product collections
export const getProductCollectionAllRequest = async () => {
  try {
    const res = await axiosInstance.get('/api/collection/get-all');

    return res.data;
  } catch (error) {
    console.error('Get all product collections failed:', error);
    throw (
      error.response?.data || {message: 'Get all product collections failed'}
    );
  }
};

// Get all products by collection
export const getProductByCollectionRequest = async collectionId => {
  try {
    if (!collectionId) {
      throw new Error('collectionId is required');
    }

    const res = await axiosInstance.get('/api/product/get-by-collection', {
      params: {collectionId},
    });

    return res.data;
  } catch (error) {
    console.error('Get products by collection failed:', error);
    throw (
      error.response?.data || {message: 'Get products by collection failed'}
    );
  }
};

// Create product collection
export const createProductCollectionRequest = async formData => {
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

    const res = await axiosInstance.post('/api/collection', form, {
      headers: {'Content-Type': 'multipart/form-data'},
    });

    return res.data;
  } catch (error) {
    console.error('Create product collection failed:', error);
    throw error.response?.data || {message: 'Create product collection failed'};
  }
};

// Update product collection
export const updateProductCollectionRequest = async formData => {
  try {
    if (!formData.id) {
      throw new Error('Collection ID is required');
    }

    const form = new FormData();
    form.append('id', formData.id);

    if (formData.image) {
      form.append('image', {
        uri: formData.image.uri,
        type: formData.image.type || 'image/jpeg',
        name: formData.image.fileName || 'upload.jpg',
      });
    }

    form.append('name', formData.name);
    form.append('description', formData.description);

    const res = await axiosInstance.put('/api/collection', form, {
      headers: {'Content-Type': 'multipart/form-data'},
    });

    return res.data;
  } catch (error) {
    console.error('Update product collection failed:', error);
    throw error.response?.data || {message: 'Update product collection failed'};
  }
};

// Delete product collection
export const deleteProductCollectionRequest = async collectionId => {
  try {
    if (!collectionId) {
      throw new Error('Collection ID is required');
    }

    const res = await axiosInstance.delete(`/api/collection/${collectionId}`);

    return res.data;
  } catch (error) {
    console.error('Delete product collection failed:', error);
    throw error.response?.data || {message: 'Delete product collection failed'};
  }
};

// Add or remove product from collection
export const updateProductInCollectionRequest = async data => {
  try {
    const {productIds, collectionId, type, listingId} = data;

    if (!Array.isArray(productIds) || productIds.length === 0) {
      throw new Error('productIds must be a non-empty array');
    }
    if (!collectionId) {
      throw new Error('collectionId is required');
    }
    if (!type || !['add', 'remove'].includes(type)) {
      throw new Error("type must be either 'add' or 'remove'");
    }

    const body = {
      productIds,
      collectionId,
      type,
    };

    if (listingId) {
      body.listingId = listingId;
    }

    const res = await axiosInstance.put(
      '/api/collection/product-collection',
      body,
    );

    return res.data;
  } catch (error) {
    console.error('Update product in collection failed:', error);
    throw (
      error.response?.data || {
        message: 'Update product in collection failed',
      }
    );
  }
};
