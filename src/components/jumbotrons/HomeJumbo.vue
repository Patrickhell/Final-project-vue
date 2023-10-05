<template>
    <section class="pt-20 md:pt-22">
        <div class="py-16 px-6 mx-auto max-w-screen-2xl text-center lg:py-48 z-10 relative">
            <h1
                class="mb-8 px-6 lg:px-32 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                La salute è la tua priorità, noi ti aiutiamo a trovarne il custode
            </h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
                BDoctors collabora con centinaia di dottori, specializzati in diversi ambiti della medicina. Tutti i dottori
                sono iscritti all'albo,
                hanno una laurea in medicina e una specializzazione in una determinata area.
            </p>
            <form class="w-full max-w-md mx-auto">
                <label for="default-email" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Email
                    sign-up</label>
                <div class="relative">
                    <input  type="text"  id="searchText" v-model="searchText" @keyup.enter="newSearch(searchText)"
                        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Inzia la ricerca di un dottore..." required>
                    <button type="button" @click="newSearch(searchText)"
                        class="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:bd_btn-shadow font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bd_btn">
                        Cerca
                    </button>
                </div>
            </form>
        </div>
    </section>
    <img src="../../assets/wave.svg" alt="wave-breakpoint">

</template>


<script>
import  axios  from 'axios';
export default {
    name: 'HomeJumbo',

   
    data (){
        return{
                apiUrl:'http://127.0.0.1:8000',
                searchText : '',
                users:[]
        };

        
    },

    methods :  {

       
        newSearch(nameToSearch, nameQuery = false){

            const query = {}
            if (nameQuery) {
                query.specialty_name = nameQuery;
            }
             console.log(nameToSearch);
              axios.get(`${this.apiUrl}/api/doctors?specialty_name=${this.searchText}`, { params: query })
            .then((response) =>{
                console.log(response.data.results.data)
                this.users = response.data.results.data;
                this.$emit('searchResults', this.users);
            this.$router.push({ name: 'doctors', query: {query: this.searchText}})
       
            })

            .catch(function (error) {
                  console.log(error);
            })
    },

   

    }
        


    
}
</script>
<style lang="scss" scoped>@use "../../styles/partials/variables.scss" as *;

section {
    background-color: $neutral-bg;
}

</style>