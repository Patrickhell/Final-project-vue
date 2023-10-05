<template>
    <!-- Doctor Card -->
        <article class="w-full cursor-pointer">
	    	<div class="flex flex-col">
	    		<div class="bd_card-bg shadow-md rounded-xl p-8 sm:p-4 relative overflow-hidden">
	    			<div class="flex-none sm:flex">

						<!-- Card Profile Picture -->
						<section class="flex items-center justify-between">
	    					<div class="relative h-32 w-32 sm:mb-0 mb-3 shadow-xl rounded-3xl overflow-hidden">
	    						<img :src="getImagePath(cardElement.user_detail.profile_picture)" :alt="cardElement.name + ' profile picture'" class="w-full h-full object-cover">
	    					</div>

							<div class="text-end sm:hidden">
								<div class="flex items-center justify-between sm:mt-2">
									<div class="flex items-center">
										<div class="flex flex-col">
											<div class="w-full flex-none text-lg text-gray-800 font-bold leading-none">
								                Dr. {{ cardElement.name }}
								            </div>
											<div class="flex-auto text-gray-500 my-1">
												<span class="mr-3 border-r border-gray-200 max-h-0"></span><span>{{ cardElement.email }}</span>
											</div>
										</div>
									</div>
								</div>
								<div class="flex flex-row justify-end">
									<div class="flex">
									    <template v-for="star in stars">
											<SolidStar v-if="star === 'full'" />
											<HalfStar v-if="star === 'half'" />
											<OutlineStar v-if="star === 'outline'" />
									    </template>
									</div>
								</div>
							</div>
						</section>

						<!-- Card Content -->
	    				<div class="flex-auto sm:ml-5 justify-evenly">
	    					<div class="hidden sm:flex sm:items-center sm:justify-between sm:mt-2">
	    						<div class="flex items-center">
	    							<div class="flex flex-col">
	    								<div class="w-full flex-none text-lg text-gray-800 font-bold leading-none">
                                            Dr. {{ cardElement.name }} | USER ID: {{ cardElement.id }}
                                        </div>
	    								<div class="flex-auto text-gray-500 my-1">
	    									<span class="mr-3 border-r border-gray-200 max-h-0"></span><span>{{ cardElement.email }}</span>
	    								</div>
	    							</div>
	    						</div>
	    				    </div>
	    				    <div class="hidden sm:flex sm:flex-row sm:items-center">
								<div class="flex">
								    <template v-for="star in stars">
										<SolidStar v-if="star === 'full'" />
										<HalfStar v-if="star === 'half'" />
										<OutlineStar v-if="star === 'outline'" />
									
								    </template>
									<div class="flex items-center">
									    <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">{{ averageVote.toFixed(2) }}</p>
									    <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
									    <span class="text-sm font-medium text-gray-900 underline dark:text-white">{{ cardElement.reviews.length }}</span>
									</div>
								</div>
	    					</div>
							<ul>
							    <li v-for="specialty in cardElement.specialties" :key="specialty.id">
							        {{ specialty.name }}
							    </li>
							</ul>
							<!-- Card footer -->
	    					<div class="flex pt-2 text-sm text-gray-500">
	    						<div class="flex-1 inline-flex items-center">
									<BriefcaseIcon class="w-10 h-10 sm:w-5 sm:h-5" />
	    							<p class="ml-3">{{ cardElement.user_detail.work_address }}</p>
	    						</div>
	    						<button class="flex-no-shrink bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300">
									Visita profilo
								</button>
	    					</div>
	    				</div>
	    			</div>
                    <span v-if="cardElement.active_sponsorships && cardElement.active_sponsorships.length > 0" class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
					<span v-else class="absolute inset-x-0 bottom-0 h-1 bg-bd_primary-color"></span>
	    		</div>
	    	</div>
        </article>
</template>

<script setup>
	import { computed } from 'vue'
	import SolidStar from '../svg/SolidStar.vue'
	import HalfStar from '../svg/HalfStar.vue'
	import OutlineStar from '../svg/OutlineStar.vue'

	import { BriefcaseIcon } from '@heroicons/vue/20/solid'
 
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
</script>

<style lang="scss" scoped>
@use '../../styles/index/singlecard.scss' as *;
</style>