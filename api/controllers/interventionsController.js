import { Intervention } from '../models/index.js'

export const getInterventions = async (_req, res) => {
  const interventions = await Intervention.findAll({ order: [['name', 'ASC']] })
  res.json(interventions)
}

export const createIntervention = async (req, res) => {
  const intervention = await Intervention.create(req.body)
  res.status(201).json(intervention)
}
