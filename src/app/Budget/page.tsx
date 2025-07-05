'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const predefinedCategories = [
  'Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Bills', 'Others',
];

export default function BudgetPage() {
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [budgets, setBudgets] = useState<{ [key: string]: number }>({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchBudgets() {
      setMessage('');
      const res = await fetch(`/api/budget?month=${month}`);
      if (res.ok) {
        const data = await res.json();
        const initialBudgets: { [key: string]: number } = {};
        data.forEach((item: any) => {
          initialBudgets[item.category] = item.amount;
        });
        setBudgets(initialBudgets);
      }
    }
    fetchBudgets();
  }, [month]);

  const handleInputChange = (category: string, value: string) => {
    const num = parseFloat(value);
    setBudgets({ ...budgets, [category]: isNaN(num) ? 0 : num });
  };

  const handleSave = async () => {
    setMessage('');
    for (const category of predefinedCategories) {
      const amount = budgets[category] || 0;
      const res = await fetch('/api/budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, amount, month }),
      });

      if (!res.ok) {
        setMessage("Failed to save some budgets.");
        return;
      }
    }
    setMessage('Budgets saved successfully!');
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 flex items-center justify-center">
    <Card className="w-full max-w-3xl rounded-2xl border border-neutral-800 shadow-md shadow-purple-500
  bg-gradient-to-r from-black  to-zinc-900">
  {/* Card content */}


        <CardHeader className="text-center">
       <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-700 bg-clip-text text-transparent">
  Monthly Budget Setup
</CardTitle>

          <p className="text-sm text-zinc-400 mt-1">
            Assign budget limits per category and track your spending goals.
          </p>
        </CardHeader>

        <CardContent className="pt-0 space-y-8">
          {/* Month Selector */}
          <div className="text-center">
            <label htmlFor="month" className="text-sm font-medium text-zinc-300">
              Select Month
            </label>
            <Input
              type="month"
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="mt-2 w-52 mx-auto bg-black border border-neutral-700 text-white focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          {/* Budget Inputs */}
          <div className="space-y-4">
            {predefinedCategories.map((category) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-zinc-300 font-medium">{category}</span>
                <Input
                  type="number"
                  placeholder="₹0"
                  value={budgets[category] || ''}
                  onChange={(e) => handleInputChange(category, e.target.value)}
                  className="w-36 bg-black border border-neutral-700 text-white focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="text-center">
            <Button
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full hover:from-pink-600 hover:to-purple-600 font-semibold text-white"
              onClick={handleSave}
            >
              Save Budgets
            </Button>
            {message && (
              <p className="mt-3 text-sm text-green-400">{message}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
