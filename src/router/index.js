import Vue from 'vue'
import Router from 'vue-router'
import Authorization from '@/components/Authorization'
import NotFound from '@/components/error-pages/NotFound'
import Question from '@/components/games/Question'
import Lexicon from '@/components/games/Lexicon'
import Orthography from '@/components/games/Orthography'
import Phraseology from '@/components/games/Phraseology'
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
      path: '/lexicon/:session_id/variants/:variant_id',
      name: 'lexicon',
      component: Lexicon
    },
    {
      path: '/orthography/:session_id/variants/:variant_id',
      name: 'orthography',
      component: Orthography
    },
    {
      path: '/phraseology/:session_id/variants/:variant_id',
      name: 'phraseology',
      component: Phraseology
    },
    {
      path: '/session/:session_id/summary/',
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
