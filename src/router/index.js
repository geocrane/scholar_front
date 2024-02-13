import Vue from 'vue'
import Router from 'vue-router'
import Authorization from '@/components/Authorization'
import NotFound from '@/components/error-pages/NotFound'
import Question from '@/components/games/Question'
import NoActivities from '@/components/games/NoActivities'
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
      path: '/noactivities',
      name: 'noactivities',
      component: NoActivities
    },
    {
      path: '/session/:session_id/:question_number',
      name: 'question',
      component: Question
    },
    {
      path: '/session/:session_id/',
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
