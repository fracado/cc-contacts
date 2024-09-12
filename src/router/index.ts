import { createRouter, createWebHistory } from 'vue-router'
import ListView from '@/views/ListView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'contacts',
			component: ListView,
			meta: {
				title: 'Contacts'
			}
		}
	]
})

export default router
