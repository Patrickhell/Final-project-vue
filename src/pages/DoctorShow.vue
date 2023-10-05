<template> 
   
    <div class="container">
        <div class="card ">
             <SingleCard v-if="itemDoctor" :CardElement="itemDoctor"/>
        </div>
   
        <div class=" dettagli_profilo ">
           <p class="  font_sottotitolo text-3xl  mb-2"> Informazioni di Contatto</p>
           <p class= " font mb-2"> Cellulare: {{ itemDoctor.user_detail.phone_number}}</p>
           <p class="  font mb-2"> E-mail: {{ itemDoctor.email }}</p>
           <p class="  font mb-2"> Indirizzo: {{itemDoctor.user_detail.work_address  }} </p>
           <p class="  font_sottotitolo text-4xl mt-7">
            Curriculum : {{  }}
           </p>
           <div>
                <p class="  font_sottotitolo text-4xl mt-7">
                   Recensioni {{  }}
                </p>
                <p class="  font_sottotitolo text-4xl mt-7">
                voti  {{  }}
                </p>
           </div>
        </div>

       
        
    </div>
        
  

    
    

    

    
  
</template>

<script>
import axios from 'axios';
import SingleCard from '../components/SingleCard.vue';


export default {
    name: 'DoctorShow',
    components:{
        SingleCard,
    },

    data(){
        return{
            apiUrl : 'http://127.0.0.1:8000',

            itemDoctor: false,
        }
    },

    methods: {
        getSingleDoctor(){
            console.log(this.$route.params.slug);
            axios.get(`${this.apiUrl}/api/doctors/${this.$route.params.slug}`)
            .then((response) => {
                console.log(response.data.results);
                this.itemDoctor = response.data.results;
            }).catch(function (error) {
                // handle error
                console.log(error);
            });
        }
    }, 
    created(){
        this.getSingleDoctor();
    },


}
</script>

<style lang="scss" scoped>

div.container{
    max-width: 1000px;
}
.card{
    width: 80%;
    margin: 0 auto;
    padding-bottom: 5rem;
    padding-top: 8rem
}


@media screen and (min-width: 640px){
    
    div.dettagli_profilo {
    margin-left: 7rem;
    
}
.font_sottotitolo {
    font-size: 27px;
}
}

@media screen and (min-width: 768px){
    div.dettagli_profilo{ 
    margin-left: 18%;
    
}
}









</style>