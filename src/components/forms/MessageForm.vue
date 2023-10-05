<template>
    <section class="shadow-md rounded-xl p-8 relative overflow-hidden border-t border-x border-gray-200 bg-white w-full">
        <!-- Form for submitting contact information -->
        <form @submit.prevent="sendMessageForm" @reset.prevent="clearMessageForm">
            <div v-if="messageSent" class=" success-message p-4 mb-4 mt-4 text-sm text-gray-900 rounded-lg bg-bd_secondary-color dark:bg-bd_secondary-color dark:text-green-400" role="alert " >
                <span class="font-medium"></span> Messaggio inviato con successo!!
            </div>
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
                <textarea type="text" v-model="messageContent" rows="8" required
                    class="bg-bd_secondary-color border-2 border-bd_primary-color text-gray-900 placeholder-gray-900 text-sm rounded-lg focus:ring-bd_primary-color focus:border-bd_primary-color block w-full p-2.5 placeholder:text-gray-500"></textarea>
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