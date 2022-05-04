import Vue from 'vue'
import VueRouter from 'vue-router'
import ListCountries from '../views/ListCountries.vue'
import CounrtyDetails from '../views/CountryDetails.vue'
import Game from '../views/Game.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: ListCountries
    },
    {
        path: '/country/:code',
        name: 'Details',
        props: true,
        component: CounrtyDetails
    },
    {
        path: '/play',
        name: 'Play',
        component: Game
    },
]


const router = new VueRouter({
    mode: 'history',
    base: `${process.env.VUE_APP_BASE_URL}`,
    routes
})

export default router