<template>
    <section class="w-full">
        <!-- Form for submitting contact information -->
        <form @submit.prevent="sendReviewForm" @reset.prevent="clearReviewForm">
            <h1>Lascia una recensione per il dottore:</h1>
            <!-- Display errors if the response is false -->
            <div v-if="response === false">
                <h3>
                    Non ci sono errori nel form:
                    {{ errors }}
                </h3>
            </div>

            <!-- Input for entering the name -->
            <div class="mt-4">
                <label for="reviewForm" class="text-sm text-gray-900 flex items-center">Scrivi il tuo nome:</label>
                <input type="text" v-model="reviewGuestName" required
                    placeholder="Mario Rossi" id="reviewName"
                    class="bg-bd_secondary-color border-2 border-bd_primary-color text-gray-900 placeholder-gray-900 text-sm rounded-lg focus:ring-bd_primary-color focus:border-bd_primary-color block w-full p-2.5 placeholder:text-gray-500">
            </div>

            <!-- Input for entering the email -->
            <div class="mt-4">
                <label for="reviewEmail" class="text-sm text-gray-900 flex items-center">Scrivi la tua email:</label>
                <input type="email" v-model="reviewGuestEmail" required
                    placeholder="mario.rossi@gmail.com" id="reviewEmail"
                    class="bg-bd_secondary-color border-2 border-bd_primary-color text-gray-900 placeholder-gray-900 text-sm rounded-lg focus:ring-bd_primary-color focus:border-bd_primary-color block w-full p-2.5 placeholder:text-gray-500">
            </div>

            <div class="flex mt-4 gap-6">
                <!-- Input for entering the review title -->
                <div class="w-2/3">
                    <label for="reviewTitle" class="text-sm text-gray-900 flex items-center">Oggetto:</label>
                    <input type="text" v-model="reviewTitle" required id="reviewTitle" placeholder="Si parla di..."
                        class="bg-bd_secondary-color border-2 border-bd_primary-color text-gray-900 placeholder-gray-900 text-sm rounded-lg focus:ring-bd_primary-color focus:border-bd_primary-color block w-full p-2.5 placeholder:text-gray-500">
                </div>

                <!-- Input for entering the vote -->
                <div class="w-1/3">
                    <label for="reviewVote" class="text-sm text-gray-900 flex items-center">Voto recensione:</label>
                    <input type="number" min="1" max="5" v-model="voteRating" required id="reviewVote"
                        class="bg-bd_secondary-color border-2 border-bd_primary-color text-gray-900 placeholder-gray-900 text-sm rounded-lg focus:ring-bd_primary-color focus:border-bd_primary-color block w-full p-2.5 placeholder:text-gray-500">
                </div>
            </div>

            <!-- Textarea for entering the message -->
            <div class="mt-4">
                <label for="reviewContent" class="text-sm text-gray-900 flex items-center">Scrivi il tuo messaggio:</label>
                <textarea type="text" v-model="reviewContent" rows="5" required id="reviewContent" placeholder="Ottime competenze e professionalita..."
                    class="bg-bd_secondary-color border-2 border-bd_primary-color text-gray-900 placeholder-gray-900 text-sm rounded-lg focus:ring-bd_primary-color focus:border-bd_primary-color block w-full p-2.5 placeholder:text-gray-500"></textarea>
            </div>

            <!-- Buttons for submitting and resetting the form -->
            <div class="flex gap-2 mt-4">
                <button type="submit"
                    class="text-white focus:ring-4 focus:outline-none focus:ring-bd_btn-shadow font-medium rounded-md text-sm px-4 py-2 text-center mr-3 md:mr-0 bd_btn">
                    Invia la recensione
                </button>
                <button type="reset"
                    class="text-white focus:ring-4 focus:outline-none focus:ring-bd_btn-shadow font-medium rounded-md text-sm px-4 py-2 text-center mr-3 md:mr-0 bd_btn">
                    Resetta dati
                </button>
            </div>
        </form>
        <div v-if="reviewSent" class="flex items-center p-4 mt-4 text-green-800 rounded-lg bg-green-200 border-2 border-green-800" role="alert">
            <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span class="sr-only">Info</span>
            <div class="ml-3 text-sm font-medium">
                Recensione inviata con successo!
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ReviewForm',
    data() {
        return {
            // Data properties for storing form inputs and responses
            reviewGuestName: '',
            reviewGuestEmail: '',
            reviewTitle: '',
            reviewContent: '',
            voteRating: 1,
            reviewSent:false,
            response: null,
            errors: false,
            apiReviewUrl: 'http://127.0.0.1:8000/api/review-form', // API endpoint
            apiVoteUrl: 'http://127.0.0.1:8000/api/vote-rating', // API endpoint
        }
    },
    props: {
        itemDoctor: Object,
    },
    methods: {
        axiosCall(endpoint, payload) {
            return axios.post(endpoint, payload)
                .then(response => {
                    if (response.data.success) {
                        return response.data;
                    } else {
                        throw new Error(response.data.errors || "Unknown Error");
                    }
                })
                .catch(error => {
                    console.error(error);
                    this.errors = error.message || "Unknown Error";
                    this.response = false;
                });
        },

        sendReviewForm() {
            console.log('Review form send starting...');
            this.axiosCall(this.apiReviewUrl, {
                user_id: this.itemDoctor.id,
                guest_name: this.reviewGuestName,
                guest_email: this.reviewGuestEmail,
                title: this.reviewTitle,
                content: this.reviewContent,
            })
            .then((response) => {
                const reviewId = response.review.id;
                return this.sendVoteRating(reviewId);
            })
            .then(() => {
                console.log("Both review and vote saved successfully!");
                this.reviewSent = true;
                this.clearReviewForm();
            })
            .catch(error => {
                console.error("Failed to save review or vote:", error);
            });
        },

        sendVoteRating(reviewId) {
            console.log('Vote rating send starting...');
            console.log('Current vote rating:', this.voteRating);
            return this.axiosCall(this.apiVoteUrl, {
                review_id: reviewId,
                vote: this.voteRating
            });
        },

        clearReviewForm() {
            // Function to clear the form inputs
            this.reviewGuestName = '';
            this.reviewGuestEmail = '';
            this.reviewTitle = '';
            this.reviewContent = '';
            this.voteRating = 1;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>