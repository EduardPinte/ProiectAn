import { DataTypes } from 'sequelize'

export default (sequelize) =>
  sequelize.define(
    'WorkOrder',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      carId: { type: DataTypes.INTEGER, allowNull: false },
      mechanicId: { type: DataTypes.INTEGER, allowNull: false },
      total_cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
      }
    },
    { tableName: 'work_orders', timestamps: true }
  )
