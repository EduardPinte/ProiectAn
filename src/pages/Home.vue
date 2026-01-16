<script setup>
    import { useRouter } from 'vue-router'  

    const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
    <!-- Header -->
    <div class="text-center py-12">
      <h1 class="text-5xl font-bold text-gray-800 mb-2">Welcome to Motix</h1>
      <p class="text-gray-600">Vehicle Information Search Platform</p>
    </div>

    <!-- Main CTA Button -->
    <div class="flex-1 flex items-center justify-center px-4">
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <router-link to="/select-car">
          <button class="px-12 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xl rounded-lg transition-colors duration-300 shadow-md">
            Get Started
          </button>
        </router-link>
      </div>
    </div>

    <!-- Bottom Navigation Buttons -->
    <div class="bg-white border-t border-gray-200 p-6">
      <div class="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
        <router-link to="/history" class="flex-1 min-w-max">
          <button class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-300">
            History
          </button>
        </router-link>
        <router-link to="/maintain" class="flex-1 min-w-max">
          <button class="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors duration-300">
            Maintain
          </button>
        </router-link>
        <router-link to="/profile" class="flex-1 min-w-max">
          <button class="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors duration-300">
            Profile
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>


