import { NextResponse } from 'next/server';
import { dbconnection } from '@/app/lib/dbconnection';
import { Expense } from '@/app/lib/models/transaction';

export async function GET() {
  await dbconnection();
  const recentExpenses = await Expense.find()
    .sort({ date: -1 })
    .limit(5)
    .lean();

  return NextResponse.json(recentExpenses);
}
