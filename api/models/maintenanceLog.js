import { DataTypes } from 'sequelize'

export default (sequelize) =>
  sequelize.define(
    'MaintenanceLog',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      carId: { type: DataTypes.INTEGER, allowNull: false },
      interventionId: { type: DataTypes.INTEGER, allowNull: true },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      mileage: { type: DataTypes.INTEGER, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false }
    },
    { tableName: 'maintenance_logs', timestamps: true }
  )
