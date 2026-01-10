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
  <div class="signup-container">
    <form @submit.prevent="handleSignUp" class="signup-form">
      <h2>Create Account</h2>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          placeholder="Re-enter your password"
          required
        />
      </div>

        <button
  type="button"
  @click="$router.push('/login')">
  Sign Up
</button>

    </form>
  </div>
</template>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #B2EBF2;
}

.signup-form {
  background: white;
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 28px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #bcb1b1;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2c8e64;
}
</style>