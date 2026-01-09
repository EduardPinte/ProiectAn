<script setup>
    import  {ref, computed } from 'vue';
    import { useCarStore } from '@/stores/carStore';
    import { useRouter } from 'vue-router'

    const store = useCarStore();
    const router = useRouter();

    const brand = ref('');
    const model = ref('');
    const year = ref('');

    const brands= {
        Mercedes: ['A-Class', 'C-Class', 'E-Class'],
        BMW: ['Series 1', 'Series 3', 'Series 5'],
        Audi: ['A3', 'A4', 'A6'],
        Toyota: ['Corolla', 'Camry', 'RAV4'],
        Nissan: ['Sentra', 'Altima', 'Rogue']
    }

    const models = computed(() => brands[brand.value] || []);

    const years = computed(() => {
       const years= Array.from({length: 28}, (_, i) => 2026 - i);
       return years;
    })

    const isFormValid = computed(() =>
      brand.value && model.value && year.value
    )
  // action
  function search() {
  if (!isFormValid.value) return
  store.searchByModel(brand.value, model.value, year.value)
  router.push('/result')
}
   
</script>

<template>
        <!-- fundal pagina -->
    <div class= "min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <!-- card alb -->
        <div class="bg-white w-full max-w-md p-6 rounded-lg shadow">
            <img src="@/assets/logoMotix.png" alt="Logo Motix" class="w-20 mx-auto mb-3" />
            <h1 class=" text-xl font-semibold text-center mb-2"
            >Select Brand / Model / Year</h1>

            <p class= "text-sm text-gray-500 text-center mb-4">
                Select vehicle details to lookup information
            </p>

            <select v-model="brand"
            class="w-full px-3 py-2 border rounded-md mb-3
            focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option value="">Select Brand</option>
            <option v-for="brand in Object.keys(brands)" :key="brand">{{ brand }}</option>
        </select>

        <select v-model="model" :disabled="!brand"
        class="w-full px-3 py-2 border rounded-md mb-3
        disabled:bg-gray-100 disabled:cursor-not-allowed">
        <option value="">Select Model</option>
            <option v-for="model in models" :key="model">{{ model }}</option>
    </select>

     <select
        v-model="year"
        class="w-full px-3 py-2 border rounded-md mb-4"
      >
        <option value="">Select Year</option>
        <option
          v-for="year in years"
          :key="year"
        >
          {{ year }}
        </option>
      </select>

      <button
        @click="search"
        :disabled="!isFormValid"
        class="w-full py-2 bg-blue-600 text-white rounded-md
               disabled:bg-blue-300 disabled:cursor-not-allowed"
      >Search</button>
        </div>
    </div>

    <div
        v-if="store.currentCar"
        class="mt-4 text-gray-700"
      >
        <div class="font-medium">
          {{ store.currentCar.brand }} {{ store.currentCar.model }}
        </div>
        <div class="text-sm">
          Year: {{ store.currentCar.year }}
        </div>
      </div>

 



</template>