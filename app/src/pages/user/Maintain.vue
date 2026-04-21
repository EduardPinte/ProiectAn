<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="mb-8">
          <img src="@/assets/logoMotix.png" alt="Logo" class="h-16 mx-auto mb-4" />
          <h1 class="text-3xl font-bold text-center text-gray-800">Vehicle Maintenance</h1>
        </div>

        <div class="space-y-4 text-gray-700">
          <div class="border-l-4 border-purple-500 pl-4 py-2">
            <p class="font-semibold text-lg">Upcoming Services</p>
            <!-- <p class="text-sm text-gray-600">No scheduled services at this time</p> -->
          </div>
          <div class="border-l-4 border-pink-500 pl-4 py-2">
            <p class="font-semibold text-lg">Last Service</p>
            <!-- <p class="text-sm text-gray-600">Not recorded yet</p> -->
          </div>
          <div class="border-l-4 border-blue-500 pl-4 py-2">
            <p class="font-semibold text-lg">Maintenance History</p>
            <!-- <p class="text-sm text-gray-600">No maintenance records found</p> -->
          </div>
        </div>

        <div class="mt-8 flex gap-3">
          <button @click="router.push('/home')"
            class="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors duration-300">
            Back to Home
          </button>
          <button
            class="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-300">
            Log Service
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
