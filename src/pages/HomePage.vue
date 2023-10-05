<template>
    <HomeJumbo />

    <section class="mt-8 px-6">
        <div class="mx-auto max-w-screen-xl text-center flex flex-col">
            <div class="bd_text-container">
                <span class="py-4 font-normal uppercase text-xl bd_introductive-title">
                    Trova il dottore giusto per le tue esigenze
                </span>
                <h2 class="mb-8 px-6 lg:px-32 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    L'innovazione del dottore online
                </h2>
                <p class="mb-12 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
                    BDoctors ha sviluppato un sistema di matching innovativo che ti aiuta a trovare il dottore giusto per te, in base alle tue esigenze e preferenze. Il nostro sistema tiene conto di fattori come la 
                    specializzazione, l'esperienza, la posizione e le tariffe.
                </p>
                <a href="" class="px-6 py-3.5 text-base focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bd_btn">
                    Visita le sponsorizzazioni
                </a>
            </div>
            <section class="py-12 bd_display-doctors-curve hidden md:block">
                <UCurve :width="1200" :height="300" />
            </section>
        </div>
    </section>

    <section>
        <div class="mx-auto max-w-screen-xl">
        </div>
    </section>
</template>

<script>
import HomeJumbo from '../components/jumbotrons/HomeJumbo.vue';
import UCurve from '../components/svg/UCurve.vue';

export default {
    name: 'HomePage',
    components: {
        HomeJumbo,
        UCurve
    }
}
</script>
<style lang="scss" scoped>
    .bd_introductive-title {
        font-family: 'Vollkorn', serif;
    }
</style>