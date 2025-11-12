import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage if exists
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request for debugging (remove in production)
    console.log('📤 Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });

    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response for debugging (remove in production)
    console.log('📥 Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        if (response.data.success) {
          const { accessToken } = response.data.data;
          
          // Store new token
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', accessToken);
          }

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          window.location.href = '/admin/login';
        }
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    console.error('❌ Response Error:', {
      status: error.response?.status,
      message: error.response?.data || error.message,
      url: error.config?.url,
    });

    // Format error message
    const errorMessage =
      (error.response?.data as any)?.message ||
      error.message ||
      'An unexpected error occurred';

    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

// Helper functions for common operations
export const api = {
  // GET request
  get: async <T = any>(url: string, params?: any) => {
    const response = await axiosInstance.get<T>(url, { params });
    return response.data;
  },

  // POST request
  post: async <T = any>(url: string, data?: any) => {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
  },

  // PUT request
  put: async <T = any>(url: string, data?: any) => {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
  },

  // PATCH request
  patch: async <T = any>(url: string, data?: any) => {
    const response = await axiosInstance.patch<T>(url, data);
    return response.data;
  },

  // DELETE request
  delete: async <T = any>(url: string) => {
    const response = await axiosInstance.delete<T>(url);
    return response.data;
  },

  // Upload file with FormData
  upload: async <T = any>(url: string, formData: FormData, onUploadProgress?: (progressEvent: any) => void) => {
    const response = await axiosInstance.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return response.data;
  },
};

export default axiosInstance;
