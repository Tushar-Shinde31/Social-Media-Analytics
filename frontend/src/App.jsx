import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import SessionExpiryHandler from './components/SessionExpiryHandler'
import AuthRouterSetup from './components/AuthRouterSetup'
import SocialDashboard from './pages/SocialDashboard'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import InstagramAnalytics from './pages/dashboard/InstagramAnalytics'
import YouTubeAnalytics from './features/youtube/pages/YouTubeAnalytics'
import TwitterAnalytics from './features/twitter/pages/TwitterAnalytics'
import Overview from './features/overview/pages/Overview'
import PrivateRoute from './PrivateRoute'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <AuthRouterSetup />
        <PrivateRoute><SocialDashboard/></PrivateRoute>
      </>
    )
  },
  {
    path: '/login',
    element: (
      <>
        <AuthRouterSetup />
        <LoginPage/>
      </>
    )
  },
  {
    path: '/register',
    element: (
      <>
        <AuthRouterSetup />
        <RegisterPage/>
      </>
    )
  },
  {
    path: '/instagram-analytics',
    element: (
      <>
        <AuthRouterSetup />
        <PrivateRoute><InstagramAnalytics/></PrivateRoute>
      </>
    )
  },
  {
    path: '/youtube',
    element: (
      <>
        <AuthRouterSetup />
        <PrivateRoute><YouTubeAnalytics/></PrivateRoute>
      </>
    )
  },
  {
    path: '/twitter',
    element: (
      <>
        <AuthRouterSetup />
        <PrivateRoute><TwitterAnalytics/></PrivateRoute>
      </>
    )
  },
  {
    path: '/overview',
    element: (
      <>
        <AuthRouterSetup />
        <PrivateRoute><Overview/></PrivateRoute>
      </>
    )
  }
])

function App() {
  return (
    <AuthProvider>
      <SessionExpiryHandler />
      <RouterProvider router={appRouter}/>
    </AuthProvider>
  )
}

export default App;