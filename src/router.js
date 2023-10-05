import { createRouter, createWebHistory } from 'vue-router';
import store from './store';

// Importing
import HomePage from './components/pages/HomePage.vue';
import ListDoctorsPage from './components/pages/ListDoctorsPage.vue';
import NotFoundPage from './components/pages/NotFoundPage.vue';
import DoctorShow from './components/pages/DoctorShow.vue';

const routes = [
  { path: '/', name: 'homePage', component: HomePage },
  { path: '/doctors', name: 'doctors', component: ListDoctorsPage, meta: { title: 'Lista Dottori' } },
  { path: '/:catchAll(.*)', name: 'notFoundPage', component: NotFoundPage, meta: { title: 'Pagina non trovata: 404' } },
  { path: '/doctors/:slug', name: 'doctors.show', component: DoctorShow }
];

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

router.beforeEach(async (to, from, next) => {
  if (to.name === 'doctors.show') {
    try {
      await store.dispatch('getSingleDoctor', to.params.slug);
      const doctor = store.state.itemDoctor;
      document.title = doctor ? `${doctor.user_detail.doctor_tag} ${doctor.name}` : 'Doctor Details';
      next();
    } catch (error) {
      console.error('Error fetching doctor information:', error);
      document.title = 'Doctor Details';
      next();
    }
  } else {
    document.title = to.meta.title || 'BDoctors';
    next();
  }
});

export { router };