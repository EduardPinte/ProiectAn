<script setup>
import { onMounted, ref, watch } from 'vue'
import { useCarStore } from '../../stores/carStore'
import { useRouter } from 'vue-router'
import { mechanicService } from '@/services/mechanicService'

const store = useCarStore()
const router = useRouter()
const maintenanceLogs = ref([])
const loading = ref(false)
const error = ref('')

function open(car) {
  store.setCurrentFromHistory(car)
  router.push('/result')
}

const loadMaintenanceHistory = async (carId) => {
  if (!carId) {
    maintenanceLogs.value = []
    return
  }

  loading.value = true
  error.value = ''
  try {
    const response = await mechanicService.getMaintenanceHistory(carId)
    maintenanceLogs.value = response.data
  } catch (historyError) {
    error.value = historyError.message
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadMaintenanceHistory(store.currentCar?.id)
})

watch(
  () => store.currentCar?.id,
  async (newCarId) => {
    await loadMaintenanceHistory(newCarId)
  }
)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="bg-white max-w-3xl mx-auto p-6 rounded-lg shadow">

      <h1 class="text-xl font-semibold mb-2">History</h1>
      <div class="mb-3 flex gap-2">
        <button class="rounded bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-800" @click="router.push('/home')">
          Home
        </button>
        <button class="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700" @click="router.push('/result')">
          Back to Result
        </button>
      </div>
      <p class="mb-4 text-sm text-gray-500">
        Interventiile se afiseaza pentru masina selectata curent:
        <span class="font-medium text-gray-700">
          {{ store.currentCar ? `${store.currentCar.brand} ${store.currentCar.model}` : 'nicio masina selectata' }}
        </span>
      </p>

      <div class="mb-6 rounded-lg border p-4">
        <h2 class="mb-3 font-semibold">Interventii anterioare</h2>
        <p v-if="loading" class="text-sm text-gray-500">Se incarca interventiile...</p>
        <p v-else-if="error" class="text-sm text-red-600">{{ error }}</p>
        <ul v-else-if="maintenanceLogs.length" class="space-y-2">
          <li v-for="log in maintenanceLogs" :key="log.id" class="rounded border p-2 text-sm">
            <div class="font-medium">{{ log.date }} - {{ log.mileage }} km</div>
            <div class="text-gray-700">{{ log.description }}</div>
            <div v-if="log.intervention?.name" class="text-xs text-gray-500">
              Interventie: {{ log.intervention.name }}
            </div>
          </li>
        </ul>
        <p v-else class="text-sm text-gray-500">Nu exista interventii pentru masina selectata.</p>
      </div>

      <h2 class="mb-2 font-semibold">Masini cautate</h2>

      <div v-if="store.searchHistory.length === 0" class="text-center text-gray-500 py-8">
        No searches yet
      </div>

      <div
        v-for="(car, index) in store.searchHistory"
        :key="index"
        class="border-b py-3 cursor-pointer hover:bg-gray-50 transition"
        @click="open(car)"
      >
        <div class="font-medium">
          {{ car.brand }} {{ car.model }} ({{ car.year }})
        </div>
        <div class="text-sm text-gray-500">
          {{ car.searchType }} •
          {{ new Date(car.searchedAt).toLocaleString() }}
        </div>
      </div>

    </div>
  </div>
</template>
