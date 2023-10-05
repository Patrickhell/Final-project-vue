<template>
    <h1>Inserisci una recensione per il dottore:</h1>
    <!-- Form for submitting contact information -->
    <form @submit.prevent="sendReviewForm">

        <!-- Display errors if the response is false -->
        <div class="form-element info" v-if="response === false">
            <h3>
                Non ci sono errori nel form:
                {{ errors }}
            </h3>
        </div>

        <!-- Input for entering the name -->
        <div class="form-element">
            <p>Scrivi il tuo nome:</p>
            <input type="text" v-model="reviewGuestName">
        </div>

        <!-- Input for entering the email -->
        <div class="form-element">
            <p>Scrivi la tua email:</p>
            <input type="email" v-model="reviewGuestEmail">
        </div>

        <!-- Input for entering the email -->
        <div class="form-element">
            <p>Titolo recensione:</p>
            <input type="text" v-model="reviewTitle">
        </div>

        <!-- Textarea for entering the message -->
        <div class="form-element">
            <p>Scrivi il tuo messaggio:</p>
            <textarea type="text" v-model="reviewContent" rows="10"></textarea>
        </div>

        <!-- Input for entering the vote -->
        <div class="form-element">
            <p>Dai un voto (1-5):</p>
            <input type="number" min="1" max="5" v-model="voteRating">
        </div>


        <!-- Buttons for submitting and resetting the form -->
        <div class="task-bar">
            <button type="submit">
                Invia la recensione
            </button>
            <button type="reset">
                Resetta il form
            </button>
        </div>
    </form>
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
form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;

    div.form-element {
        width: 70%;
        margin-bottom: 1rem;

        * {
            width: 100%;
        }
    }

    button {
        padding: 1rem 2rem;
        margin-right: 1rem;
    }
}
</style>