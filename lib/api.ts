import axios from './axios';

// ==================== PRODUCTS ====================
export const productsApi = {
  getAll: async (params?: { page?: number; limit?: number; category?: string; minPrice?: number; maxPrice?: number }) => {
    const response = await axios.get('/products', { params });
    return response.data;
  },
  
  search: async (query: string, category?: string) => {
    const response = await axios.get('/products/search', { 
      params: { q: query, category } 
    });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await axios.get(`/products/${id}`);
    return response.data;
  },
  
  create: async (data: any) => {
    const response = await axios.post('/products', data);
    return response.data;
  },
  
  update: async (id: string, data: any) => {
    const response = await axios.put(`/products/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await axios.delete(`/products/${id}`);
    return response.data;
  }
};

// ==================== CATEGORIES ====================
export const categoriesApi = {
  getAll: async () => {
    const response = await axios.get('/categories');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await axios.get(`/categories/${id}`);
    return response.data;
  },
  
  create: async (data: any) => {
    const response = await axios.post('/categories', data);
    return response.data;
  },
  
  update: async (id: string, data: any) => {
    const response = await axios.put(`/categories/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await axios.delete(`/categories/${id}`);
    return response.data;
  }
};

// ==================== FLAVORS ====================
export const flavorsApi = {
  getAll: async () => {
    const response = await axios.get('/flavors');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await axios.get(`/flavors/${id}`);
    return response.data;
  },
  
  create: async (data: any) => {
    const response = await axios.post('/flavors', data);
    return response.data;
  },
  
  update: async (id: string, data: any) => {
    const response = await axios.put(`/flavors/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await axios.delete(`/flavors/${id}`);
    return response.data;
  },
  
  assignToProduct: async (flavorId: string, productId: string) => {
    const response = await axios.post(`/flavors/${flavorId}/products/${productId}`);
    return response.data;
  },
  
  removeFromProduct: async (flavorId: string, productId: string) => {
    const response = await axios.delete(`/flavors/${flavorId}/products/${productId}`);
    return response.data;
  }
};

// ==================== DISCOUNTS ====================
export const discountsApi = {
  getAll: async () => {
    const response = await axios.get('/discounts');
    return response.data;
  },
  
  validate: async (code: string, orderAmount: number) => {
    const response = await axios.post('/discounts/validate', { code, orderAmount });
    return response.data;
  },
  
  create: async (data: any) => {
    const response = await axios.post('/discounts', data);
    return response.data;
  },
  
  update: async (id: string, data: any) => {
    const response = await axios.put(`/discounts/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await axios.delete(`/discounts/${id}`);
    return response.data;
  }
};

// ==================== NEWSLETTER ====================
export const newsletterApi = {
  subscribe: async (email: string) => {
    const response = await axios.post('/newsletter/subscribe', { email });
    return response.data;
  },
  
  unsubscribe: async (email: string) => {
    const response = await axios.post('/newsletter/unsubscribe', { email });
    return response.data;
  },
  
  getAll: async () => {
    const response = await axios.get('/newsletter');
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await axios.delete(`/newsletter/${id}`);
    return response.data;
  }
};

// ==================== CONTACT ====================
export const contactApi = {
  send: async (data: { name: string; email: string; subject: string; message: string }) => {
    const response = await axios.post('/contact', data);
    return response.data;
  },
  
  getAll: async (status?: string) => {
    const response = await axios.get('/contact', { params: { status } });
    return response.data;
  },
  
  updateStatus: async (id: string, status: string) => {
    const response = await axios.put(`/contact/${id}`, { status });
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await axios.delete(`/contact/${id}`);
    return response.data;
  }
};

// ==================== REVIEWS ====================
export const reviewsApi = {
  getByProduct: async (productId: string) => {
    const response = await axios.get(`/reviews/product/${productId}`);
    return response.data;
  },
  
  create: async (data: { productId: string; rating: number; title?: string; comment: string }) => {
    const response = await axios.post('/reviews', data);
    return response.data;
  },
  
  update: async (id: string, data: any) => {
    const response = await axios.put(`/reviews/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await axios.delete(`/reviews/${id}`);
    return response.data;
  },
  
  // Admin
  getAll: async () => {
    const response = await axios.get('/admin/reviews');
    return response.data;
  },
  
  moderate: async (id: string, data: { isActive: boolean; isVerified: boolean }) => {
    const response = await axios.put(`/admin/reviews/${id}/moderate`, data);
    return response.data;
  }
};

// ==================== FAVORITES ====================
export const favoritesApi = {
  getAll: async () => {
    const response = await axios.get('/favorites');
    return response.data;
  },
  
  add: async (productId: string) => {
    const response = await axios.post('/favorites', { productId });
    return response.data;
  },
  
  remove: async (productId: string) => {
    const response = await axios.delete(`/favorites/${productId}`);
    return response.data;
  }
};

// ==================== CART ====================
export const cartApi = {
  getAll: async () => {
    const response = await axios.get('/cart');
    return response.data;
  },
  
  add: async (productId: string, quantity: number = 1) => {
    const response = await axios.post('/cart', { productId, quantity });
    return response.data;
  },
  
  update: async (productId: string, quantity: number) => {
    const response = await axios.put(`/cart/${productId}`, { quantity });
    return response.data;
  },
  
  remove: async (productId: string) => {
    const response = await axios.delete(`/cart/${productId}`);
    return response.data;
  },
  
  clear: async () => {
    const response = await axios.delete('/cart');
    return response.data;
  }
};

// ==================== ORDERS ====================
export const ordersApi = {
  create: async (data: {
    shippingFirstName: string;
    shippingLastName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingZipCode: string;
    shippingCountry: string;
    shippingPhone?: string;
    paymentMethod?: string;
    notes?: string;
    guestEmail?: string;
    items?: Array<{ productId: string; quantity: number }>;
  }) => {
    const response = await axios.post('/orders', data);
    return response.data;
  },
  
  getMyOrders: async (page: number = 1, limit: number = 10) => {
    const response = await axios.get('/orders/my-orders', { params: { page, limit } });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await axios.get(`/orders/${id}`);
    return response.data;
  },
  
  // Admin
  getAll: async (params?: { page?: number; limit?: number; status?: string }) => {
    const response = await axios.get('/orders', { params });
    return response.data;
  },
  
  updateStatus: async (id: string, data: { status?: string; paymentStatus?: string }) => {
    const response = await axios.put(`/orders/${id}/status`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await axios.delete(`/admin/orders/${id}`);
    return response.data;
  }
};

// ==================== ADDRESSES ====================
export const addressesApi = {
  getAll: async () => {
    const response = await axios.get('/addresses');
    return response.data;
  },
  
  create: async (data: any) => {
    const response = await axios.post('/addresses', data);
    return response.data;
  },
  
  update: async (id: string, data: any) => {
    const response = await axios.put(`/addresses/${id}`, data);
    return response.data;
  },
  
  setDefault: async (id: string) => {
    const response = await axios.patch(`/addresses/${id}/default`);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await axios.delete(`/addresses/${id}`);
    return response.data;
  }
};

// ==================== INVENTORY ====================
export const inventoryApi = {
  getLogs: async (page: number = 1, limit: number = 20) => {
    const response = await axios.get('/inventory/logs', { params: { page, limit } });
    return response.data;
  },
  
  adjustStock: async (data: {
    productId: string;
    type: string;
    quantity: number;
    reason?: string;
    notes?: string;
  }) => {
    const response = await axios.post('/inventory/adjust', data);
    return response.data;
  },
  
  getLowStock: async (threshold: number = 10) => {
    const response = await axios.get('/inventory/low-stock', { params: { threshold } });
    return response.data;
  },
  
  getSummary: async () => {
    const response = await axios.get('/inventory/summary');
    return response.data;
  }
};

// ==================== RETURNS ====================
export const returnsApi = {
  create: async (data: {
    orderId: string;
    reason: string;
    description?: string;
    images?: string[];
  }) => {
    const response = await axios.post('/returns', data);
    return response.data;
  },
  
  getMyReturns: async () => {
    const response = await axios.get('/returns');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await axios.get(`/returns/${id}`);
    return response.data;
  },
  
  cancel: async (id: string) => {
    const response = await axios.delete(`/returns/${id}`);
    return response.data;
  },
  
  // Admin
  getAll: async (status?: string) => {
    const response = await axios.get('/returns/admin/all', { params: { status } });
    return response.data;
  },
  
  process: async (id: string, data: {
    status: string;
    adminNotes?: string;
    refundMethod?: string;
  }) => {
    const response = await axios.put(`/returns/admin/${id}/process`, data);
    return response.data;
  }
};

// ==================== ADMIN ====================
export const adminApi = {
  getDashboard: async () => {
    const response = await axios.get('/admin/dashboard');
    return response.data;
  },
  
  getUsers: async () => {
    const response = await axios.get('/admin/users');
    return response.data;
  },
  
  updateUser: async (id: string, data: { role?: string; isActive?: boolean }) => {
    const response = await axios.put(`/admin/users/${id}`, data);
    return response.data;
  },
  
  deleteUser: async (id: string) => {
    const response = await axios.delete(`/admin/users/${id}`);
    return response.data;
  }
};

// ==================== WHOLESALE ====================
export const wholesaleApi = {
  submitInquiry: async (data: {
    FirstName: string;
    LastName: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    const response = await axios.post('/wholesale/inquiry', data);
    return response.data;
  },
  
  getInquiries: async (params?: { page?: number; limit?: number; status?: string }) => {
    const response = await axios.get('/wholesale/inquiries', { params });
    return response.data;
  },
  
  updateInquiryStatus: async (id: string, status: string) => {
    const response = await axios.put(`/wholesale/inquiries/${id}`, { status });
    return response.data;
  }
};


export const authApi = {
  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    const response = await axios.post('/auth/register', data);
    return response.data;
  },
  
  login: async (email: string, password: string) => {
    const response = await axios.post('/auth/login', { email, password });
    return response.data;
  },
  
  logout: async () => {
    const response = await axios.post('/auth/logout');
    return response.data;
  },
  
  refresh: async () => {
    const response = await axios.post('/auth/refresh');
    return response.data;
  }
};

export default {
  products: productsApi,
  categories: categoriesApi,
  flavors: flavorsApi,
  discounts: discountsApi,
  newsletter: newsletterApi,
  contact: contactApi,
  reviews: reviewsApi,
  favorites: favoritesApi,
  cart: cartApi,
  orders: ordersApi,
  addresses: addressesApi,
  inventory: inventoryApi,
  returns: returnsApi,
  admin: adminApi,
  auth: authApi,
  wholesale: wholesaleApi
};




