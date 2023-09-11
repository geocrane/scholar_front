import Vue from 'vue'
import Router from 'vue-router'
import Authorization from '@/components/Authorization'
import NotFound from '@/components/error-pages/NotFound'
import Lexicon from '@/components/games/Lexicon'
import Orthography from '@/components/games/Orthography'
import T3 from '@/components/games/T3'
import T4 from "@/components/games/T4";
import NoActivities from '@/components/games/NoActivities'
import Summary from '@/components/Summary'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Authorization",
      component: Authorization
    },
    {
      path: "/noactivities",
      name: "noactivities",
      component: NoActivities
    },
    {
      path: "/lexicon/:session_id/variants/:variant_id",
      name: "lexicon",
      component: Lexicon
    },
    {
      path: "/orthography/:session_id/variants/:variant_id",
      name: "orthography",
      component: Orthography
    },
    {
      path: "/t3/:session_id/variants/:variant_id",
      name: "t3",
      component: T3
    },
    {
      path: "/t4/:session_id/variants/:variant_id",
      name: "t4",
      component: T4
    },
    {
      path: "/:session_id/summary/",
      name: "summary",
      component: Summary
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ]
});
