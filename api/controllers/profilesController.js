import { UserProfile } from '../models/index.js'

export const createProfile = async (req, res) => {
  const profile = await UserProfile.create(req.body)
  return res.status(201).json(profile)
}

export const updateProfile = async (req, res) => {
  const [updated] = await UserProfile.update(req.body, { where: { id: req.params.id } })
  if (!updated) return res.status(404).json({ message: 'Profile not found' })
  const profile = await UserProfile.findByPk(req.params.id)
  return res.json(profile)
}
