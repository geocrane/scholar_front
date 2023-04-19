import Vue from 'vue'
import Router from 'vue-router'
import Authorization from '@/components/Authorization'
import NotFound from '@/components/error-pages/NotFound'
import Session from '@/components/games/Session'
import Summary from '@/components/Summary'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Authorization',
      component: Authorization
    },
    {
      path: '/sessions/:session_id',
      name: 'session',
      component: Session
    },
    {
      path: '/:session_id/variants/:variant_id',
      name: 'variants',
      component: Session
    },
    {
      path: '/:session_id/summary',
      name: 'summary',
      component: Summary
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
