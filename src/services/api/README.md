# API Service Documentation

## Overview

The centralized `apiService` provides common HTTP methods (GET, POST, PUT, DELETE, PATCH) with built-in query parameter handling using the `toQueryParams` utility.

## Benefits

- **Centralized Logic**: Modify API behavior in one place
- **Automatic Query Params**: Objects are automatically converted to query strings
- **Consistent Error Handling**: All requests go through the same error handling
- **Type Safety**: Clear method signatures for all HTTP methods
- **Additional Utilities**: Built-in upload and download methods

## Usage

### Basic Import

```javascript
import apiService from 'src/services/apiService';
```

### GET Request

```javascript
// Simple GET
const data = await apiService.get('/users');

// GET with query parameters (automatically converted)
const users = await apiService.get('/users', {
  page: 1,
  limit: 10,
  search: 'john',
  status: 'active',
  roles: ['admin', 'user'], // Arrays are handled automatically
});
// URL: /users?page=1&limit=10&search=john&status=active&roles[]=admin&roles[]=user

// GET with additional config
const data = await apiService.get(
  '/users',
  { page: 1 },
  {
    headers: { 'Custom-Header': 'value' },
  }
);
```

### POST Request

```javascript
// Simple POST
const newUser = await apiService.post('/users', {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
});

// POST with custom config
const data = await apiService.post('/users', userData, {
  headers: { 'Custom-Header': 'value' },
});
```

### PUT Request

```javascript
// Update user
const updatedUser = await apiService.put('/users/123', {
  name: 'Jane Doe',
  email: 'jane@example.com',
});
```

### PATCH Request

```javascript
// Partial update
const result = await apiService.patch('/users/123', {
  status: 'inactive',
});
```

### DELETE Request

```javascript
// Simple DELETE
await apiService.delete('/users/123');

// DELETE with query parameters
await apiService.delete('/users/bulk', {
  ids: [1, 2, 3],
  force: true,
});
// URL: /users/bulk?ids[]=1&ids[]=2&ids[]=3&force=true
```

### File Upload

```javascript
// Using FormData
const formData = new FormData();
formData.append('file', fileObject);
formData.append('name', 'Document Name');

const result = await apiService.upload('/upload', formData);

// Using object (automatically converted to FormData)
const result = await apiService.upload('/upload', {
  file: fileObject,
  name: 'Document Name',
  tags: ['important', 'work'],
});

// With progress tracking
const result = await apiService.upload('/upload', formData, {
  onUploadProgress: (progressEvent) => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    console.log(`Upload Progress: ${percentCompleted}%`);
  },
});
```

### File Download

```javascript
// Download without triggering browser download
const blob = await apiService.download('/reports/123');

// Download with automatic browser download
await apiService.download('/reports/123', {}, 'report.pdf');

// Download with query parameters
await apiService.download(
  '/reports/export',
  {
    format: 'pdf',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  'annual-report.pdf'
);
```

## Creating New API Modules

When creating a new API module, follow this pattern:

```javascript
// src/services/api/productsApi.js
import apiService from 'src/services/apiService';
import { PRODUCTS_ENDPOINTS } from 'src/services/endpoints';

export const productsApi = {
  // GET with query params
  getProducts: async (params) => apiService.get(PRODUCTS_ENDPOINTS.LIST, params),

  // GET single item
  getProduct: async (id) => apiService.get(PRODUCTS_ENDPOINTS.DETAIL(id)),

  // POST
  createProduct: async (data) => apiService.post(PRODUCTS_ENDPOINTS.CREATE, data),

  // PUT
  updateProduct: async (id, data) => apiService.put(PRODUCTS_ENDPOINTS.UPDATE(id), data),

  // PATCH
  patchProduct: async (id, data) => apiService.patch(PRODUCTS_ENDPOINTS.UPDATE(id), data),

  // DELETE
  deleteProduct: async (id) => apiService.delete(PRODUCTS_ENDPOINTS.DELETE(id)),

  // Upload product image
  uploadImage: async (id, file) =>
    apiService.upload(PRODUCTS_ENDPOINTS.UPLOAD_IMAGE(id), { image: file }),

  // Export products
  exportProducts: async (params) =>
    apiService.download(PRODUCTS_ENDPOINTS.EXPORT, params, 'products.csv'),
};
```

## Query Parameters Options

The `toQueryParams` function (used internally) supports options:

```javascript
// In apiService.js, you can modify toQueryParams behavior globally
// or pass custom options if needed

// Default behavior:
// - Skips null/undefined values
// - Uses bracket format for arrays: tags[]=a&tags[]=b

// To change globally, modify apiService.js
```

## Error Handling

All methods throw errors that can be caught:

```javascript
try {
  const users = await apiService.get('/users', { page: 1 });
} catch (error) {
  // Error is already handled by axios interceptor
  // Additional handling here if needed
  console.error('Failed to fetch users:', error);
}
```

## Advanced Usage

### Custom Headers

```javascript
const data = await apiService.get(
  '/users',
  {},
  {
    headers: {
      'X-Custom-Header': 'value',
      Authorization: 'Bearer custom-token', // Override default
    },
  }
);
```

### Request Timeout

```javascript
const data = await apiService.get(
  '/users',
  {},
  {
    timeout: 5000, // 5 seconds
  }
);
```

### Cancel Requests

```javascript
import axios from 'axios';

const source = axios.CancelToken.source();

const promise = apiService.get(
  '/users',
  {},
  {
    cancelToken: source.token,
  }
);

// Cancel the request
source.cancel('Request cancelled by user');
```

## Migration Guide

### Before (Old Way)

```javascript
import axiosInstance from 'src/services/axios';

export const usersApi = {
  getUsers: async (params) => {
    const response = await axiosInstance.get('/users', { params });
    return response.data;
  },
};
```

### After (New Way)

```javascript
import apiService from 'src/services/apiService';

export const usersApi = {
  getUsers: async (params) => apiService.get('/users', params),
};
```

## Notes

- All methods automatically return `response.data`, no need to extract it
- Query parameters are automatically URL-encoded
- Null/undefined values are automatically filtered out
- Arrays in query params use bracket notation by default
- The underlying axios instance still handles authentication and interceptors
