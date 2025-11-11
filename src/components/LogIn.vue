<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function handleLogin() {
  console.log('Login attempt with:', email.value)
  alert(`Logging in as ${email.value}`)
}
</script>

<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <img src="@/assets/logoMotix.png" alt="App Logo" class="logo" />

      <h2>Log in</h2>
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          v-model="email" 
          type="email" 
          id="email" 
          placeholder="Enter your email" 
          required 
        />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input 
          v-model="password" 
          type="password" 
          id="password" 
          placeholder="Enter your password" 
          required 
        />
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #B2EBF2;
}

.login-form {
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
  margin-bottom: 28px;
}

.logo {
  display: block;          /* face imaginea un element bloc */
  margin: 0 auto 20px auto; /* o centrează orizontal + adaugă spațiu sub ea */
  width: 120px;            /* dimensiune fixă (poți ajusta) */
  height: auto;            /* menține proporțiile originale */
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
