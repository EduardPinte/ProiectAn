import {
  sequelize,
  Car,
  TechnicalSpec,
  MaintenanceLog,
  Part,
  Mechanic,
  WorkOrder,
  Intervention
} from '../../models/index.js'
import { ensureDatabaseExists } from './bootstrap.js'

const seed = async () => {
  try {
    await ensureDatabaseExists()
    await sequelize.authenticate()
    await sequelize.sync({ force: true })

    const cars = await Car.bulkCreate([
      {
        brand: 'Volkswagen',
        model: 'Passat B8',
        year: 2018,
        vin: 'WVWZZZ3CZJE000001',
        plate_number: 'B123AUT'
      },
      {
        brand: 'BMW',
        model: '320d',
        year: 2020,
        vin: 'WBA8A91080J000002',
        plate_number: 'CJ99CAR'
      },
      {
        brand: 'Audi',
        model: 'A4',
        year: 2019,
        vin: '19UUA66531L000100',
        plate_number: 'B311XYZ'
      },
      {
        brand: 'BMW',
        model: 'X3',
        year: 2020,
        vin: '12345ABCDE6789012',
        plate_number: 'HD52EDI'
      },
      {
        brand: 'BMW',
        model: 'X5',
        year: 2021,
        vin: '55BMX77D55E555555',
        plate_number: 'AR10GZU'
      },
      {
        brand: 'Mercedes',
        model: 'C-Class',
        year: 2019,
        vin: 'WBADH1KL3MG000001',
        plate_number: 'BH33SMI'
      },
      {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        vin: 'JTDKN3AU0J9000001',
        plate_number: 'CJ99TCR'
      },
      {
        brand: 'Nissan',
        model: 'Rogue',
        year: 2021,
        vin: 'JT2BF10K910033851',
        plate_number: 'TM04SUS'
      }
    ])

    await TechnicalSpec.bulkCreate([
      {
        carId: cars[0].id,
        engine_oil: '5W-30',
        gear_oil: '75W-90',
        coolant_type: 'G12'
      },
      {
        carId: cars[1].id,
        engine_oil: '0W-30',
        gear_oil: '75W-80',
        coolant_type: 'G13'
      }
    ])

    const interventions = await Intervention.bulkCreate([
      { name: 'Schimb ulei + filtru', details: 'Schimb ulei motor si filtru ulei' },
      { name: 'Schimb placute frana', details: 'Inlocuire placute frana fata/spate' },
      { name: 'Schimb distributie', details: 'Inlocuire kit distributie complet' },
      { name: 'Revizie generala', details: 'Verificari complete si consumabile' }
    ])

    await MaintenanceLog.bulkCreate([
      {
        carId: cars[0].id,
        interventionId: interventions[0].id,
        date: '2026-03-10',
        mileage: 182400,
        description: 'Schimb ulei + filtru ulei'
      },
      {
        carId: cars[0].id,
        interventionId: interventions[1].id,
        date: '2026-04-01',
        mileage: 185200,
        description: 'Inlocuire placute frana fata'
      },
      {
        carId: cars[1].id,
        interventionId: interventions[2].id,
        date: '2026-02-18',
        mileage: 146000,
        description: 'Schimb kit distributie'
      }
    ])

    const parts = await Part.bulkCreate([
      {
        name: 'Filtru ulei Mann',
        stock: 25,
        price: 55
      },
      {
        name: 'Set placute frana',
        stock: 12,
        price: 320
      },
      {
        name: 'Antigel G12 1L',
        stock: 40,
        price: 35
      }
    ])

    const mechanics = await Mechanic.bulkCreate([
      {
        name: 'Andrei Iacob',
        specialization: 'Mecanica motor'
      },
      {
        name: 'Radu Pavel',
        specialization: 'Sistem franare'
      }
    ])

    await WorkOrder.bulkCreate([
      {
        carId: cars[0].id,
        mechanicId: mechanics[1].id,
        total_cost: 480,
        status: 'completed'
      },
      {
        carId: cars[1].id,
        mechanicId: mechanics[0].id,
        total_cost: 900,
        status: 'in_progress'
      }
    ])

    await parts[1].update({ stock: parts[1].stock - 1 })

    console.log('Seed completed')
  } catch (error) {
    console.error('Seed failed:', error.message)
  } finally {
    await sequelize.close()
  }
}

seed()
