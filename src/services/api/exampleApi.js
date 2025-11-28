import apiService from 'src/services/apiService';

/**
 * Example API Module
 * This demonstrates how to create API modules using the centralized apiService
 */

// Example 1: Simple CRUD operations
export const productsApi = {
  // GET all products with filters
  getProducts: async (filters) =>
    apiService.get('/products', {
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      search: filters?.search,
      category: filters?.category,
      status: filters?.status,
    }),

  // GET single product
  getProduct: async (id) => apiService.get(`/products/${id}`),

  // POST create product
  createProduct: async (data) => apiService.post('/products', data),

  // PUT update product
  updateProduct: async (id, data) => apiService.put(`/products/${id}`, data),

  // PATCH partial update
  patchProduct: async (id, data) => apiService.patch(`/products/${id}`, data),

  // DELETE product
  deleteProduct: async (id) => apiService.delete(`/products/${id}`),
};

// Example 2: File upload
export const mediaApi = {
  // Upload single file
  uploadImage: async (file, metadata = {}) =>
    apiService.upload('/media/upload', {
      file,
      ...metadata,
    }),

  // Upload multiple files
  uploadMultiple: async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return apiService.upload('/media/upload-multiple', formData);
  },
};

// Example 3: File download
export const reportsApi = {
  // Download report
  downloadReport: async (reportId, format = 'pdf') =>
    apiService.download(
      `/reports/${reportId}/download`,
      { format },
      `report-${reportId}.${format}`
    ),

  // Export data
  exportData: async (filters) => apiService.download('/reports/export', filters, 'export.csv'),
};

// Example 4: Complex query parameters
export const analyticsApi = {
  getAnalytics: async (params) =>
    apiService.get('/analytics', {
      startDate: params.startDate,
      endDate: params.endDate,
      metrics: params.metrics, // Array: ['views', 'clicks', 'conversions']
      groupBy: params.groupBy,
      filters: params.filters, // Object will be JSON stringified
    }),
};

// Example 5: Using in React components
/*
import { productsApi } from 'src/services/api/exampleApi';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productsApi.getProducts({
          page: 1,
          limit: 20,
          status: 'active',
        });
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? 'Loading...' : products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
*/

// Example 6: Using with Redux Thunk
/*
import { productsApi } from 'src/services/api/exampleApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const data = await productsApi.getProducts(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
*/
