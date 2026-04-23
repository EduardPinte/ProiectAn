import { DataTypes } from 'sequelize'

export default (sequelize) =>
  sequelize.define(
    'Product',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING(150), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
    },
    { tableName: 'products', timestamps: true }
  )
