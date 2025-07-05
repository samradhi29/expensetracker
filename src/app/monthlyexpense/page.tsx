'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Expense {
  date: string;
  amount: number;
}

export default function MonthlyExpensesChart() {
  const [monthlyData, setMonthlyData] = useState<number[]>(new Array(12).fill(0));

  useEffect(() => {
    // Fetch expense data once component mounts
    async function fetchExpenses() {
      const res = await fetch('/api/listexpense');
      const expenses: Expense[] = await res.json();

      const monthlyTotals = new Array(12).fill(0);

      // Sum expenses by month
      expenses.forEach((expense) => {
        const month = new Date(expense.date).getMonth();
        monthlyTotals[month] += expense.amount;
      });

      setMonthlyData(monthlyTotals);
    }

    fetchExpenses();
  }, []);

  const data = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    datasets: [
      {
        label: 'Monthly Expenses (₹)',
        data: monthlyData,
        backgroundColor: 'rgba(147, 51, 234, 0.8)', // Purple bars
        borderColor: 'rgba(147, 51, 234, 1)',
        borderWidth: 2,
        borderRadius: 6,
        maxBarThickness: 40,
        hoverBackgroundColor: 'rgba(147, 51, 234, 1)',
      },
    ],
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-8">
     <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
  Monthly Expenses
</h2>

      {/* Chart container */}
      <div className="w-full max-w-4xl h-[400px] bg-gradient-to-br from-black via-neutral-900 to-zinc-800 rounded-xl shadow-xl p-6">
        <Bar data={data} />
      </div>
    </div>
  );
}
