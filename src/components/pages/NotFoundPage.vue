<template>
    <section class="mx-auto max-w-screen-2xl h-[80vh]">
        <div id="error-page" class="flex items-center justify-center pt-[5%] lg:pt-[60px]">
            <div class="content max-w-[600px] text-center">
                <h2 class="header text-[20vw] mt-10 leading-normal lg:text-[8vw] lg:bg-[400%]" data-text="404">
                    
                </h2>
                <h4 class="text-2xl lg:text-3xl mb-5 uppercase text-black max-w-screen-sm relative absolute top-0 left-0 right-0">
                    Oops! Pagina Non Trovata
                </h4>
                <p class="text-base lg:text-lg text-gray-900">
                    Siamo spiacenti, la pagina che stai cercando non esiste. Per favore, torna alla home!
                </p>
                <div class="btns my-6 inline-flex">
                    <a class="text-white font-medium px-10 py-4 rounded-full uppercase inline-block mx-4 no-underline" href="/src/pages/HomePage.vue">ritorna alla home</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@use '../../styles/partials/variables.scss' as *;

* {
    font-family: 'Inter', sans-serif;
}

.content h2.header:after {
    content: attr(data-text);
    background: -webkit-repeating-linear-gradient(-45deg, #00c3a5, #ccf3ed, #e0fef9, #ccf3ed, #00c3a5, #079681);
    background-size: 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: animate 10s ease-in-out infinite;
}

@keyframes animate {
    0% {
        background-position: 0 0;
    }

    25% {
        background-position: 100% 0;
    }

    50% {
        background-position: 100% 100%;
    }

    75% {
        background-position: 0% 100%;
    }

    100% {
        background-position: 0% 0%;
    }
}

.content h4:after {
    content: attr(data-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.content .btns a {
    background: linear-gradient(to right, #00c3a5, #b3eae2);
}

.content .btns a:hover {
    background: #079681;
}
</style>