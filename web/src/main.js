import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'
import './assets/iconfont/iconfont.css'


// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )

//com
import Card from './components/Card'
Vue.component('my-card', Card)
import ListCard from './components/ListCard'
Vue.component('my-list-card', ListCard)


//axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
    // baseURL: process.env.VUE_APP_API_URL || '/web/api'
    baseURL: 'http://localhost:3000/web/api'
})
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')