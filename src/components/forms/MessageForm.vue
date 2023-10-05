<template>
    <!-- Form for submitting contact information -->
    <form @submit.prevent="sendMessageForm" @reset.prevent="clearMessageForm" class="flex flex-col">
        <h1>Invia messaggio al dottore:</h1>
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
            <input type="text" v-model="messageGuestName">
        </div>

        <!-- Input for entering the email -->
        <div class="form-element">
            <p>Scrivi la tua email:</p>
            <input type="email" v-model="messageGuestEmail">
        </div>

        <!-- Textarea for entering the message -->
        <div class="form-element">
            <p>Scrivi il tuo messaggio:</p>
            <textarea type="text" v-model="messageContent" rows="10"></textarea>
        </div>

        <!-- Buttons for submitting and resetting the form -->
        <div class="task-bar">
            <button type="submit">
                Invia il messaggio
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
    name: 'MessageForm',
    data() {
        return {
            // Data properties for storing form inputs and responses
            messageGuestName: '',
            messageGuestEmail: '',
            messageContent: '',
            response: null,
            errors: false,
            apiUrl: 'http://127.0.0.1:8000/api/message-form', // API endpoint
        }
    },
    props: {
        itemDoctor: Object,
    },
    methods: {
        sendMessageForm() {
            // Function to send the contact form data to the server
            console.log('Message form send starting...');
            axios.post(this.apiUrl, {
                user_id: this.itemDoctor.id,
                guest_name: this.messageGuestName,
                guest_email: this.messageGuestEmail,
                content: this.messageContent,
            })
                .then((response) => {
                    // Handle the response from the server
                    this.response = response.data.success;
                    console.log(this.messageGuestName, this.messageGuestEmail, this.messageContent);
                    console.log(response);
                    if (this.response) {
                        // If the form was successfully submitted, clear it
                        this.clearMessageForm();
                    } else {
                        // If there are errors in the response, store them
                        this.errors = response.data.errors;
                        console.log(this.errors);
                    }
                })
                .catch((error) => {
                    // Handle any errors that occur during the request
                    console.log(error);
                    this.response = false;
                    this.errors = error.response.data.message;
                    console.log(this.response);
                });
        },
        clearMessageForm() {
            // Function to clear the form inputs
            this.messageGuestName = '';
            this.messageGuestEmail = '';
            this.messageContent = '';
        }
    },

    created() {

    },

    computed: {

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