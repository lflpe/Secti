import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AuthProvider} from "./contexts";
import { PrivateRoute } from './guards/PrivateRoute';
import { PublicRoute } from './guards/PublicRoute';

// Public Pages
import { Home } from './pages/public/Home.tsx';
import { Login } from './pages/public/Login.tsx';
import { RecuperarSenha } from './pages/public/RecuperarSenha.tsx';
import { ResetarSenha } from './pages/public/ResetarSenha.tsx';
import { Erro404 } from './pages/public/Erro404.tsx';
import { TodasNoticias } from './pages/public/TodasNoticias.tsx';
import { VisualizarNoticia } from './pages/public/VisualizarNoticia.tsx';
import { Editais } from './pages/public/Editais.tsx';
import { ASecretaria } from './pages/public/secti/ASecretaria.tsx';
import { ASecretariaCargo } from './pages/public/secti/ASecretariaCargo.tsx';
import { Historia } from './pages/public/secti/Historia.tsx';
import { Documentos } from './pages/public/secti/Documentos.tsx';
import { Organograma } from './pages/public/secti/Organograma.tsx';
import { Certificacoes } from './pages/public/secti/Certificacoes.tsx';
import { Servidor } from './pages/public/secti/Servidor.tsx';
import { Parcerias } from './pages/public/secti/Parcerias.tsx';
import { Legislacao } from './pages/public/secti/Legislacao.tsx';

// Private Pages
import { DashboardPage } from './pages/private/DashboardPage';
import { SettingsPage } from './pages/private/SettingsPage';
 import { ListaNoticias } from './pages/private/noticias/ListaNoticias.tsx';
