import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: ()=>import('../Views/DiscoverMusic.vue'),

  },
  {
    path: '/DiscoverMusic',
    component: ()=>import('../Views/DiscoverMusic.vue'),
  },
  {
    path: '/RecommendedMusic',
    component: ()=>import('../Views/RecommendedMusic.vue'),
  },
  {
    path: '/LatestMusic',
    component: ()=>import('../Views/LatestMusic.vue'),
  },
  {
    path: '/LatestMV',
    component: ()=>import('../Views/LatestMV.vue'),
  },
  {
    path: '/PlayMusicList',
    component: ()=>import('../Views/PlayMusicList.vue'),
  },
  {
    path: '/PlayMusicMV',
    component: ()=>import('../Views/PlayMusicMV.vue'),
  },
  {
    path: '/searchMusic',
    component: ()=>import('../Views/searchMusic.vue'),
  },
  // {
  //   path: '/logon',
  //   component: ()=>import('../components/demo.vue'),
  // }
]
const router = new VueRouter({
  routes
})
export default router