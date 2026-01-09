<script setup>
import { useCarStore } from '@/stores/carStore'
import { useRouter } from 'vue-router'

const store = useCarStore()
const router = useRouter()

function open(car) {
  store.setCurrentFromHistory(car)
  router.push('/result')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="bg-white max-w-3xl mx-auto p-6 rounded-lg shadow">

      <h1 class="text-xl font-semibold mb-4">
        Search History
      </h1>

      <div v-if="store.searchHistory.length === 0">
        No searches yet
      </div>

      <div
        v-for="(car, index) in store.searchHistory"
        :key="index"
        class="border-b py-3 cursor-pointer hover:bg-gray-50"
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
