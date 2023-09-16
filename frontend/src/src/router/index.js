import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'articles',
    component: function () {
      return import('../views/Articles')
    }
  },
  {
    path: "/article/:id",
    name: "edit",
    component: function () {
      return import('../views/ArticlesEdit')
    }
  },
  {
    path: "/article",
    name: "create",
    component: function () {
      return import('../views/ArticlesEdit')
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
