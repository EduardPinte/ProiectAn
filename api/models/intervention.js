import { DataTypes } from 'sequelize'

export default (sequelize) =>
  sequelize.define(
    'Intervention',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(120), allowNull: false, unique: true },
      details: { type: DataTypes.TEXT, allowNull: true }
    },
    { tableName: 'interventions', timestamps: true }
  )
