import { defineStore } from 'pinia'

export const useCarStore = defineStore('car', {
  state: () => ({
    currentCar: null,
    recentCars: [],
    searchHistory: [],
    searchType: '', 
    licensePlate: '',
    userKm: 0,
    maintenanceLimit: 120000,
    loading: false,
    error: null,

    carDatabase: [
      {
        vin: '19UUA66531L000100',
        licensePlate: 'B311XYZ',
        brand: 'Audi',
        model: 'A4',
        year: 2019
      },
      {
        vin: '12345ABCDE6789012',
        licensePlate: 'HD52EDI',
        brand: 'BMW',
        model: 'X3',
        year: 2020
      },
      {
        vin: '55BMX77D55E555555',
        licensePlate: 'AR10GZU',
        brand: 'BMW',
        model: 'X5',
        year: 2021
      },
      {
        vin: 'WBADH1KL3MG000001',
        licensePlate: 'BH33SMI',
        brand: 'Mercedes',
        model: 'C-Class',
        year: 2019
      },
      {
        vin: 'JTDKN3AU0J9000001',
        licensePlate: 'CJ99TCR',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020
      },
      {
        vin: 'JT2BF10K910033851',
        licensePlate: 'TM04SUS',
        brand: 'Nissan',
        model: 'Rogue',
        year: 2021
      }
    ],

    maintenanceData: [
  {
    brand: 'BMW',
    model: 'X3',
    fromYear: 2018,
    toYear: 2026,
    oilType: '5W-30',
    oilCapacity: '6.5L',
    gearboxType: 'Automatic 8-Speed',
    differentialOil: '1.5L',
    serviceIntervalKm: 15000
  },
  {
    brand: 'BMW',
    model: 'X5',
    fromYear: 2013,
    toYear: 2023,
    oilType: '5W-40',
    oilCapacity: '6.5L',
    gearboxType: 'Automatic 8-Speed',
    differentialOil: '1.5L',
    serviceIntervalKm: 12000
  },
  {
    brand: 'Audi',
    model: 'A4',
    fromYear: 2018,
    toYear: 2026,
    oilType: '0W-30',
    oilCapacity: '5.2L',
    gearboxType: 'Automatic CVT',
    differentialOil: '1.2L',
    serviceIntervalKm: 15000
  },
  {
    brand: 'Mercedes',
    model: 'C-Class',
    fromYear: 2019,
    toYear: 2026,
    oilType: '0W-30',
    oilCapacity: '5.5L',
    gearboxType: 'Automatic 9-Speed',
    differentialOil: '1.4L',
    serviceIntervalKm: 20000
  },
  {
    brand: 'Toyota',
    model: 'Corolla',
    fromYear: 2019,
    toYear: 2023,
    oilType: '0W-20',
    oilCapacity: '4.2L',
    gearboxType: 'Manual 6-Speed',
    differentialOil: '0.9L',
    serviceIntervalKm: 10000
  }  ,
  {
    brand: 'Nissan',
    model: 'Rogue',
    fromYear: 2019,
    toYear: 2024,
    oilType: '5W-30', 
    oilCapacity: '5.1L',
    gearboxType: 'CVT',
    differentialOil: '1.1L',
    serviceIntervalKm: 12000
  }
]

  }),

 
  getters: {
  hasCar: (state) => !!state.currentCar,

  carBrand: (state) => state.currentCar?.brand || '',

  carModel: (state) => state.currentCar?.model || '',

  carYear: (state) => state.currentCar?.year || null,

  carAge: (state) =>
    state.currentCar
      ? new Date().getFullYear() - state.currentCar.year
      : 0,

  carName: (state) =>
    state.currentCar
      ? `${state.currentCar.brand} ${state.currentCar.model}`
      : '',

  recentCarsCount: (state) => state.recentCars.length,

  searchHistoryCount: (state) => state.searchHistory.length,

  lastSearchType: (state) => state.searchType,

  isMaintenanceDue: (state) =>
    state.userKm >= state.maintenanceLimit,

  isLoading: (state) => state.loading,

  
  maintenanceInfo(state) {
    if (!state.currentCar) return null

    return (
      state.maintenanceData.find(item =>
        item.brand === state.currentCar.brand &&
        item.model === state.currentCar.model &&
        state.currentCar.year >= item.fromYear &&
        state.currentCar.year <= item.toYear
      ) || null
    )
  }
},

  actions: {
    searchByVIN(vin) {
      this.searchType = 'vin'
      const car = this.carDatabase.find(c => c.vin.toUpperCase() === vin.toUpperCase())
      
      if (car) {
        this.currentCar = {
          vin: car.vin,
          licensePlate: car.licensePlate,
          brand: car.brand,
          model: car.model,
          year: car.year,
          searchedAt: new Date().toISOString()
        }
      } else {
        this.currentCar = null
      }
      
      this.addRecentCar(this.currentCar)
      this.addToSearchHistory(this.currentCar)
    },

    searchByLicense(license) {
      this.searchType = 'license'
      const car = this.carDatabase.find(c => c.licensePlate.toUpperCase() === license.toUpperCase())
      
      if (car) {
        this.currentCar = {
          vin: car.vin,
          licensePlate: car.licensePlate,
          brand: car.brand,
          model: car.model,
          year: car.year,
          searchedAt: new Date().toISOString()
        }
      } else {
        this.currentCar = null
      }
      
      this.addRecentCar(this.currentCar)
      this.addToSearchHistory(this.currentCar)
    },

    searchByModel(brand, model, year) {
      this.searchType = 'model'
      this.currentCar = { brand, model, year, searchedAt: new Date().toISOString() }
      this.addRecentCar(this.currentCar)
      this.addToSearchHistory(this.currentCar)
    },

    addRecentCar(car) {
      this.recentCars.unshift(car)
      if (this.recentCars.length > 5) {
        this.recentCars.pop()
      }
    },

    clearCurrentCar() {
      this.currentCar = null
    },

    setUserKm(km) {
      this.userKm = km
    },

    setLoading(value) {
      this.loading = value
    },

    setError(message) {
      this.error = message
    },

    clearError() {
      this.error = null
    },

    clearHistory() {
      this.recentCars = []
    },

    addToSearchHistory(car) {
      this.searchHistory.unshift(car)
      if (this.searchHistory.length > 50) {
        this.searchHistory.pop()
      }
    },

    setCurrentFromHistory(car) {
      this.currentCar = car
    }
  }
})
