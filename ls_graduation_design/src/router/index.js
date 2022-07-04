import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index/Index.vue'
import Cate from '../pages/Cate/Cate.vue'
import ShoppingCart from '../pages/ShoppingCart/ShoppingCart.vue'
import Personal from '../pages/Personal/Personal.vue'
import Goods_detail from '../pages/Goods_detail/Goods_detail.vue'
import Goods_buy from '../pages/Goods_buy/Goods_buy.vue'
import Login from '../pages/Login/Login.vue'
import Register from '../pages/Register/Register.vue'
import Search from '../pages/Search/Search.vue'
import Shops from '../pages/Shops/Shops.vue'
import Contact from '../pages/Contact/Contact.vue' 
import Address from '../pages/Address/Address.vue'
import AddressEdit from '../pages/AddressEdit/AddressEdit.vue'
import Collect from '../pages/Collect/Collect.vue'
import Feedback from '../pages/Feedback/Feedback.vue'
import History_feedback from '../pages/History_feedback/History_feedback.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      meta:{
        isFooter: true
      }
    },
    {
      path: '/cate',
      component: Cate,
      meta:{
        isFooter: true
      }
    },
    {
      path: '/shoppingcart',
      component: ShoppingCart,
      meta:{
        isFooter: true
      }
    },
    {
      path: '/personal',
      component: Personal,
      name: 'personal',
      meta:{
        isFooter: true
      }
    },
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/goods_detail/:id',
      component: Goods_detail
    },
    {
      path: '/buy',
      component: Goods_buy
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/shops',
      component: Shops
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/address',
      component: Address
    },
    {
      path: '/addressedit',
      component: AddressEdit
    },
    {
      path: '/collect',
      component: Collect
    },
    {
      path: '/feedback',
      component: Feedback
    },
    {
      path: '/history_feedback',
      component: History_feedback
    }
  ]
})
