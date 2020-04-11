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
        component: login,
        meta: {
            title: "登录",
        }
    },
    {
        path: "/home",
        redirect: "/home/subject",
        component: layout,
        // 嵌套路由
        children: [{
            path: "chart",
            component: chart,
            meta: {
                title: "数据概览",
            }
        },
        {
            path: "userList",
            component: userList,
            meta: {
                title: "用户列表",
            }
        },
        {
            path: "question",
            component: question,
            meta: {
                title: "题库列表",
            }
        },
        {
            path: "business",
            component: business,
            meta: {
                title: "企业列表",
            }
        },
        {
            path: "subject",
            component: subject,
            meta: {
                title: "学科列表",
            }
        }]
    }]
})

router.beforeEach((to, from, next) => {
    Nprogress.start();
    next()

})
router.afterEach((to) => {
    Nprogress.done()
    document.title = to.meta.title
})

export default router;