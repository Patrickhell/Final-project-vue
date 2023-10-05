<template>
    <IndexJumbo />

    <div class="mt-20 max-w-screen-2xl mx-auto">
        <section class="flex flex-col lg:flex-row">
            <div class="bd_filters-col">
                <button type="button" v-for="n in 15" class="text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bd_btn">
                    exemple button
                </button>

                <div class="filter-star">
                    <h1>Media recensioni pazienti</h1>
                    <ul>
                        <li>
                            <a href="#" >
                                <i class="fa-solid fa-star" v-for="n in 4"></i>
                                <i class="fa-solid fa-star" style="color: gray;"></i>
                                <em>
                                    Quattro o più stelle
                                </em>
                            </a>
                        </li>
                        <li>
                            <a href="#" >
                                <i class="fa-solid fa-star" v-for="n in 3"></i>
                                <i class="fa-solid fa-star" v-for="n in 2" style="color: gray;"></i>
                                <em>
                                    tre o più stelle
                                </em>
                            </a>
                        </li>
                        <li>
                            <a href="#" >
                                <i class="fa-solid fa-star" v-for="n in 2"></i>
                                <i class="fa-solid fa-star" v-for="n in 3" style="color: gray;"></i>
                                <em>
                                    due o più stelle
                                </em>
                            </a>
                        </li>
                        <li>
                            <a href="#" >
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star" v-for="n in 4" style="color: gray;"></i>
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
                    <SingleCard v-for="itemDoctor in itemsDoctor" :CardElement="itemDoctor" class="mx-2 my-7 card-width"/>
                </div>
            </div>
        </section>
    </div>

</template>
<script>
import SingleCard from "../components/cards/singlecard.vue";
import IndexJumbo from "../components/jumbotrons/IndexJumbo.vue";

export default {
    name:"indexPage",
    components:{
        SingleCard,
        IndexJumbo
    },
    data() {
        return {
            itemsDoctor:[
                {
                    "thumb": "https://www.coverbrowser.com/image/action-comics/1-1.jpg",
                    "price": "$19.99",
                    "series": "Action Comics",
                    "type": "comic book",
                },
                {
                    "thumb": "https://www.panini.it/media/catalog/product/cache/a5b5dd3adfe0d321084804c738f29601/M/1/M1BLLA015ISBN_0.jpg",
                    "price": "$3.99",
                    "series": "American Vampire 1976",
                    "type": "comic book",
                },
                {
                    "thumb": "https://media.wired.com/photos/593384dad80dd005b42b2817/master/w_2560%2Cc_limit/Aquaman-16.jpg",
                    "price": "$16.99",
                    "series": "Aquaman",
                    "type": "graphic novel",
                },],
        }
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