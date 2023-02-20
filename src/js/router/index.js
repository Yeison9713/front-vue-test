import { createRouter, createWebHistory } from 'vue-router'

import Login from '../../views/login/Index.vue'
import List from '../../views/users/List.vue'
import New from '../../views/users/New.vue'
import Logout from '../../views/logout/Index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', name: 'Login', component: Login },
        { path: '/usuarios', name: 'Usuarios', component: List },
        { path: '/crear', name: 'Crear', component: New },
        { path: '/logout', name: 'Cerrar sesión', component: Logout },
    ]
})

export default router