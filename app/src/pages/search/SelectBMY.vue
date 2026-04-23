<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCarStore } from '../../stores/carStore'
import { useRouter } from 'vue-router'

const store = useCarStore()
const router = useRouter()

const brand = ref('')
const model = ref('')
const year = ref('')
const localError = ref('')

onMounted(async () => {
  await store.loadCarsCatalog()
})

const brands = computed(() => [...new Set(store.carsCache.map((car) => car.brand))].sort())

const models = computed(() => {
  if (!brand.value) return []
  return [...new Set(store.carsCache.filter((car) => car.brand === brand.value).map((car) => car.model))].sort()
})

const years = computed(() =>
  [...new Set(
    store.carsCache
      .filter((car) => (!brand.value || car.brand === brand.value) && (!model.value || car.model === model.value))
      .map((car) => car.year)
      .filter(Boolean)
  )].sort((a, b) => b - a)
)

const isFormValid = computed(
  () => brand.value && model.value && year.value
)

function search() {
  if (!isFormValid.value) return
  localError.value = ''
  store.searchByModel(brand.value, model.value, Number(year.value)).then((car) => {
    if (car) {
      router.push('/result')
      return
    }
    localError.value = 'Masina nu a fost gasita in tabela cars.'
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-md p-6 rounded-lg shadow">

      <img src="@/assets/logoMotix.png" alt="Logo Motix" class="w-20 mx-auto mb-3" />

      <h1 class="text-xl font-semibold text-center mb-2">
        Select Brand / Model / Year
      </h1>

      <p class="text-sm text-gray-500 text-center mb-4">
        Select vehicle details to lookup information
      </p>

      <select v-model="brand" class="w-full px-3 py-2 border rounded-md mb-3
               focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option value="">Select Brand</option>
        <option v-for="b in brands" :key="b" :value="b">
          {{ b }}
        </option>
      </select>

      <select v-model="model" :disabled="!brand" class="w-full px-3 py-2 border rounded-md mb-3
               disabled:bg-gray-100 disabled:cursor-not-allowed">
        <option value="">Select Model</option>
        <option v-for="m in models" :key="m" :value="m">
          {{ m }}
        </option>
      </select>

      <select v-model="year" class="w-full px-3 py-2 border rounded-md mb-4">
        <option value="">Select Year</option>
        <option v-for="y in years" :key="y" :value="y">
          {{ y }}
        </option>
      </select>

      <button @click="search" :disabled="!isFormValid" class="w-full py-2 bg-blue-600 text-white rounded-md
               hover:bg-blue-700 transition
               disabled:bg-blue-300 disabled:cursor-not-allowed">
        Search
      </button>
      <p v-if="localError || store.error" class="mt-2 text-sm text-red-600">
        {{ localError || store.error }}
      </p>

      <div v-if="store.currentCar" class="mt-5 p-3 bg-gray-100 rounded-md text-center">
        <div class="font-medium">
          {{ store.currentCar.brand }} {{ store.currentCar.model }}
        </div>
        <div class="text-sm text-gray-600">
          Year: {{ store.currentCar.year }}
        </div>
      </div>

      <button class="mt-4 w-full rounded-md bg-slate-700 py-2 text-white hover:bg-slate-800" @click="router.push('/home')">
        Home
      </button>

    </div>
  </div>
</template>
