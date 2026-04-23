import { DataTypes } from 'sequelize'

export default (sequelize) =>
  sequelize.define(
    'Order',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.ENUM('pending', 'paid', 'shipped', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
      },
      totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }
    },
    { tableName: 'orders', timestamps: true }
  )
