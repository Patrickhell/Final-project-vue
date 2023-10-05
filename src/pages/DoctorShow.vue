<template>
    <section class="container">
        <div class="flex space-x-10 items-center  mb-20">
            <img class="w-36 h-36 rounded-full " src="/src/assets/dog.png" alt="">
            <div class="font-medium dark:text-white ">
                <div class="text-4xl"> Hell Patrick {{  }}</div>
                <div class="text-lg text-gray-500 dark:text-gray-400">
                  Neurochirurgo 
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Performance: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                   Laborum autem rem voluptas voluptatum. Suscipit provident obcaecati ea facilis enim voluptates amet! Quam officiis perferendis debitis eligendi, distinctio ab unde temporibus.
                </div>
            </div>
        </div>

        <div >
            <p class="text-4xl mb-2"> Informazioni di Contatto</p>
            <p class="mb-2"> Cellulare: {{  }}</p>
            <p class="mb-2"> E-mail: {{  }}</p>
            <p class="mb-2"> Indirizzo: {{  }} </p>
        
        </div>

        <div class="text-4xl mt-7"> Curriculum:</div>
           
      

    </section>
    

    

    
  
</template>

<script>


export default {
    name: 'DoctorShow',


}
</script>

<style lang="scss" scoped>
.container{
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 5rem;
    padding-top: 8rem;
}
</style>