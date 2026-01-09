import { defineStore } from 'pinia'

export const useCarStore = defineStore('car', {
  state: () => ({
    currentCar: null,
    recentCars: [],
    searchHistory: [],
    searchType: '', 
    userKm: 0,
    maintenanceLimit: 120000,
    loading: false,
    error: null,

    maintenanceData: [
  {
    brand: 'BMW',
    model: 'X3',
    fromYear: 2018,
    toYear: 2022,
    oilType: '5W-30',
    oilCapacity: '6.5L',
    serviceIntervalKm: 15000
  },
  {
    brand: 'BMW',
    model: 'X3',
    fromYear: 2013,
    toYear: 2017,
    oilType: '5W-40',
    oilCapacity: '6.5L',
    serviceIntervalKm: 12000
  },
  {
    brand: 'Audi',
    model: 'A4',
    fromYear: 2018,
    toYear: 2021,
    oilType: '0W-30',
    oilCapacity: '5.2L',
    serviceIntervalKm: 15000
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
      this.currentCar = {
        vin,
        brand: 'Audi',
        model: 'A4',
        year: 2019,
        searchedAt: new Date().toISOString()
      }
      this.addRecentCar(this.currentCar)
      this.addToSearchHistory(this.currentCar)
    },

    searchByLicense(license) {
      this.searchType = 'license'
      this.currentCar = {
        license,
        brand: 'BMW',
        model: 'X3',
        year: 2020,
        searchedAt: new Date().toISOString()
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
