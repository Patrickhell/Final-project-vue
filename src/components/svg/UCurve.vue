<template>
    <div class="relative w-full" :style="{height: height + 'px'}">
        <svg :width="width" :height="height" :viewBox="`${minX} ${minY} ${width} ${height}`" xmlns="http://www.w3.org/2000/svg">
            <path v-for="(pathData, index) in paths" :key="index" :d="pathData" fill="none" stroke="#D3D3D3"/>

            <!-- Use circles to denote position -->
            <circle v-for="doctor in doctors" :key="doctor.t" :cx="doctor.point.x" :cy="doctor.point.y" r="10" fill="transparent" />

        </svg>

        <!-- Moved this out of the SVG to overlay the images -->
        <div 
            v-for="doctor in doctors" 
            :key="doctor.t" 
            class="absolute flex flex-col items-center" 
            :style="{
                left: doctor.point.percentX, 
                top: doctor.point.percentY,
                transform: 'translate(-50%, -10%)'
            }"
        >
            <div class="rounded-full db_overlay-image md:h-[3.7rem] md:w-[3.65rem] lg:h-[4.2rem] lg:w-[4.15rem] xl:h-[5.2rem] xl:w-[5.15rem]">
                <img :src="doctor.img" class="rounded-full object-top object-cover bg-white md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20"/>
            </div>
            <span class="mt-1 text-center">{{ doctor.name }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UCurve',
    data() {
        return {
            'minX': 0,
            'minY': 0
        }
    },
    props: {
        width: {
            type: Number,
            default: 1200
        },
        height: {
            type: Number,
            default: 300
        }
    },
    methods: {
        getPointOnCurve(t, curveIndex) {

            // Starting point coordinates
            const startX = 0;
            const startY = curveIndex * 90;

            // Control point coordinates - Determines the curve's shape and direction
            const controlX = 300 + curveIndex * 50;
            const controlY = 300 - curveIndex * 10;

            // End point coordinates
            const endX = this.width;
            const endY = curveIndex * 80;

            // Quadratic Bezier Curve formula
            // Determines a point's x and y based on 't' value ranging from 0 to 1
            const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
            const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;

            const percentX = (x / this.width) * 100 + "%";
            const percentY = (y / this.height) * 100 + "%";

            return { x, y, percentX, percentY };    
        },
    },
    computed: {
        paths() {
            return [0, 1, 2, 3].map(index => 
                `M0,${index * 110} Q${300 + index * 60},${300 - index * 10} ${this.width},${index * 80}`
            );
        },
        doctors() {
            // Sample data - replace this with data from your API or props
            const sampleDoctors = [
                { name: "Dr. Smith", img: "https://www.stockvault.net/data/2015/09/01/177580/preview16.jpg" },
                { name: "Dr. Johnson", img: "https://www.mvphealthcare.com/-/media/project/mvp/healthcare/hero-images/1-6-2-2-findadoctor.png?h=550&iar=0&w=393&rev=aad8c1c5f21d401091ed0f36f9da02a3&hash=D363D50C795676D5E9447F6FFB2D1E3C" },
                { name: "Dr. Rodriguez", img: "https://st.depositphotos.com/1771835/1477/i/950/depositphotos_14779771-stock-photo-portrait-of-confident-young-doctor.jpg" },
                { name: "Dr. Kim", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0b8OhRxwWuAkJXXKHXNkD9txj8U2WYdAo9A_A982lRovbLAKhZ5lJOerQd7VsIZElseM&usqp=CAU" },
                { name: "Dr. Patel", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUiesuqh0QExCULXAQbcoAUsEua5GyudGD7tyOZMHbdiLkOvEWQKAEnhbmX1HszK7xvAk&usqp=CAU" },
                { name: "Dr. Adebayo", img: "https://thumbs.dreamstime.com/z/doctor-joven-m%C3%A9dico-sonriente-hermoso-feliz-con-el-estetoscopio-encendido-121424760.jpg" },
            ];

            const fixedPositions = [0.25, 0.39, 0.53, 0.68, 0.80, 0.93];

            return sampleDoctors.map((doctor, index) => {
                const curveIndex = index % 3; // Distribute the doctors among the three curves
                return {
                    ...doctor,
                    point: this.getPointOnCurve(fixedPositions[index], curveIndex)
                };
            });
        },
    },
}
</script>

<style lang="scss" scoped>
@use "../../styles/partials/variables.scss" as *;
    svg {
        width: 100%;
    }

    .db_overlay-image {
        background: rgb(0,195,165);
        background: linear-gradient(45deg, rgba(0,195,165,1) 40%, rgba(168,242,231,1) 100%);
    }

    span {
        font-family: 'Dancing Script', cursive;
    }

    @media screen and (min-width: 768px) {
        span {
            font-size: 1.1rem;
        }
    }

    @media screen and (min-width: 1024px) {
        span {
            font-size: 1.4rem;
        }
    }
</style>
