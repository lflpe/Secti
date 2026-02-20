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
      // Normalizar a string de data para evitar problemas com diferentes precisões de milissegundos
      let normalizedDateString = dateString.trim();

      // Se contém 'T', é formato ISO com hora
      if (normalizedDateString.includes('T')) {
        // Extrair a parte da data (YYYY-MM-DD) e hora
        const tIndex = normalizedDateString.indexOf('T');
        const datePart = normalizedDateString.substring(0, tIndex); // YYYY-MM-DD
        const timePart = normalizedDateString.substring(tIndex + 1); // HH:mm:ss.xxxxxxZ ou HH:mm:ssZ

        // Remover 'Z' do final
        const timeWithoutZ = timePart.replace(/Z$/, '');
        const timeParts = timeWithoutZ.split('.');

        if (timeParts.length === 2) {
          // Tem milissegundos - pegar apenas os primeiros 3 dígitos
          const hms = timeParts[0]; // HH:mm:ss
          const milliseconds = timeParts[1].substring(0, 3); // Primeiros 3 dígitos
          normalizedDateString = `${datePart}T${hms}.${milliseconds}Z`;
        } else {
          // Não tem milissegundos - construir sem eles
          normalizedDateString = `${datePart}T${timeWithoutZ}Z`;
        }
      }

      date = new Date(normalizedDateString);

      if (isNaN(date.getTime())) {
        // Se falhar, tentar extrair apenas a data (YYYY-MM-DD)
        const dateMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (dateMatch) {
          const [, ano, mes, dia] = dateMatch.map(Number);
          date = new Date(ano, mes - 1, dia);
        } else {
          return 'Data inválida';
        }
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
      // Normalizar a string de data para evitar problemas com diferentes precisões de milissegundos
      let normalizedDateString = dateString.trim();

      // Se contém 'T', é formato ISO com hora
      if (normalizedDateString.includes('T')) {
        // Extrair a parte da data (YYYY-MM-DD) e hora
        const tIndex = normalizedDateString.indexOf('T');
        const datePart = normalizedDateString.substring(0, tIndex); // YYYY-MM-DD
        const timePart = normalizedDateString.substring(tIndex + 1); // HH:mm:ss.xxxxxxZ ou HH:mm:ssZ

        // Remover 'Z' do final
        const timeWithoutZ = timePart.replace(/Z$/, '');
        const timeParts = timeWithoutZ.split('.');

        if (timeParts.length === 2) {
          // Tem milissegundos - pegar apenas os primeiros 3 dígitos
          const hms = timeParts[0]; // HH:mm:ss
          const milliseconds = timeParts[1].substring(0, 3); // Primeiros 3 dígitos
          normalizedDateString = `${datePart}T${hms}.${milliseconds}Z`;
        } else {
          // Não tem milissegundos - construir sem eles
          normalizedDateString = `${datePart}T${timeWithoutZ}Z`;
        }
      }

      date = new Date(normalizedDateString);

      if (isNaN(date.getTime())) {
        // Se falhar, tentar extrair apenas a data (YYYY-MM-DD)
        const dateMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (dateMatch) {
          const [, ano, mes, dia] = dateMatch.map(Number);
          date = new Date(ano, mes - 1, dia);
        } else {
          return 'Data inválida';
        }
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
      // Normalizar a string de data para evitar problemas com diferentes precisões de milissegundos
      let normalizedDateString = dateString.trim();

      // Se contém 'T', é formato ISO com hora
      if (normalizedDateString.includes('T')) {
        // Extrair a parte da data (YYYY-MM-DD) e hora
        const tIndex = normalizedDateString.indexOf('T');
        const datePart = normalizedDateString.substring(0, tIndex); // YYYY-MM-DD
        const timePart = normalizedDateString.substring(tIndex + 1); // HH:mm:ss.xxxxxxZ ou HH:mm:ssZ

        // Remover 'Z' do final
        const timeWithoutZ = timePart.replace(/Z$/, '');
        const timeParts = timeWithoutZ.split('.');

        if (timeParts.length === 2) {
          // Tem milissegundos - pegar apenas os primeiros 3 dígitos
          const hms = timeParts[0]; // HH:mm:ss
          const milliseconds = timeParts[1].substring(0, 3); // Primeiros 3 dígitos
          normalizedDateString = `${datePart}T${hms}.${milliseconds}Z`;
        } else {
          // Não tem milissegundos - construir sem eles
          normalizedDateString = `${datePart}T${timeWithoutZ}Z`;
        }
      }

      date = new Date(normalizedDateString);

      if (isNaN(date.getTime())) {
        // Se falhar, tentar extrair apenas a data (YYYY-MM-DD)
        const dateMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (dateMatch) {
          const [, ano] = dateMatch.map(Number);
          return ano;
        } else {
          return new Date().getFullYear();
        }
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
