
import Login from '@/views/login'
import ErrorPage from '@/views/error'
import Register from '@/views/register'

const routerConfig = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/404',
    component: ErrorPage
  }
]

export default routerConfig