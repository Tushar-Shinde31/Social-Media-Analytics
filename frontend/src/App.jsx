import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SocialDashboard from './pages/SocialDashboard'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import InstagramAnalytics from './pages/dashboard/InstagramAnalytics'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <SocialDashboard/>
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/register',
    element: <RegisterPage/>
  },
  {
    path: '/instagram-analytics',
    element: <InstagramAnalytics/>
  }
])

function App() {
  return <RouterProvider router={appRouter}/>
}

export default App;