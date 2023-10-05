import { createRouter, createWebHistory } from 'vue-router';

// Importing
import HomePage from './pages/HomePage.vue';
import ListDoctorsPage from './pages/ListDoctorsPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';
import DoctorShow from './pages/DoctorShow.vue';

const routes = [
  { path: '/', name : 'homePage', component : HomePage, },
  { path: '/doctors', name : 'doctors', component : ListDoctorsPage, },
  { path: '/:catchAll(.*)', name : 'notFoundPage', component : NotFoundPage, },
  { path: '/doctors/:id', name: 'doctors.show', component: DoctorShow }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.query.scrollToService) {
      return; // Don't control the scroll
    }
    
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export { router };