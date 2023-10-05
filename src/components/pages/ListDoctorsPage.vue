<template>
        <div class="mb-72">
          <!-- Mobile filter dialog -->
          <TransitionRoot as="template" :show="mobileFiltersOpen">
            <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
              <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" ></div>
              </TransitionChild>

              <div class="fixed inset-0 z-40 flex">
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="translate-x-full">
                  <DialogPanel class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div class="flex items-center justify-between px-4">
                      <h2 class="text-lg font-medium text-gray-900">Filtri Dottori</h2>
                      <button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400" @click="mobileFiltersOpen = false">
                        <span class="sr-only">Close menu</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <!-- Filters Mobile -->
                    <div class="mt-4 border-t border-bd_primary-color px-5 space-y-6">
                      <button @click="resetFilters"
                        class="w-full mt-6 focus:ring-4 focus:outline-none focus:ring-bd_btn-shadow font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bd_btn">
                        Resetta filtri
                      </button>
                      <h3 class="sr-only">Specialties</h3>
                      <span class="font-bold text-gray-900">Specializzazioni</span>
                      <ul role="list" class="border-y border-black font-medium text-gray-900 space-y-6 py-6">
                        <li v-for="specialty in specialties" :key="specialty.name">
                          <div class="flex items-center justify-between">
                            <div class="flex items-center">
                              <input type="checkbox" 
                                class="h-4 w-4 rounded border-gray-300 text-bd_primary-color focus:ring-bd_primary-color" 
                                :checked="isSelected(specialty.name)"
                                @change="handleSpecialtyChange(specialty.name)"
                                :value="specialty.name" />
                              <label class="ml-3 min-w-0 flex-1 text-gray-500">{{ specialty.name }}</label>
                            </div>
                            <span>{{ specialty.users_count }}</span>
                          </div>
                        </li>
                      </ul>
                      <h3 class="sr-only">Reviews</h3>
                      <span class="font-bold text-gray-900">Specializzazioni</span>
                      <ul role="list" class="space-y-6 border-b border-black text-sm font-medium text-gray-900 pb-6">
                        <li v-for="criteria in ratingsCount" :key="criteria.label">
                          <div class="flex items-center justify-between">
                            <div class="flex items-center">
                              <input type="checkbox" 
                                class="h-4 w-4 rounded border-gray-300 text-bd_primary-color focus:ring-bd_primary-color" 
                                v-model="refStates[criteria.label]"
                                @change="handleRatingChange(criteria.minRating)" />
                                <label class="ml-3 font-medium text-gray-900 flex items-center">
                                  <StarIcon v-for="n in criteria.minRating" class="h-5 w-5 text-yellow-300" :key="n"/>
                                  <StarOutlineIcon v-for="n in (5 - criteria.minRating)" class="h-5 w-5" :key="n" />
                                </label>
                            </div>
                            <span class="text-sm font-medium text-gray-900">{{ criteria.count }}</span>
                          </div>
                        </li>
                        <li>
                          <label for="minReviewCount" class="mb-3 block">Minimo di recensioni:</label>
                          <input id="minReviewCount" type="number" min="0" class="bg-bd_secondary-color border-2 border-bd_primary-color text-gray-900 placeholder-gray-900 text-sm rounded-lg focus:ring-bd_primary-color dark:bg-gray-700 focus:border-bd_primary-color block w-full p-2.5"
                            placeholder="Inserisci valore" name="minReviewCount" v-model.number="filters.minReviewCount">
                        </li>
                      </ul>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Dialog>
          </TransitionRoot>

          <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center border-b border-black pb-6 pt-24">
              <Pagination :current-page="apiDetails.currentPage" :total-pages="apiDetails.lastPage" :next-page="nextPage" :prev-page="prevPage" @goto-page="loadPage" :to-value="apiDetails.to" :total-results="apiDetails.totalResults" />
              <div class="flex items-center">
                <button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden" @click="mobileFiltersOpen = true">
                  <span class="sr-only">Filters</span>
                  <Squares2X2Icon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" class="py-6 border-b border-black">
              <h2 id="products-heading" class="sr-only">Doctor Filters</h2>

              <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <!-- Filters Desktop -->
                <SkeletonFilter v-if="loading" />
                <div v-else class="hidden lg:block lg:space-y-6 sticky top-0">
                  <button @click="resetFilters"
                    class="w-full focus:ring-4 focus:outline-none focus:ring-bd_btn-shadow font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bd_btn">
                    Resetta filtri
                  </button>
                  <h3 class="sr-only">Specialties</h3>
                  <span class="font-medium text-gray-900">Specializzazioni</span>
                  <ul role="list" class="space-y-4 border-b border-black pb-6 text-sm font-medium text-gray-900">
                    <li v-for="specialty in specialties" :key="specialty.name">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <input type="checkbox" 
                            class="h-4 w-4 rounded border-gray-300 text-bd_primary-color focus:ring-bd_primary-color" 
                            :checked="isSelected(specialty.name)"
                            @change="handleSpecialtyChange(specialty.name)"
                            :value="specialty.name" />
                          <label class="ml-3 text-sm text-gray-600">{{ specialty.name }}</label>
                        </div>
                        <span>{{ specialty.users_count }}</span>
                      </div>
                    </li>
                  </ul>
                  <h3 class="sr-only">Reviews</h3>
                  <span class="font-medium text-gray-900">Recensioni</span>
                  <ul role="list" class="space-y-4 border-b border-black pb-6 text-sm font-medium text-gray-900">
                    <li v-for="criteria in ratingsCount" :key="criteria.label">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <input type="checkbox" 
                            class="h-4 w-4 rounded border-gray-300 text-bd_primary-color focus:ring-bd_primary-color" 
                            v-model="refStates[criteria.label]"
                            @change="handleRatingChange(criteria.minRating)" />
                            <label class="ml-3 font-medium text-gray-900 flex items-center">
                              <StarIcon v-for="n in criteria.minRating" class="h-5 w-5 text-yellow-300" :key="n"/>
                              <StarOutlineIcon v-for="n in (5 - criteria.minRating)" class="h-5 w-5" :key="n" />
                            </label>
                        </div>
                        <span class="text-sm font-medium text-gray-900">{{ criteria.count }}</span>
                      </div>
                    </li>
                    <li>
                      <label for="minReviewCount" class="mb-3 block">Minimo di recensioni:</label>
                      <input id="minReviewCount" type="number" min="0" class="bg-bd_secondary-color border-2 border-bd_primary-color text-gray-900 placeholder-gray-900 text-sm rounded-lg focus:ring-bd_primary-color dark:bg-gray-700 focus:border-bd_primary-color block w-full p-2.5"
                        placeholder="Inserisci valore" name="minReviewCount" v-model.number="filters.minReviewCount">
                    </li>
                  </ul>
                </div>

                <!-- Doctors grid -->
                <div class="lg:col-span-3">
                    <div class="flex flex-col space-y-4">
                      <SkeletonCard v-if="loading" v-for="n in 15" :key="n" />
                      <div v-else class="space-y-4">
                        <SingleCard v-if="users.length > 0" v-for="itemDoctor in users" :cardElement="itemDoctor" :key="itemDoctor"/>
                        <!-- @click="$router.push({ name: 'doctors.show', params: { slug: itemDoctor.slug}})"/> -->
                        <NoMatchingsCard v-else />
                      </div>
                    </div>
                </div>
              </div>
            </section>
            <div class="py-6">
              <Pagination :current-page="apiDetails.currentPage" :total-pages="apiDetails.lastPage" :next-page="nextPage" :prev-page="prevPage" :to-value="apiDetails.to" :total-results="apiDetails.totalResults" />
            </div>
          </main>
        </div>
