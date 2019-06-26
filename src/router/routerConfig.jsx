
import Login from '@/views/login'
import ErrorPage from '@/views/error'
import Home from '@/views/home'

const routerConfig = [
  {
    path: '/',
    component: Home,
    auth: true
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/404',
    component: ErrorPage
  }
]

export default routerConfig