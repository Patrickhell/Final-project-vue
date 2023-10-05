<template>
        <a href="#" class=" card flex items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="image-container flex">
                <img class=" w-20 h-20 rounded-full" src="../assets/avatar.png" alt="">
            </div>
            <div class="ml-5 flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ CardElement.name }}</h5>
                <p v-for="specialty in CardElement.specialties" :key="specialty">
                      {{ specialty.name }}
                </p>
                <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                    {{ CardElement.user_detail.performance }}
                </p>
            </div>
        </a>
</template>
<script>
export default {
    name: 'SingleCard',
    props:{
        'CardElement': Object,
    },
}
</script>
<style lang="scss" scoped>
.card{
    width: 450px;
    height: 200px;
    margin: 1rem;
}
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
        width: 30%;
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
        width: 28%;
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
        width: 35%;
            img{
                object-fit: cover;
                width: 180px;
                height: 180px;
                border-radius: 50%;
                padding: .2rem;
            }
            
    }
}

@media screen and (min-width: 1536px) {
        div.image-container{
        width: 40%;
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