import { MaintenanceLog } from '../models/index.js'

export const getMaintenanceLogs = async (_req, res) => {
  const logs = await MaintenanceLog.findAll({ order: [['id', 'DESC']] })
  res.json(logs)
}

export const createMaintenanceLog = async (req, res) => {
  const log = await MaintenanceLog.create(req.body)
  res.status(201).json(log)
}

export const updateMaintenanceMileage = async (req, res) => {
  const [updated] = await MaintenanceLog.update(
    { mileage: req.body.mileage },
    { where: { id: req.params.id } }
  )
  if (!updated) return res.status(404).json({ message: 'Maintenance log not found' })
  const log = await MaintenanceLog.findByPk(req.params.id)
  res.json(log)
}

export const deleteMaintenanceLog = async (req, res) => {
  const deleted = await MaintenanceLog.destroy({ where: { id: req.params.id } })
  if (!deleted) return res.status(404).json({ message: 'Maintenance log not found' })
  res.status(204).send()
}
