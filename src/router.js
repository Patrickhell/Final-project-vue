import { createRouter, createWebHistory } from 'vue-router';

// Importing
import HomePage from './components/pages/HomePage.vue';
import ListDoctorsPage from './components/pages/ListDoctorsPage.vue';
import NotFoundPage from './components/pages/NotFoundPage.vue';
import DoctorShow from './components/pages/DoctorShow.vue';

const routes = [
  { path: '/', name : 'homePage', component : HomePage, },
  { path: '/doctors/', name : 'doctors', component : ListDoctorsPage},
  { path: '/:catchAll(.*)', name : 'notFoundPage', component : NotFoundPage, },
  { path: '/doctors/:slug', name: 'doctors.show', component: DoctorShow }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export { router };