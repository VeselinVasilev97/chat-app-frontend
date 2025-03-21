import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//css
import "./App.css";
//hooks
import { useUser } from "./Providers/UserProvider";
//pages
import Login from "./pages/Login/LoginPage";
import Register from "./pages/Register/RegisterPage";
import NotFound from "./pages/Notfound/NotFoundPage";
import MainPage from "./pages/Main/MainPage";
//components
import LoadingScreen from "./components/Loading/LoadingComponent";
import MainLayout from "./layouts/MainLayout";
import ProtectProvider from "./Providers/ProtectProvider";

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

        {/* Wrap all /main routes inside MainLayout */}
        <Route path="/main" element={<MainLayout />}>
        <Route element={<ProtectProvider user={user} />}>
            <Route path="/main/dashboard" element={<MainPage />} />
        </Route>
        </Route>

        <Route path="/" element={<Navigate to={user ? "/main" : "/login"} replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
