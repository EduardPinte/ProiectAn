<script setup>
import LoginForm from '@/components/LogInForm.vue'

function handleLogin({ email, password }) {
  console.log('Login attempt:', email, password)
  alert(`Logging in as ${email}`)
}
</script>

<template>
  <div class="min-h-screen bg-cyan-100 flex flex-col items-center justify-center p-4">
    <LoginForm @login="handleLogin" />
  </div>
</template>
