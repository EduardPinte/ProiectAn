<script setup>
import { useCarStore } from '@/store/carStore'
import { useRouter } from 'vue-router'

const store = useCarStore()
const router = useRouter()

if (!store.currentCar) {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white max-w-md w-full p-6 rounded-lg shadow">

      <h1 class="text-xl font-semibold mb-4 text-center">
        Vehicle Details
      </h1>

      <div class="space-y-2 text-gray-700">
        <div><b>Brand:</b> {{ store.currentCar.brand }}</div>
        <div><b>Model:</b> {{ store.currentCar.model }}</div>
        <div><b>Year:</b> {{ store.currentCar.year }}</div>
        <div><b>Engine:</b> {{ store.currentCar.engine }}</div>
        <div><b>Power:</b> {{ store.currentCar.power }}</div>
        <div><b>Search type:</b> {{ store.currentCar.searchType }}</div>
      </div>

      <router-link
        to="/history"
        class="block mt-6 text-center text-blue-600 hover:underline"
      >
        View search history
      </router-link>
    </div>
  </div>
</template>
