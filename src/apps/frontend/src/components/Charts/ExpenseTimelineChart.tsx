import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface TimelineData {
    month: string;
    total: number;
}

interface ExpenseTimelineChartProps {
    data: TimelineData[];
}

export const ExpenseTimelineChart: React.FC<ExpenseTimelineChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.month),
        datasets: [
            {
                fill: true,
                label: 'Gastos Mensais (R$)',
                data: data.map(item => item.total),
                borderColor: '#60a5fa',
                backgroundColor: 'rgba(96, 165, 250, 0.1)',
                tension: 0.4,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#fff',
                pointHoverRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#94a3b8',
                    callback: (value: any) => {
                        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 3 }).format(value);
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                }
            },
            x: {
                ticks: {
                    color: '#94a3b8',
                },
                grid: {
                    display: false
                }
            }
        }
    };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};
