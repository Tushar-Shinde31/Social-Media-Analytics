import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SocialDashboard from './pages/SocialDashboard'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import InstagramAnalytics from './pages/dashboard/InstagramAnalytics'
import TwitterAnalytics from './features/twitter/pages/TwitterAnalytics'
import YouTubeAnalytics from './features/youtube/pages/YouTubeAnalytics'
import SocialOverview from './features/overview/pages/SocialOverview'
import PrivateRoute from './PrivateRoute'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute><SocialDashboard/></PrivateRoute>
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
    element: <PrivateRoute><InstagramAnalytics/></PrivateRoute>
  },
  {
    path: '/twitter-analytics',
    element: <PrivateRoute><TwitterAnalytics/></PrivateRoute>
  },
  {
    path: '/youtube-analytics',
    element: <PrivateRoute><YouTubeAnalytics/></PrivateRoute>
  },
  {
    path: '/overview',
    element: <PrivateRoute><SocialOverview/></PrivateRoute>
  }
])

function App() {
  return <RouterProvider router={appRouter}/>
}

export default App;