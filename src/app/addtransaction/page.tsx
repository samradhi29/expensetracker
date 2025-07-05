'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { IndianRupee, CalendarDays, StickyNote, Type } from "lucide-react";

export default function Page() {
  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Health",
    "Entertainment",
    "Education",
    "Groceries",
    "Others",
  ];

  const [form, setForm] = useState({
    typeofexpense: '',
    description: '',
    date: '',
    amount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/addexpense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    console.log("Form Submitted:", form);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-neutral-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 text-transparent bg-clip-text">
            Add New Expense
          </h1>
          <p className="text-purple-300 mt-2 text-sm">
            Fill out your expense details to keep track of your spending
          </p>
          <div className="h-1 w-28 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <Card className="bg-black border border-gray-700 shadow-md rounded-xl shadow-pink-300">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-full mx-auto">
              
              {/* Category Select */}
              <div className="relative w-full">
                <Type className="absolute left-3 top-3.5 text-purple-400" size={18} />
                <select
                  id="typeofexpense"
                  name="typeofexpense"
                  value={form.typeofexpense}
                  onChange={handleChange}
                  required
                  className="bg-black text-white border border-gray-600 pl-10 pr-3 py-2 w-full rounded focus:border-purple-500 appearance-none"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="relative w-full">
                <StickyNote className="absolute left-3 top-3.5 text-purple-400" size={18} />
                <Input
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="bg-black text-white border border-gray-600 pl-10 w-full focus:border-purple-500"
                  placeholder="Description"
                  required
                />
              </div>

              {/* Date */}
              <div className="relative w-full">
                <CalendarDays className="absolute left-3 top-3.5 text-purple-400" size={18} />
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="bg-black text-white border border-gray-600 pl-10 w-full focus:border-purple-500"
                  required
                />
              </div>

              {/* Amount */}
              <div className="relative w-full">
                <IndianRupee className="absolute left-3 top-3.5 text-purple-400" size={18} />
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="bg-black text-white border border-gray-600 pl-10 w-full focus:border-purple-500"
                  placeholder="Amount in ₹"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded shadow-md hover:shadow-lg transition-all"
              >
                Submit Transaction
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
