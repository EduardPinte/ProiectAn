import 'dotenv/config'
import { Sequelize } from 'sequelize'
import CarModel from './car.js'
import TechnicalSpecModel from './technicalSpec.js'
import MaintenanceLogModel from './maintenanceLog.js'
import PartModel from './part.js'
import MechanicModel from './mechanic.js'
import WorkOrderModel from './workOrder.js'
import InterventionModel from './intervention.js'

const sequelize = new Sequelize(
  process.env.DB_NAME || 'autoservice',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false
  }
)

const Car = CarModel(sequelize)
const TechnicalSpec = TechnicalSpecModel(sequelize)
const MaintenanceLog = MaintenanceLogModel(sequelize)
const Part = PartModel(sequelize)
const Mechanic = MechanicModel(sequelize)
const WorkOrder = WorkOrderModel(sequelize)
const Intervention = InterventionModel(sequelize)

Car.hasOne(TechnicalSpec, { foreignKey: 'carId', as: 'technicalSpec', onDelete: 'CASCADE' })
TechnicalSpec.belongsTo(Car, { foreignKey: 'carId', as: 'car' })

Car.hasMany(MaintenanceLog, { foreignKey: 'carId', as: 'maintenanceLogs', onDelete: 'CASCADE' })
MaintenanceLog.belongsTo(Car, { foreignKey: 'carId', as: 'car' })
Intervention.hasMany(MaintenanceLog, { foreignKey: 'interventionId', as: 'maintenanceLogs' })
MaintenanceLog.belongsTo(Intervention, { foreignKey: 'interventionId', as: 'intervention' })

Car.hasMany(WorkOrder, { foreignKey: 'carId', as: 'workOrders' })
WorkOrder.belongsTo(Car, { foreignKey: 'carId', as: 'car' })

Mechanic.hasMany(WorkOrder, { foreignKey: 'mechanicId', as: 'workOrders' })
WorkOrder.belongsTo(Mechanic, { foreignKey: 'mechanicId', as: 'mechanic' })

export { sequelize, Car, TechnicalSpec, MaintenanceLog, Part, Mechanic, WorkOrder, Intervention }
