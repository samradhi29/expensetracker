import { NextRequest, NextResponse } from "next/server";
import { dbconnection } from "@/app/lib/dbconnection";
import { Budget } from "@/app/lib/models/Budget"

export async function POST(req: NextRequest) {
  try {
    await dbconnection();
    const { category, amount, month } = await req.json();

    if (!category || !amount || !month) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    const existing = await Budget.findOne({ category, month });

    if (existing) {
      existing.amount = amount;
      await existing.save();
      return NextResponse.json({ message: "Budget updated" }, { status: 200 });
    }

    await Budget.create({ category, amount, month });
    return NextResponse.json({ message: "Budget added" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  try {
    await dbconnection();
    const month = req.nextUrl.searchParams.get('month');
    if (!month) return NextResponse.json({ message: "Month is required" }, { status: 400 });

    const budgets = await Budget.find({ month });
    return NextResponse.json(budgets, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error fetching budgets" }, { status: 500 });
  }
}
