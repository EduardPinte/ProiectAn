import { DataTypes } from 'sequelize'

export default (sequelize) =>
  sequelize.define(
    'UserProfile',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
      phone: { type: DataTypes.STRING(30), allowNull: true },
      address: { type: DataTypes.STRING(255), allowNull: true },
      city: { type: DataTypes.STRING(120), allowNull: true }
    },
    { tableName: 'user_profiles', timestamps: true }
  )
