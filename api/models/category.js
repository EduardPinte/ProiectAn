import { DataTypes } from 'sequelize'

export default (sequelize) =>
  sequelize.define(
    'Category',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(120), allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: true }
    },
    { tableName: 'categories', timestamps: true }
  )
