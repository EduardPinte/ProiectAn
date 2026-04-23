import api from './api'

export const mechanicService = {
  // GET
  getCars: () => api.get('/cars'),
  searchCars: (params) => api.get('/cars', { params }),
  getCarDetails: (id) => api.get(`/cars/${id}/details`),
  getMaintenanceHistory: (carId) => api.get(`/cars/${carId}/maintenance-logs`),
  getMaintenanceLogs: () => api.get('/maintenance-logs'),
  getInterventions: () => api.get('/interventions'),
  getParts: () => api.get('/parts'),
  getMechanics: () => api.get('/mechanics'),
  getWorkOrders: () => api.get('/work-orders'),

  // POST
  createCar: (payload) => api.post('/cars', payload),
  createTechnicalSpec: (payload) => api.post('/technical-specs', payload),
  createMaintenanceLog: (payload) => api.post('/maintenance-logs', payload),
  createPart: (payload) => api.post('/parts', payload),
  createWorkOrder: (payload) => api.post('/work-orders', payload),

  // PUT
  updateCar: (id, payload) => api.put(`/cars/${id}`, payload),
  updatePartStock: (id, stock) => api.put(`/parts/${id}/stock`, { stock }),
  updateWorkOrderStatus: (id, status) => api.put(`/work-orders/${id}/status`, { status }),
  updateTechnicalSpec: (id, payload) => api.put(`/technical-specs/${id}`, payload),
  updateMaintenanceMileage: (id, mileage) => api.put(`/maintenance-logs/${id}/mileage`, { mileage }),

  // DELETE
  deleteMaintenanceLog: (id) => api.delete(`/maintenance-logs/${id}`),
  deleteMechanic: (id) => api.delete(`/mechanics/${id}`)
}
