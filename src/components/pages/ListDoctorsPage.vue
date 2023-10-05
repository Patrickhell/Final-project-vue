<template>
        <div>
          <!-- Mobile filter dialog -->
          <TransitionRoot as="template" :show="mobileFiltersOpen">
            <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
              <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
              </TransitionChild>

              <div class="fixed inset-0 z-40 flex">
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="translate-x-full">
                  <DialogPanel class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div class="flex items-center justify-between px-4">
                      <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                      <button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400" @click="mobileFiltersOpen = false">
                        <span class="sr-only">Close menu</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <!-- Filters -->
                    <div class="mt-4 border-t border-gray-200">
                      <h3 class="sr-only">Categories</h3>
                      <ul role="list" class="px-4 py-6 font-medium text-gray-900 space-y-6">
                        <li v-for="specialty in specialties" :key="specialty.name">
                          <div class="flex items-center justify-between">
                            <div class="flex items-center">
                              <input type="checkbox" 
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                                v-model="selectedSpecialties" 
                                :value="specialty.name" />
                              <label class="ml-3 min-w-0 flex-1 text-gray-500">{{ specialty.name }}</label>
                            </div>
                            <span>{{ specialty.users_count }}</span>
                          </div>
                        </li>
                      </ul>

                      <Disclosure as="div" v-for="section in filters" :key="section.id" class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                        <h3 class="-mx-2 -my-3 flow-root">
                          <DisclosureButton class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span class="font-medium text-gray-900">{{ section.name }}</span>
                            <span class="ml-6 flex items-center">
                              <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                              <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel class="pt-6">
                          <div class="space-y-6">
                            <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                              <input :id="`filter-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                              <label :for="`filter-mobile-${section.id}-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-500">{{ option.label }}</label>
                            </div>
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Dialog>
          </TransitionRoot>

          <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 class="text-4xl font-bold tracking-tight text-gray-900">Lista Dottori</h1>

              <div v-if="!loading" class="flex gap-4">
                  <span>Page: {{ currentPage }}</span>
                  <button @click="prevPage" :disabled="currentPage <= 1">Previous</button>
                  <button @click="nextPage" :disabled="currentPage >= lastPage">Next</button>
              </div>

              <div class="flex items-center">
                <button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden" @click="mobileFiltersOpen = true">
                  <span class="sr-only">Filters</span>
                  <Squares2X2Icon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" class="pb-24 pt-6">
              <h2 id="products-heading" class="sr-only">Doctor Filters</h2>

              <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <!-- Filters -->
                <div class="hidden lg:block">
                  <h3 class="sr-only">Specialties</h3>
                  <ul role="list" class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                    <li v-for="specialty in specialties" :key="specialty.name">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <input type="checkbox" 
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                            :checked="isSelected(specialty.name)"
                            @change="handleSpecialtyChange(specialty.name)"
                            :value="specialty.name" />
                          <label class="ml-3 text-sm text-gray-600">{{ specialty.name }}</label>
                        </div>
                        <span>{{ specialty.users_count }}</span>
                      </div>
                    </li>
                  </ul>

                  <Disclosure as="div" class="border-b border-gray-200 py-6" v-slot="{ open }">
                    <h3 class="-my-3 flow-root">
                      <DisclosureButton class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span class="font-medium text-gray-900">Filtro Recensioni</span>
                        <span class="ml-6 flex items-center">
                          <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                          <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-4">
                        <div v-for="criteria in ratingsCount" :key="criteria.label" class="flex items-center justify-between">
                          <div class="flex items-center">
                            <input type="checkbox" 
                              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                              v-model="refStates[criteria.label].value"
                              @change="handleRatingChange(criteria.minRating)" />
                            <label class="ml-3 font-medium text-gray-900 flex items-center">
                              <StarIcon v-for="n in criteria.minRating" class="h-5 w-5" />
                              <StarOutlineIcon v-for="n in (5 - criteria.minRating)" class="h-5 w-5" />
                            </label>
                            </div>
                            <span class="text-sm font-medium text-gray-900">{{ criteria.count }}</span>
                          </div>
                      </div>
                      <label for="minReviewCount">Minimum Review Count:</label>
                      <input v-model.number="minReviewCount" id="minReviewCount" type="number" placeholder="Enter min reviews">
                    </DisclosurePanel>
                  </Disclosure>
                </div>

                <!-- Doctors grid -->
                <div class="lg:col-span-3">
                    <div class="flex flex-col space-y-4">
                      <SkeletonCard v-if="loading" v-for="n in 10" :key="n" />
                        <SingleCard v-else v-for="itemDoctor in users" :cardElement="itemDoctor" :key="itemDoctor"
                            @click="$router.push({ name: 'doctors.show', params: { slug: itemDoctor.slug}})"/>
                    </div>
                </div>
              </div>
            </section>

          </main>
        </div>
</template>

<script setup>
import axios from 'axios';

import { ref, onMounted, watch, computed } from 'vue'

import SingleCard from '../cards/SingleCard.vue';
import SkeletonCard from '../cards/SkeletonCard.vue';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { MinusIcon, PlusIcon, Squares2X2Icon, StarIcon } from '@heroicons/vue/20/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/vue/24/outline';

// Layout of grid results
const mobileFiltersOpen = ref(false)
const loading = ref(true);

// Components
const components = { SingleCard, SkeletonCard }

// Data
const apiDoctorsUrl = 'http://127.0.0.1:8000/api/doctors'
const apiSpecialtiesUrl = 'http://127.0.0.1:8000/api/specialties'
const apiRatingAVGCountUrl = 'http://127.0.0.1:8000/api/rating-counts'
const currentPage = ref(1); // Start on page 1
const lastPage = ref(1);


const users = ref([]);
const specialties = ref([]);
const ratingAVGCounters = ref([]);
const selectedSpecialties = ref([]); // List of selected specialties.
const selectedRating = ref(null); // Holds the minRating of the selected rating criteria.
const minReviewCount = ref(null);

// Average and rating values
const showFourStarAbove = ref(false);
const showThreeStarAbove = ref(false);
const showTwoStarAbove = ref(false);
const showOneStarAbove = ref(false);

const refStates = {
  showFourStarAbove,
  showThreeStarAbove,
  showTwoStarAbove,
  showOneStarAbove
};

const ratingCriteria = [
  { minRating: 4.0, maxRating: 5.0, label: "showFourStarAbove" },
  { minRating: 3.0, maxRating: 5.0, label: "showThreeStarAbove" },
  { minRating: 2.0, maxRating: 5.0, label: "showTwoStarAbove" },
  { minRating: 1.0, maxRating: 5.0, label: "showOneStarAbove" }
]

// APi Calls
const getUsers = (apiUrlParam = apiDoctorsUrl, page = 1) => {
  const params = {
      page: page,
      specialties: selectedSpecialties.value.join(','),
      minRating: selectedRating.value,
      minReviewCount: minReviewCount.value
    }

    console.log("API params:", params);

  axios.get(apiUrlParam, { params })
    .then((response) => {
      users.value = response.data.results.data;
      loading.value = false;
      currentPage.value = response.data.results.current_page;
      lastPage.value = response.data.results.last_page;
    })
    .catch((error) => {
      console.log(error)
      loading.value = false;
    })
}

const getSpecialties = (apiUrlParam = apiSpecialtiesUrl) => {
  const params = {}

  axios.get(apiUrlParam, { params })
  .then((response) => {
      specialties.value = response.data.results
  })
  .catch((error) => {
    console.log(error)
  })
};

const getRatingAVGCount = (apiUrlParam = apiRatingAVGCountUrl) => {
  const params = {}

  axios.get(apiUrlParam, { params })
  .then((response) => {
    ratingAVGCounters.value = response.data.results
  })
  .catch((error) => {
    console.log(error)
  })
}

// Methods
const filteredDoctors = computed(() => {
  return users.value; // As the filtering is done in the backend.
});

// const getAverageVote = (reviews) => {
  // if (!reviews || reviews.length === 0) return 0;
  // const totalVotes = reviews.reduce((acc, review) => acc + review.vote.vote, 0);
  // const average = totalVotes / reviews.length;
  // return average;
// };

const ratingsCount = computed(() => {
  return ratingCriteria.map(criteria => {
    const averageCount = ratingAVGCounters.value.find(avg => avg.label === criteria.label);
    return {
      ...criteria,
      count: averageCount ? averageCount.count : 0
    };
  });
});


const isSelected = (specialtyName) => {
  return selectedSpecialties.value.includes(specialtyName);
};

const handleSpecialtyChange = (specialty) => {
  if (selectedSpecialties.value.includes(specialty)) {
    console.log("Before:", selectedSpecialties.value);
    const index = selectedSpecialties.value.indexOf(specialty);
    selectedSpecialties.value.splice(index, 1);
  } else {
    selectedSpecialties.value.push(specialty);
    console.log("After:", selectedSpecialties.value);
  }
};

const handleRatingChange = (rating) => {
  if (selectedRating.value === rating) {
    selectedRating.value = null; // Unset the rating filter if it's the same rating.
  } else {
    selectedRating.value = rating; // Set the new rating filter.
    // Optionally, you might want to ensure only one checkbox is selected at a time.
    for (const criteria of ratingCriteria) {
      refStates[criteria.label].value = criteria.minRating === rating;
    }
  }
};

const nextPage = () => {
   if (currentPage.value < lastPage.value) {
      currentPage.value++;
      getUsers(apiDoctorsUrl, currentPage.value);
   }
};

const prevPage = () => {
   if (currentPage.value > 1) {
      currentPage.value--;
      getUsers(apiDoctorsUrl, currentPage.value);
   }
};

// Lifecycle Hooks
onMounted(() => {
  getSpecialties(apiSpecialtiesUrl);
  getUsers(apiDoctorsUrl);
  getRatingAVGCount(apiRatingAVGCountUrl);
});

watch([selectedSpecialties, selectedRating, minReviewCount], () => {
  getUsers(apiDoctorsUrl, 1); // Always reset to the first page when filters change.
}, { deep: true });
</script>

<style lang="scss" scoped>
@use '../../styles/index/listdoctors.scss' as *;
</style>