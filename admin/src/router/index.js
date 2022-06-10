import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Category from '../views/Category.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
import TeaIndex from '../views/TeaIndex.vue'
import TeaHero from '../views/TeaHero.vue'
import TeaArticle from '../views/TeaArticle.vue'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { isPublic: true },
  },

  {
    path: '/',
    name: 'Category',
    component: Category,
    children: [{
      path: '/categories/create',
      component: CategoryEdit
    },
    {
      path: '/categories/list',
      component: CategoryList
    },
    {
      path: '/categories/edit/:id',
      component: CategoryEdit,
      props: true
    },

    {
      path: '/items/create/',
      component: ItemEdit,
      props: true
    },
    {
      path: '/items/list/',
      component: ItemList,
      props: true
    },
    {
      path: '/items/edit/:id',
      component: ItemEdit,
      props: true
    },

    {
      path: '/heroes/create/',
      component: HeroEdit
    },
    {
      path: '/heroes/edit/:id',
      component: HeroEdit,
      props: true
    },
    {
      path: '/heroes/list/',
      component: HeroList
    },

    {
      path: '/articles/create/',
      component: ArticleEdit
    },
    {
      path: '/articles/edit/:id',
      component: ArticleEdit,
      props: true
    },
    {
      path: '/articles/list/',
      component: ArticleList
    },

    {
      path: '/ads/create/',
      component: AdEdit
    },
    {
      path: '/ads/edit/:id',
      component: AdEdit,
      props: true
    },
    {
      path: '/ads/list/',
      component: AdList
    },

    {
      path: '/admin_users/create/',
      component: AdminUserEdit
    },
    {
      path: '/admin_users/edit/:id',
      component: AdminUserEdit,
      props: true
    },
    {
      path: '/admin_users/list/',
      component: AdminUserList
    },
    {
      path: 'tea/index/',
      component: TeaIndex
    },
    {
      path: 'tea/article/',
      component: TeaArticle
    },
    {
      path: 'tea/Hero/',
      component: TeaHero
    },

    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login');
  }
  const regExp = /\/admin_users/i;
  if (regExp.test(to.path) && (localStorage.auth !== '1')) {
    Message({
      type: "fail",
      message: "无超级管理员权限！",
    });
    return next('/');
  }
  next()
})
export default router