import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Deputy } from '@fiscal/shared';
import './DeputyDashboard.css';

export const DeputyDashboard: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [deputy, setDeputy] = useState<Deputy | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchDeputyDetails();
        }
    }, [id]);

    const fetchDeputyDetails = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('deputies')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setDeputy(data);
        } catch (err: any) {
            console.error('Error fetching deputy:', err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="dashboard-status">Carregando detalhes...</div>;
    if (!deputy) return <div className="dashboard-status">Deputado não encontrado.</div>;

    return (
        <div className="dashboard">
            <button className="dashboard__back-btn" onClick={() => navigate('/')}>
                ← Voltar para Busca
            </button>

            <header className="dashboard__header">
                <div className="dashboard__profile">
                    <img src={deputy.photo_url} alt={deputy.name} className="dashboard__photo" />
                    <div className="dashboard__meta">
                        <h1 className="dashboard__name">{deputy.name}</h1>
                        <p className="dashboard__party-uf">{deputy.party} - {deputy.state}</p>
                        <span className="dashboard__status-badge">Exercício Ativo</span>
                    </div>
                </div>
            </header>

            <main className="dashboard__content">
                <section className="dashboard__stats-grid">
                    <div className="stat-card">
                        <h3 className="stat-card__label">Gasto Total (Ano Corrente)</h3>
                        <p className="stat-card__value">R$ 0,00</p>
                        <span className="stat-card__note">Baseado em dados da Câmara</span>
                    </div>

                    <div className="stat-card">
                        <h3 className="stat-card__label">Utilização da Cota (Média)</h3>
                        <div className="stat-card__progress-container">
                            <div className="stat-card__progress-bar" style={{ width: '45%' }}></div>
                        </div>
                        <p className="stat-card__percentage">45%</p>
                    </div>

                    <div className="stat-card">
                        <h3 className="stat-card__label">Glosas (Reembolso Negado)</h3>
                        <p className="stat-card__value stat-card__value--warning">R$ 0,00</p>
                    </div>
                </section>

                <section className="dashboard__disclaimer">
                    <p>⚠️ Os dados de despesas detalhadas serão integrados no Épico 3.</p>
                </section>
            </main>
        </div>
    );
};
