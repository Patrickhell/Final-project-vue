<template>
    <div class="pt-20">
        <SingleCard v-for="itemDoctor in itemsDoctor" :CardElement="itemDoctor" class="mx-2 my-7"/>
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
     @media screen and (min-width: 768px) {
    div{
        width:100% ;
        padding-top: 3rem ;

    }
}

@media screen and (min-width: 769px){
    div{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
}
</style>