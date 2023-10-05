<template>
    
    <div class="pt-20 columns-container mx-auto">
        <div class="left-column my-7">
            <div class="flex justify-center items-center flex-wrap">
                <button type="button" v-for="n in 15" class="text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bd_btn">
                    exemple button
                </button>
            </div>

            <div>
                
            </div>

        </div>

        <div class="card-container">
            <SingleCard v-for="itemDoctor in itemsDoctor" :CardElement="itemDoctor" class="mx-2 my-7 card-width"/>
        </div>
    </div>

</template>
<script>
import SingleCard from "../components/cards/SingleCard.vue";

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
    button{
        margin: .2rem;
    }
     @media screen and (min-width: 1024px) {
    div.columns-container{
        display: flex;
            div.left-column{
                width: 800px;
            }
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