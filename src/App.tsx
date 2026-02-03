import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AuthProvider} from "./contexts";
import { PrivateRoute } from './guards/PrivateRoute';
import { PublicRoute } from './guards/PublicRoute';

// Public Pages
import { Home } from './pages/public/Home.tsx';
import { Login } from './pages/public/Login.tsx';
import { Erro404 } from './pages/public/Erro404.tsx';
import { TodasNoticias } from './pages/public/TodasNoticias.tsx';
import { Editais } from './pages/public/Editais.tsx';
import { ASecretaria } from './pages/public/secti/ASecretaria.tsx';
import { ASecretariaCargo } from './pages/public/secti/ASecretariaCargo.tsx';
import { Historia } from './pages/public/secti/Historia.tsx';
import { Documentos } from './pages/public/secti/Documentos.tsx';
import { Organograma } from './pages/public/secti/Organograma.tsx';
import { Certificacoes } from './pages/public/secti/Certificacoes.tsx';
import { Servidor } from './pages/public/secti/Servidor.tsx';
import { Parcerias } from './pages/public/secti/Parcerias.tsx';

// Private Pages
import { DashboardPage } from './pages/private/DashboardPage';
import { SettingsPage } from './pages/private/SettingsPage';
import {Legislacao} from "./pages/public/secti/Legislacao.tsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/noticias" element={<TodasNoticias />} />
          <Route path="/editais" element={<Editais />} />
          <Route path="/secti/a-secretaria" element={<ASecretaria />} />
          <Route path="/secti/a-secretaria-cargo" element={<ASecretariaCargo />} />
          <Route path="/secti/historia" element={<Historia />} />
          <Route path="/secti/documentos" element={<Documentos />} />
          <Route path="/secti/organograma" element={<Organograma />} />
          <Route path="/secti/certificacoes" element={<Certificacoes />} />
          <Route path="/secti/servidor" element={<Servidor />} />
          <Route path="/secti/legislacao" element={<Legislacao/>}/>
          <Route path="/secti/parcerias" element={<Parcerias />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
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
          <Route path="*" element={<Erro404 />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
