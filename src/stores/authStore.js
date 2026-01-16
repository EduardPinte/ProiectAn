import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useAuthStore = defineStore('auth', () =>{
    const password = ref(localStorage.getItem('password')||'')

    function setPassword(newPassword){
        password.value=newPassword
        localStorage.setItem('password',newPassword)
    }

    function checkPassword(inputPassword){
        return password.value === inputPassword
    }

    return {password,setPassword,checkPassword}

})