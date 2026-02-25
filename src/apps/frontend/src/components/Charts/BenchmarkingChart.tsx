import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BenchmarkingChartProps {
    currentValue: number;
    partyAvg: number;
    stateAvg: number;
    deputyName: string;
}

export const BenchmarkingChart: React.FC<BenchmarkingChartProps> = ({
    currentValue,
    partyAvg,
    stateAvg,
    deputyName
}) => {
    const chartData = {
        labels: [deputyName, 'Média do Partido', 'Média do Estado'],
        datasets: [
            {
                label: 'Gasto Total Acumulado (R$)',
                data: [currentValue, partyAvg, stateAvg],
                backgroundColor: [
                    'rgba(37, 99, 235, 0.8)', // Blue for current
                    'rgba(148, 163, 184, 0.5)', // Slate for party
                    'rgba(148, 163, 184, 0.5)', // Slate for state
                ],
                borderColor: [
                    '#2563eb',
                    '#64748b',
                    '#64748b',
                ],
                borderWidth: 1,
                borderRadius: 6,
            },
        ],
    };

    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.x);
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: '#94a3b8',
                    callback: (value: any) => {
                        return new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            maximumSignificantDigits: 3
                        }).format(value);
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                }
            },
            y: {
                ticks: {
                    color: '#f8fafc',
                    font: {
                        weight: 'bold' as const
                    }
                },
                grid: {
                    display: false
                }
            }
        }
    };

    return (
        <div style={{ height: '200px', width: '100%' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};
