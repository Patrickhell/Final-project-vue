<template>

   
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

        </section>
    </div>

    <div class="card-container ">
        <SingleCard v-for="itemDoctor in searchResults" :key="itemDoctor.d" :CardElement="itemDoctor" />
    </div>
    

</template>
<script>

import SingleCard from '../components/SingleCard.vue';


export default {
    name:"ListDoctorsPage",
    components:{
        SingleCard,
    },
    props: {
    'searchResults': Object, 
  },
    
    data() {
        return {
            
        };

},
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