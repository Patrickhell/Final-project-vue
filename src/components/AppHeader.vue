<template>
    <nav class="fixed w-full z-20 top-0 left-0" :class="{ 'bd_nav-shadow': isUserScrolling }">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

            <!-- Logo -->
            <router-link to="/" class="flex items-center flex-shrink-0">
                <img src="../assets/main-logo.png" class="h-8 mr-3" alt="Flowbite Logo">
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BDoctors</span>
            </router-link>
            
            <!-- Buttons -->
            <div class="flex md:order-2 flex-shrink-0">
                <a href="http://127.0.0.1:8000/dashboard" class="text-white focus:ring-4 focus:outline-none focus:ring-bd_btn-shadow font-medium rounded-full text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bd_btn">
                    Accedi | Registrati
                </a>
                <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-bd_btn-shadow dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>

            <!-- Navigation List -->
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 bd_nav-items-list" id="navbar-sticky">
                <ul class="flex flex-col gap-2 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <router-link to="/"
                            class="block py-2 pl-3 pr-4 rounded md:p-0 bd_nav-item"
                            active-class="bd_nav-item-active">
                            Home
                        </router-link>
                    </li>
                    <li>
                        <a href=""
                            @click.prevent="handleDoctorLinkClick"
                            class="block py-2 pl-3 pr-4 rounded md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 bd_nav-item"
                            :class="{ 'bd_nav-item-active': isActiveRoute('/list-doctors') }">
                            Medici in Evidenza
                        </a>
                    </li>
                    <li>
                        <router-link to="/doctors"
                            class="block py-2 pl-3 pr-4 rounded md:p-0 bd_nav-item"
                            active-class="bd_nav-item-active">
                            Lista Dottori
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            isUserScrolling: false,
        }
    },
    methods: {
        // Check if the route is active and apply class next
        isActiveRoute(routePath) {
            return this.$route.path === routePath;
        },
        handleDoctorLinkClick() {
            if (this.$route.path === "/") {
                const section = document.getElementById('sponsoredDoctors');
                if (section) section.scrollIntoView({ behavior: "smooth" });
            } else {
                this.$router.push("/doctors");
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@use "../styles/partials/variables.scss" as *;

nav {
    background: rgb(204,243,234);
    transition: box-shadow 0.3s ease-in;
    box-shadow: 0px 4px 16px -2px transparent;
}

.bd_nav-item {
    font-family: 'Inter', sans-serif;
    background-color: rgb(239, 237, 237);

    &:hover {
        background-color: $secondary-color;
    }
}

.bd_nav-item-active {
    background-color: $primary-color;
    pointer-events: none;
    cursor: default;
}

@media screen and (min-width: 768px) {
    ul {
        background-color: transparent;
    }

    .bd_nav-items-list {
        position: relative;
        // left: calc(-2.25rem);
    }

    .bd_nav-item {
        font-family: 'Inter', sans-serif;
        background-color: transparent;

        &:hover {
            background-color: transparent;
            color: $primary-color;
        }
    }

    .bd_nav-item-active {
        color: $primary-color;
        pointer-events: none;
        cursor: default;
    }
}
</style>