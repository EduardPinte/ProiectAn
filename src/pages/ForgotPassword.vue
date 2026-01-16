<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const router = useRouter()

function handleReset() {
  if (!email.value) {
    alert("Please enter your email!")
    return
  }
  
  router.push('/check-email') 
}
</script>

<template>
  <div class="min-h-screen bg-cyan-100 flex items-center justify-center p-4">
    <div class="bg-white p-12 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-2 text-gray-800">Forgot Password</h2>
      <p class="text-sm text-gray-600 text-center mb-6">Enter your email to receive a verification code.</p>

      <form @submit.prevent="handleReset" class="space-y-6">
        <div>
          <input 
            type="email" 
            v-model="email" 
            placeholder="Enter your email" 
            required 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button 
          type="submit"
          class="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors duration-300"
        >
          Send Code
        </button>
      </form>
    </div>
  </div>
</template>