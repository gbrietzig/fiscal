import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

interface ExpenseCategoryChartProps {
    data: {
        category: string;
        total: number;
    }[];
    type?: 'bar' | 'doughnut';
}

export const ExpenseCategoryChart: React.FC<ExpenseCategoryChartProps> = ({ data, type = 'bar' }) => {
    const chartData = {
        labels: data.map(item => item.category),
        datasets: [
            {
                label: 'Total por Categoria (R$)',
                data: data.map(item => item.total),
                backgroundColor: [
                    'rgba(37, 99, 235, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(236, 72, 153, 0.7)',
                    'rgba(20, 184, 166, 0.7)',
                ],
                borderColor: [
                    '#2563eb',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6',
                    '#ec4899',
                    '#14b8a6',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: type === 'doughnut',
                position: 'bottom' as const,
                labels: {
                    color: '#94a3b8',
                }
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        let label = context.dataset.label || '';
                        if (label) label += ': ';
                        if (context.parsed.y !== undefined) {
                            label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                        } else if (context.parsed !== undefined) {
                            label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed);
                        }
                        return label;
                    }
                }
            }
        },
        scales: type === 'bar' ? {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#94a3b8',
                    callback: (value: any) => {
                        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 3 }).format(value);
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                }
            },
            x: {
                ticks: {
                    color: '#94a3b8',
                    maxRotation: 45,
                    minRotation: 45
                },
                grid: {
                    display: false
                }
            }
        } : {}
    };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            {type === 'bar' ? (
                <Bar data={chartData} options={options} />
            ) : (
                <Doughnut data={chartData} options={options} />
            )}
        </div>
    );
};
