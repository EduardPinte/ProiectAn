import { Mechanic } from '../models/index.js'

export const getMechanics = async (_req, res) => {
  const mechanics = await Mechanic.findAll()
  res.json(mechanics)
}

export const deleteMechanic = async (req, res) => {
  const deleted = await Mechanic.destroy({ where: { id: req.params.id } })
  if (!deleted) return res.status(404).json({ message: 'Mechanic not found' })
  res.status(204).send()
}