</template>

<script setup>
import axios from 'axios';

// Importing and initializing store
import { useStore } from 'vuex';
const store = useStore();

import { reactive, ref, onMounted, watch, computed } from 'vue' // All methods Composition API from vue package

import SingleCard from '../cards/index/SingleCard.vue';
import SkeletonCard from '../cards/index/SkeletonCard.vue';
import Pagination from '../Pagination.vue';
import SkeletonFilter from '../forms/SkeletonFilter.vue';
import NoMatchingsCard from '../cards/index/NoMatchingsCard.vue';
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { Squares2X2Icon, StarIcon } from '@heroicons/vue/20/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/vue/24/outline';

// Layout of grid results
const mobileFiltersOpen = ref(false)
const loading = ref(true);

// Components
const components = { SingleCard, SkeletonCard, Pagination, SkeletonFilter }

// Data
const filters = reactive({
  selectedSpecialties: [],     // For filtering doctors based on specialties
  selectedRating: null,        // For filtering doctors based on rating
  minReviewCount: null,        // Minimum count of reviews for filtering doctors
  // Average and rating values
  showFourStarAbove: false,    // UI state to track checkbox/toggle
  showThreeStarAbove: false,   // UI state to track checkbox/toggle
  showTwoStarAbove: false,     // UI state to track checkbox/toggle
  showOneStarAbove: false      // UI state to track checkbox/toggle
});

const refStates = {
  showFourStarAbove: filters.showFourStarAbove,
  showThreeStarAbove: filters.showThreeStarAbove,
  showTwoStarAbove: filters.showTwoStarAbove,
  showOneStarAbove: filters.showOneStarAbove
};

