# Motix Application - Complete Flow Documentation: Login to Results

## Overview
This document provides a comprehensive step-by-step walkthrough of how the Motix vehicle information lookup application works, starting from the login screen through to displaying search results.

---

## Table of Contents
1. [Application Architecture](#application-architecture)
2. [Entry Point & Initialization](#entry-point--initialization)
3. [Login Flow](#login-flow)
4. [Home Page](#home-page)
5. [Search Methods](#search-methods)
6. [Results Display](#results-display)
7. [Data Management (Stores)](#data-management-stores)
8. [Component Hierarchy](#component-hierarchy)

---

## Application Architecture

### Technology Stack
- **Frontend Framework**: Vue 3 (Composition API)
- **Router**: Vue Router v4
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **PWA Support**: Vite Plugin PWA

### Core Directories
```
src/
├── pages/          # Page components organized by feature
├── components/     # Reusable UI components
├── router/         # Route definitions
├── stores/         # Pinia state management
├── assets/         # Static images and resources
└── main.js         # Application entry point
```

---

## Entry Point & Initialization

### 1. Application Bootstrap (`main.js`)

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './main.css'

const app = createApp(App)
app.use(createPinia())    // Initialize state management
app.use(router)            // Initialize routing
app.mount('#app')          // Mount to #app element in index.html
```

**What Happens:**
- Vue 3 app is created
- Pinia store system is initialized (allows all components to access global state)
- Vue Router is registered (enables navigation between pages)
- App mounts to the DOM

### 2. App Root Component (`App.vue`)

```vue
<script setup>
</script>

<template>
  <router-view />
</template>
```

**What Happens:**
- The `<router-view />` component acts as a placeholder
- It displays whatever page component corresponds to the current route
- Essentially a dynamic component that changes based on the URL

---

## Login Flow

### Step 1: Initial Route - Login Page

**URL**: `/login` (default redirect from `/`)

**Component**: `pages/auth/LogIn.vue`

```vue
<script setup>
import LoginForm from '@/components/LogInForm.vue'

function handleLogin({ email, password }) {
  console.log('Login attempt:', email, password)
  alert(`Logging in as ${email}`)
}
</script>

<template>
  <div class="min-h-screen bg-cyan-100 flex flex-col items-center justify-center p-4">
    <LoginForm @login="handleLogin" />
  </div>
</template>
```

**What Happens:**
- User sees the login page
- The page imports `LoginForm` component
- Waits for user to submit form

---

### Step 2: Login Form Component (`components/LogInForm.vue`)

```javascript
const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

function handleSubmit() {
  // Step 1: Validate email
  if (email.value !== 'eduard.pinte@emanuel.ro') {
    alert('Invalid email or password')
    return
  }

  // Step 2: Validate password provided
  if (!password.value) {
    alert('Enter password')
    return
  }

  // Step 3: First-time login (no password set yet)
  if (!authStore.password) {
    authStore.setPassword(password.value)  // Save password to localStorage
    alert('Password set successfully')
    router.push('/home')  // Navigate to home
    return
  }

  // Step 4: Subsequent logins (verify password)
  if (!authStore.checkPassword(password.value)) {
    alert('Invalid email or password')
    return
  }

  // Step 5: Password correct - proceed to home
  router.push('/home')
}
```

**Validation Logic:**
- **Email**: Must be exactly `eduard.pinte@emanuel.ro` (hardcoded credentials)
- **Password**: Required field
- **First Login**: Password is saved to `localStorage` (persistent storage in browser)
- **Subsequent Logins**: New password must match the saved one

**State Management:**
- Uses `useAuthStore()` from Pinia to access authentication state
- Stores password in localStorage via `setPassword()`

**Navigation:**
- On successful login: Routes to `/home`
- On failed login: Shows alert, stays on login page

---

### Step 3: Authentication Store (`stores/authStore.js`)

```javascript
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const password = ref(localStorage.getItem('password') || '')

  // Methods
  function setPassword(newPassword) {
    password.value = newPassword
    localStorage.setItem('password', newPassword)  // Persist to browser storage
  }

  function checkPassword(inputPassword) {
    return password.value === inputPassword
  }

  return { password, setPassword, checkPassword }
})
```

**Key Features:**
- Reads password from localStorage on app startup
- `setPassword()`: Saves new password to both state and localStorage
- `checkPassword()`: Verifies entered password against stored one
- Provides centralized access to authentication state across the app

---

## Home Page

### Step 4: Home Page (`pages/Home.vue`)

After successful login, user is redirected to `/home`

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
    <!-- Header -->
    <div class="text-center py-12">
      <h1 class="text-5xl font-bold text-gray-800 mb-2">Welcome to Motix</h1>
      <p class="text-gray-600">Vehicle Information Search Platform</p>
    </div>

    <!-- Main CTA Button -->
    <div class="flex-1 flex items-center justify-center px-4">
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <router-link to="/select-car">
          <button class="px-12 py-4 bg-green-600 hover:bg-green-700 text-white 
                         font-bold text-xl rounded-lg transition-colors duration-300 shadow-md">
            Get Started
          </button>
        </router-link>
      </div>
    </div>

    <!-- Bottom Navigation Buttons -->
    <div class="bg-white border-t border-gray-200 p-6">
      <div class="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
        <router-link to="/history">
          <button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white 
                         rounded-lg font-semibold">
            History
          </button>
        </router-link>
        <router-link to="/maintain">
          <button class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white 
                         rounded-lg font-semibold">
            Maintain
          </button>
        </router-link>
        <router-link to="/profile">
          <button class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white 
                         rounded-lg font-semibold">
            Profile
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
```

**What Happens:**
- User sees welcome message and navigation options
- "Get Started" button leads to search method selection (`/select-car`)
- Other buttons allow access to History, Maintain, and Profile sections

---

## Search Methods

### Step 5: Car Selection Page (`pages/search/SelectCar.vue`)

**Route**: `/select-car`

```vue
<script setup>
import { useRouter } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-md p-6 rounded-lg shadow">
      <img src="@/assets/logoMotix.png" alt="Logo Motix" class="w-20 mx-auto mb-6" />
      <h1 class="text-2xl font-semibold text-center mb-2">Welcome to Motix</h1>
      <p class="text-sm text-gray-500 text-center mb-6">
        Choose how you want to search for vehicle information
      </p>

      <div class="space-y-3">
        <!-- Search by License Plate -->
        <router-link to="/searchLicense" class="block">
          <button class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 
                         text-white rounded-md font-medium">
            Search by License Plate
          </button>
        </router-link>

        <!-- Select by Brand/Model/Year -->
        <router-link to="/selectBMY" class="block">
          <button class="w-full px-4 py-3 bg-green-600 hover:bg-green-700 
                         text-white rounded-md font-medium">
            Select by Brand / Model / Year
          </button>
        </router-link>

        <!-- Search by VIN -->
        <router-link to="/searchVIN" class="block">
          <button class="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 
                         text-white rounded-md font-medium">
            Search by VIN (Chassis Number)
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
```

**What Happens:**
- User sees three search options
- Each option routes to a different search method:
  1. License Plate Search → `/searchLicense`
  2. Brand/Model/Year Selection → `/selectBMY`
  3. VIN Search → `/searchVIN`

---

### Search Method 1: License Plate Search (`pages/search/SearchLicense.vue`)

**Route**: `/searchLicense`

```javascript
const router = useRouter()
const license = ref('')
const store = useCarStore()

// Validation: license must be at least 5 characters
const isLicenseValid = computed(() => license.value.length >= 5)

function search() {
  if (!isLicenseValid.value) return
  
  // Call store action to search for car
  store.searchByLicense(license.value)
  
  // Navigate to results page
  router.push('/result')
}
```

**User Flow:**
1. User enters license plate (e.g., "B311XYZ")
2. Real-time validation shows if license is valid
3. Click "Search" button
4. Store searches database for matching car
5. Navigates to `/result` page

---

### Search Method 2: Brand/Model/Year Selection (`pages/search/SelectBMY.vue`)

**Route**: `/selectBMY`

```javascript
const store = useCarStore()
const router = useRouter()

const brand = ref('')
const model = ref('')
const year = ref('')

const brands = {
  Mercedes: ['A-Class', 'C-Class', 'E-Class'],
  BMW: ['Series 1', 'Series 3', 'Series 5'],
  Audi: ['A3', 'A4', 'A6'],
  Toyota: ['Corolla', 'Camry', 'RAV4'],
  Nissan: ['Sentra', 'Altima', 'Rogue']
}

// Models change based on selected brand
const models = computed(() => brands[brand.value] || [])

// Years from current year (2026) back 28 years
const years = computed(() =>
  Array.from({ length: 28 }, (_, i) => 2026 - i)
)

function search() {
  store.searchByModel(brand.value, model.value, year.value)
  router.push('/result')
}
```

**User Flow:**
1. Select Brand (e.g., "BMW")
2. Select Model (e.g., "X3") - options change based on brand
3. Select Year (e.g., 2020)
4. Click "Search"
5. Store searches database for matching car
6. Navigates to `/result` page

---

### Search Method 3: VIN Search (`pages/search/SearchVIN.vue`)

**Route**: `/searchVIN`

**Similar to License Plate Search:**
- User enters VIN (Vehicle Identification Number)
- Validation ensures minimum length
- Calls `store.searchByVIN(vin)`
- Navigates to `/result`

---

## Results Display

### Step 6: Result Page (`pages/results/ResultPage.vue`)

**Route**: `/result`

```javascript
const store = useCarStore()
const router = useRouter()

// Guard: if no car data, redirect home
onMounted(() => {
  if (!store.hasCar) {
    router.push('/')
  }
})

// Get current car from store
const car = computed(() => store.currentCar)
```

**Template Structure:**

```vue
<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-lg p-6 rounded-lg shadow">
      
      <!-- Logo and Title -->
      <img src="@/assets/logoMotix.png" alt="Motix logo" class="w-20 mx-auto mb-4" />
      <h1 class="text-2xl font-semibold text-center mb-4">Vehicle Details</h1>

      <!-- Car Details Section -->
      <div v-if="car" class="space-y-3 text-gray-700">
        
        <!-- Car Name -->
        <div class="text-lg font-medium text-center">
          {{ store.carName }}  <!-- e.g., "BMW X3" -->
        </div>

        <!-- Age -->
        <div class="text-sm text-center">
          Year: {{ car.year }} ({{ store.carAge }} years old)
        </div>

        <hr />

        <!-- VIN (if available) -->
        <div v-if="car.vin">
          <span class="font-medium">VIN:</span>
          <span class="break-words">{{ car.vin }}</span>
        </div>

        <!-- License Plate (if available) -->
        <div v-if="car.licensePlate">
          <span class="font-medium">License Plate:</span>
          {{ car.licensePlate }}
        </div>

        <!-- Search Info -->
        <div class="text-sm text-gray-500">
          Search type: {{ store.lastSearchType }}  <!-- e.g., "license" -->
        </div>

        <div class="text-sm text-gray-500">
          Searched at: {{ new Date(car.searchedAt).toLocaleString() }}
        </div>

        <hr class="my-2" />

        <!-- Maintenance Details -->
        <div v-if="store.maintenanceInfo" class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 class="font-semibold text-blue-900 mb-3">Maintenance Details</h3>
          
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="font-medium">Oil Type:</span>
              <span>{{ store.maintenanceInfo.oilType }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Oil Capacity:</span>
              <span>{{ store.maintenanceInfo.oilCapacity }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Gearbox Type:</span>
              <span>{{ store.maintenanceInfo.gearboxType }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Differential Oil:</span>
              <span>{{ store.maintenanceInfo.differentialOil }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Service Interval:</span>
              <span>{{ store.maintenanceInfo.serviceIntervalKm }} km</span>
            </div>
          </div>
        </div>

        <!-- No Maintenance Data Message -->
        <div v-else class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p class="text-sm text-yellow-800">No maintenance data available for this vehicle</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex gap-3">
        <button class="flex-1 py-2 bg-gray-200 rounded-md hover:bg-gray-300" 
                @click="router.push('/select-car')">
          New Search
        </button>
        <button class="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" 
                @click="router.push('/history')">
          History
        </button>
      </div>
    </div>
  </div>
</template>
```

**What Happens:**
1. Page checks if car data exists in store
2. If no car data, redirects to home
3. Displays vehicle details (brand, model, year, VIN, license plate)
4. Looks up maintenance information from database
5. Shows maintenance details (oil type, capacity, gearbox, etc.)
6. Provides buttons to start new search or view history

---

## Data Management (Stores)

### Car Store (`stores/carStore.js`)

The Car Store is the central hub for all vehicle data management using Pinia.

#### State (Data)

```javascript
state: () => ({
  currentCar: null,           // Currently viewed car
  recentCars: [],             // Last 5 cars viewed
  searchHistory: [],          // All past searches (up to 50)
  searchType: '',             // 'license', 'vin', or 'model'
  licensePlate: '',           // User's license plate
  userKm: 0,                  // User's current km
  maintenanceLimit: 120000,   // Km before maintenance due
  loading: false,             // Loading indicator
  error: null,                // Error message
  
  // Sample vehicle database
  carDatabase: [
    {
      vin: '19UUA66531L000100',
      licensePlate: 'B311XYZ',
      brand: 'Audi',
      model: 'A4',
      year: 2019
    },
    // ... more cars
  ],
  
  // Maintenance information for each vehicle
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
    // ... more maintenance data
  ]
})
```

#### Getters (Computed Properties)

```javascript
hasCar: (state) => !!state.currentCar
// Returns: true if currentCar exists, false otherwise

carBrand: (state) => state.currentCar?.brand || ''
// Returns: Brand of current car (e.g., "BMW")

carModel: (state) => state.currentCar?.model || ''
// Returns: Model of current car (e.g., "X3")

carName: (state) =>
  state.currentCar
    ? `${state.currentCar.brand} ${state.currentCar.model}`
    : ''
// Returns: Full car name (e.g., "BMW X3")

carAge: (state) =>
  state.currentCar
    ? new Date().getFullYear() - state.currentCar.year
    : 0
// Returns: Age of car in years

isMaintenanceDue: (state) =>
  state.userKm >= state.maintenanceLimit
// Returns: true if car needs maintenance

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
// Returns: Maintenance details for current car
```

#### Actions (Methods)

```javascript
// Search by VIN (exact match)
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
}

// Search by License Plate (exact match)
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
}

// Search by Brand/Model/Year
searchByModel(brand, model, year) {
  this.searchType = 'model'
  this.currentCar = {
    brand,
    model,
    year,
    searchedAt: new Date().toISOString()
  }
  this.addRecentCar(this.currentCar)
  this.addToSearchHistory(this.currentCar)
}

// Add car to recent cars (keep only last 5)
addRecentCar(car) {
  this.recentCars.unshift(car)  // Add to beginning
  if (this.recentCars.length > 5) {
    this.recentCars.pop()  // Remove oldest
  }
}

// Add to search history (keep last 50)
addToSearchHistory(car) {
  this.searchHistory.unshift(car)
  if (this.searchHistory.length > 50) {
    this.searchHistory.pop()
  }
}

// Clear current car
clearCurrentCar() {
  this.currentCar = null
}

// Set user's current km
setUserKm(km) {
  this.userKm = km
}

// Set loading state
setLoading(value) {
  this.loading = value
}

// Set error message
setError(message) {
  this.error = message
}

// Clear error
clearError() {
  this.error = null
}

// Clear all history
clearHistory() {
  this.recentCars = []
}

// Restore car from history
setCurrentFromHistory(car) {
  this.currentCar = car
}
```

---

## Complete User Flow Diagram

```
┌─────────────────────┐
│   App Bootstrap     │
│  (main.js)          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   App.vue           │
│  (router-view)      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Login Page        │
│  /login             │
└──────────┬──────────┘
           │ [User enters credentials]
           │
           ▼
┌─────────────────────┐
│ Validate & Save     │
│ (AuthStore)         │
└──────────┬──────────┘
           │ [Success]
           │
           ▼
┌─────────────────────┐
│   Home Page         │
│  /home              │
└──────────┬──────────┘
           │ [Click Get Started]
           │
           ▼
┌─────────────────────┐
│ Select Car Search   │
│  /select-car        │
└──────────┬──────────┘
           │
    ┌──────┼──────┐
    │      │      │
    ▼      ▼      ▼
┌──────┬──────┬──────┐
│License│Brand │ VIN  │
│Plate  │/M/Y  │Search│
└──────┬──────┬──────┘
    │      │      │
    └──────┼──────┘
           │ [User enters search criteria]
           │
           ▼
┌─────────────────────┐
│  Car Store Action   │
│  searchByLicense()  │
│  searchByVIN()      │
│  searchByModel()    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Search Database    │
│  + Add to History   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Results Page       │
│  /result            │
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
[Show Details]  [Show Maintenance]
    │             │
    └──────┬──────┘
           │
    ┌──────┴──────────────┐
    │                     │
    ▼                     ▼
[New Search]         [View History]
```

---

## Key Data Flow Examples

### Example 1: License Plate Search

1. **User Input**: User enters "B311XYZ" in license search
2. **Validation**: Component checks length ≥ 5 characters
3. **Action Call**: `store.searchByLicense("B311XYZ")`
4. **Database Query**: Searches `carDatabase` for matching license
5. **Result Found**: 
   ```javascript
   currentCar = {
     vin: '19UUA66531L000100',
     licensePlate: 'B311XYZ',
     brand: 'Audi',
     model: 'A4',
     year: 2019,
     searchedAt: '2026-01-23T10:30:00Z'
   }
   ```
6. **History Update**: Car added to `recentCars` and `searchHistory`
7. **Navigation**: Router navigates to `/result`
8. **Display**: ResultPage displays car details and looks up maintenance info

### Example 2: Brand/Model/Year Search

1. **User Input**: Selects Brand: "BMW", Model: "X3", Year: "2020"
2. **Action Call**: `store.searchByModel("BMW", "X3", "2020")`
3. **Data Created**:
   ```javascript
   currentCar = {
     brand: 'BMW',
     model: 'X3',
     year: 2020,
     searchedAt: '2026-01-23T10:30:00Z'
   }
   ```
4. **Maintenance Lookup**: `maintenanceInfo` getter finds matching maintenance data:
   ```javascript
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
   }
   ```
5. **Display**: All maintenance details shown on results page

---

## Component Hierarchy

```
App.vue (root)
├── LogIn.vue (at /login)
│   └── LogInForm.vue
│       └── FormInput.vue (reusable)
├── Home.vue (at /home)
├── SelectCar.vue (at /select-car)
├── SearchLicense.vue (at /searchLicense)
├── SearchVIN.vue (at /searchVIN)
├── SelectBMY.vue (at /selectBMY)
├── ResultPage.vue (at /result)
├── History.vue (at /history)
├── Profile.vue (at /profile)
└── Maintain.vue (at /maintain)
```

---

## State Flow Diagram

```
┌──────────────────────────────────┐
│        Car Store (Pinia)         │
│                                  │
│  State:                          │
│  ├─ currentCar                   │
│  ├─ recentCars                   │
│  ├─ searchHistory                │
│  ├─ searchType                   │
│  ├─ carDatabase                  │
│  └─ maintenanceData              │
│                                  │
│  Getters:                        │
│  ├─ hasCar                       │
│  ├─ carName                      │
│  ├─ carAge                       │
│  └─ maintenanceInfo              │
│                                  │
│  Actions:                        │
│  ├─ searchByLicense()            │
│  ├─ searchByVIN()                │
│  ├─ searchByModel()              │
│  └─ addToSearchHistory()         │
└──────────────────────────────────┘
        │
        │ (consumed by)
        │
        ▼
┌──────────────────────────────────┐
│    Vue Components                │
│                                  │
│  ├─ ResultPage.vue               │
│  │   └─ uses: currentCar,        │
│  │           maintenanceInfo,    │
│  │           carName, carAge     │
│  │                               │
│  ├─ SearchLicense.vue            │
│  │   └─ calls: searchByLicense() │
│  │                               │
│  ├─ SelectBMY.vue                │
│  │   └─ calls: searchByModel()   │
│  │                               │
│  └─ History.vue                  │
│      └─ uses: searchHistory      │
└──────────────────────────────────┘
```

---

## Authentication Store

```
┌──────────────────────────────────┐
│   Auth Store (Pinia)             │
│                                  │
│  State:                          │
│  └─ password (from localStorage) │
│                                  │
│  Methods:                        │
│  ├─ setPassword()                │
│  │   └─ saves to localStorage    │
│  └─ checkPassword()              │
│      └─ verifies input           │
└──────────────────────────────────┘
        │
        │ (used by)
        │
        ▼
┌──────────────────────────────────┐
│  LogInForm.vue                   │
│                                  │
│  1. Check email hardcoded        │
│  2. Check password provided      │
│  3. First login: set password    │
│  4. Later login: verify password │
│  5. Navigate to /home            │
└──────────────────────────────────┘
```

---

## Summary

The Motix application follows this complete flow:

1. **Initialization**: App bootstraps with Pinia and Vue Router
2. **Authentication**: User logs in with hardcoded email and sets/verifies password
3. **Navigation**: After login, user goes to home page
4. **Search Selection**: User chooses search method (license, VIN, or brand/model/year)
5. **Search Execution**: Selected method searches the database via store action
6. **History Management**: Search is added to history and recent cars
7. **Results Display**: Car details and maintenance information displayed
8. **Maintenance Lookup**: Automatic matching of maintenance data based on car specs
9. **User Navigation**: User can perform new searches or view history

All state is centralized in Pinia stores, making data flow predictable and easy to debug. The component hierarchy is clean and follows Vue 3 Composition API best practices.
