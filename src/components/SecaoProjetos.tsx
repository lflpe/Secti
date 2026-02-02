import React, { useState } from 'react';
import { Search } from 'lucide-react';

export type ProjetoItem = {
    id?: string | number;
    nome: string;
    marca: string; // URL da imagem da marca
    link?: string; // Link opcional para o projeto
};

type SecaoProjetosProps = {
    projetos: ProjetoItem[];
};

export const SecaoProjetos: React.FC<SecaoProjetosProps> = ({ projetos }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Função para normalizar strings removendo acentos
    const normalizeString = (str: string) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };

    const filteredProjetos = projetos.filter(projeto =>
        normalizeString(projeto.nome).includes(normalizeString(searchTerm))
    );

    return (
        <section className="py-12 bg-[#0C2856]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Título e subtítulo */}
                <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-4">Programas, Projetos e Iniciativas da SECTI</h2>
                    <p className="text-lg text-gray-300 mb-8">
                        Explore e descubra como estamos transformando ideias em realidade.
                    </p>
                </div>

                {/* Barra de pesquisa */}
                <div className="mb-8 flex justify-center">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Pesquisar projeto pelo nome..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-2xl border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Grid de projetos ou mensagem de nenhum resultado */}
                {filteredProjetos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjetos.map((projeto) => (
                            <a
                                key={projeto.id ?? projeto.nome}
                                href={projeto.link || `/projeto/${projeto.id}`}
                                className="bg-white rounded-2xl transition duration-200 hover:scale-105 shadow-md overflow-hidden hover:shadow-lg p-6 text-center block"
                            >
                                <div className="mb-4">
                                    <img
                                        src={projeto.marca}
                                        alt={`Marca do projeto ${projeto.nome}`}
                                        className="w-24 h-24 mx-auto object-contain"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-[#0C2856]">{projeto.nome}</h3>
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-white">
                        <p className="text-lg">Nenhum projeto encontrado para "{searchTerm}". Tente ajustar sua pesquisa.</p>
                    </div>
                )}
            </div>
        </section>
    );
};