import { CriarNoticia } from './pages/private/noticias/CriarNoticia.tsx';
import { EditarNoticia } from './pages/private/noticias/EditarNoticia.tsx';
import { VisualizarNoticiaAdmin } from './pages/private/noticias/VisualizarNoticia.tsx';
import { ListarEdital } from './pages/private/editais/ListarEdital.tsx';
import { CriarEdital } from './pages/private/editais/CriarEdital.tsx';
import { ListarAvisosDeIntencao } from './pages/private/avisosdeintencao/ListarAvisosDeIntencao.tsx';
import { CriarAvisosDeIntencao } from './pages/private/avisosdeintencao/CriarAvisosDeIntencao.tsx';
import { ListarDocumentos } from './pages/private/documentos/ListarDocumentos.tsx';
import { CriarDocumentos } from './pages/private/documentos/CriarDocumentos.tsx';
import { ListarDocumentosServidor } from './pages/private/documentosservidor/ListarDocumentosServidor.tsx';
import { CriarDocumentosServidor } from './pages/private/documentosservidor/CriarDocumentosServidor.tsx';
import { ListarLegislacao } from './pages/private/legislacao/ListarLegislacao.tsx';
import { CriarLegislacao } from './pages/private/legislacao/CriarLegislacao.tsx';
import { ListarParcerias } from './pages/private/parcerias/ListarParcerias.tsx';
import { CriarParcerias } from './pages/private/parcerias/CriarParcerias.tsx';
import { ListarTransparencia } from './pages/private/transparencia/ListarTransparencia.tsx';
import { CriarTransparencia } from './pages/private/transparencia/CriarTransparencia.tsx';
import { ListarProcessos } from './pages/private/processos/ListarProcessos.tsx';
import { CriarProcessos } from './pages/private/processos/CriarProcessos.tsx';
import { ListarRelatorios } from './pages/private/relatorios/ListarRelatorios.tsx';
import { CriarRelatorios } from './pages/private/relatorios/CriarRelatorios.tsx';
import {ApresentacaoOuvidoria} from "./pages/public/ouvidoria/ApresentacaoOuvidoria.tsx";
import {FaleComOuvidoria} from "./pages/public/ouvidoria/FaleComOuvidoria.tsx";
import {ProcessosERelatorios} from "./pages/public/ouvidoria/ProcessosERelatorios.tsx";
import {RedeOuvidorias} from "./pages/public/ouvidoria/RedeOuvidorias.tsx";
import {PerguntasFrequentes} from "./pages/public/transparencia/PerguntasFrequentes.tsx";
import {InformacoesInstitucionais} from "./pages/public/transparencia/InformacoesInstitucionais.tsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/noticias" element={<TodasNoticias />} />
          <Route path="/noticias/:slug" element={<VisualizarNoticia />} />
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
          <Route path="/ouvidoria/apresentacao" element={<ApresentacaoOuvidoria/>}/>
          <Route path="/ouvidoria/fale-com-ouvidoria" element={<FaleComOuvidoria/>}/>
          <Route path="/ouvidoria/processos-e-relatorios" element={<ProcessosERelatorios/>}/>
          <Route path="/ouvidoria/rede-ouvidorias" element={<RedeOuvidorias/>}/>
          <Route path="/transparencia/perguntas-frequentes" element={<PerguntasFrequentes/>}/>
          <Route path="/transparencia/informacoes-institucionais" element={<InformacoesInstitucionais/>}/>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/recuperar-senha"
            element={
              <PublicRoute>
                <RecuperarSenha />
              </PublicRoute>
            }
          />
          <Route
            path="/resetar-senha"
            element={
              <PublicRoute>
                <ResetarSenha />
              </PublicRoute>
            }
          />

          {/* Private Routes */}
          <Route
            path="/admin/dashboard"
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

          {/* Notícias - Admin */}
          <Route
            path="/admin/noticias"
            element={
              <PrivateRoute>
                <ListaNoticias />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/noticias/criar"
            element={
              <PrivateRoute>
                <CriarNoticia />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/noticias/editar/:slug"
            element={
              <PrivateRoute>
                <EditarNoticia />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/noticias/visualizar/:slug"
            element={
              <PrivateRoute>
                <VisualizarNoticiaAdmin />
              </PrivateRoute>
            }
          />

          {/* Editais - Admin */}
          <Route
            path="/admin/editais"
            element={
              <PrivateRoute>
                <ListarEdital />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/editais/criar"
            element={
              <PrivateRoute>
                <CriarEdital />
              </PrivateRoute>
            }
          />

          {/* Avisos de Intenção - Admin */}
          <Route
            path="/admin/avisosdeintencao"
            element={
              <PrivateRoute>
                <ListarAvisosDeIntencao />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/avisosdeintencao/criar"
            element={
              <PrivateRoute>
                <CriarAvisosDeIntencao />
              </PrivateRoute>
            }
          />

          {/* Documentos - Admin */}
          <Route
            path="/admin/documentos"
            element={
              <PrivateRoute>
                <ListarDocumentos />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/documentos/criar"
            element={
              <PrivateRoute>
                <CriarDocumentos />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/documentos-servidor"
            element={
              <PrivateRoute>
                <ListarDocumentosServidor />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/documentos-servidor/criar"
            element={
              <PrivateRoute>
                <CriarDocumentosServidor />
              </PrivateRoute>
            }
          />

          {/* Legislacao - Admin */}
          <Route
            path="/admin/legislacao"
            element={
              <PrivateRoute>
                <ListarLegislacao />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/legislacao/criar"
            element={
              <PrivateRoute>
                <CriarLegislacao />
              </PrivateRoute>
            }
          />

          {/* Parcerias - Admin */}
          <Route
            path="/admin/parcerias"
            element={
              <PrivateRoute>
                <ListarParcerias />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/parcerias/criar"
            element={
              <PrivateRoute>
                <CriarParcerias />
              </PrivateRoute>
            }
          />

          {/* Transparencia - Admin */}
          <Route
            path="/admin/transparencia"
            element={
              <PrivateRoute>
                <ListarTransparencia />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/transparencia/criar"
            element={
              <PrivateRoute>
                <CriarTransparencia />
              </PrivateRoute>
            }
          />

          {/* Processos - Admin */}
          <Route
            path="/admin/processos"
            element={
              <PrivateRoute>
                <ListarProcessos />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/processos/criar"
            element={
              <PrivateRoute>
                <CriarProcessos />
              </PrivateRoute>
            }
          />

          {/* Relatórios - Admin */}
          <Route
            path="/admin/relatorios"
            element={
              <PrivateRoute>
                <ListarRelatorios />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/relatorios/criar"
            element={
              <PrivateRoute>
                <CriarRelatorios />
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
