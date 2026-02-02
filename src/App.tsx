import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AuthProvider} from "./contexts";
import { PrivateRoute } from './guards/PrivateRoute';
import { PublicRoute } from './guards/PublicRoute';

// Public Pages
import { Home } from './pages/public/Home.tsx';
import { AboutPage } from './pages/public/AboutPage';
import { LoginPage } from './pages/public/LoginPage';
import { NotFoundPage } from './pages/public/NotFoundPage';
import { ASecretaria } from './pages/public/ASecretaria';
import { ASecretariaCargo } from './pages/public/ASecretariaCargo';

// Private Pages
import { DashboardPage } from './pages/private/DashboardPage';
import { SettingsPage } from './pages/private/SettingsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/secti/a-secretaria" element={<ASecretaria />} />
          <Route path="/secti/a-secretaria-cargo" element={<ASecretariaCargo />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
