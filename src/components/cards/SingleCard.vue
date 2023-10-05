<template>
        <a href="#" class="flex items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="image-container flex">
                <img class="object-contain" :src="CardElement.thumb" alt="">
            </div>
                <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            </div>
        </a>
</template>
<script>
export default {
    name: 'SingleCard',
    props:{
        CardElement:Object,
    },
}
</script>
<style lang="scss" scoped>
div.image-container{
    width: 40%;
        img{
            object-fit: cover;
            width: 150px;
            height: 150px;
            border-radius: 50%;
        }
}

@media screen and (min-width: 768px) {
        div.image-container{
        width: 60%;
            img{
                object-fit: cover;
                width: 150px;
                height: 150px;
                border-radius: 50%;
            }
    }
}

@media screen and (min-width: 1024px) {
        div.image-container{
        width: 30%;
            img{
                object-fit: cover;
                width: 150px;
                height: 150px;
                border-radius: 50%;
                padding: .2rem;
            }
    }
}

@media screen and (min-width: 1280px) {
        div.image-container{
        width: 25%;
            img{
                object-fit: cover;
                width: 180px;
                height: 180px;
                border-radius: 50%;
                padding: .3rem;
            }
    }
}

@media screen and (min-width: 1536px) {
        div.image-container{
        width: 17%;
            img{
                object-fit: cover;
                width: 180px;
                height: 180px;
                border-radius: 50%;
                padding: .3rem;
            }
    }
}
</style>