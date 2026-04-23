import { Category } from '../models/index.js'

export const createCategory = async (req, res) => {
  const category = await Category.create(req.body)
  return res.status(201).json(category)
}

export const updateCategory = async (req, res) => {
  const [updated] = await Category.update(req.body, { where: { id: req.params.id } })
  if (!updated) return res.status(404).json({ message: 'Category not found' })
  const category = await Category.findByPk(req.params.id)
  return res.json(category)
}
