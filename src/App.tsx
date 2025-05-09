import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ExercisesPage = lazy(() => import('./pages/ExercisesPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ProgressPage = lazy(() => import('./pages/ProgressPage'));
const RegisterCenterPage = lazy(() => import('./pages/RegisterCenterPage'));
const CenterDashboardPage = lazy(() => import('./pages/CenterDashboardPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

function App() {
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