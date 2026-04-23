import { User, UserProfile } from '../models/index.js'

export const getUsers = async (_req, res) => {
  const users = await User.findAll({ include: [{ model: UserProfile, as: 'profile' }] })
  return res.json(users)
}

export const createUser = async (req, res) => {
  const user = await User.create(req.body)
  return res.status(201).json(user)
}

export const updateUser = async (req, res) => {
  const [updated] = await User.update(req.body, { where: { id: req.params.id } })
  if (!updated) return res.status(404).json({ message: 'User not found' })
  const user = await User.findByPk(req.params.id)
  return res.json(user)
}
