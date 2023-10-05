<template>
    <!-- Doctor Card -->
        <article class="w-full">
	    	<div class="flex flex-col">
	    		<div class="bd_card-bg shadow-md rounded-xl p-4 relative overflow-hidden border-t border-x border-gray-200">
	    			<div class="flex-none md:flex">

						<!-- Card Profile Picture -->
						<section class="flex justify-between items-start">
	    					<div class="h-24 w-24 md:h-32 md:w-32 md:mb-0 mb-3">
								<img :src="getImagePath(cardElement.user_detail.profile_picture)" :alt="cardElement.name + ' profile picture'"
    								:class="{
    								    'w-full h-full object-cover shadow-xl rounded-xl md:rounded-3xl overflow-hidden border-2': true,
    								    'border-bd_primary-color': !cardElement.active_sponsorships || cardElement.active_sponsorships.length === 0,
    								    'border-yellow-400': cardElement.active_sponsorships && cardElement.active_sponsorships.length > 0
    								}">
	    					</div>
							<button @click="$router.push({ name: 'doctors.show', params: { slug: cardElement.slug}})" 
								class="flex-no-shrink 
									bg-green-400 md:hidden
									hover:bg-green-500 
									px-5 ml-4 py-2 text-xs shadow-sm 
									hover:shadow-lg font-medium tracking-wider border-2 border-green-300 
									hover:border-green-500 text-white rounded-full transition ease-in duration-300">
								Visita profilo
							</button>
						</section>

						<!-- Card Content -->
	    				<section class="flex-auto md:ml-5 justify-evenly">
	    					<div class="md:flex md:items-start md:justify-between md:mt-2">
	    						<div class="flex items-center">
	    							<div class="flex flex-col">
										
	    								<div class="w-full flex-none text-lg text-gray-800 font-bold leading-none">
											<router-link :to="'/doctors/' + cardElement.slug" class="hover:underline">
												{{ cardElement.user_detail.doctor_tag }} {{ cardElement.name }}
											</router-link>
											<div v-if="cardElement.active_sponsorships && cardElement.active_sponsorships.length > 0" 
												class="inline-block ml-2 text-sm text-center px-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md uppercase">
												In Evidenza
											</div>
                                        </div>
										
	    								<div class="flex-auto text-gray-700 my-1">
	    									<span class="mr-3 border-r border-gray-200 max-h-0"></span>
											<span class="text-md">{{ formattedSpecialties }}</span>
	    								</div>
	    							</div>
	    						</div>
								<button @click="$router.push({ name: 'doctors.show', params: { slug: cardElement.slug}})" 
									class="flex-no-shrink bg-green-400 hover:bg-green-500 px-5 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider 
									border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300 hidden md:inline-flex">
									Visita profilo
								</button>
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
									    <span class="text-sm font-medium text-gray-900 underline dark:text-white">{{ cardElement.reviews.length }} Recensioni</span>
									</div>
								</div>
	    					</div>

							<!-- Tabs section -->
							<div class="text-sm font-medium text-center text-black border-b border-black ">
							  	<ul class="flex flex-wrap -mb-px">
							  	  	<li class="mr-2">
							  	  	  	<button
							  	  	  	  	class="inline-block p-3 border-b-[3px] border-transparent rounded-t-lg hover:text-bd_primary-color hover:border-bd_primary-color"
											:class="{ 'text-bd_primary-color !border-bd_primary-color': activeTab === 'address' }"
							  	  	  	  	@click="handleTabClick($event, 'address')">
							  	  	  	  		Indirizzo
							  	  	  	</button>
							  	  	</li>
							  	  	<li class="mr-2">
							  	  	  	<button
											class="inline-block p-3 border-b-[3px] border-transparent rounded-t-lg hover:text-bd_primary-color hover:border-bd_primary-color"
											:class="{ 'text-bd_primary-color !border-bd_primary-color': activeTab === 'info' }"
							  	  	  	  	@click="handleTabClick($event, 'info')">
							  	  	  	  		Informazioni
							  	  	  	</button>
							  	  	</li>
							  	</ul>
							</div>

							<!-- Content section -->
							<section class="pt-4">
							  	<div v-if="activeTab === 'address'" class="flex text-sm text-gray-900 md:justify-between">
							  	  	<!-- Address content -->
									<div class="flex flex-col">
	    								<div class="flex-1 inline-flex items-start md:items-center">
											<BriefcaseIcon class="text-bd_primary-color w-5 h-5" />
	    									<p class="ml-3">{{ cardElement.user_detail.work_address }}</p>
	    								</div>
										<div class="flex-1 inline-flex items-start md:items-center mt-2">
											<EyeDropperIcon class="text-bd_primary-color w-5 h-5" />
											<p class="ml-3">{{ cardElement.user_detail.performance }}</p>
										</div>
									</div>
							  	</div>
							  	<div v-if="activeTab === 'info'" class="flex text-sm text-gray-900 md:justify-between">
									<div class="flex-1 inline-flex items-start md:items-center">
										<EnvelopeOpenIcon class="text-bd_primary-color w-5 h-5" />
										<p class="ml-3">{{ cardElement.email }}</p>
									</div>
							  	</div>
							</section>
	    				</section>
	    			</div>
                    <span v-if="cardElement.active_sponsorships && cardElement.active_sponsorships.length > 0" class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-bd_primary-color to-purple-600"></span>
					<span v-else class="absolute inset-x-0 bottom-0 h-1 bg-bd_primary-color"></span>
	    		</div>
	    	</div>
        </article>
</template>

<script setup>
	import { ref, computed } from 'vue';
	import SolidStar from '../../svg/SolidStar.vue';
	import HalfStar from '../../svg/HalfStar.vue';
	import OutlineStar from '../../svg/OutlineStar.vue';

	import { BriefcaseIcon, EyeDropperIcon, EnvelopeOpenIcon } from '@heroicons/vue/20/solid';
 
	const components = { SolidStar, HalfStar, OutlineStar }

	// Props
	const props = defineProps({
		cardElement: {
  		  	type: Object,
  		  	required: true,
  		}
	});

	// Methods
	const getImagePath = function(img) {
		return `http://127.0.0.1:8000/storage/${img}`;
	};

	// Tab functionality
	const activeTab = ref('address');

	const showTab = (tab) => {
	  	activeTab.value = tab;
	};

	const handleTabClick = (event, tab) => {
	  	event.preventDefault();
	  	showTab(tab);
	};

	const averageVote = computed(() => {
	  	if (!props.cardElement.reviews || props.cardElement.reviews.length === 0) return 0;

	  	const totalVotes = props.cardElement.reviews.reduce((acc, review) => acc + review.vote.vote, 0);
	  	return totalVotes / props.cardElement.reviews.length;
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
	  if (props.cardElement.specialties && props.cardElement.specialties.length > 0) {
	    return props.cardElement.specialties.map(specialty => specialty.name).join(', ');
	  }
	  return '';
	});
</script>

<style lang="scss" scoped>
@use '../../../styles/index/singlecard.scss' as *;
</style>