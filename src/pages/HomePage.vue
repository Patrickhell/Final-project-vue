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

    <section>
    
        <div class="bd_results-col flex flex-col">
            <div class="card-container">
                 <SingleCard class="mb-10 mx-2 my-7 card-width" v-for="itemDoctor in users" :CardElement="itemDoctor" :key="itemDoctor"
                @click="$router.push({ name: 'doctors.show', params: { slug: itemDoctor.slug}})"/>
            </div>
        </div>
    </section>

    
</template>

<script>
import HomeJumbo from '../components/jumbotrons/HomeJumbo.vue';
import UCurve from '../components/svg/UCurve.vue';
import axios from 'axios';
import SingleCard from '../components/SingleCard.vue';




export default {
    name: 'HomePage',
    components: {
        HomeJumbo,
        UCurve,
        SingleCard,
    },


    data() {
        return {

                users: [],
                apiUrl:'http://127.0.0.1:8000/api/doctors',
                
        }
    },

    methods :  {
        getUsers(apiUrl = this.apiUrl){

            axios.get(apiUrl)
            .then((response) =>{
                console.log(response.data.results.data)
                this.users = response.data.results.data;

            })
            .catch(function (error) {
                  console.log(error);
            })

    },
            
    },

    created(){
        this.getUsers(this.apiUrl);
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

    .card-0 {
        margin-top: 2.5rem;
    }

    .card-2 {
        margin-top: 2.5rem;
    }
}
</style>