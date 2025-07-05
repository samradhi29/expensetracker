import { NextResponse } from 'next/server';
import { dbconnection } from '@/app/lib/dbconnection';
import { Expense } from '@/app/lib/models/transaction';

export async function GET() {
  await dbconnection();
  const result = await Expense.aggregate([
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);

  const total = result.length > 0 ? result[0].total : 0;

  return NextResponse.json({ total });
}
