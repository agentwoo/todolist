import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: () => import('../components/typeof/index.vue') },
    { path: '/tsDemo', component: () => import('../components/tsDemo/index.vue') },
    { path: '/tsTest', component: () => import('../components/tsDemo/tsTest.vue') },
    { path: '/edit', component: () => import('../components/tsDemo/edit.vue') },
    { path: '/todoList', component: () => import('../components/todoList/index.vue') },
    { path: '/todoListDemo', component: () => import('../components/todoList/todoListDemo.vue') },
    { path: '/todoListDemo2', component: () => import('../components/todoList/todoListDemo2.vue') },
    { path: '/todoListDemo3', component: () => import('../components/todoList/todoListDemo3.vue') },
    { path: '/test', component: () => import('../components/todoList/test.vue') }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router