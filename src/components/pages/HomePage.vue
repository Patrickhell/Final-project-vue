<template>
    <HomeJumbo />

    <section class="mt-8 px-6 pt-20" id="listDoctors">
        <div class="mx-auto max-w-screen-2xl text-center flex flex-col">
            <div class="bd_text-container">
                <span class="py-4 font-normal uppercase text-xl bd_introductive-title">
                    Trova il dottore giusto per le tue esigenze
                </span>
                <h2
                    class="mb-8 px-6 lg:px-32 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    L'innovazione del dottore online
                </h2>
                <p class="mb-12 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
                    BDoctors ha sviluppato un sistema di matching innovativo che ti aiuta a trovare il dottore giusto per
                    te,
                    in base alle tue esigenze e preferenze. Il nostro sistema tiene conto di fattori come la
                    specializzazione, l'esperienza, la posizione e le tariffe.
                </p>
                <router-link to="/doctors"
                    class="px-6 py-3.5 text-base focus:ring-4 focus:outline-none focus:ring-bd_btn-shadow rounded-full text-center bd_btn">
                    Visita il nostro catalogo
                </router-link>
            </div>
            <section class="py-12 bd_display-doctors-curve hidden lg:block">
                <UCurve :width="1400" :height="400" />
            </section>

            <section class="py-8 lg:hidden">

            </section>
        </div>
    </section>
</template>

<script setup>

import HomeJumbo from '../jumbotrons/HomeJumbo.vue';
import UCurve from '../svg/UCurve.vue';

// Components
const components = { HomeJumbo, UCurve };

</script>
<style lang="scss" scoped>
@use '../../styles/index/homepage.scss' as *;
</style>