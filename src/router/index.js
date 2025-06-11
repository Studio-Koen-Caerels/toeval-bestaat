import { createRouter, createWebHistory } from 'vue-router'
import ToevalBestaat from '@/views/ToevalBestaat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'toeval-bestaat',
      component: ToevalBestaat,
    },
  ],
})

export default router
