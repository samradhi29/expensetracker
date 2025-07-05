// app/api/updateexpense/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbconnection } from "@/app/lib/dbconnection";
import { Expense } from "@/app/lib/models/transaction";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbconnection();
    const { id } = params;
    const body = await req.json();

    const updated = await Expense.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ message: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Expense updated", updated }, { status: 200 });
  } catch (error) {
    console.error("Error updating expense:", error);
    return NextResponse.json({ message: "Error updating expense" }, { status: 500 });
  }
}
