import { NextRequest, NextResponse } from "next/server";
import { dbconnection } from "@/app/lib/dbconnection";
import { Expense } from "@/app/lib/models/transaction";

export async function GET(req: NextRequest) {
  try {
    await dbconnection();
    const data = await Expense.find().sort({ date: -1 });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("Error fetching expenses:", error);
    return NextResponse.json({ message: "Failed to fetch expenses" }, { status: 500 });
  }
}
