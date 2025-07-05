import { NextResponse } from 'next/server';
import { dbconnection } from '@/app/lib/dbconnection'; 
import { Expense } from '@/app/lib/models/transaction';

export async function GET() {
  try {
    await dbconnection();

    const summary = await Expense.aggregate([
      {
        $group: {
          _id: "$typeofexpense",
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Error fetching category summary:', error);
    return NextResponse.json(
      { message: 'Failed to fetch category summary' },
      { status: 500 }
    );
  }
}
