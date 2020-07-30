import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '@/views/Index.vue'
import Products from '@/views/Products.vue'
import Cart from '@/views/Cart.vue'
import About from '@/views/About.vue'
import Checkout from '@/views/Checkout.vue'
import Dashboard from '@/views/Dashboard.vue'
import ProductManagement from '../views/dashboard/ProductManagement.vue'
import Coupon from '@/views/dashboard/Coupon.vue'
import Order from '@/views/dashboard/Order.vue'
import Images from '@/views/dashboard/Images.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: Index
      },
      {
        path: '/products',
        component: Products
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '/checkout',
        component: Checkout
      }
    ]
  },
  {
    path: '/admin',
    component: Dashboard,
    children: [
      {
        path: '/productManagement',
        component: ProductManagement
      },
      {
        path: '/coupon',
        component: Coupon
      },
      {
        path: '/order',
        component: Order
      },
      {
        path: '/images',
        component: Images
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
