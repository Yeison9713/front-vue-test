import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../../views/dashboard/Index.vue'
import Login from '../../views/login/Index.vue'
import List from '../../views/dashboard/users/List.vue'
import New from '../../views/dashboard/users/New.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Dashboard', component: Dashboard },
        { path: '/login', name: 'Login', component: Login },
        { path: '/usuarios', name: 'Usuarios', component: List },
        { path: '/crear', name: 'Crear', component: New },
    ]
})

export default router