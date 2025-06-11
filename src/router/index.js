import { createRouter, createWebHashHistory } from 'vue-router'
import ToevalBestaat from '@/views/ToevalBestaat.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'toeval-bestaat',
      component: ToevalBestaat,
    },
  ],
})

export default router
