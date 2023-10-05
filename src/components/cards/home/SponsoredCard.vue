<template>
    <article class="bd_card-bg flex w-full sm:max-w-md border-t border-x border-gray-200 rounded-lg shadow-md relative overflow-hidden p-4">
        <div>
            <div class="h-20 w-20">
            	<img :src="getImagePath(itemDoctor.user_detail.profile_picture)" :alt="itemDoctor.name + ' profile picture'"
            		:class="{
            		    'w-full h-full object-cover shadow-xl rounded-lg overflow-hidden border-2 border-yellow-400': true,
            		}">
            </div>
        </div>
        <div class="flex flex-col ml-4 items-start w-full">
            <div class="-space-y-1 text-start border-b border-black w-full pb-2">
                <h4 class="text-lg text-gray-900 ">{{ itemDoctor.user_detail.doctor_tag }} {{ itemDoctor.name }}</h4>
                <span class=" text-sm text-gray-500 dark:text-gray-400 truncate whitespace-nowrap text-ellipsis">{{ formattedSpecialties }}</span>
            </div>
            <button @click="$router.push({ name: 'doctors.show', params: { slug: itemDoctor.slug}})" 
            	class="mt-2 flex-no-shrink bg-green-400 hover:bg-green-500 px-3 py-1 text-xs shadow-sm hover:shadow-lg font-small tracking-wider 
            	border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300 inline-flex">
            	Visita profilo
            </button>
        </div>

        <span class="absolute inset-x-0 bottom-0 h-1 bg-bd_primary-color"></span>
    </article>
</template>

<script setup>
import { computed } from 'vue';

// Props
const props = defineProps(['itemDoctor']);

// Methods
const getImagePath = function(img) {
	return `http://127.0.0.1:8000/storage/${img}`;
};

const formattedSpecialties = computed(() => {
  if (props.itemDoctor.specialties && props.itemDoctor.specialties.length > 0) {
    return props.itemDoctor.specialties.map(specialty => specialty.name).join(', ');
  }
  return '';
});

</script>

<style lang="scss" scoped>
.bd_card-bg {
    background: rgb(255,255,255);
    background: linear-gradient(53deg, rgba(255,255,255,1) 0%, rgba(204,243,237,1) 97%);

    &:hover {
        background: rgb(204,243,237,1);
    }
}

</style>