import { DataTypes } from 'sequelize'

export default (sequelize) =>
  sequelize.define(
    'TechnicalSpec',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      carId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
      engine_oil: { type: DataTypes.STRING(60), allowNull: false },
      gear_oil: { type: DataTypes.STRING(60), allowNull: false },
      coolant_type: { type: DataTypes.STRING(60), allowNull: false }
    },
    { tableName: 'technical_specs', timestamps: true }
  )
