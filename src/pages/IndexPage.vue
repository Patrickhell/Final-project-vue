<template>
    
    <div class="pt-20 columns-container mx-auto">
        <div class="left-column my-7 flex justify-center items-center flex-wrap">
            <button v-for="n in 20" class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span class="relative transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Cyan to blue
                </span>
            </button>
        </div>

        <div class="card-container">
            <SingleCard v-for="itemDoctor in itemsDoctor" :CardElement="itemDoctor" class="mx-2 my-7 card-width"/>
        </div>
    </div>

</template>
<script>
import SingleCard from "../components/jumbotrons/SingleCard.vue";

export default {
    name:"indexPage",

    components:{
        SingleCard,
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
                },]
        }
    },
}
</script>
<style lang="scss" scoped>
span{
        padding: .15rem;
    }
    
     @media screen and (min-width: 768px) {
    div.columns-container{
        display: flex;
            div.left-column{
                width: 30%;
                display: inline-block;

            }
    }
    div.card-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .card-width{
        width: 100%;
    }
}
</style>