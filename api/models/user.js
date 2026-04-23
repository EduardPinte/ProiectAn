import { DataTypes } from 'sequelize'

export default (sequelize) =>
  sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      firstName: { type: DataTypes.STRING(100), allowNull: false },
      lastName: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      passwordHash: { type: DataTypes.STRING(255), allowNull: false }
    },
    { tableName: 'users', timestamps: true }
  )
