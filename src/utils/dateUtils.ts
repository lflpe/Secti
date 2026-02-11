/**
 * Utilitários para manipulação de datas
 */

/**
 * Formata uma data no formato brasileiro DD/MM/AAAA
 * @param dateString - String de data no formato ISO ou Date
 * @returns String formatada como DD/MM/AAAA
 */
export const formatarDataBrasileira = (dateString: string | Date): string => {
  try {
    let date: Date;

    if (typeof dateString === 'string') {
      // Se a string está no formato ISO (YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss),
      // extrai apenas a parte da data para evitar problemas de timezone
      if (dateString.includes('T') || dateString.match(/^\d{4}-\d{2}-\d{2}/)) {
        const partes = dateString.split('T')[0].split('-');
        if (partes.length === 3) {
          const [ano, mes, dia] = partes.map(Number);
          date = new Date(ano, mes - 1, dia);
        } else {
          date = new Date(dateString);
        }
      } else {
        date = new Date(dateString);
      }
    } else {
      date = dateString;
    }

    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }

    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const ano = date.getFullYear();

    return `${dia}/${mes}/${ano}`;
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
};

/**
 * Formata uma data por extenso em português
 * @param dateString - String de data no formato ISO ou Date
 * @returns String formatada como "DD de mês de AAAA"
 */
export const formatarDataPorExtenso = (dateString: string | Date): string => {
  try {
    let date: Date;

    if (typeof dateString === 'string') {
      // Se a string está no formato ISO (YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss),
      // extrai apenas a parte da data para evitar problemas de timezone
      if (dateString.includes('T') || dateString.match(/^\d{4}-\d{2}-\d{2}/)) {
        const partes = dateString.split('T')[0].split('-');
        if (partes.length === 3) {
          const [ano, mes, dia] = partes.map(Number);
          date = new Date(ano, mes - 1, dia);
        } else {
          date = new Date(dateString);
        }
      } else {
        date = new Date(dateString);
      }
    } else {
      date = dateString;
    }

    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }

    const dia = date.getDate();
    const mes = date.getMonth();
    const ano = date.getFullYear();

    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    return `${dia} de ${meses[mes]} de ${ano}`;
  } catch (error) {
    console.error('Erro ao formatar data por extenso:', error);
    return 'Data inválida';
  }
};

/**
 * Extrai o ano de uma data
 * @param dateString - String de data no formato ISO ou Date
 * @returns Ano como número
 */
export const extrairAno = (dateString: string | Date): number => {
  try {
    let date: Date;

    if (typeof dateString === 'string') {
      // Se a string está no formato ISO (YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss),
      // extrai apenas a parte da data para evitar problemas de timezone
      if (dateString.includes('T') || dateString.match(/^\d{4}-\d{2}-\d{2}/)) {
        const partes = dateString.split('T')[0].split('-');
        if (partes.length === 3) {
          const [ano, mes, dia] = partes.map(Number);
          date = new Date(ano, mes - 1, dia);
        } else {
          date = new Date(dateString);
        }
      } else {
        date = new Date(dateString);
      }
    } else {
      date = dateString;
    }

    return date.getFullYear();
  } catch (error) {
    console.error('Erro ao extrair ano:', error);
    return new Date().getFullYear();
  }
};
