// src/app/api/getexpense/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { dbconnection } from "@/app/lib/dbconnection";
import { Expense } from "@/app/lib/models/transaction";

export async function GET(req: NextRequest) {
  try {
    await dbconnection();

    // Extract id from the request URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // gets the [id] from the dynamic route

    if (!id) {
      return NextResponse.json({ message: "Missing ID parameter" }, { status: 400 });
    }

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

