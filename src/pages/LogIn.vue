<script setup>
import LoginForm from '@/components/LogInForm.vue'

function handleLogin({ email, password }) {
  console.log('Login attempt:', email, password)
  alert(`Logging in as ${email}`)
}
</script>

<template>
  <div class="login-container">
    <LoginForm @login="handleLogin" />
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #B2EBF2;
  height: 100vh;
}
</style>