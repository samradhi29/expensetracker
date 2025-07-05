'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

interface Comparison {
  category: string;
  budget: number;
  actual: number;
}

function BudgetInsights({ data }: { data: Comparison[] }) {
  const overBudget = data.filter((d) => d.actual > d.budget);
  const underBudget = data.filter((d) => d.actual <= d.budget);
  const totalSaved = underBudget.reduce(
    (sum, d) => sum + (d.budget - d.actual),
    0
  );

  return (
    <div className="mt-8 text-white space-y-4 bg-black">
      <div className="bg-black border-2 shadow-pink-300 p-4 rounded-lg shadow-md">
        <p className="font-semibold text-lg text-pink-400">Over Budget</p>
        {overBudget.length === 0 ? (
          <p className="text-zinc-400"> Great! No overspending this month.</p>
        ) : (
          overBudget.map((item) => (
            <p key={item.category}>
               <strong>{item.category}</strong> exceeded by ₹
              {(item.actual - item.budget).toFixed(2)}
            </p>
          ))
        )}
      </div>

      <div className="bg-black p-4 rounded-lg shadow-md border-2 border-amber-50 shadow-pink-300">
        <p className="font-semibold text-lg text-green-400">Total Saved</p>
        <p className="text-white"> ₹{totalSaved.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default function BudgetVsActualChart() {
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [data, setData] = useState<Comparison[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/budget-vs-actual?month=${month}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    }
    fetchData();
  }, [month]);

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: 'Budget',
        data: data.map((item) => item.budget),
        backgroundColor: '#9333EA',
      },
      {
        label: 'Actual',
        data: data.map((item) => item.actual),
        backgroundColor: '#EC4899',
      },
    ],
  };

  return (
    <div className="bg-gradient-to-bl from-black to-zinc-900  shadow-pink-300 text-white p-6 rounded-xl shadow-md max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Budget vs Actual Comparison
      </h2>

      <div className="text-center mb-6">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="bg-black border border-purple-500 px-4 py-2 rounded text-white"
        />
      </div>

      <Bar data={chartData} />

      {/*insights here */}
      <BudgetInsights data={data} />
    </div>
  );
}
