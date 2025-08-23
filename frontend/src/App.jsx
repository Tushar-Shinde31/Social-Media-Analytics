import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SocialDashboard from './pages/SocialDashboard'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import InstagramAnalytics from './pages/dashboard/InstagramAnalytics'
import YouTubeAnalytics from './features/youtube/pages/YouTubeAnalytics'
import TwitterAnalytics from './features/twitter/pages/TwitterAnalytics'
import PrivateRoute from './PrivateRoute'

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
  },
  {
    path: '/youtube',
    element: <PrivateRoute><YouTubeAnalytics/></PrivateRoute>
  },
  {
    path: '/twitter',
    element: <PrivateRoute><TwitterAnalytics/></PrivateRoute>
  }
])

function App() {
  return <RouterProvider router={appRouter}/>
}

export default App;