import { NextRequest, NextResponse } from "next/server";
import { dbconnection } from "@/app/lib/dbconnection";
import { Expense } from "@/app/lib/models/transaction";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbconnection();

    const { id } = params;

    const expense = await Expense.findById(id);

    if (!expense) {
      return NextResponse.json({ message: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json(expense, { status: 200 });
  } catch (error) {
    console.error("Error fetching expense:", error);
    return NextResponse.json({ message: "Error fetching expense" }, { status: 500 });
  }
}
