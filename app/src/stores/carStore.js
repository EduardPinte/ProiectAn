import { defineStore } from 'pinia'
import { mechanicService } from '@/services/mechanicService'

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
    carsCache: [],

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
    normalizeCar(car, searchType) {
      if (!car) return null
      return {
        id: car.id,
        vin: car.vin,
        licensePlate: car.plate_number,
        brand: car.brand,
        model: car.model,
        year: car.year,
        searchedAt: new Date().toISOString(),
        searchType
      }
    },

    async fetchCars(params = {}) {
      const response = await mechanicService.searchCars(params)
      return response.data || []
    },

    async searchByVIN(vin) {
      this.searchType = 'vin'
      this.setLoading(true)
      this.clearError()
      try {
        const cars = await this.fetchCars({ vin: vin.toUpperCase() })
        this.currentCar = this.normalizeCar(cars[0], 'vin')
        this.addRecentCar(this.currentCar)
        this.addToSearchHistory(this.currentCar)
        return this.currentCar
      } catch (error) {
        this.setError(error.message)
        this.currentCar = null
        return null
      } finally {
        this.setLoading(false)
      }
    },

    async searchByLicense(license) {
      this.searchType = 'license'
      this.setLoading(true)
      this.clearError()
      try {
        const cars = await this.fetchCars({ plate_number: license.toUpperCase() })
        this.currentCar = this.normalizeCar(cars[0], 'license')
        this.addRecentCar(this.currentCar)
        this.addToSearchHistory(this.currentCar)
        return this.currentCar
      } catch (error) {
        this.setError(error.message)
        this.currentCar = null
        return null
      } finally {
        this.setLoading(false)
      }
    },

    async searchByModel(brand, model, year) {
      this.searchType = 'model'
      this.setLoading(true)
      this.clearError()
      try {
        const cars = await this.fetchCars({ brand, model, year })
        this.currentCar = this.normalizeCar(cars[0], 'model')
        this.addRecentCar(this.currentCar)
        this.addToSearchHistory(this.currentCar)
        return this.currentCar
      } catch (error) {
        this.setError(error.message)
        this.currentCar = null
        return null
      } finally {
        this.setLoading(false)
      }
    },

    async loadCarsCatalog() {
      this.setLoading(true)
      this.clearError()
      try {
        this.carsCache = await this.fetchCars()
      } catch (error) {
        this.setError(error.message)
      } finally {
        this.setLoading(false)
      }
    },

    addRecentCar(car) {
      if (!car) return
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
      if (!car) return
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
