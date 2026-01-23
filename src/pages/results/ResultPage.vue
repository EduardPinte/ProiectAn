<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCarStore } from '@/stores/carStore'

const store = useCarStore()
const router = useRouter()

onMounted(() => {
  if (!store.hasCar) {
    router.push('/')
  }
})

const car = computed(() => store.currentCar)
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-lg p-6 rounded-lg shadow">

      <img src="@/assets/logoMotix.png" alt="Motix logo" class="w-20 mx-auto mb-4" />

      <h1 class="text-2xl font-semibold text-center mb-4">
        Vehicle Details
      </h1>

      <div v-if="car" class="space-y-3 text-gray-700">

        <div class="text-lg font-medium text-center">
          {{ store.carName }}
        </div>

        <div class="text-sm text-center">
          Year: {{ car.year }} ({{ store.carAge }} years old)
        </div>

        <hr />

        <div v-if="car.vin">
          <span class="font-medium">VIN:</span>
          <span class="break-words">{{ car.vin }}</span>
        </div>

        <div v-if="car.licensePlate">
          <span class="font-medium">License Plate:</span>
          {{ car.licensePlate }}
        </div>

        <div class="text-sm text-gray-500">
          Search type: {{ store.lastSearchType }}
        </div>

        <div class="text-sm text-gray-500">
          Searched at:
          {{ new Date(car.searchedAt).toLocaleString() }}
        </div>

        <!-- Maintenance Details Section -->
        <hr class="my-2" />

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

        <div v-else class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p class="text-sm text-yellow-800">No maintenance data available for this vehicle</p>
        </div>
      </div>

      <div class="mt-6 flex gap-3">
        <button class="flex-1 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          @click="router.push('/select-car')">
          New Search
        </button>

        <button class="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          @click="router.push('/history')">
          History
        </button>
      </div>
    </div>
  </div>
</template>
