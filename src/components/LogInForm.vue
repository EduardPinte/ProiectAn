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
    <form @submit.prevent="handleSubmit" class="login-form">
        <img src="@/assets/logoMotix.png" alt="App Logo" class="logo" />
        <h2>Log in</h2>

        <FormInput v-model="email" id="email" type="email" label="Email:" placeholder="Enter your email" required />
        <FormInput v-model="password" id="password" type="password" label="Password:" placeholder="Enter your password"
            required />

        <div class="forgot-container">
            <router-link to="/forgot-password" class="forgot-link">
                Forgot Password?
            </router-link>
        </div>

        <button type="submit">Login</button>

        <div class="bottom-container">
            <p>Don't have an account?
                <router-link to="/signup" class="SignUp-link">Sign Up</router-link>
            </p>
        </div>
    </form>
</template>

<style scoped>
.login-form {
    background: white;
    padding: 60px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.logo {
    display: block;
    margin: 0 auto 20px auto;
    width: 120px;
    height: auto;
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

.forgot-container {
    font-size: 13px;
    color: blue;
    text-align: right;
    margin-bottom: 20px;
    margin-top: -20px;
}

.forgot-link:hover {
    text-decoration: underline;
    color: #2c8e64;
    cursor: pointer;
}

.bottom-container {
    font-size: 14px;
    text-align: center;
    margin-top: 20px;
}
</style>