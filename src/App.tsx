// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useUser } from './Providers/UserProvider';

import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import NotFound from './pages/NotFoundPage';
import MainPage from './pages/MainPage';

import LoadingScreen from './components/LoadingComponent';

const App = () => {
  const { user, isLoading } = useUser();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/chat" replace />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/chat" replace />} />
        <Route 
          path="/chat" 
          element={user ? <MainPage /> : <Navigate to="/login" replace />} 
        />
        <Route path="/" element={<Navigate to={user ? "/chat" : "/login"} replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;