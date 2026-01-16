<script setup>
import { ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import { useRouter } from 'vue-router'

const password = ref('')
const confirmPassword = ref('')
const router = useRouter()

function handleReset() {
  if (!password.value || !confirmPassword.value) {
    alert('Please fill both fields')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }
  // simulate success
  alert('Password reset successfully')
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-cyan-100 flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <div class="flex justify-center mb-6">
        <img src="@/assets/logoMotix.png" alt="Logo" class="h-20" />
      </div>
      
      <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Reset Password</h2>
      <p class="text-sm text-gray-600 mb-6 text-center">Enter a new password for your account.</p>

      <form @submit.prevent="handleReset" class="space-y-6">
        <FormInput v-model="password" id="password" type="password" label="New Password" placeholder="Enter new password" required />
        <FormInput v-model="confirmPassword" id="confirmPassword" type="password" label="Confirm Password" placeholder="Repeat new password" required />

        <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">
          Reset Password
        </button>
      </form>

      <div class="text-sm text-center mt-4">
        <router-link to="/login" class="text-blue-600 hover:text-green-600 hover:underline">Back to login</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
