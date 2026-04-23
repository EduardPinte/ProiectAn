import { Router } from 'express'
import {
  getCars,
  getCarDetails,
  getCarMaintenanceHistory,
  createCar,
  updateCar
} from '../controllers/carsController.js'
import {
  createTechnicalSpec,
  updateTechnicalSpec
} from '../controllers/technicalSpecsController.js'
import {
  getMaintenanceLogs,
  createMaintenanceLog,
  updateMaintenanceMileage,
  deleteMaintenanceLog
} from '../controllers/maintenanceLogsController.js'
import { getInterventions, createIntervention } from '../controllers/interventionsController.js'
import { getParts, createPart, updatePartStock } from '../controllers/partsController.js'
import { getMechanics, deleteMechanic } from '../controllers/mechanicsController.js'
import { getWorkOrders, createWorkOrder, updateWorkOrderStatus } from '../controllers/workOrdersController.js'

const router = Router()

// GET routes (5)
router.get('/cars', getCars)
router.get('/cars/:id/details', getCarDetails)
router.get('/cars/:id/maintenance-logs', getCarMaintenanceHistory)
router.get('/parts', getParts)
router.get('/mechanics', getMechanics)
router.get('/interventions', getInterventions)
router.get('/work-orders', getWorkOrders)
router.get('/maintenance-logs', getMaintenanceLogs)

// POST routes (5)
router.post('/cars', createCar)
router.post('/technical-specs', createTechnicalSpec)
router.post('/maintenance-logs', createMaintenanceLog)
router.post('/parts', createPart)
router.post('/work-orders', createWorkOrder)
router.post('/interventions', createIntervention)

// PUT routes (5)
router.put('/cars/:id', updateCar)
router.put('/parts/:id/stock', updatePartStock)
router.put('/work-orders/:id/status', updateWorkOrderStatus)
router.put('/technical-specs/:id', updateTechnicalSpec)
router.put('/maintenance-logs/:id/mileage', updateMaintenanceMileage)

// DELETE routes (2)
router.delete('/maintenance-logs/:id', deleteMaintenanceLog)
router.delete('/mechanics/:id', deleteMechanic)

export default router
