<template>
    <!-- WILL BE REMOVED AFTER SEARCH WORKING -->
    <section class="pt-20 md:pt-22">
        <div class="py-16 px-6 mx-auto max-w-screen-2xl text-center lg:py-16 z-10 relative">
            <form class="flex items-center">   
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                    <input type="text" id="searchText" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       v-model="searchText" @keyup.enter="newSearch(searchText)">
                </div>
                <button type="button" @click="newSearch(searchText)" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span class="sr-only">Search</span>
                </button>
            </form>
        </div>
    </section>

    <div class="bg-white">
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
                    <form class="mt-4 border-t border-gray-200">
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
                    </form>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Dialog>
          </TransitionRoot>

          <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 class="text-4xl font-bold tracking-tight text-gray-900">Lista Dottori</h1>

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
                <form class="hidden lg:block">
                  <h3 class="sr-only">Specialties</h3>
                  <ul role="list" class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                    <li v-for="specialty in specialties" :key="specialty.name">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <input type="checkbox" 
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                            v-model="selectedSpecialties" 
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
                            <input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" v-model="refStates[criteria.label].value" />
                            <label class="ml-3 font-medium text-gray-900 flex items-center">
                              <StarIcon v-for="n in criteria.minRating" class="h-5 w-5" />
                              <StarOutlineIcon v-for="n in (5 - criteria.minRating)" class="h-5 w-5" />
                            </label>
                            </div>
                            <span class="text-sm font-medium text-gray-900">{{ criteria.count }}</span>
                          </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </form>

                <!-- Doctors grid -->
                <div class="lg:col-span-3">
                    <div class="flex flex-col space-y-4">
                      <SkeletonCard v-if="loading" v-for="n in 10" :key="n" />
                        <SingleCard v-else v-for="itemDoctor in filteredDoctors" :cardElement="itemDoctor" :key="itemDoctor"
                            @click="$router.push({ name: 'doctors.show', params: { slug: itemDoctor.slug}})"/>
                    </div>
                </div>
              </div>
            </section>

          </main>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'

import axios from 'axios';
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


// Props
// If you have props, define them with defineProps()

// Components
const components = { SingleCard, SkeletonCard }

// Data
const users = ref([])
const doctorFilterSpecialties = ref([]);
const specialties = ref([])
const selectedSpecialties = ref([]);
const searchText = ref('')

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

const apiDoctorsUrl = 'http://127.0.0.1:8000/api/doctors'
const apiSpecialtiesUrl = 'http://127.0.0.1:8000/api/specialties'
const mobileFiltersOpen = ref(false)
const loading = ref(true);

// Methods
const getUsers = (apiUrlParam = apiDoctorsUrl, specialtyFilter = [], nameQuery = false) => {
  const params = {}

  if (specialtyFilter.length) {
    params.specialty_name = specialtyFilter.join(',');
  }

  if (nameQuery) {
    params.specialty_name = nameQuery
  }
  axios.get(apiUrlParam, { params })
    .then((response) => {
        console.log(`Risultati Utenti:`)
        console.log(response.data.results.data);
        doctorFilterSpecialties.value = response.data.results.data;
        filterDoctorsBySpecialties();
        loading.value = false;
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
      console.log(`Risultati Specialita:`)
      console.log(response.data.results);
      specialties.value = response.data.results
  })
  .catch((error) => {
    console.log(error)
  })
}

const filterDoctorsBySpecialties = () => {
  if (selectedSpecialties.value.length === 0) {
    users.value = doctorFilterSpecialties.value;
  } else {
    users.value = doctorFilterSpecialties.value.filter(doctor => {
      return doctor.specialties.some(specialty => selectedSpecialties.value.includes(specialty.name));
    });
  }
};

const filteredDoctors = computed(() => {
  return users.value.filter(doctor => {
    const average = getAverageVote(doctor.reviews);
  
    for (const criteria of ratingCriteria) {
      const checkboxState = refStates[criteria.label];
      if (checkboxState.value && average >= criteria.minRating && average <= criteria.maxRating) {
        return true;
      }
    }

    // if none of the checkboxes are selected, show all doctors
    if (ratingCriteria.every(criteria => !refStates[criteria.label].value)) {
      return true;
    }

    return false; // if none of the conditions match, don't show the doctor
  });
});

const getAverageVote = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const totalVotes = reviews.reduce((acc, review) => acc + review.vote.vote, 0);
  return totalVotes / reviews.length;
};

const ratingsCount = computed(() => {
  return ratingCriteria.map(criteria => {
    const count = users.value.filter(doctor => {
      const average = getAverageVote(doctor.reviews);
      return average >= criteria.minRating && average <= criteria.maxRating;
    }).length;

    return {
      ...criteria,
      count
    };
  });
});


const newSearch = (nameToSearch) => {
    console.log(nameToSearch);
    getUsers(apiDoctorsUrl, nameToSearch)
}

// Lifecycle Hooks
onMounted(() => {
  getSpecialties(apiSpecialtiesUrl);
  getUsers(apiDoctorsUrl);
});

watch(selectedSpecialties, () => {
  filterDoctorsBySpecialties();
});
</script>

<style lang="scss" scoped>
@use '../../styles/index/listdoctors.scss' as *;
</style>