import { TechnicalSpec } from '../models/index.js'

export const createTechnicalSpec = async (req, res) => {
  const spec = await TechnicalSpec.create(req.body)
  res.status(201).json(spec)
}

export const updateTechnicalSpec = async (req, res) => {
  const [updated] = await TechnicalSpec.update(req.body, { where: { id: req.params.id } })
  if (!updated) return res.status(404).json({ message: 'Technical spec not found' })
  const spec = await TechnicalSpec.findByPk(req.params.id)
  res.json(spec)
}
