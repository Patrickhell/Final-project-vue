<template>
  <section class="shadow-md rounded-xl p-8 relative overflow-hidden border-t border-x border-gray-200 bg-white w-full">
    <div v-if="itemDoctor.user_detail.cv_file">
      <iframe :src="`http://127.0.0.1:8000/storage/${itemDoctor.user_detail.cv_file}`" width="100%" height="900px"></iframe>
    </div>
    <span v-else>No CV file uploaded</span>
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