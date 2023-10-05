<template>
    <div>
      <HomeJumbo @searchResults="handleSearchResults" />
      <ListDoctorsPage :searchResults="searchResults" />
    </div>
  </template>
  
  <script>
  import HomeJumbo from '../components/jumbotrons/HomeJumbo.vue';
  import ListDoctorsPage from '../pages/ListDoctorsPage.vue';
  
  export default {
    components: {
      HomeJumbo,
      ListDoctorsPage,
    },
    data() {
      return {
        searchResults: [], // Initialize as an empty array
      };
    },
    methods: {
      handleSearchResults(results) {
        this.searchResults = results;
      },
    },
  };
  </script>
  