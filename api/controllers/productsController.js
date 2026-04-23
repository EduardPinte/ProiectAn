import { Category, Product } from '../models/index.js'

export const getProducts = async (_req, res) => {
  const products = await Product.findAll({ include: [{ model: Category, as: 'category' }] })
  return res.json(products)
}

export const getProductById = async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: [{ model: Category, as: 'category' }]
  })
  if (!product) return res.status(404).json({ message: 'Product not found' })
  return res.json(product)
}

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body)
  return res.status(201).json(product)
}

export const updateProduct = async (req, res) => {
  const [updated] = await Product.update(req.body, { where: { id: req.params.id } })
  if (!updated) return res.status(404).json({ message: 'Product not found' })
  const product = await Product.findByPk(req.params.id)
  return res.json(product)
}

export const deleteProduct = async (req, res) => {
  const deleted = await Product.destroy({ where: { id: req.params.id } })
  if (!deleted) return res.status(404).json({ message: 'Product not found' })
  return res.status(204).send()
}
