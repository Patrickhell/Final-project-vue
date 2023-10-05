<template>
    <section class="pt-20 md:pt-22">
        <div class="py-16 px-6 mx-auto max-w-screen-2xl text-center lg:py-16 z-10 relative">
            <form class="w-full max-w-md mx-auto">   
                <label for="default-email" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Email sign-up</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                        </svg>
                    </div>
                    <input type="email" id="default-email" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Continua la ricerca..." required>
                    <button type="submit" class="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bd_btn">
                        Cerca
                    </button>
                </div>
            </form>
        </div>
    </section>
    <img src="../../assets/wave.svg" alt="wave-breakpoint">
</template>
<script>
export default {
    name: 'IndexJumbo'
}
</script>
<style lang="scss" scoped>
@use "../../styles/partials/variables.scss" as *;

    section {
        background-color: $neutral-bg;
    }
</style>