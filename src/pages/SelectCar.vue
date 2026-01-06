<script setup>
    import { useRouter } from 'vue-router'
</script>

<template>
  <div class="page">
    <h1 class="title">Welcome to Motix</h1>


    <div class="middle-button">
        <router-link to="/select-car"><button>Get Started</button></router-link><br>
         <router-link to="/select-car"><button>Get Started</button></router-link><br>
          <router-link to="/select-car"><button>Get Started</button></router-link>
    </div>
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
</style>