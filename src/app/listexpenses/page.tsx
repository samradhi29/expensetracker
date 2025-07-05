'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Expense {
  _id: string;
  typeofexpense: string;
  description: string;
  date: string;
  amount: number;
}

const messages = [
  "Track your expenses effortlessly",
  "Visualize your monthly spending",
  "Manage your budget smarter",
];

// Typewriter effect for the tagline below the main heading
function TypewriterLine() {
  const [text, setText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const currentMessage = messages[messageIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && text.length < currentMessage.length) {
      // Typing effect
      timeout = setTimeout(() => {
        setText(currentMessage.substring(0, text.length + 1));
      }, speed);
    } else if (isDeleting && text.length > 0) {
      // Deleting effect
      timeout = setTimeout(() => {
        setText(currentMessage.substring(0, text.length - 1));
      }, speed / 2);
    } else {
      // Pause before switching between typing and deleting
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

export default function ExpenseListPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/listexpense');
      if (!res.ok) throw new Error('Failed to fetch expenses');
      const data: Expense[] = await res.json();
      setExpenses(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    }

    setLoading(false);
  }

  async function deleteExpense(id: string) {
    if (!confirm("Are you sure you want to delete this expense?")) return;

    try {
      const res = await fetch(`/api/deleteexpense/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete expense');
      fetchExpenses();
    } catch (err: any) {
      alert(err.message || 'Error deleting expense');
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-2 text-transparent bg-clip-text shadow-2xl bg-gradient-to-r from-white via-pink-500 to-purple-400">
        Personal Finance Visualizer
      </h1>

      <TypewriterLine />

      <Card className="bg-neutral-950 border border-neutral-800 shadow-xl max-w-7xl mx-auto">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-white text-xl">All Expenses</CardTitle>

          <Button
            onClick={() => router.push('/addtransaction')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white"
          >
            Add Expense
          </Button>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading expenses...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : expenses.length === 0 ? (
            <p className="text-zinc-400">No expenses found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm text-white">
                <thead className="bg-gradient-to-r from-black to-neutral-800">
                  <tr>
                    <th className="p-3 border border-neutral-700 text-left bg-gradient-to-r from-purple-400 to-pink-200 bg-clip-text text-transparent whitespace-nowrap">
                      Type
                    </th>
                    <th
                      className="p-3 border border-neutral-700 text-left bg-gradient-to-r from-purple-400 to-pink-200 bg-clip-text text-transparent max-w-xs truncate"
                      style={{ maxWidth: '150px' }}
                    >
                      Description
                    </th>
                    <th className="p-3 border border-neutral-700 text-left bg-gradient-to-r from-purple-400 to-pink-200 bg-clip-text text-transparent whitespace-nowrap">
                      Date
                    </th>
                    <th className="p-3 border border-neutral-700 text-right bg-gradient-to-r from-purple-400 to-pink-200 bg-clip-text text-transparent whitespace-nowrap">
                      Amount (₹)
                    </th>
                    <th className="p-3 border border-neutral-700 text-center bg-gradient-to-r from-purple-400 to-pink-200 bg-clip-text text-transparent whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {expenses.map((expense, idx) => (
                    <tr
                      key={expense._id}
                      className={`transition ${
                        idx % 2 === 0
                          ? "bg-gradient-to-r from-black to-neutral-900"
                          : "bg-gradient-to-r from-black to-zinc-800"
                      }`}
                    >
                      <td className="p-3 border border-neutral-800 whitespace-nowrap">{expense.typeofexpense}</td>

                      <td
                        className="p-3 border border-neutral-800 truncate max-w-xs"
                        style={{ maxWidth: '150px' }}
                        title={expense.description}
                      >
                        {expense.description}
                      </td>

                      <td className="p-3 border border-neutral-800 whitespace-nowrap">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="p-3 border border-neutral-800 text-right whitespace-nowrap">
                        ₹{expense.amount.toFixed(2)}
                      </td>

                      <td className="p-3 border border-neutral-800 text-center space-x-2 flex justify-center flex-wrap gap-2">
                        <Button
                          variant="outline"
                          className="border-purple-300 text-white hover:shadow-md whitespace-nowrap"
                          onClick={() => router.push(`/editexpense/${expense._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          className="border-red-300 text-white hover:shadow-md whitespace-nowrap"
                          onClick={() => deleteExpense(expense._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
