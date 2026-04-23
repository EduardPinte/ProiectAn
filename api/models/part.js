import { DataTypes } from 'sequelize'

export default (sequelize) =>
  sequelize.define(
    'Part',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(120), allowNull: false, unique: true },
      stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
    },
    { tableName: 'parts', timestamps: true }
  )
