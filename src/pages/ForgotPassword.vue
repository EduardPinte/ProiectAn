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
  <div class="forgot-container">
    <form @submit.prevent="handleReset" class="forgot-form">
      <h2>Forgot Password</h2>
      <p>Enter your email to receive a verification code.</p>

      <input type="email" v-model="email" placeholder="Enter your email" required />
      <button type="submit">Send Code</button>
    </form>
  </div>
</template>

<style scoped>
.forgot-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #B2EBF2; /* background albastru deschis */
}

.forgot-form {
  background-color: white; /* container alb */
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 12px;
  margin-bottom: 20px;
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
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2c8e64;
}
</style>