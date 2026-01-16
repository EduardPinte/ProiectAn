<script setup>
import { useRouter } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-md p-6 rounded-lg shadow">
      <img
        src="@/assets/logoMotix.png"
        alt="Logo Motix"
        class="w-20 mx-auto mb-6"
      />

      <h1 class="text-2xl font-semibold text-center mb-2">
        Welcome to Motix
      </h1>

      <p class="text-sm text-gray-500 text-center mb-6">
        Choose how you want to search for vehicle information
      </p>

      <div class="space-y-3">
        <router-link to="/searchLicense" class="block">
          <button class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition">
            Search by License Plate
          </button>
        </router-link>

        <router-link to="/selectBMY" class="block">
          <button class="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition">
            Select by Brand / Model / Year
          </button>
        </router-link>

        <router-link to="/searchVIN" class="block">
          <button class="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition">
            Search by VIN (Chassis Number)
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
button {
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>
