import React from 'react';
import BudgetVsActualChart from '../Budgetvsactual/page';
import MonthlyExpensesChart from '../monthlyexpense/page';

export default function Page() {
  return (
    <div className="bg-black min-h-screen p-6 max-w-5xl mx-auto text-white space-y-12 rounded-lg">
      <section>
        <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-700 bg-clip-text text-transparent text-center">
          Budget vs Actual Chart
        </h2>
        <BudgetVsActualChart />
      </section>

      <section>
      
        <MonthlyExpensesChart />
      </section>
    </div>
  );
}
