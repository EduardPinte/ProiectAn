import { Car, TechnicalSpec, MaintenanceLog, Intervention } from '../models/index.js'
import { Op } from 'sequelize'

export const getCars = async (req, res) => {
  const { vin, plate_number, brand, model, year } = req.query
  const where = {}
  const normalizedVin = typeof vin === 'string' ? vin.trim().toUpperCase() : ''
  const normalizedPlate = typeof plate_number === 'string' ? plate_number.trim().toUpperCase() : ''
  const normalizedBrand = typeof brand === 'string' ? brand.trim() : ''
  const normalizedModel = typeof model === 'string' ? model.trim() : ''

  if (normalizedVin) {
    where.vin = normalizedVin
  }

  if (normalizedPlate) {
    where.plate_number = normalizedPlate
  }

  if (normalizedBrand) {
    where.brand = { [Op.like]: `%${normalizedBrand}%` }
  }

  if (normalizedModel) {
    where.model = { [Op.like]: `%${normalizedModel}%` }
  }

  if (year) {
    where.year = Number(year)
  }

  const cars = await Car.findAll({ where, order: [['id', 'DESC']] })
  res.json(cars)
}

export const getCarDetails = async (req, res) => {
  const car = await Car.findByPk(req.params.id, {
    include: [{ model: TechnicalSpec, as: 'technicalSpec' }]
  })
  if (!car) return res.status(404).json({ message: 'Car not found' })
  res.json(car)
}

export const getCarMaintenanceHistory = async (req, res) => {
  const logs = await MaintenanceLog.findAll({
    where: { carId: req.params.id },
    include: [{ model: Intervention, as: 'intervention', attributes: ['id', 'name'] }],
    order: [['date', 'DESC']]
  })
  res.json(logs)
}

export const createCar = async (req, res) => {
  const car = await Car.create(req.body)
  res.status(201).json(car)
}

export const updateCar = async (req, res) => {
  const [updated] = await Car.update(req.body, { where: { id: req.params.id } })
  if (!updated) return res.status(404).json({ message: 'Car not found' })
  const car = await Car.findByPk(req.params.id)
  res.json(car)
}
