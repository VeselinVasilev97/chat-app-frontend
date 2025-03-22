import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//css
import "./App.css";
//hooks
import { useUser } from "./Providers/AuthProvider";
//pages
import Login from "./pages/Login/LoginPage";
import Register from "./pages/Register/RegisterPage";
import NotFound from "./pages/Notfound/NotFoundPage";
import MainPage from "./pages/Main/MainPage";
//components
import LoadingScreen from "./components/Loading/LoadingComponent";
import MainLayout from "./layouts/MainLayout";
import ProtectProvider from "./Providers/ProtectProvider";
import UserDetailsPage from "./pages/UserDetails/UserDetailsPage";

const App = () => {
  const { user, isLoading } = useUser();
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/main/dashboard" replace />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/main/dashboard" replace />} />

        <Route element={<ProtectProvider />}>
          <Route path="/main" element={<MainLayout />}>
            <Route path="/main/dashboard" element={<MainPage />} />
            <Route path="/main/user" element={<MainPage />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to={user ? "/main/dashboard" : "/login"} replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
