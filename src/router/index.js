import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddProject from '../views/AddProject.vue'
import EditProject from '../views/EditProject.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'AddProject',
    component: AddProject
  },
  {
    // เราต้องบอก path เป็น projects ด้วยเพราะจะได้รู้ว่าเราต้องการ edit project ไหน
    path: '/projects/:id',
    name: 'EditProject',
    component: EditProject,
    // เหมือนเป็นการยอมว่าส่ง prop ได้
    props: true
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
