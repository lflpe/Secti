// Serviço para gerenciar menus de transparência

export interface TransparenciaMenuItem {
  id: number;
  titulo: string;
  slug: string;
  url: string;
}

/**
 * Busca os menus dinâmicos de transparência
 *
 * IMPORTANTE: Esta função atualmente retorna dados mockados.
 * Quando a API estiver disponível, descomente o código da API e remova o mock.
 *
 * Exemplo de integração com API:
 * ```typescript
 * const response = await fetch('https://api.secti.pe.gov.br/transparencia/menus');
 * if (!response.ok) {
 *   throw new Error('Erro ao buscar menus de transparência');
 * }
 * const data = await response.json();
 * return data;
 * ```
 */
export const fetchTransparenciaMenus = async (): Promise<TransparenciaMenuItem[]> => {
  try {
    // TODO: Substituir pela chamada real à API
    // const response = await fetch('/api/transparencia/menus');
    // if (!response.ok) {
    //   throw new Error('Erro ao buscar menus de transparência');
    // }
    // const data = await response.json();
    // return data;

    // Mock de dados enquanto a API não está disponível
    // Simula um delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
      { id: 1, titulo: 'Responsabilidade Fiscal', slug: 'responsabilidade-fiscal', url: '/transparencia/responsabilidade-fiscal' },
      { id: 2, titulo: 'Fiscalização e Controle', slug: 'fiscalizacao-controle', url: '/transparencia/fiscalizacao-controle' },
      { id: 3, titulo: 'Transferências Estaduais e Acordos', slug: 'transferencias-acordos', url: '/transparencia/transferencias-acordos' },
      { id: 4, titulo: 'Receitas Transparências da União Dívida Ativa e Renúncia de Receita', slug: 'receitas-transparencias', url: '/transparencia/receitas-transparencias' },
      { id: 5, titulo: 'Despesa', slug: 'despesa', url: '/transparencia/despesa' },
      { id: 6, titulo: 'Licitações Contratos e Fornecedores', slug: 'licitacoes-contratos', url: '/transparencia/licitacoes-contratos' },
      { id: 7, titulo: 'Obras Públicas', slug: 'obras-publicas', url: '/transparencia/obras-publicas' },
      { id: 8, titulo: 'Patrimônio Público', slug: 'patrimonio-publico', url: '/transparencia/patrimonio-publico' },
      { id: 9, titulo: 'Recursos Humanos', slug: 'recursos-humanos', url: '/transparencia/recursos-humanos' },
      { id: 10, titulo: 'SIC', slug: 'sic', url: '/transparencia/sic' },
      { id: 11, titulo: 'Servidores', slug: 'servidores', url: '/transparencia/servidores' },
      { id: 12, titulo: 'Mapa Terceirizados', slug: 'mapa-terceirizados', url: '/transparencia/mapa-terceirizados' },
      { id: 13, titulo: 'Mapa de Diárias e Passagens', slug: 'mapa-diarias-passagens', url: '/transparencia/mapa-diarias-passagens' },
      { id: 14, titulo: 'Mapa de Convênios', slug: 'mapa-convenios', url: '/transparencia/mapa-convenios' },
      { id: 15, titulo: 'Mapa de Contratos', slug: 'mapa-contratos', url: '/transparencia/mapa-contratos' },
      { id: 16, titulo: 'Mapa de Cargos Comissionados e Funções Gratificadas', slug: 'mapa-cargos-comissionados', url: '/transparencia/mapa-cargos-comissionados' }
    ];
  } catch (error) {
    console.error('Erro ao buscar menus de transparência:', error);
    throw error;
  }
};
