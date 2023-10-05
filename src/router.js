import { createRouter, createWebHistory } from 'vue-router';

// Importing
import HomePage from './pages/HomePage.vue';
import IndexPage from './pages/IndexPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes : [
    {
        path: '/',
        name : 'homepage',
        component : HomePage,
        meta: { title: 'Home'}
    },
    {
      path: '/advanced-search',
      name : 'advanced-search',
      component : IndexPage,
      meta: { title: 'Index'}
    },
    {
        path: '/:catchAll(.*)',
        name : 'notfound',
        component : NotFoundPage,
        meta: { title: 'Not found'}
    },
  ]
})

// Update the title based on the route
router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title || 'Default title';
  document.title = pageTitle;
  next();
});

export { router };