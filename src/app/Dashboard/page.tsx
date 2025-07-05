'use client';

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import MonthlyExpensesChart from '../monthlyexpense/page';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Expense {
  _id: string;
  typeofexpense: string;
  description: string;
  date: string;
  amount: number;
}

interface CategorySummary {
  _id: string;
  totalAmount: number;
}

const messages = [
  "Track your spending effortlessly.",
  "Visualize your personal finances.",
  "Manage budgets and save more.",
];

function TypewriterLine() {
  const [text, setText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const currentMessage = messages[messageIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && text.length < currentMessage.length) {
      timeout = setTimeout(() => {
        setText(currentMessage.substring(0, text.length + 1));
      }, speed);
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(() => {
        setText(currentMessage.substring(0, text.length - 1));
      }, speed / 2);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(!isDeleting);
        if (!isDeleting) {
          setSpeed(50);
        } else {
          setSpeed(150);
          setMessageIndex((prev) => (prev + 1) % messages.length);
        }
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, messageIndex, speed]);

  return (
    <p className="text-white font-mono text-center text-lg min-h-[24px] mb-10">
      {text}
      <span className="animate-blink">|</span>
      <style>{`
        @keyframes blink {
          0%, 100% {opacity: 1;}
          50% {opacity: 0;}
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </p>
  );
}

export default function DashboardWithPie() {
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [categorySummary, setCategorySummary] = useState<CategorySummary[]>([]);
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);

      const [totalRes, catRes, recentRes] = await Promise.all([
        fetch('/api/totalexpense'),
        fetch('/api/catagorywisedata'),
        fetch('/api/resentdata'),
      ]);

      if (!totalRes.ok || !catRes.ok || !recentRes.ok) {
        setLoading(false);
        return;
      }

      const totalData = await totalRes.json();
      const catData = await catRes.json();
      const recentData = await recentRes.json();

      setTotalExpenses(totalData.total);
      setCategorySummary(catData);
      setRecentExpenses(recentData);
      setLoading(false);
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-black via-zinc-900 to-zinc-950">
        <p className="text-gray-400 text-lg font-semibold animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  const chartData = {
    labels: categorySummary.map((item) => item._id),
    datasets: [
      {
        label: 'Expenses by Category',
        data: categorySummary.map((item) => item.totalAmount),
        backgroundColor: [
          '#9333EA', '#EC4899', '#FBBF24', '#3B82F6', '#10B981',
          '#F87171', '#A78BFA', '#F472B6', '#94A3B8',
        ],
        borderWidth: 1,
        borderColor: '#1F2937',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black p-6 max-w-7xl mx-auto text-white space-y-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-2 text-transparent bg-clip-text shadow-2xl bg-gradient-to-r from-white via-pink-500 to-purple-400">
        Personal Finance Visualizer
      </h1>

      <TypewriterLine />

<div className="flex justify-center w-full">
  <section className="inline-block bg-gradient-to-r from-purple-900 to-pink-500 rounded-xl shadow-lg px-6 py-2 text-white font-semibold text-base sm:text-lg cursor-default select-none min-w-[460px] text-center transition transform hover:scale-105 hover:shadow-pink-400">
    Total Expenses
    <div className="mt-1 text-xl font-bold tracking-tight">
      ₹{totalExpenses.toFixed(2)}
    </div>
  </section>
</div>



<h2 className="mt-20 text-2xl sm:text-3xl font-semibold tracking-wide bg-gradient-to-r from-white  to-fuchsia-600 bg-clip-text text-transparent text-center">
  Category Wise Expenses
</h2> 



      <div className="flex flex-col lg:flex-row gap-6 mt-25">
        <div className="flex-1 rounded-3xl p-4 sm:p-6 shadow-lg bg-gradient-to-br from-black to-zinc-800">
          <ul className="divide-y divide-neutral-700 text-base sm:text-lg text-white">
            {categorySummary.map(({ _id, totalAmount }) => (
              <li key={_id} className="flex justify-between py-3 px-3 sm:px-4 hover:bg-purple-900 rounded-lg transition-colors cursor-default">
                <span className="font-medium">{_id}</span>
                <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 max-w-md rounded-3xl p-6 flex flex-col items-center justify-center mx-auto shadow-lg bg-gradient-to-br from-black to-zinc-800">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center tracking-wide text-white">
            Expenses by Category
          </h3>
          <Pie data={chartData} />
        </div>
      </div>

      <section className="rounded-3xl p-4 sm:p-6 shadow-lg bg-gradient-to-br from-black to-zinc-800">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-wide bg-gradient-to-r from-pink-200 via-pink-500 to-fuchsia-600 bg-clip-text text-transparent">
            Most Recent Transactions
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            See top 5 recent transactions
          </p>
        </div>

        {recentExpenses.length === 0 ? (
          <p className="text-gray-400 text-center text-base sm:text-lg">No recent transactions found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentExpenses.slice(0, 5).map(({ _id, typeofexpense, description, date, amount }) => (
              <div
                key={_id}
                className="bg-black rounded-2xl p-5 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-pink-500/30 border border-zinc-700 shadow-pink-400"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-pink-400 font-semibold text-sm sm:text-base">{typeofexpense}</span>
                  <span className="text-sm text-gray-400">{new Date(date).toLocaleDateString()}</span>
                </div>
                <p className="text-white text-sm sm:text-base truncate mb-2" title={description}>
                  {description}
                </p>
                <p className="text-right text-fuchsia-400 text-lg font-bold">₹{amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </section>
<section className="">
  <MonthlyExpensesChart />
</section>
      {/* Footer Section */}
      <footer className="text-center text-sm sm:text-base text-gray-400 mt-12 border-t border-zinc-700 pt-6">
        <p className="italic mb-2">
          "Beware of little expenses. A small leak will sink a great ship." — Benjamin Franklin
        </p>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Personal Finance Visualizer. Built with ❤️ to empower smarter spending.
        </p>
      </footer>
    </div>
  );
}
