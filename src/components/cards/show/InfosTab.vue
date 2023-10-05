<template>
    <section class="shadow-md rounded-xl relative overflow-hidden border-t border-x border-gray-200 bg-white w-full">
        <div class="px-8 pt-8 pb-4 border-b border-black w-full">
            <h2 class="font-bold text-2xl">Informazioni generali</h2>
        </div>
        <!-- Address content -->
        <div class="flex flex-col px-8 pb-8">
        	<div class="flex-1 inline-flex items-start md:items-center border-b border-gray-200 w-full py-6">
        		<BriefcaseIcon class="text-bd_primary-color w-5 h-5" />
        		<span class="ml-3">{{ itemDoctor.user_detail.work_address }}</span>
        	</div>
        	<div class="flex-1 inline-flex items-start md:items-center border-b border-gray-200 w-full py-6">
        		<EyeDropperIcon class="text-bd_primary-color w-5 h-5" />
        		<span class="ml-3">{{ itemDoctor.user_detail.performance }}</span>
        	</div>
            <div class="flex flex-1 flex-col border-b border-gray-200 w-full py-6">
                <div class="flex-1 inline-flex items-start md:items-center">
            	    <EnvelopeOpenIcon class="text-bd_primary-color w-5 h-5" />
            	    <span class="ml-3">{{ itemDoctor.email }}</span>
                </div>
                <div class="flex-1 inline-flex items-start md:items-center mt-2">
                    <PhoneIcon class="text-bd_primary-color w-5 h-5" />
                    <span class="ml-3">{{ itemDoctor.user_detail.phone_number }}</span>
                </div>
            </div>
            <div class="flex flex-1 flex-col items-start border-b border-gray-200 w-full py-6">
                <div class="flex-1 inline-flex items-start md:items-center">
                    <ClipboardDocumentListIcon class="text-bd_primary-color w-5 h-5" />
                    <span class="ml-3">Specializzato nei settori di:</span>
                </div>
                <ul class="list-disc mt-2">
                    <li v-for="specialty in itemDoctor.specialties" class="ml-10">
                        {{ specialty.name }}
                    </li>
                </ul>
            </div>
        </div>
        <span v-if="itemDoctor.active_sponsorships && itemDoctor.active_sponsorships.length > 0" class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-bd_primary-color to-purple-600"></span>
		<span v-else class="absolute inset-x-0 bottom-0 h-1 bg-bd_primary-color"></span>
    </section>

    <section class="shadow-md rounded-xl p-8 relative overflow-hidden border-t border-x border-gray-200 bg-white w-full mt-6">
        <ReviewForm :itemDoctor="itemDoctor" />
        <article v-for="(review, index) in itemDoctor.reviews.slice(0, 3)" :key="index" class="border-b border-gray-200 py-6">
            <div class="flex items-center mb-4 space-x-4">
                <div class="space-y-1 flex font-medium dark:text-white">
                    <span>{{ review.guest_name }} -</span>
                    <h3 class="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                        {{ review.title }}
                    </h3>
                </div>
            </div>
            <div class="flex items-center mb-1">
                <template v-for="i in 5">
                    <svg v-if="i <= review.vote.vote" class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg v-else class="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                </template>
            </div>
            <div class="mb-5 text-sm text-gray-500 italic">
                <span>Recensione eseguita il: <time>{{ formatReviewDate(review.created_at) }}</time></span>
            </div>
            <p class="mb-2 text-gray-900">
                {{ review.content }}
            </p>
        </article>
        <span v-if="itemDoctor.active_sponsorships && itemDoctor.active_sponsorships.length > 0" class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-bd_primary-color to-purple-600"></span>
		<span v-else class="absolute inset-x-0 bottom-0 h-1 bg-bd_primary-color"></span>
    </section>
</template>
<script setup>
import ReviewForm from '../../forms/ReviewForm.vue';
import { BriefcaseIcon, EyeDropperIcon, EnvelopeOpenIcon, PhoneIcon, ClipboardDocumentListIcon } from '@heroicons/vue/20/solid';
    // Props
    const props = defineProps({
    	itemDoctor: {
    	  	type: Object,
    	  	required: true,
    	}
    });

    // Methods
    const formatReviewDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Rome' };
        return new Date(date).toLocaleDateString(undefined, options);
    };
</script>
<style lang="scss" scoped>
    
</style>