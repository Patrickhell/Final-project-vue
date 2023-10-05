<template>
    <nav aria-label="Page navigation" class="flex flex-col items-start">
      <ul class="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            @click="prevPage"
            class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-bd_primary-color rounded-l-md hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
          </button>
        </li>
        <!-- Render page numbers -->
        <li v-for="pageNumber in totalPages" :key="pageNumber">
          <button
            @click="gotoPage(pageNumber)"
            :class="{
              'z-10 flex items-center justify-center px-3 h-8 leading-tight text-bd_primary-color font-bold border border-bd_primary-color bg-bd_secondary-color': pageNumber === currentPage,
              'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-bd_primary-color hover:text-gray-700': pageNumber !== currentPage
            }"
          >
            {{ pageNumber }}
          </button>
        </li>
        <li>
          <button
            @click="nextPage"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-bd_primary-color rounded-r-md hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Next</span>
            <svg
              class="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
          </button>
        </li>
      </ul>
      <!-- Help text -->
      <span class="flex gap-1 text-sm text-gray-700 dark:text-gray-400">
        Mostra <span class="font-semibold text-gray-900 dark:text-white">{{ toValue }}</span> su <span class="font-semibold text-gray-900 dark:text-white">{{ totalResults }}</span> dottori!
      </span>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Pagination',
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      },
      nextPage: {
        type: Function,
        required: true
      },
      prevPage: {
        type: Function,
        required: true
      },
      toValue: {
        type: Number,
        required: true
      },
      totalResults: {
        type: Number,
        required: true
      }
    },
    methods: {
      gotoPage(pageNumber) {
        // Call the parent component's nextPage or prevPage method based on the clicked page number
        this.$emit('goto-page', pageNumber);
      }
    },
    computed: {
      displayedResults() {
        return this.toValue; // Use totalResults to display the number of displayed results
      },
      displayedTotalResults() {
        return this.totalResults; // Use totalResults to display the number of displayed results
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  /* Your styles */
  </style>
  