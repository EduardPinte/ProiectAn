<script setup>
    import { useRouter } from 'vue-router'  

    const router = useRouter()
</script>



<template>
  <div class="page">
    <h1 class="title">Welcome to Motix</h1>


    <div class="middle-button">
        <router-link to="/select-car"><button>Get Started</button></router-link><br>
        </div>
  </div>


  <div class="bottom-button">
        <router-link to="/history"><button>History</button></router-link>
        <router-link to="/maintain"><button>Maintain</button></router-link>
        <router-link to="/profile"><button>Profile</button></router-link>
         
    
    </div>
         

</template>



<style scoped>
.page {
  font-size: 32px;
  text-align: center;
  margin-top: 100px;
}

.title{
    font-size: 48px;
    margin-bottom: 50px;
}

.middle-button {
    width: 100%;
    padding: 10px;
    background-color: #42b883;
    color: white;
    border: 22px solid;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.bottom-button {
  margin-bottom: 70px;
  display: flex;
  gap: 20px;
  justify-content: center;
}
</style>


