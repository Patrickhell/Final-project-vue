<template>
    <HomeJumbo />

    <section class="mt-8 px-6 pt-20" id="listDoctors">
        <div class="mx-auto max-w-screen-2xl text-center flex flex-col">
            <div class="bd_text-container">
                <span class="py-4 font-normal uppercase text-xl bd_introductive-title">
                    Trova il dottore giusto per le tue esigenze
                </span>
                <h2 class="mb-8 px-6 lg:px-32 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    L'innovazione del dottore online
                </h2>
                <p class="mb-12 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
                    BDoctors ha sviluppato un sistema di matching innovativo che ti aiuta a trovare il dottore giusto per te, 
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

    <section class="mt-20 px-6 pt-20 pb-12" id="servicePlans">
        <div class="mx-auto max-w-screen-2xl text-center flex flex-col 2xl:flex-row 2xl:text-start 2xl:h-[36rem]">
            <div class="bd_text-col lg:mr-6">
                <span class="py-4 font-normal uppercase text-xl bd_introductive-title">
                    Aumenta la tua visibilità...
                </span>
                <h3 class="mb-8 px-6 lg:px-32 xl:p-0 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                    Scegli il piano giusto per te e raggiungi più pazienti
                </h3>
                <p class="mb-12 text-lg font-normal text-gray-500 sm:px-16 lg:px-48 xl:p-0 dark:text-gray-200">
                    I piani di sponsorizzazione B Doctors ti consentono di aumentare la visibilità del tuo profilo e 
                    raggiungere più pazienti. Con un profilo sponsorizzato, il tuo profilo apparirà in Homepage 
                    nella sezione "Medici in Evidenza" e verrà posizionato sempre prima di 
                    quello di un medico non sponsorizzato che soddisfa le stesse caratteristiche di ricerca.
                    <br>
                    Scegli il piano di sponsorizzazione che fa per te e inizia a farti conoscere da più persone!
                </p>
                <a href="" class="px-6 py-3.5 text-base focus:ring-4 focus:outline-none focus:ring-bd_btn-shadow rounded-full text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bd_btn">
                    Scopri altri piani
                </a>
            </div>
            <div class="mt-12 flex flex-col items-center gap-6 lg:flex-row lg:justify-center 2xl:m-0 lg:items-start db-sponsor-plans">
                <SponsorshipCard
                    v-for="(n, index) in 3"
                    :key="n"
                    :class="alignClasses(index)"
                />
            </div>
        </div>
    </section>
</template>

<script>
import HomeJumbo from '../components/jumbotrons/HomeJumbo.vue';
import UCurve from '../components/svg/UCurve.vue';
import SponsorshipCard from '../components/SponsorshipCard.vue'

export default {
    name: 'HomePage',
    components: {
        HomeJumbo,
        UCurve,
        SponsorshipCard
    },
    methods: {
        alignClasses(index) {
            switch (index) {
              case 0:
                return 'lg:self-end';
              case 1:
                return 'lg:self-center';
              default:
                return '';
            }
        },
    },
}
</script>
<style lang="scss" scoped>
    .bd_introductive-title {
        font-family: 'Vollkorn', serif;
    }

    @media screen and (min-width: 1536px) {
        .bd_text-col {
            width: 40%;
        }
        .db-sponsor-plans {
            width: 60%;
        }
    }
</style>