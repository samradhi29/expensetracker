'use client'
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategorySummary {
  _id: string;
  totalAmount: number;
}

export default function CategoryPieChart() {
  const [data, setData] = useState<CategorySummary[]>([]);

  useEffect(() => {
    async function fetchCategorySummary() {
      const res = await fetch('/api/catagorywisedata');
      const jsonData: CategorySummary[] = await res.json();
      setData(jsonData);
    }
    fetchCategorySummary();
  }, []);

  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        label: 'Expenses by Category',
        data: data.map(item => item.totalAmount),
        backgroundColor: [
          '#9333EA', '#EC4899', '#FBBF24', '#3B82F6', '#10B981',
          '#F87171', '#A78BFA', '#F472B6', '#94A3B8',
        ],
        borderColor: '#222', // subtle border for visibility
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: { size: 14, weight: 'bold' },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#000',
        bodyColor: '#000',
      },
    },
  };

  return (
    <div className="max-w-md mx-auto bg-black p-6 rounded-lg shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">
        Expenses by Category
      </h2>
      <Pie data={chartData}  />
    </div>
  );
}
