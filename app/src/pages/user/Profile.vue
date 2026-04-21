<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="mb-8">
          <img src="@/assets/logoMotix.png" alt="Logo" class="h-16 mx-auto mb-4" />
          <h1 class="text-3xl font-bold text-center text-gray-800">User Profile</h1>
        </div>

        <div class="space-y-4 text-gray-700">
          <div class="border-b pb-4">
            <p class="text-sm text-gray-500 font-semibold">EMAIL</p>
            <p class="text-lg">eduard.pinte@emanuel.ro</p>
          </div>
          <div class="border-b pb-4">
            <p class="text-sm text-gray-500 font-semibold">USERNAME</p>
            <p class="text-lg">Eduard Pinte</p>
          </div>
          <div class="pb-4">
            <p class="text-sm text-gray-500 font-semibold">MEMBER SINCE</p>
            <p class="text-lg">January 2025</p>
          </div>
        </div>

        <div class="mt-8 flex gap-3">
          <button @click="router.push('/home')" class="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-300">
            Back to Home
          </button>
          <button class="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
