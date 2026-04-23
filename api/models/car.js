import { DataTypes } from 'sequelize'

export default (sequelize) =>
  sequelize.define(
    'Car',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      brand: { type: DataTypes.STRING(80), allowNull: false },
      model: { type: DataTypes.STRING(80), allowNull: false },
      year: { type: DataTypes.INTEGER, allowNull: true },
      vin: { type: DataTypes.STRING(32), allowNull: false, unique: true },
      plate_number: { type: DataTypes.STRING(20), allowNull: false, unique: true }
    },
    { tableName: 'cars', timestamps: true }
  )
