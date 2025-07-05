import { NextResponse } from "next/server";
import { dbconnection } from "@/app/lib/dbconnection";
import { Expense } from "@/app/lib/models/transaction";

export async function DELETE(req: Request) {
  try {
    await dbconnection();

    // Extract id param from URL pathname
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); 

    if (!id) {
      return NextResponse.json({ message: "Missing id parameter" }, { status: 400 });
    }

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return NextResponse.json({ message: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Expense deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return NextResponse.json({ message: "Error deleting expense" }, { status: 500 });
  }
}
