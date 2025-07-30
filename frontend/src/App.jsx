import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SocialDashboard from './pages/SocialDashboard'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'

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
  }
])

function App() {
  return <RouterProvider router={appRouter}/>
}

export default App;