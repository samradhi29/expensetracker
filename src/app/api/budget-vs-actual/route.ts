// /app/api/budget-vs-actual/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbconnection } from "@/app/lib/dbconnection";
import { Expense } from "@/app/lib/models/transaction";
import { Budget } from "@/app/lib/models/Budget";

export async function GET(req: NextRequest) {
  try {
    await dbconnection();
    const month = req.nextUrl.searchParams.get("month");
    if (!month) {
      return NextResponse.json({ message: "Month required" }, { status: 400 });
    }

    const start = new Date(`${month}-01`);
    const end = new Date(start);
    end.setMonth(start.getMonth() + 1);

    const budgets = await Budget.find({ month });
    const expenses = await Expense.aggregate([
      {
        $match: {
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: "$typeofexpense",
          actualAmount: { $sum: "$amount" },
        },
      },
    ]);

    const combined = budgets.map((b) => {
      const actual = expenses.find((e) => e._id === b.category);
      return {
        category: b.category,
        budget: b.amount,
        actual: actual?.actualAmount || 0,
      };
    });

    return NextResponse.json(combined, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
