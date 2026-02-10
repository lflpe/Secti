import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { HeroSection } from '../../components/HeroSection';
import { ProjetosList } from '../../components/ProjetosList';
import type { ProjetoItem } from '../../components/ProjetosList';
import { projetosService } from '../../services/projetosService';
import { handleApiError } from '../../utils/errorHandler';
import { LoadingScreen } from '../../components/LoadingScreen';

export const Projetos = () => {
  const { id } = useParams<{ id: string }>();
  const [projetos, setProjetos] = useState<ProjetoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itensPorPagina = 100;

  useEffect(() => {
    const carregarProjetos = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let response;

        if (id) {
          // Se um ID foi passado, buscar apenas esse projeto
          response = await projetosService.buscarPorId(parseInt(id));

          const projetoFormatado: ProjetoItem = {
            id: response.id,
            titulo: response.titulo,
            descricao: response.fotoCapaCaminho ? 'Projeto com documentação' : 'Projeto sem documentação',
            fotoCapaCaminho: response.fotoCapaCaminho,
            logoCaminho: response.logoCaminho,
            url: response.url,
            ativo: response.ativo,
            dataCriacao: response.dataCriacao,
          };

          setProjetos([projetoFormatado]);
        } else {
          // Se nenhum ID, buscar todos os projetos públicos
          response = await projetosService.listarPublico({
            pagina: 1,
            itensPorPagina: itensPorPagina,
          });

          // Converter resposta para formato ProjetoItem
          const projetosFormatados: ProjetoItem[] = response.projetos.map(projeto => ({
            id: projeto.id,
            titulo: projeto.titulo,
            descricao: projeto.fotoCapaCaminho ? 'Projeto com documentação' : 'Projeto sem documentação',
            fotoCapaCaminho: projeto.fotoCapaCaminho,
            logoCaminho: projeto.logoCaminho,
            url: projeto.url,
            ativo: projeto.ativo,
            dataCriacao: projeto.dataCriacao,
          }));

          setProjetos(projetosFormatados);
        }
      } catch (err) {
        const mensagemErro = handleApiError(err);
        setError(mensagemErro);
        console.error('Erro ao carregar projetos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    carregarProjetos();
  }, [id, itensPorPagina]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PublicLayout>
      {/* Hero Section */}
      <HeroSection
        title={id ? projetos[0]?.titulo || 'Projeto' : 'Nossos Projetos'}
        subtitle={id ? 'Detalhes do projeto' : 'Conheça os projetos em desenvolvimento pela SECTI'}
      />

      {/* Conteúdo Principal */}
      <div className="bg-gray-50 py-12">
        <ProjetosList
          projetos={projetos}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </PublicLayout>
  );
};

