import Vue from 'vue';
import VueRouter from 'vue-router';

import login from '../view/login/login.vue'
import layout from '../view/home/layout.vue'

Vue.use(VueRouter);

let router = new VueRouter({
    routes: [{
        path: "/",
        component: login
    },
    {
        path: "/home",
        component: layout
    }]
})

export default router;