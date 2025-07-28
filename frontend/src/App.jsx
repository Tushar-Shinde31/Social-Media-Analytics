import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import PrivateRoute from "./PrivateRoute";
import SocialDashboard from "./pages/SocialDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/social-dashbaord" element={<PrivateRoute><SocialDashboard/></PrivateRoute>} />
      </Routes>
    </Router>
  );
}
