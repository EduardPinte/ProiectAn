import { sequelize, WorkOrder, Part, Car, Mechanic } from '../models/index.js'

export const getWorkOrders = async (_req, res) => {
  const orders = await WorkOrder.findAll({
    include: [
      { model: Car, as: 'car' },
      { model: Mechanic, as: 'mechanic' }
    ],
    order: [['id', 'DESC']]
  })
  res.json(orders)
}

export const createWorkOrder = async (req, res) => {
  const { carId, mechanicId, total_cost, status, partId, partQuantity } = req.body
  if (!carId || !mechanicId || !total_cost || !partId || !partQuantity) {
    return res.status(400).json({
      message: 'carId, mechanicId, total_cost, partId and partQuantity are required'
    })
  }

  try {
    const workOrder = await sequelize.transaction(async (transaction) => {
      const part = await Part.findByPk(partId, { transaction, lock: true })
      if (!part) throw new Error('Part not found')

      const newStock = part.stock - Number(partQuantity)
      if (newStock < 0) throw new Error('Insufficient stock, transaction rolled back')

      const order = await WorkOrder.create(
        { carId, mechanicId, total_cost, status: status || 'pending' },
        { transaction }
      )
      await part.update({ stock: newStock }, { transaction })
      return order
    })

    res.status(201).json(workOrder)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateWorkOrderStatus = async (req, res) => {
  const [updated] = await WorkOrder.update(
    { status: req.body.status },
    { where: { id: req.params.id } }
  )
  if (!updated) return res.status(404).json({ message: 'Work order not found' })
  const order = await WorkOrder.findByPk(req.params.id, {
    include: [
      { model: Car, as: 'car' },
      { model: Mechanic, as: 'mechanic' }
    ]
  })
  res.json(order)
}
