<script setup>
import { ref, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const codeLength = 6
const code = reactive(Array(codeLength).fill(''))
const router = useRouter()

function handleInput(index, event) {
  code[index] = event.target.value.slice(-1) // ia doar ultimul caracter
  if (event.target.value && index < codeLength - 1) {
    nextTick(() => {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) nextInput.focus()
    })
  }
}

function handleBackspace(index, event) {
  if (!event.target.value && index > 0) {
    nextTick(() => {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) prevInput.focus()
    })
  }
}

function handleVerify() {
  const enteredCode = code.join('')
  if (enteredCode.length !== codeLength) {
    alert(`Please enter a ${codeLength}-digit code!`)
    return
  }
  console.log('Verification code entered:', enteredCode)
  alert(`Code ${enteredCode} verified successfully!`)
  router.push('/reset-password')
}
</script>

<template>
  <div class="check-container">
    <form @submit.prevent="handleVerify" class="check-form">
      <h2>Check Your Email</h2>
      <p>Enter the 6-digit verification code sent to your email.</p>

      <div class="code-inputs">
        <input
          v-for="(c, index) in code"
          :key="index"
          :id="`code-${index}`"
          type="text"
          maxlength="1"
          v-model="code[index]"
          @input="handleInput(index, $event)"
          @keydown.backspace="handleBackspace(index, $event)"
        />
      </div>

      <button type="submit">Verify Code</button>
    </form>
  </div>
</template>

<style scoped>
.check-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #B2EBF2;
}

.check-form {
  background: white;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.code-inputs {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.code-inputs input {
  width: 40px;
  height: 50px;
  text-align: center;
  font-size: 24px;
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