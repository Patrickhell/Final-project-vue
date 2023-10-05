<template>
    <div class="container mt-32">

        <div class=" dettagli_profilo ">
            <p class=" font_sottotitolo text-3xl  mb-2"> Informazioni di Contatto</p>
            <p class="font mb-2">{{ itemDoctor }}</p>
            <p class=" font_sottotitolo text-4xl mt-7">
            </p>
            <div>
                <p class="font_sottotitolo text-4xl mt-7">
                </p>
                <p class="font_sottotitolo text-4xl mt-7">
                </p>
            </div>
        </div>
    </div>

    <MessageForm :itemDoctor="itemDoctor" />

    <ReviewForm :itemDoctor="itemDoctor" />
</template>

<script>
import axios from 'axios';
import MessageForm from '../forms/MessageForm.vue';
import ReviewForm from '../forms/ReviewForm.vue';

export default {
    name: 'DoctorShow',
    components: { 
        MessageForm,
        ReviewForm
    },
    data() {
        return {
            apiUrl: 'http://127.0.0.1:8000',
            itemDoctor: {},
        };
    },
    methods: {
        getSingleDoctor() {
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
    created() {
        this.getSingleDoctor();
    },
}
</script>

<style lang="scss" scoped>
</style>