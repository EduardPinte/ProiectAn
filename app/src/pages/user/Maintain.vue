<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mechanicService } from '@/services/mechanicService'
import MaintenanceForm from '@/components/MaintenanceForm.vue'

const router = useRouter()

const filters = reactive({
  vin: '',
  plate_number: '',
  brand: '',
  model: '',
  year: ''
})

const cars = ref([])
const selectedCar = ref(null)
const maintenanceLogs = ref([])
const isSearching = ref(false)
const isLoadingLogs = ref(false)
const error = ref('')

const selectedCarLabel = computed(() => {
  if (!selectedCar.value) return ''
  const { brand, model, year, plate_number } = selectedCar.value
  return `${brand} ${model} ${year || ''} - ${plate_number}`.trim()
})

const buildSearchParams = () => {
  const normalizedVin = filters.vin.trim().toUpperCase()
  const normalizedPlate = filters.plate_number.trim().toUpperCase()
  const normalizedBrand = filters.brand.trim()
  const normalizedModel = filters.model.trim()

  // Prioritizam cautarea unica dupa VIN sau numar inmatriculare.
  if (normalizedVin) {
    return { vin: normalizedVin }
  }

  if (normalizedPlate) {
    return { plate_number: normalizedPlate }
  }

  const params = {}
  if (normalizedBrand) params.brand = normalizedBrand
  if (normalizedModel) params.model = normalizedModel
  if (filters.year) params.year = Number(filters.year)
  return params
}

const searchCars = async () => {
  isSearching.value = true
  error.value = ''
  selectedCar.value = null
  maintenanceLogs.value = []

  try {
    const params = buildSearchParams()
    const response = await mechanicService.searchCars(params)
    cars.value = response.data
    if (!cars.value.length) {
      error.value = 'Nu am gasit masini in tabela cars pentru filtrele introduse.'
    }
  } catch (searchError) {
    error.value = searchError.message
  } finally {
    isSearching.value = false
  }
}

const loadMaintenanceLogs = async (carId) => {
  isLoadingLogs.value = true
  try {
    const response = await mechanicService.getMaintenanceHistory(carId)
    maintenanceLogs.value = response.data
  } catch (logsError) {
    error.value = logsError.message
  } finally {
    isLoadingLogs.value = false
  }
}

const selectCar = async (car) => {
  selectedCar.value = car
  await loadMaintenanceLogs(car.id)
}

const clearFilters = () => {
  filters.vin = ''
  filters.plate_number = ''
  filters.brand = ''
  filters.model = ''
  filters.year = ''
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-4 md:p-6">
    <div class="mx-auto max-w-6xl space-y-5">
      <div class="rounded-lg bg-white p-5 shadow">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 class="text-2xl font-bold text-slate-800">Mentenanta Masina</h1>
            <p class="text-sm text-slate-500">Cauta masina din tabela cars si adauga interventia pe masina selectata.</p>
          </div>
          <div class="flex gap-2">
            <button class="rounded bg-slate-700 px-4 py-2 text-white hover:bg-slate-800" @click="router.push('/home')">Back Home</button>
            <button class="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700" @click="router.push('/workshop-admin')">
              Workshop Admin
            </button>
          </div>
        </div>
      </div>

      <section class="rounded-lg bg-white p-5 shadow">
        <h2 class="text-lg font-semibold">Cauta masina</h2>
        <form class="mt-3 grid gap-3 md:grid-cols-5" @submit.prevent="searchCars">
          <input v-model="filters.vin" class="rounded border p-2" placeholder="VIN" />
          <input v-model="filters.plate_number" class="rounded border p-2" placeholder="Nr inmatriculare" />
          <input v-model="filters.brand" class="rounded border p-2" placeholder="Marca" />
          <input v-model="filters.model" class="rounded border p-2" placeholder="Model" />
          <input v-model.number="filters.year" type="number" min="1900" max="2100" class="rounded border p-2" placeholder="An" />
          <div class="md:col-span-5 flex gap-2">
            <button :disabled="isSearching" class="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-blue-300">
              {{ isSearching ? 'Se cauta...' : 'Cauta in cars' }}
            </button>
            <button type="button" class="rounded bg-slate-200 px-4 py-2" @click="clearFilters">Reset filtre</button>
          </div>
        </form>
        <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
      </section>

      <section class="rounded-lg bg-white p-5 shadow">
        <h2 class="mb-3 text-lg font-semibold">Rezultate</h2>
        <ul v-if="cars.length" class="space-y-2 text-sm">
          <li
            v-for="car in cars"
            :key="car.id"
            class="flex flex-wrap items-center justify-between gap-2 rounded border p-3"
          >
            <span>#{{ car.id }} {{ car.brand }} {{ car.model }} {{ car.year ? `(${car.year})` : '' }} - {{ car.plate_number }}</span>
            <button class="rounded bg-emerald-600 px-3 py-1 text-white" @click="selectCar(car)">Selecteaza</button>
          </li>
        </ul>
        <p v-else class="text-sm text-slate-500">Nu sunt rezultate afisate.</p>
      </section>

      <MaintenanceForm :car-id="selectedCar?.id ?? null" :car-label="selectedCarLabel" />

      <section class="rounded-lg bg-white p-5 shadow">
        <h2 class="mb-3 text-lg font-semibold">Istoric mentenanta masina selectata</h2>
        <p v-if="isLoadingLogs" class="text-sm text-slate-500">Se incarca istoricul...</p>
        <ul v-else-if="maintenanceLogs.length" class="space-y-2 text-sm">
          <li v-for="log in maintenanceLogs" :key="log.id" class="rounded border p-2">
            <div class="font-medium">{{ log.date }} - {{ log.mileage }} km</div>
            <div class="text-slate-600">{{ log.description }}</div>
          </li>
        </ul>
        <p v-else class="text-sm text-slate-500">Selecteaza o masina ca sa vezi istoricul.</p>
      </section>
    </div>
  </div>
</template>
