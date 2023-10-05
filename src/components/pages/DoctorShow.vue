<template>
    <section class="mt-24 mx-auto mb-72 max-w-7xl px-4 sm:px-6 lg:px-8">

        <div class="flex flex-col w-full lg:flex-row lg:gap-6">
            <div class="flex flex-col w-full lg:w-3/5">
                <section class="bd_card-bg shadow-md rounded-xl pt-4 px-4 relative overflow-hidden border border-bd_primary-color w-full mb-6">
    	            <div class="flex-none md:flex mb-4">
                    
		                <!-- Card Profile Picture -->
		                <section class="flex justify-between items-start">
		                	<div class="h-24 w-24 md:h-32 md:w-32 md:mb-0 mb-3">
                                <img :src="getImagePath(itemDoctor.user_detail.profile_picture)" :alt="itemDoctor.name + ' profile picture'"
                                    :class="{
                                        'w-full h-full object-cover shadow-xl rounded-xl md:rounded-3xl overflow-hidden border-2': true,
                                        'border-bd_primary-color': !itemDoctor.active_sponsorships || itemDoctor.active_sponsorships.length === 0,
                                        'border-yellow-400': itemDoctor.active_sponsorships && itemDoctor.active_sponsorships.length > 0
                                    }">
		                	</div>
		                </section>
                    
		                <!-- Card Content -->
		                <section class="flex-auto md:ml-5 justify-evenly">
		                	<div class="md:flex md:items-start md:justify-between md:mt-2">
		                		<div class="flex items-center">
		                			<div class="flex flex-col">
                                    
		                				<div class="w-full flex items-center text-lg text-gray-800 font-bold leading-none">
		                					<span>{{ itemDoctor.user_detail.doctor_tag }} {{ itemDoctor.name }}</span>
		                					<div v-if="itemDoctor.active_sponsorships && itemDoctor.active_sponsorships.length > 0" 
		                						class="inline-block ml-2 text-sm text-center px-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md uppercase">
		                						In Evidenza
		                					</div>
                                        </div>
                                    
		                				<div class="flex-auto text-gray-700 my-1">
		                					<span class="mr-3 border-r border-gray-200 max-h-0"></span>
		                					<span class="text-sm">{{ formattedSpecialties }}</span>
		                				</div>
		                			</div>
		                		</div>
		                    </div>
                        
		                	<!-- Reviews Section -->
		                    <div class="md:flex md:flex-row md:items-center">
		                		<div class="flex">
		                		    <template v-for="star in stars">
		                				<SolidStar v-if="star === 'full'" />
		                				<HalfStar v-if="star === 'half'" />
		                				<OutlineStar v-if="star === 'outline'" />
		                		    </template>
		                			<div class="flex items-center">
		                			    <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">{{ averageVote.toFixed(2) }}</p>
		                			    <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
		                			    <span class="text-sm font-medium text-gray-900 underline dark:text-white">{{ itemDoctor.reviews.length }} Recensioni</span>
		                			</div>
		                		</div>
		                	</div>
	                    </section>
                    </div>
                    <!-- Tabs section -->
                    <div class="text-sm font-medium text-center text-black border-t border-black ">
                      	<ul class="flex w-full flex-wrap -mb-px">
                      	  	<li class="mr-2">
                      	  	  	<button @click="handleTabClick($event, 'infos')"
                                    :class="{ 'text-bd_primary-color !border-bd_primary-color': activeTab === 'infos' }"
                      	  	  	  	class="inline-block p-2 border-b-[4px] border-transparent rounded-t-lg hover:text-bd_primary-color hover:border-bd_primary-color">
                      	  	  	  		Informazioni
                      	  	  	</button>
                      	  	</li>
                            <li class="mr-2">
                              	<button @click="handleTabClick($event, 'reviews')"
                                    :class="{ 'text-bd_primary-color !border-bd_primary-color': activeTab === 'reviews' }"
                            		class="inline-block p-2 border-b-[4px] border-transparent rounded-t-lg hover:text-bd_primary-color hover:border-bd_primary-color">
                              	  		Recensioni ({{ itemDoctor.reviews.length }})
                              	</button>
                            </li>
                            <li class="mr-2">
                              	<button @click="handleTabClick($event, 'curriculum')"
                                    :class="{ 'text-bd_primary-color !border-bd_primary-color': activeTab === 'curriculum' }"
                            		class="inline-block p-2 border-b-[4px] border-transparent rounded-t-lg hover:text-bd_primary-color hover:border-bd_primary-color">
                              	  		Curriculum
                              	</button>
                            </li>
                      	</ul>
                    </div>
                </section>

                <InfosTab v-if="activeTab === 'infos'" :itemDoctor="itemDoctor" />
                <ReviewsTab v-else-if="activeTab === 'reviews'" :itemDoctor="itemDoctor" />
                <CurriculumTab v-else-if="activeTab === 'curriculum'" :itemDoctor="itemDoctor" />
            </div>
            <div class="lg:w-2/5 mt-6 lg:mt-0">
                <MessageForm :itemDoctor="itemDoctor" />
            </div>
        </div>

    </section>
</template>

<script setup>
    import { useStore } from 'vuex';
    import { onMounted, computed, ref } from 'vue';
    import { useRoute } from 'vue-router';

    import SolidStar from '../svg/SolidStar.vue';
    import HalfStar from '../svg/HalfStar.vue';
    import OutlineStar from '../svg/OutlineStar.vue';

    import InfosTab from '../cards/show/InfosTab.vue';
    import ReviewsTab from '../cards/show/ReviewsTab.vue';
    import CurriculumTab from '../cards/show/CurriculumTab.vue';

    import MessageForm from '../forms/MessageForm.vue';

    const components = { MessageForm };

    const store = useStore();
    const route = useRoute();
    const itemDoctor = computed(() => store.state.itemDoctor)

	// Methods
    const fetchDoctorInformation = (slug) => {
        store.dispatch('getSingleDoctor', slug);
    };

	const getImagePath = function(img) {
		return `http://127.0.0.1:8000/storage/${img}`;
	};

	// Tab functionality
	const activeTab = ref('infos');

	const showTab = (tab) => {
	  	activeTab.value = tab;
	};

	const handleTabClick = (event, tab) => {
	  	event.preventDefault();
	  	showTab(tab);
	};

    const averageVote = computed(() => {
        if (!itemDoctor.value.reviews || itemDoctor.value.reviews.length === 0) return 0;

        const totalVotes = itemDoctor.value.reviews.reduce((acc, review) => acc + review.vote.vote, 0);
        return totalVotes / itemDoctor.value.reviews.length;
    });

	const stars = computed(() => {
	  	let starArray = [];
	  	const fullStars = Math.floor(averageVote.value);
	  	const hasHalfStar = averageVote.value % 1 >= 0.5;

	  	for (let i = 0; i < fullStars; i++) {
	  	  starArray.push('full');
	  	}
	  
	  	if (hasHalfStar) {
	  	  starArray.push('half');
	  	}
	  
	  	while (starArray.length < 5) {
	  	  starArray.push('outline');
	  	}
	  
	  	return starArray;
	});

	const formattedSpecialties = computed(() => {
	  if (itemDoctor.value.specialties && itemDoctor.value.specialties.length > 0) {
	    return itemDoctor.value.specialties.map(specialty => specialty.name).join(', ');
	  }
	  return '';
	});

    onMounted(() => {
      if (!store.state.itemDoctor.length) {
        fetchDoctorInformation(route.params.slug);
      }
    });
</script>

<style lang="scss" scoped>
.bd_card-bg {
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(204,243,237,1) 97%);
}

</style>