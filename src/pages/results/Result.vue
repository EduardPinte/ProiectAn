<script setup>
import { useCarStore } from '@/stores/carStore'
import { useRouter } from 'vue-router'

const store = useCarStore()
const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="bg-white max-w-md mx-auto p-6 rounded-lg shadow">
      <h1 class="text-xl font-semibold mb-4">Search Result</h1>

      <div v-if="store.currentCar" class="text-gray-700">
        <div class="mb-4">
          <div class="font-medium text-lg">{{ store.currentCar.brand }} {{ store.currentCar.model }}</div>
          <div class="text-sm text-gray-500">Year: {{ store.currentCar.year }}</div>
        </div>

        <div class="border-t pt-4 text-sm">
          <div v-if="store.currentCar.vin" class="mb-2">
            <span class="font-medium">VIN:</span> {{ store.currentCar.vin }}
          </div>
          <div v-if="store.currentCar.license" class="mb-2">
            <span class="font-medium">License:</span> {{ store.currentCar.license }}
          </div>
          <div v-if="store.currentCar.searchedAt" class="mb-2">
            <span class="font-medium">Searched:</span> {{ new Date(store.currentCar.searchedAt).toLocaleString() }}
          </div>
        </div>

        <button @click="goBack" class="mt-6 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Go Back
        </button>
      </div>

      <div v-else class="text-center text-gray-500">
        No car selected
      </div>
    </div>
  </div>
</template>
