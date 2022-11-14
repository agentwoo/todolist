import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: () => import('../components/typeof/index.vue') },
    { path: '/tsDemo', component: () => import('../components/tsDemo/index.vue') },
    { path: '/edit', component: () => import('../components/tsDemo/edit.vue') },
    { path: '/todoList', component: () => import('../components/todoList/index.vue') },
    { path: '/todoListDemo', component: () => import('../components/todoList/todoListDemo.vue') }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router