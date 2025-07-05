import Addtransaction from './addtransaction/page'
import Listexpense from './listexpenses/page'
import MonthlyExpensesChart from './monthlyexpense/page';
import CategoryPieChart from './catagorypiechart/page';
import Dashboard from './Dashboard/page';
import BudgetPage from './Budget/page';
import BudgetVsActualChart from './budgetvsactualchar';
import Navbar from './Navbar'
export default function Home() {
  
  return (
    <div className=''>
      <Navbar/>
      <Dashboard/>
 
    </div>

  );
}
