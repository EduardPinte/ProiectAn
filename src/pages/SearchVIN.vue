<script setup>
import { ref, computed, watch } from 'vue'
import { useCarStore } from '@/stores/carStore'

const vin = ref('')
const store = useCarStore()



// computed validare VIN
const isVinValid = computed(() => vin.value.length === 17)

// computed lungimea VIN (folosită la afișare / debug)
const vinLength = computed(() => vin.value.length)

// computed mesaj dinamic pentru utilizator
const vinStatusMessage = computed(() => {
  if (vin.value.length === 0) return ''
  if (isVinValid.value) return 'VIN looks valid'
  return 'VIN must be 17 characters'
})


// watch urmărește schimbarea VIN-ului
watch(vin, (newValue) => {
  console.log('VIN changed:', newValue)
})

// watch urmărește schimbarea mașinii din Pinia
watch(
  () => store.currentCar,
  (newCar) => {
    if (newCar) {
      console.log('New car loaded from store:', newCar)
    }
  }
)


// ACTION
function search() {
  if (!isVinValid.value) return
  store.searchByVIN(vin.value)
  router.push('/result')
} 
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-md p-6 rounded-lg shadow">

      <img src="@/assets/logoMotix.png" alt="Motix logo" class="w-20 mx-auto mb-3" />

      <h1 class="text-xl font-semibold text-center mb-2">Search VIN</h1>
      <p class="text-sm text-gray-500 text-center mb-4">
        Enter the 17-character VIN to lookup vehicle details
      </p>

      <input
        v-model="vin"
        placeholder="Enter VIN (17 characters)"
        class="w-full px-3 py-2 border rounded-md mb-2
               focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        :disabled="!isVinValid"
        @click="search"
        class="w-full py-2 bg-blue-600 text-white rounded-md
               disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        Search
      </button>

      <!-- MESAJ COMPUTED -->
      <p v-if="vinStatusMessage" class="text-sm mt-2 text-gray-600">
        {{ vinStatusMessage }} ({{ vinLength }}/17)
      </p>

      <!-- REZULTAT DIN PINIA -->
      <div v-if="store.currentCar" class="mt-4 text-gray-700">
        <div class="font-medium">
          {{ store.currentCar.brand }} {{ store.currentCar.model }}
        </div>
        <div class="text-sm">Year: {{ store.currentCar.year }}</div>
        <div class="text-sm break-words">
          VIN: {{ store.currentCar.vin || store.currentCar.license }}
        </div>
      </div>

    </div>
  </div>
</template>
