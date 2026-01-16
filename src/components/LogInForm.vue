<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormInput from './FormInput.vue'

const router=useRouter()
const email = ref('')
const password = ref('')
const emit = defineEmits(['login'])

function handleSubmit() {
   if(
    email.value === 'eduard.pinte@emanuel.ro' && 
    password.value === 'UEOI2'
   ){
    router.push('/home')
   }else{
    alert('Invalid email or password')
   }
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="bg-white p-12 rounded-lg shadow-md w-full max-w-md">
        <img src="@/assets/logoMotix.png" alt="App Logo" class="h-24 mx-auto mb-6" />
        <h2 class="text-2xl font-semibold text-center mb-6 text-gray-800">Log in</h2>

        <FormInput v-model="email" id="email" type="email" label="Email:" placeholder="Enter your email" required />
        <FormInput v-model="password" id="password" type="password" label="Password:" placeholder="Enter your password" required />

        <div class="text-right mb-4 -mt-4">
            <router-link to="/forgot-password" class="text-sm text-blue-600 hover:text-green-600 hover:underline">
                Forgot Password?
            </router-link>
        </div>

        <button type="submit" class="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition-colors duration-300">Login</button>

        <div class="text-center mt-4 text-sm">
            <p>Don't have an account?
                <router-link to="/signup" class="text-blue-600 hover:text-green-600 hover:underline">Sign Up</router-link>
            </p>
        </div>
    </form>
</template>