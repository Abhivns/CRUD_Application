import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/AppLayout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TeacherFormPage from './pages/TeacherFormPage';
import TeachersListPage from './pages/TeachersListPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/dashboard" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/teachers"
        element={
          <ProtectedRoute>
            <AppLayout>
              <TeachersListPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/teachers/new"
        element={
          <ProtectedRoute>
            <AppLayout>
              <TeacherFormPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/teachers/:id/edit"
        element={
          <ProtectedRoute>
            <AppLayout>
              <TeacherFormPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
