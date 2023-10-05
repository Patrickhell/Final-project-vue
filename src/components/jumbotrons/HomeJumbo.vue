<template>
    <section class="pt-20 md:pt-22 fixed inset-x-0 top-0 h-screen -z-10 flex justify-center items-center">
        <div class="px-6 mx-auto max-w-screen-2xl text-center z-10 relative">
            <h1
                class="mb-8 px-6 lg:px-32 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                La salute è la tua priorità, noi ti aiutiamo a trovarne il custode
            </h1>

            <!-- Wrapper Pictures and Subtitle -->
            <div class="flex flex-col align-items: center">

                <!-- Left Picture -->
                <div class="lg:absolute lg:left-0 lg:top-5 lg:w-52 lg:h-52 md:pr-12 flex justify-center items-center">
                    <img src="src/assets/jumbo-picture-left.png" class="object-fit: contain">
                </div>

                <p class="mb-8 text-md font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-52">
                    BDoctors collabora con centinaia di dottori, specializzati in diversi ambiti della medicina. Tutti i
                    dottori
                    sono iscritti all'albo,
                    hanno una laurea in medicina e una specializzazione in una determinata area.
                </p>

                <!-- Right Picture (Hidden on Smartphone) -->
                <div
                    class="hidden lg:absolute lg:right-0 lg:top-0 lg:w-64 lg:h-64 md:pl-12 lg:flex lg:justify-center lg:items-center">
                    <img src="src/assets/jumbo-picture-right.png" class="object-contain w-full h-full">
                </div>

            </div>

            <div class="w-full max-w-md mx-auto">
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                            <path
                                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                    </div>
                    <select v-model="selectedSpecialty"
                        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-bd_primary-color rounded-xl bg-white focus:ring-bd_primary-color focus:border-bd_primary-color">
                        <option value="" disabled selected>Seleziona una specialiazzazione</option>
                        <option v-for="specialty in specialties" :key="specialty.id">
                            {{ specialty.name }}
                        </option>
                    </select>
                    <button type="submit" @click="handleSearch"
                        class="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:bd_btn-shadow font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bd_btn">
                        Cerca
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'HomeJumbo',
    data() {
        return {
            selectedSpecialty: '',  // This will hold the selected specialty id
        };
    },
    methods: {
        handleSearch(event) {
            event.preventDefault();
            // console.log("In HomeJumbo, pushing to router:", this.selectedSpecialty);
            if (this.selectedSpecialty) {

                // Set the transformedInput in the Vuex store
                this.$store.commit('setSpecialty', this.selectedSpecialty);
                // Redirect to the doctors list page
                this.$router.push({ name: 'doctors' });
            }
        }
    },
    computed: {
        specialties() {
            return this.$store.state.specialtiesContainer; // Accessing specialties from the store
        }
    },
    mounted() {
        // If the store does not already have the specialties, fetch them
        if (!this.specialties.length) {
            this.$store.dispatch('getSpecialties');
        }
    },
    watch: {
        selectedSpecialty(newVal, oldVal) {
            // console.log("Previous specialty selected:", oldVal);
            // console.log("Current specialty selected:", newVal);
        }
    }
}
</script>
<style lang="scss" scoped>
@use "../../styles/partials/variables.scss" as *;

section {
    background: rgb(204, 243, 234);
    background: linear-gradient(180deg, rgba(204, 243, 234, 1) 42%, rgba(255, 255, 255, 1) 100%);
}
</style>