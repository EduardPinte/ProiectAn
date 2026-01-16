<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function handleSignUp() {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!")
    return
  }
  console.log('Creating account for:', email.value)
  alert(`Account created for ${email.value}`)
}
</script>

<template>
  <div class="min-h-screen bg-cyan-100 flex items-center justify-center p-4">
    <form @submit.prevent="handleSignUp" class="bg-white p-12 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>

      <div class="mb-6">
        <label for="email" class="block mb-2 font-medium text-gray-700">Email:</label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="Enter your email"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div class="mb-6">
        <label for="password" class="block mb-2 font-medium text-gray-700">Password:</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Enter your password"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div class="mb-8">
        <label for="confirmPassword" class="block mb-2 font-medium text-gray-700">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          placeholder="Re-enter your password"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        class="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors duration-300 mb-4"
      >
        Sign Up
      </button>

      <div class="text-center text-sm">
        <p>Already have an account?
          <router-link to="/login" class="text-blue-600 hover:text-green-600 hover:underline">Log In</router-link>
        </p>
      </div>
    </form>
  </div>
</template>