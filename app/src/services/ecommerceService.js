import api from './api'

export const ecommerceService = {
  getUsers: () => api.get('/users'),
  createUser: (payload) => api.post('/users', payload),
  updateUser: (id, payload) => api.put(`/users/${id}`, payload),
  getOrders: () => api.get('/orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  deleteOrder: (id) => api.delete(`/orders/${id}`),
  createCategory: (payload) => api.post('/categories', payload),
  updateCategory: (id, payload) => api.put(`/categories/${id}`, payload),
  getProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (payload) => api.post('/products', payload),
  updateProduct: (id, payload) => api.put(`/products/${id}`, payload),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  createOrder: (payload) => api.post('/orders', payload)
}
