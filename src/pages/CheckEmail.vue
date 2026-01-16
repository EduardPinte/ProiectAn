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
  <div class="min-h-screen bg-cyan-100 flex items-center justify-center p-4">
    <form @submit.prevent="handleVerify" class="bg-white p-12 rounded-lg shadow-lg w-full max-w-md text-center">
      <h2 class="text-2xl font-bold mb-2 text-gray-800">Check Your Email</h2>
      <p class="text-gray-600 mb-6">Enter the 6-digit verification code sent to your email.</p>

      <div class="flex justify-center gap-2 mb-6">
        <input
          v-for="(c, index) in code"
          :key="index"
          :id="`code-${index}`"
          type="text"
          maxlength="1"
          v-model="code[index]"
          @input="handleInput(index, $event)"
          @keydown.backspace="handleBackspace(index, $event)"
          class="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button type="submit" class="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors duration-300">
        Verify Code
      </button>
    </form>
  </div>
</template>