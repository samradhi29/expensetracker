import { NextRequest, NextResponse } from "next/server";
import { dbconnection } from "@/app/lib/dbconnection";
import { Expense } from "@/app/lib/models/transaction";

export async function POST(req: NextRequest) {
  try {
    await dbconnection();

    const data = await req.json();
    const { typeofexpense, description, date, amount } = data;

    // Validate required fields
    if (!amount || !date || !typeofexpense || !description) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    // Validate and convert amount
    const amountNum = Number(amount);
    if (isNaN(amountNum)) {
      return NextResponse.json({ message: "Amount must be a valid number." }, { status: 400 });
    }

    // Validate and convert date
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json({ message: "Invalid date format." }, { status: 400 });
    }

    const newExpense = new Expense({
      typeofexpense,
      description,
      date: dateObj,
      amount: amountNum,
    });

    await newExpense.save();

    return NextResponse.json({ message: "Expense added successfully", newExpense }, { status: 201 });

  } catch (error) {
    console.log("Error adding expense:", error);
    return NextResponse.json({ message: "Failed to add expense" }, { status: 500 });
  }
}

