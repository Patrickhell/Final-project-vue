<template>
    <section class="shadow-md rounded-xl p-8 relative overflow-hidden border-t border-x border-gray-200 bg-white w-full">
        <!-- Form for submitting contact information -->
        <form @submit.prevent="sendMessageForm" @reset.prevent="clearMessageForm">
            <h1>Invia messaggio al dottore:</h1>
            <!-- Display errors if the response is false -->
           
            <div v-if="response === false">
                <h3>
                    Non ci sono errori nel form:
                    {{ errors }}
                </h3>
            </div>
           

            <!-- Input for entering the name -->
            <div class="mt-4">
                <label class="text-sm text-gray-900 flex items-center">Scrivi il tuo nome:</label>
                <input type="text" v-model="messageGuestName" required
                    placeholder="Mario Rossi"
                    class="bg-bd_secondary-color border-2 border-bd_primary-color text-gray-900 placeholder-gray-900 text-sm rounded-lg focus:ring-bd_primary-color focus:border-bd_primary-color block w-full p-2.5 placeholder:text-gray-500">
            </div>

            <!-- Input for entering the email -->
            <div class="mt-4">
                <label class="text-sm text-gray-900 flex items-center">Scrivi la tua email:</label>
                <input type="email" v-model="messageGuestEmail" required
                    placeholder="mario.rossi@gmail.com"
                    class="bg-bd_secondary-color border-2 border-bd_primary-color text-gray-900 placeholder-gray-900 text-sm rounded-lg focus:ring-bd_primary-color focus:border-bd_primary-color block w-full p-2.5 placeholder:text-gray-500">
            </div>

            <!-- Textarea for entering the message -->
            <div class="mt-4">
                <label class="text-sm text-gray-900 flex items-center">Scrivi il tuo messaggio:</label>
                <textarea type="text" v-model="messageContent" rows="8" required placeholder="Buongiorno, vorrei prenotare una visita per il..."
                    class="bg-bd_secondary-color border-2 border-bd_primary-color text-gray-900 placeholder-gray-900 text-sm rounded-lg focus:ring-bd_primary-color focus:border-bd_primary-color block w-full p-2.5 placeholder:text-gray-500"></textarea>
            </div>

            <!-- Buttons for submitting and resetting the form -->
            <div class="flex gap-2 mt-4">
                <button type="submit"
                    class="text-white focus:ring-4 focus:outline-none focus:ring-bd_btn-shadow font-medium rounded-md text-sm px-4 py-2 text-center mr-3 md:mr-0 bd_btn">
                    Invia il messaggio
                </button>
                <button type="reset"
                    class="text-white focus:ring-4 focus:outline-none focus:ring-bd_btn-shadow font-medium rounded-md text-sm px-4 py-2 text-center mr-3 md:mr-0 bd_btn">
                    Resetta dati
                </button>
            </div>

            
        </form>
        <div v-if="messageSent" class="flex items-center p-4 mt-4 text-green-800 rounded-lg bg-green-200 border-2 border-green-800" role="alert">
            <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span class="sr-only">Info</span>
            <div class="ml-3 text-sm font-medium">
                Messaggio inviato con successo!
            </div>
        </div>
        <span v-if="itemDoctor.active_sponsorships && itemDoctor.active_sponsorships.length > 0" class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-bd_primary-color to-purple-600"></span>
		<span v-else class="absolute inset-x-0 bottom-0 h-1 bg-bd_primary-color"></span>
    </section>
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
            messageSent : false,
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
                        this.messageSent = true;
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
</style>