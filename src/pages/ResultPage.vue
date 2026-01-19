<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCarStore } from '@/stores/carStore'

const store = useCarStore()
const router = useRouter()

// dacă cineva intră direct pe /result fără căutare
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

      <img
        src="@/assets/logoMotix.png"
        alt="Motix logo"
        class="w-20 mx-auto mb-4"
      />

      <h1 class="text-2xl font-semibold text-center mb-4">
        Vehicle Details
      </h1>

      <div v-if="car" class="space-y-3 text-gray-700">

        <!-- NUME -->
        <div class="text-lg font-medium text-center">
          {{ store.carName }}
        </div>

        <!-- AN -->
        <div class="text-sm text-center">
          Year: {{ car.year }} ({{ store.carAge }} years old)
        </div>

        <hr />

        <!-- VIN -->
        <div v-if="car.vin">
          <span class="font-medium">VIN:</span>
          <span class="break-words">{{ car.vin }}</span>
        </div>

        <!-- LICENSE -->
        <div v-if="car.license">
          <span class="font-medium">License Plate:</span>
          {{ car.license }}
        </div>

        <!-- TIP CĂUTARE -->
        <div class="text-sm text-gray-500">
          Search type: {{ store.lastSearchType }}
        </div>

        <!-- DATA CĂUTĂRII -->
        <div class="text-sm text-gray-500">
          Searched at:
          {{ new Date(car.searchedAt).toLocaleString() }}
        </div>
      </div>

      <!-- BUTOANE -->
      <div class="mt-6 flex gap-3">
        <button
          class="flex-1 py-2 bg-gray-200 rounded-md"
          @click="router.push('/select-car')"
        >
          New Search
        </button>

        <button
          class="flex-1 py-2 bg-blue-600 text-white rounded-md"
          @click="router.push('/history')"
        >
          History
        </button>
      </div>
    </div>
  </div>
</template>