const ratingCriteria = [
  { minRating: 4.0, maxRating: 5.0, label: "showFourStarAbove" },
  { minRating: 3.0, maxRating: 5.0, label: "showThreeStarAbove" },
  { minRating: 2.0, maxRating: 5.0, label: "showTwoStarAbove" },
  { minRating: 1.0, maxRating: 5.0, label: "showOneStarAbove" }
]

// Group API-related Properties and Pagination:
const apiDetails = reactive({
  doctorsUrl: 'http://127.0.0.1:8000/api/doctors',
  currentPage: 1,  // Start on page 1
  lastPage: 1,
  to: 0,
  totalResults: 0,
});

// If selectedSpecialty is not already in your selectedSpecialties list, add it
const specialtiesFromStore = computed(() => store.state.specialty);
if (specialtiesFromStore.value) {
    filters.selectedSpecialties = [specialtiesFromStore.value];
}
const users = ref([]);
const specialties = computed(() => store.state.specialtiesContainer);
const ratingAVGCounters = computed(() => store.state.ratingAVGCounters);

// APi Calls
const getUsers = (apiUrlParam = apiDetails.doctorsUrl, page = 1) => {
  const params = {
    page: page,
    specialties: filters.selectedSpecialties.join(','),
    minRating: filters.selectedRating,
    minReviewCount: filters.minReviewCount,
  }
  // console.log("getUsers invoked with params:", params);
  axios.get(apiUrlParam, { params })
    .then((response) => {
      // console.log(response.data.results.data);
      users.value = response.data.results.data;
      loading.value = false;
      apiDetails.currentPage = response.data.results.current_page;
      apiDetails.lastPage = response.data.results.last_page;

      apiDetails.to = response.data.results.to;
      apiDetails.totalResults = response.data.totalUsers;
    })
    .catch((error) => {
      console.log(error)
      loading.value = false;
    })
}

// Methods
const isSelected = (specialtyName) => {
  return filters.selectedSpecialties.includes(specialtyName);
};

const ratingsCount = computed(() => {
  return ratingCriteria.map(criteria => {
    const averageCount = ratingAVGCounters.value.find(avg => avg.label === criteria.label);
    return {
      ...criteria,
      count: averageCount ? averageCount.count : 0
    };
  });
});

const handleSpecialtyChange = (specialty) => {
  if (filters.selectedSpecialties.includes(specialty)) {
    const index = filters.selectedSpecialties.indexOf(specialty);
    filters.selectedSpecialties.splice(index, 1);
  } else {
    filters.selectedSpecialties.push(specialty);
  }
  getUsers(apiDetails.doctorsUrl, 1);
};

const handleRatingChange = (rating) => {
  if (filters.selectedRating === rating) {
    filters.selectedRating = null;
  } else {
    filters.selectedRating = rating;
    for (const criteria of ratingCriteria) {
      refStates[criteria.label] = criteria.minRating === rating;
    }
  }
};

const nextPage = () => {
  if (apiDetails.currentPage < apiDetails.lastPage) {
    apiDetails.currentPage++;
    getUsers(apiDetails.doctorsUrl, apiDetails.currentPage);
  }
};

const prevPage = () => {
  if (apiDetails.currentPage > 1) {
    apiDetails.currentPage--;
    getUsers(apiDetails.doctorsUrl, apiDetails.currentPage);
  }
};

const loadPage = (pageNumber) => {
  apiDetails.currentPage = pageNumber;
  getUsers(apiDetails.doctorsUrl, pageNumber);
};

// Reset all filters
const resetFilters = () => {
  filters.selectedSpecialties = [];
  filters.selectedRating = null;
  filters.minReviewCount = 0;

  // Reset the rating checkboxes
  for (const criteria of ratingCriteria) {
    refStates[criteria.label] = false;
  }

  getUsers(apiDetails.doctorsUrl, 1);
}

// Lifecycle Hooks
onMounted(() => {
  getUsers(apiDetails.doctorsUrl);
  if (!store.state.specialtiesContainer.length) {
    store.dispatch('getSpecialties');
  }
  if (!store.state.ratingAVGCounters.length) {
    store.dispatch('getRatingAVGCount');
  }
});

watch(() => [filters.selectedSpecialties, filters.selectedRating, filters.minReviewCount], () => {
  getUsers(apiDetails.doctorsUrl, 1);
  // console.log("Watched values changed:", filters.selectedSpecialties, filters.selectedRating, filters.minReviewCount);
}, { deep: true });
</script>

<style lang="scss" scoped>
@use '../../styles/index/listdoctors.scss' as *;
</style>