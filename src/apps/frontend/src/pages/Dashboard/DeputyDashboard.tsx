import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Deputy } from '@fiscal/shared';
import { CEAP_CEILINGS, DEFAULT_CEILING } from '../../lib/constants';
import { ExpenseCategoryChart } from '../../components/Charts/ExpenseCategoryChart';
import { ExpenseTimelineChart } from '../../components/Charts/ExpenseTimelineChart';
import './DeputyDashboard.css';

interface CategoryTotal {
    category: string;
    total: number;
}

interface MonthTotal {
    month: string;
    total: number;
}

interface SupplierTotal {
    name: string;
    id: string;
    total: number;
}

export const DeputyDashboard: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [deputy, setDeputy] = useState<Deputy | null>(null);
    const [totalSpent, setTotalSpent] = useState(0);
    const [categoryData, setCategoryData] = useState<CategoryTotal[]>([]);
    const [timelineData, setTimelineData] = useState<MonthTotal[]>([]);
    const [supplierData, setSupplierData] = useState<SupplierTotal[]>([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        if (id) {
            loadData();
        }
    }, [id]);

    const loadData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Profile
            const { data: profile, error: profileErr } = await supabase
                .from('deputies')
                .select('*')
                .eq('id', id)
                .single();

            if (profileErr) throw profileErr;
            setDeputy(profile);

            // 2. Fetch Expenses (Current Year)
            const currentYear = new Date().getFullYear();
            const { data: expenses, error: expenseErr } = await supabase
                .from('expenses')
                .select('category, net_value, issue_date, supplier_name, supplier_id')
                .eq('deputy_id', id)
                .gte('issue_date', `${currentYear}-01-01`);

            if (expenseErr) throw expenseErr;

            const typedExpenses = (expenses || []) as {
                category: string;
                net_value: number;
                issue_date: string;
                supplier_name: string;
                supplier_id: string;
            }[];

            // Calculate total
            const sum = typedExpenses.reduce((acc, curr) => acc + Number(curr.net_value), 0);
            setTotalSpent(sum);

            // 3. Group by category
            const categoryGrouped = typedExpenses.reduce((acc: Record<string, number>, curr) => {
                const cat = curr.category || 'Outros';
                acc[cat] = (acc[cat] || 0) + Number(curr.net_value);
                return acc;
            }, {});

            const formattedCategoryData = Object.entries(categoryGrouped)
                .map(([category, total]) => ({ category, total }))
                .sort((a, b) => b.total - a.total);

            setCategoryData(formattedCategoryData);

            // 4. Group by month for timeline
            const monthGrouped = typedExpenses.reduce((acc: Record<string, number>, curr) => {
                const date = new Date(curr.issue_date);
                const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
                acc[key] = (acc[key] || 0) + Number(curr.net_value);
                return acc;
            }, {});

            const monthsPt = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
            const formattedTimelineData = Object.entries(monthGrouped)
                .map(([key, total]) => {
                    const [year, month] = key.split('-');
                    return {
                        key,
                        month: `${monthsPt[parseInt(month) - 1]}/${year}`,
                        total
                    };
                })
                .sort((a, b) => a.key.localeCompare(b.key));

            setTimelineData(formattedTimelineData);

            // 5. Group by supplier
            const supplierGrouped = typedExpenses.reduce((acc: Record<string, { name: string, total: number }>, curr) => {
                const key = curr.supplier_id || 'Desconhecido';
                if (!acc[key]) {
                    acc[key] = { name: curr.supplier_name || 'Desconhecido', total: 0 };
                }
                acc[key].total += Number(curr.net_value);
                return acc;
            }, {});

            const formattedSupplierData = Object.entries(supplierGrouped)
                .map(([id, info]) => ({ id, name: info.name, total: info.total }))
                .sort((a, b) => b.total - a.total)
                .slice(0, 10);

            setSupplierData(formattedSupplierData);

        } catch (err: any) {
            console.error('Error fetching dashboard data:', err.message);
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <div className="dashboard-status">Carregando detalhes...</div>;
    if (!deputy) return <div className="dashboard-status">Deputado não encontrado.</div>;

    const ceiling = CEAP_CEILINGS[deputy.state] || DEFAULT_CEILING;
    // For MVP, we compare current month's potential or just a representation
    // Let's assume average monthly spend if we had more data, 
    // for now we'll show total vs annual ceiling or state monthly limit
    const usagePercent = Math.min(Math.round((totalSpent / ceiling) * 100), 100);

    const formatCurrency = (val: number) => {
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

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
                        <p className="stat-card__value">{formatCurrency(totalSpent)}</p>
                        <span className="stat-card__note">Baseado em dados da Câmara</span>
                    </div>

                    <div className="stat-card">
                        <h3 className="stat-card__label">Utilização da Cota (Mensal UF)</h3>
                        <div className="stat-card__progress-container">
                            <div
                                className="stat-card__progress-bar"
                                style={{
                                    width: `${usagePercent}%`,
                                    backgroundColor: usagePercent > 90 ? '#ef4444' : usagePercent > 70 ? '#f59e0b' : '#2563eb'
                                }}
                            ></div>
                        </div>
                        <p className="stat-card__percentage">{usagePercent}% do teto ({formatCurrency(ceiling)})</p>
                    </div>

                    <div className="stat-card">
                        <h3 className="stat-card__label">Glosas (Reembolso Negado)</h3>
                        <p className="stat-card__value stat-card__value--warning">R$ 0,00</p>
                    </div>
                </section>

                <section className="dashboard__charts">
                    <div className="dashboard__chart-card">
                        <h3 className="dashboard__section-title">Distribuição por Categoria</h3>
                        {categoryData.length > 0 ? (
                            <ExpenseCategoryChart data={categoryData} type="bar" />
                        ) : (
                            <div className="dashboard__no-data">Nenhuma despesa registrada para este ano.</div>
                        )}
                    </div>

                    <div className="dashboard__chart-card">
                        <h3 className="dashboard__section-title">Evolução Mensal (Timeline)</h3>
                        {timelineData.length > 0 ? (
                            <ExpenseTimelineChart data={timelineData} />
                        ) : (
                            <div className="dashboard__no-data">Dados insuficientes para gerar a linha do tempo.</div>
                        )}
                    </div>
                </section>

                <section className="dashboard__suppliers">
                    <div className="dashboard__chart-card">
                        <h3 className="dashboard__section-title">Top 10 Fornecedores</h3>
                        {supplierData.length > 0 ? (
                            <div className="supplier-list">
                                {supplierData.map((s, index) => (
                                    <div key={s.id} className="supplier-item">
                                        <div className="supplier-item__rank">{index + 1}º</div>
                                        <div className="supplier-item__info">
                                            <p className="supplier-item__name">{s.name}</p>
                                            <p className="supplier-item__id">ID: {s.id}</p>
                                        </div>
                                        <div className="supplier-item__value">{formatCurrency(s.total)}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="dashboard__no-data">Nenhum fornecedor registrado.</div>
                        )}
                    </div>
                </section>

                <section className="dashboard__disclaimer">

                    <p>⚠️ Os dados de despesas detalhadas (notas fiscais) serão sincronizados no Épico 3.</p>
                </section>
            </main>
        </div>
    );
};
