import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';
import Leon from './views/Leon.vue';
import Stefan from './views/Stefan.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about/stefan',
      name: 'stefan',
      component: Stefan,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      children: [
        {
          path: 'leon',
          name: 'leon',
          component: Leon,
        },
      ],
    },
  ],
});
