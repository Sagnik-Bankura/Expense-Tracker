import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import moment from "moment";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

// Set default colors for charts to be dark for light background
ChartJS.defaults.color = '#1f2937'; // Dark gray text
ChartJS.defaults.borderColor = 'rgba(0, 0, 0, 0.1)';

const Analytics = ({ allTransaction }) => {
    const totalTurnover = allTransaction.reduce((acc, t) => acc + t.amount, 0);
    const totalIncomeTurnover = allTransaction.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpenseTurnover = allTransaction.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

    const expenseByCategory = allTransaction
        .filter(t => t.type === 'expense')
        .reduce((acc, transaction) => {
            acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
            return acc;
        }, {});
    
    const topSpendingCategory = Object.keys(expenseByCategory).sort((a, b) => expenseByCategory[b] - expenseByCategory[a])[0] || 'N/A';

    const lineChartData = {
        labels: [...new Set(allTransaction.map(t => moment(t.date).format('DD-MM')))].sort(),
        datasets: [{
            label: 'Expense',
            data: [...new Set(allTransaction.map(t => moment(t.date).format('DD-MM')))].sort().map(date => 
                allTransaction
                    .filter(t => t.type === 'expense' && moment(t.date).format('DD-MM') === date)
                    .reduce((acc, t) => acc + t.amount, 0)
            ),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            tension: 0.2,
        }],
    };
    
    const barChartData = {
        labels: ['Income', 'Expense'],
        datasets: [{
            label: 'Total Amount',
            data: [totalIncomeTurnover, totalExpenseTurnover],
            backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
        }]
    };
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/40 backdrop-blur-lg rounded-2xl border border-white/50 p-6 shadow-lg text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Turnover</h3>
                <p className="text-3xl font-bold text-black">${totalTurnover}</p>
            </div>
            <div className="bg-white/40 backdrop-blur-lg rounded-2xl border border-white/50 p-6 shadow-lg text-center">
                 <h3 className="text-lg font-semibold text-gray-800 mb-2">Financial Summary</h3>
                <p className="text-2xl font-bold text-green-800">Income: ${totalIncomeTurnover}</p>
                <p className="text-2xl font-bold text-red-800">Expense: ${totalExpenseTurnover}</p>
            </div>
             <div className="bg-white/40 backdrop-blur-lg rounded-2xl border border-white/50 p-6 shadow-lg text-center">
                 <h3 className="text-lg font-semibold text-gray-800 mb-2">Top Spending Category</h3>
                 <p className="text-3xl font-bold text-blue-800 capitalize">{topSpendingCategory}</p>
            </div>

            <div className="bg-white/40 backdrop-blur-lg rounded-2xl border border-white/50 p-6 shadow-lg md:col-span-2">
                 <h4 className="text-center text-lg font-semibold text-gray-800 mb-4">Daily Expense Trend</h4>
                 <div className="h-80">
                    <Line data={lineChartData} options={chartOptions} />
                 </div>
            </div>
             <div className="bg-white/40 backdrop-blur-lg rounded-2xl border border-white/50 p-6 shadow-lg">
                 <h4 className="text-center text-lg font-semibold text-gray-800 mb-4">Transaction Totals</h4>
                 <div className="h-80">
                    <Bar data={barChartData} options={chartOptions} />
                 </div>
            </div>
        </div>
    );
};
export default Analytics;