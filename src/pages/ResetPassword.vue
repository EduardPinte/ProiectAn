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
  <AuthLayout>
    <AuthCard>
      <Logo />
      <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">Reset Password</h2>

      <p class="text-sm text-gray-600 mb-4 text-center">Enter a new password for your account.</p>

      <form @submit.prevent="handleReset" class="w-full">
        <FormInput v-model="password" id="password" type="password" label="New Password" placeholder="Enter new password" required />
        <FormInput v-model="confirmPassword" id="confirmPassword" type="password" label="Confirm Password" placeholder="Repeat new password" required />

        <BaseButton type="submit">Reset Password</BaseButton>
      </form>

      <div class="text-sm text-center mt-4">
        <router-link to="/login" class="text-blue-600 hover:text-green-600">Back to login</router-link>
      </div>
    </AuthCard>
  </AuthLayout>
</template>

<style scoped>
</style>
