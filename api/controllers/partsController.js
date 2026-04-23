import { Part } from '../models/index.js'

export const getParts = async (_req, res) => {
  const parts = await Part.findAll()
  res.json(parts)
}

export const createPart = async (req, res) => {
  const part = await Part.create(req.body)
  res.status(201).json(part)
}

export const updatePartStock = async (req, res) => {
  const [updated] = await Part.update({ stock: req.body.stock }, { where: { id: req.params.id } })
  if (!updated) return res.status(404).json({ message: 'Part not found' })
  const part = await Part.findByPk(req.params.id)
  res.json(part)
}
