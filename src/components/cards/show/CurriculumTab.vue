<template>
    <section class="shadow-md rounded-xl px-8 pb-8 relative overflow-hidden border-t border-x border-gray-200 bg-white w-full">
        {{ itemDoctor.user_detail.cv_file }}
    </section>
</template>
<script setup>
    // Props
    const props = defineProps({
    	itemDoctor: {
    	  	type: Object,
    	  	required: true,
    	}
    });
</script>
<style lang="scss" scoped>
    
</style>