import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Gong from '../views/Gong.vue'
import ArticleDetails from '../views/ArticleDetails.vue'
import HeroDetails from '../views/HeroDetails.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {path:'/',name:'home',component:Home},
      {path:'/gonglue',name:'gonglue',component:Gong},
      {path:'/articles/:id',name:'articledetails',component:ArticleDetails},
      {path:'/heroes/:id',name:'herodetails',component:HeroDetails},
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
