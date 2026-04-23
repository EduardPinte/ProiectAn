import { DataTypes } from 'sequelize'

export default (sequelize) =>
  sequelize.define(
    'Mechanic',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(120), allowNull: false },
      specialization: { type: DataTypes.STRING(120), allowNull: false }
    },
    { tableName: 'mechanics', timestamps: true }
  )
