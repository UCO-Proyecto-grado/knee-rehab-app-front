import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { getTiposDocumento } from './services/entidades_primarias_service';
import RegisterCenterPage from './pages/RegisterCenterPage';
import DashboardPage from './pages/DashboardPage';
import ExercisesPage from './pages/ExercisesPage';
import ProfilePage from './pages/ProfilePage';
import ProgressPage from './pages/ProgressPage';
import CenterDashboardPage from './pages/CenterDashboardPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getInstituciones } from './services/instituciones_service';

function App() {

  useEffect(() => {
    getTiposDocumento();
  }, []);

  useEffect(() => {
    getInstituciones();
  }, []);

  return (
    <AuthProvider>
      <Suspense fallback={<div>Cargando...</div>}></Suspense>
      <div className="min-h-screen bg-background text-typography-secondary font-sans">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/registro-centro" element={<RegisterCenterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/centro/dashboard"
            element={
              <ProtectedRoute>
                <CenterDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ejercicios"
            element={
              <ProtectedRoute>
                <ExercisesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progreso"
            element={
              <ProtectedRoute>
                <ProgressPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;