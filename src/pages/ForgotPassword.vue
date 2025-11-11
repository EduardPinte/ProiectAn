<script setup>
import { ref } from 'vue'

const email = ref('')

function handleReset() {
  if (!email.value) {
    alert("Please enter your email!")
    return
  }
  console.log('Password reset requested for:', email.value)
  alert(`If an account with ${email.value} exists, a reset link has been sent.`)
}
</script>

<template>
  <div class="forgot-container">
    <form @submit.prevent="handleReset" class="forgot-form">
      <h2>Forgot Password</h2>
      <p>Enter your email to reset your password.</p>

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

      <button type="submit">Reset Password</button>
    </form>
  </div>
</template>

<style scoped>
.forgot-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #B2EBF2;
}

.forgot-form {
  background: white;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 6px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #bcb1b1;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2c8e64;
}
</style>
