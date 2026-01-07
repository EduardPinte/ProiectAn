<script setup>
import { useRouter } from 'vue-router'
</script>

<template>
  <div class="page">
    <h1 class="title">Welcome to Motix</h1>

    <div class="middle-buttons">
      <div class="button-wrapper">
        <router-link to="/history">
          <button>Search by License Plate</button>
        </router-link>
      </div>

      <div class="button-wrapper">
        <router-link to="/selectBMY">
          <button>Select by Brand / Model / Year</button>
        </router-link>
      </div>

      <div class="button-wrapper">
        <router-link to="/searchVIN">
          <button>Search by VIN (Chassis Number)</button>
        </router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
.page {
  font-size: 32px;
  text-align: center;
  margin-top: 50px;
}

.title {
  font-size: 48px;
  margin-bottom: 50px;
}

.middle-buttons {
  display: flex;
  flex-direction: column;
  gap: 20px; 
  align-items: center;
}


.button-wrapper button {
  padding: 15px 30px;
  font-size: 18px;
  border: 2px solid #181a19;
  border-radius: 10px;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  width: 300px; 
}


</style>
