<template>
    <div class="mt-32 mx-auto max-w-screen-2xl">

        <div class="">
            <p class=" font_sottotitolo text-3xl  mb-2"> Informazioni di Contatto</p>
            <p class="font mb-2">Nome {{ itemDoctor.name }}</p>
            <p class="font mb-2">Email {{ itemDoctor.email }}</p>
            <div class="relative h-32 w-32 sm:mb-0 mb-3 shadow-xl rounded-3xl overflow-hidden">
            	<img :src="getImagePath(itemDoctor.user_detail.profile_picture)" :alt="itemDoctor.name + ' profile picture'" class="w-full h-full object-cover">
            </div>
            <p class=" font_sottotitolo text-4xl mt-7">
                <ul>
                    <li v-for="specialty in itemDoctor.specialties" :key="specialty.id">
                        {{ specialty.name }}
                    </li>
                </ul>
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
        },
        getImagePath (img) {
        	return `http://127.0.0.1:8000/storage/${img}`;
        }
    },
    created() {
        this.getSingleDoctor();
    },
}
</script>

<style lang="scss" scoped>
</style>