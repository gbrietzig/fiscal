import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Deputy } from '@fiscal/shared';
import { DeputyCard } from '../../components/DeputyCard/DeputyCard';
import './SearchPage.css';

export const SearchPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [deputies, setDeputies] = useState<Deputy[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDeputies();
    }, []);

    const fetchDeputies = async (query: string = '') => {
        setLoading(true);
        try {
            let supabaseQuery = supabase
                .from('deputies')
                .select('*')
                .order('name', { ascending: true });

            if (query) {
                supabaseQuery = supabaseQuery.ilike('name', `%${query}%`);
            }

            const { data, error } = await supabaseQuery.limit(50);

            if (error) throw error;
            setDeputies(data || []);
        } catch (err: any) {
            console.error('Error fetching deputies:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchDeputies(searchTerm);
    };

    return (
        <div className="search-page">
            <header className="search-page__header">
                <h1 className="search-page__title">Monitoramento da Cota Parlamentar</h1>
                <p className="search-page__subtitle">Transparência ativa sobre os gastos públicos da Câmara dos Deputados.</p>

                <form className="search-page__search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Pesquisar por nome do deputado..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-page__input"
                    />
                    <button type="submit" className="search-page__button">
                        Buscar
                    </button>
                </form>
            </header>

            <main className="search-page__content">
                {loading && <div className="search-page__status">Carregando deputados...</div>}
                {error && <div className="search-page__status search-page__status--error">Erro: {error}</div>}

                {!loading && !error && (
                    <div className="search-page__results">
                        {deputies.length > 0 ? (
                            deputies.map((deputy) => (
                                <DeputyCard key={deputy.id} deputy={deputy} />
                            ))
                        ) : (
                            <p className="search-page__status">Nenhum deputado encontrado.</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};
