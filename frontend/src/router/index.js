import Vue from 'vue';
import Router from 'vue-router';
import Trade from '@/pages/Trade';
import TradeHistory from '@/pages/TradeHistory';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Trade',
      component: Trade,
    },
    {
      path: '/history',
      name: 'History',
      component: TradeHistory,
    },
  ],
});
