<template>
    <footer class="">
        <div class="bd_footer-primary relative w-full">
            <img
                :class="{'bg-[#f5f7fc]': !isHomepage, 'bg-white': isHomepage}"
                src="../assets/wave-pr-footer.svg"
                class="absolute inset-x-0 bottom-full"
                alt="wave-img"
            >

            <div class="mx-auto w-full max-w-screen-2xl">

                <!-- Primary Footer -->
                <div
                    class="px-6 flex justify-around text-center flex-col md:flex-row md:items-start md:gap-32 md:mt-10 md:pt-20 md:pb-10">

                    <!-- Logo Wrapper -->
                    <div class="flex justify-center ml-3">
                        <a href="#" class="flex items-center gap-2">
                            <!-- Logo Picture -->
                            <img src="../assets/main-logo.png" class="h-12" alt="BDoctors Logo" />
                            <!-- BDoctors Headline -->
                            <span
                                class="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">BDoctors</span>
                        </a>
                    </div>

                    <!-- Links Section 1 Wrapper -->
                    <div class="mt-8 lg:mr-22 sm:flex sm:justify-center sm:gap-8 md:mt-0">
                        <!-- Contact Links Wrapper -->
                        <div class="lg:text-left md:text-center mb-3">
                            <h2 class="mb-2 text-sm font-semibold text-gray-900 uppercase dark:text-white">Servizi</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li>
                                    <a href="#" class="hover:underline">Chi Siamo</a>
                                </li>
                                <li>
                                    <a href="#" class="hover:underline">Contatti</a>
                                </li>
                                <li>
                                    <a href="#" class="hover:underline">Lavora Con Noi</a>
                                </li>
                            </ul>
                        </div>

                        <!-- Info Links Wrapper -->
                        <div class="lg:text-left md:text-center mb-3">
                            <h2 class="mb-2 text-sm font-semibold text-gray-900 uppercase dark:text-white">Informazioni
                                Legali</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li>
                                    <a href="#" class="hover:underline">Privacy & Cookies</a>
                                </li>
                                <li>
                                    <a href="#" class="hover:underline">Condizioni Di Servizio</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Social Links Wrapper -->
                    <div class="lg:text-left md:text-center lg:mr-20">
                        <h2 class="mb-2 text-sm font-semibold text-gray-900 uppercase dark:text-white">Social</h2>

                        <!-- Social Links -->
                        <ul
                            class="text-gray-500 dark:text-gray-400 font-medium flex flex-row justify-center items-center space-x-4">

                            <!-- Facebook -->
                            <li>
                                <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor" viewBox="0 0 8 19">
                                        <path fill-rule="evenodd"
                                            d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Facebook page</span>
                                </a>
                            </li>

                            <!-- Twitter -->
                            <li>
                                <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor" viewBox="0 0 20 17">
                                        <path fill-rule="evenodd"
                                            d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only">Twitter page</span>
                                </a>
                            </li>

                            <!-- LinkedIn -->
                            <li>
                                <a href="#"
                                    class="group text-linkedin-color hover:text-black dark:hover:text-linkedin-dark-hover-color"
                                    title="LinkedIn Profile">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"
                                        fill="currentColor">
                                        <path
                                            d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 11128 619 111.28 142.3V448z" />
                                    </svg>
                                    <span class="sr-only">LinkedIn Profile</span>
                                </a>
                            </li>

                            <!-- Email -->
                            <li>
                                <a href="#"
                                    class="group text-linkedin-color hover:text-black dark:hover:text-linkedin-dark-hover-color"
                                    title="Email Contact">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"
                                        fill="currentColor">
                                        <path
                                            d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                    </svg>
                                    <span class="sr-only">Email Contact</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Second Footer -->
                <div class="flex justify-center items-center text-gray-500 pt-5 pb-5">
                    <p>&copy; BDoctors. All rights reserved.</p>
                </div>

            </div>
        </div>
    </footer>
</template>

<script>
export default {
  data() {
    return {
      isHomepage: false,  // Set this based on your routing logic
    };
  },
  watch: {
    '$route'(to, from) {
      this.isHomepage = to.path === '/';
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/index/footer.scss' as *;
</style>