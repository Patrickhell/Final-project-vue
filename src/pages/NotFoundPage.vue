<template>
    <section class="mx-auto max-w-screen-2xl">
        <div id="error-page" class="flex items-center justify-center pt-[60px] ">
            <div class="content">
                <h2 class="header" data-text="404">
                    404
                </h2>
                <h4 data-text="Opps! Page not found">
                    Oops! Pagina Non Trovata
                </h4>
                <p>
                    Siamo spiacenti, la pagina che stai cercando non esiste. Per favore, torna alla home!
                </p>
                <div class="btns">
                    <a href="/src/pages/HomePage.vue">ritorna alla home</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;

* {
    font-family: 'Inter', sans-serif;
}

#error-page .content {
    max-width: 600px;
    text-align: center;
}

.content h2.header {
    font-size: 18vw;
    line-height: 1em;
}

.content h2.header:after {
    position: absolute;
    content: attr(data-text);
    top: 60px;
    left: 0;
    right: 0;
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

.content h4 {
    font-size: 1.5em;
    margin-bottom: 20px;
    text-transform: uppercase;
    color: #000;
    font-size: 2em;
    max-width: 600px;
    position: relative;
}

.content h4:after {
    position: absolute;
    content: attr(data-text);
    top: 0;
    left: 0;
    right: 0;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.content p {
    font-size: 1.2em;
    color: #0d0d0d;
}   

.content .btns {
    margin: 25px 0;
    display: inline-flex;
}

.content .btns a {
    display: inline-block;
    margin: 0 10px;
    text-decoration: none;
    background: linear-gradient(to right, #00c3a5, #b3eae2);
    color: white;
    font-weight: 500;
    padding: 10px 25px;
    border-radius: 25px;
    text-transform: uppercase;
}

.content .btns a:hover {
    background: #079681;
    color: #fff;
}
</style>