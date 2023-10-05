<template>
    <HomeJumbo />

    <section class="mt-[100vh] px-6 pt-20 bg-white" id="sponsoredDoctors">
        <div class="mx-auto max-w-screen-2xl text-center flex flex-col">
            <div class="bd_text-container">
                <span class="py-4 font-normal uppercase text-xl bd_introductive-title">
                    Medici in evidenza
                </span>
                <h2
                    class="mb-8 px-6 lg:px-32 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
                    Trova il dottore giusto per le tue esigenze
                </h2>
                <p class="mb-12 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
                    BDoctors ha sviluppato un sistema di matching innovativo che ti aiuta a trovare il dottore giusto per te,
                    in base alle tue esigenze e preferenze. Il nostro sistema tiene conto di fattori come la
                    specializzazione, l'esperienza, la posizione e le tariffe.
                </p>
            </div>
            <section class="py-12 bd_display-doctors-curve hidden lg:block">
                <UCurve :width="1400" :height="400" />
            </section>

        
            <section class="py-8 mb-64 space-y-4 flex flex-col sm:items-center md:flex-row md:flex-wrap md:space-y-0 md:justify-center md:gap-4">
                <SponsoredCard v-for="itemDoctor in users" :itemDoctor="itemDoctor"/>
            </section>
        </div>
    </section>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref, onMounted } from 'vue'

import HomeJumbo from '../jumbotrons/HomeJumbo.vue';
import UCurve from '../svg/UCurve.vue';
import SponsoredCard from '../cards/home/SponsoredCard.vue';

// Components
const components = { HomeJumbo, UCurve, SponsoredCard };

const loading = ref(true);
const users = ref([]);

// Group API-related Properties and Pagination:
const apiDetails = reactive({
  doctorsActiveSponsorUrl: 'http://127.0.0.1:8000/api/active-sponsorship',
});

// APi Calls
const getUsers = (apiUrlParam = apiDetails.doctorsActiveSponsorUrl) => {
  const params = {}

  axios.get(apiUrlParam, { params })
    .then((response) => {
      console.log(response.data.results);
      users.value = response.data.results;
      loading.value = false;
    })
    .catch((error) => {
      console.log(error)
      loading.value = false;
    })
};

// Lifecycle Hooks
onMounted(() => {
  getUsers(apiDetails.doctorsUrl);
});
</script>

<style lang="scss" scoped>
@use '../../styles/index/homepage.scss' as *;

</style>