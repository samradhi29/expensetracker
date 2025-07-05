'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { IndianRupee, CalendarDays, FileText, Type, StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function EditExpensePage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    typeofexpense: '',
    description: '',
    date: '',
    amount: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/getexpense/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch expense');
        return res.json();
      })
      .then((data) => {
        setForm({
          typeofexpense: data.typeofexpense,
          description: data.description,
          date: data.date.slice(0, 10),
          amount: data.amount.toString(),
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/editexpense/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, amount: Number(form.amount) }),
    });

    if (res.ok) {
      router.push('/listexpenses');
    } else {
      alert('Failed to update expense');
    }
  };

  if (loading) return <p className="text-white p-4">Loading...</p>;
  if (error) return <p className="text-red-500 p-4">Error: {error}</p>;

  return (
   <div className="min-h-screen bg-black p-6 flex flex-col items-center justify-center">

    

      <Card className="bg-black border border-slate-700 max-w-xl w-full shadow-md shadow-pink-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Update Your Expense Details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Type className="absolute left-3 top-3.5 text-purple-400" size={18} />
              <Input
                id="typeofexpense"
                name="typeofexpense"
                value={form.typeofexpense}
                onChange={handleChange}
                placeholder="Type of Expense"
                required
                className="bg-black text-white border-gray-600 pl-10"
              />
            </div>

            <div className="relative">
              <StickyNote className="absolute left-3 top-3.5 text-purple-400" size={18} />
              <Input
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="bg-black text-white border-gray-600 pl-10"
              />
            </div>

            <div className="relative">
              <CalendarDays className="absolute left-3 top-3.5 text-purple-400" size={18} />
              <Input
                type="date"
                id="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="bg-black text-white border-gray-600 pl-10"
              />
            </div>

            <div className="relative">
              <IndianRupee className="absolute left-3 top-3.5 text-purple-400" size={18} />
              <Input
                type="number"
                id="amount"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount in ₹"
                required
                className="bg-black text-white border-gray-600 pl-10"
              />
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
