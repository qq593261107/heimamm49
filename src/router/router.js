import Vue from 'vue';
import VueRouter from 'vue-router';

import login from '../view/login/login.vue'
import layout from '../view/home/layout.vue'

// 导入嵌套的路由
import chart from '@/view/home/chart/chart.vue'
import userList from '@/view/home/userList/userList.vue'
import question from '@/view/home/question/question.vue'
import business from '@/view/home/business/business.vue'
import subject from '@/view/home/subject/subject.vue'

// 进度条插件
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter);

let router = new VueRouter({
    routes: [{
        path: "/",
        component: login
    },
    {
        path: "/home",
        redirect: "/home/subject",
        component: layout,
        // 嵌套路由
        children: [{
            path: "chart",
            component: chart,
        },
        {
            path: "userList",
            component: userList,
        },
        {
            path: "question",
            component: question,
        },
        {
            path: "business",
            component: business,
        },
        {
            path: "subject",
            component: subject,
        }]
    }]
})

router.beforeEach((to, from, next) => {
    Nprogress.start();
    next()

})
router.afterEach(() => {
    Nprogress.done()
})

export default router;