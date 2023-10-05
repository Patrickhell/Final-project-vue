<template>
    <IndexJumbo />

    <div class="mt-20 max-w-screen-2xl mx-auto">
        <section class="flex flex-col lg:flex-row">
            <div class="bd_filters-col">
                <button type="button" v-for="n in 15" :key="n"  class="text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bd_btn">
                    button
                </button>

                <div class="filter-star">
                    <h1>Media recensioni pazienti</h1>
                    <ul>
                        <li>
                            <a href="#" >
                                <i class="fa-solid fa-star" v-for="n in 4" :key="n" ></i>
                                <i class="fa-solid fa-star" style="color: gray;"></i>
                                <em>
                                    Quattro o più stelle
                                </em>
                            </a>
                        </li>
                        <li>
                            <a href="#" >
                                <i class="fa-solid fa-star" v-for="n in 3" :key="n" ></i>
                                <i class="fa-solid fa-star" v-for="n in 2" :key="n" style="color: gray;"></i>
                                <em>
                                    tre o più stelle
                                </em>
                            </a>
                        </li>
                        <li>
                            <a href="#" >
                                <i class="fa-solid fa-star" v-for="n in 2" :key="n" ></i>
                                <i class="fa-solid fa-star" v-for="n in 3" :key="n"  style="color: gray;"></i>
                                <em>
                                    due o più stelle
                                </em>
                            </a>
                        </li>
                        <li>
                            <a href="#" >
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star" v-for="n in 4" :key="n" style="color: gray;"></i>
                                <em>
                                    una o più stelle
                                </em>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            <div class="bd_results-col flex flex-col">
                <div class="card-container">
                    <SingleCard class="mb-10" v-for="itemDoctor in user_details" :CardElement="itemDoctor" :key="itemDoctor" mx-2 my-7 card-width/>
                </div>
            </div>
        </section>
    </div>

</template>
<script>
import axios from 'axios';
import SingleCard from '../components/SingleCard.vue';
import IndexJumbo from "../components/jumbotrons/IndexJumbo.vue";


export default {
    name:"ListDoctorsPage",
    components:{
        SingleCard,
        IndexJumbo
    },
    data() {
        return {
            

                user_details: [],
                apiUrl:'http://127.0.0.1:8000/api/doctors'
        }
    },

    methods :  {
        getUser_details(apiUrl = this.apiUrl){
            axios.get(apiUrl)
            .then((response) =>{
                console.log(response.data.results.data)
                this.user_details = response.data.results.data;
            })
            .catch(function (error) {
                  console.log(error);
            })
        } 
    },

    created(){
        this.getUser_details(this.apiUrl);
    }
}
</script>
<style lang="scss" scoped>
    span{
        padding: .15rem;
    }
    button{
        margin: .2rem;
    }
    .bd_filters-col{
            width: 100%;
        }
        div.filter-star{
            padding: .5rem;

            i{
                color: gold;
            }
    
            h1{
                margin-top: 2rem;
                font-weight: bolder;
            }
            em{
                font-size: .85rem;
                font-weight: bold;
            }
        }

     @media screen and (min-width: 1024px) {
        .bd_filters-col{
            width: 900px;
        }
        div.card-container{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
        }
        .card-width{
            width: 90%;
        }
}
</style>