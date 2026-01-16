<script setup>
import { ref, computed, watch } from 'vue'
import { useCarStore } from '@/stores/carStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const license = ref('')
const store = useCarStore()

const isLicenseValid = computed(() => license.value.length >= 5)
const licenseLength = computed(() => license.value.length)

const licenseStatusMessage = computed(() => {
  if (license.value.length === 0) return ''
  if (isLicenseValid.value) return 'License plate looks valid'
  return 'License plate is too short (min 5 characters)'
})

watch(licenseStatusMessage, (newValue) => {
  console.log('License plate changed:', newValue)
})

watch(
  () => store.currentCar,
  (newCar) => {
    if (newCar) {
      console.log('Car loaded from store:', newCar)
    }
  }
)

function search() {
  if (!isLicenseValid.value) return
  store.searchByLicense(license.value)
  router.push('/result')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-md p-6 rounded-lg shadow">

      <img
        src="@/assets/logoMotix.png"
        alt="Motix logo"
        class="w-20 mx-auto mb-3"
      />

      <h1 class="text-xl font-semibold text-center mb-2">
        Search by License Plate
      </h1>

      <p class="text-sm text-gray-500 text-center mb-4">
        Enter the vehicle license plate number
      </p>

      <input
        v-model="license"
        placeholder="Enter license plate"
        class="w-full px-3 py-2 border rounded-md mb-2
               focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        :disabled="!isLicenseValid"
        @click="search"
        class="w-full py-2 bg-blue-600 text-white rounded-md
               disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        Search
      </button>

      <p v-if="licenseStatusMessage" class="text-sm mt-2 text-gray-600">
        {{ licenseStatusMessage }} ({{ licenseLength }} characters)
      </p>

      <div v-if="store.currentCar" class="mt-4 text-gray-700">
        <div class="font-medium">
          {{ store.currentCar.brand }} {{ store.currentCar.model }}
        </div>
        <div class="text-sm">
          Year: {{ store.currentCar.year }}
        </div>
        <div class="text-sm break-words">
          License: {{ store.currentCar.license }}
        </div>
      </div>

    </div>
  </div>
</template>
