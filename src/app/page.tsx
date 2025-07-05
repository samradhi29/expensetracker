import Addtransaction from './addtransaction/page'
import Listexpense from './listexpenses/page'
import MonthlyExpensesChart from './monthlyexpense/page';
export default function Home() {
  
  return (
    <div className=''>
 <div><Listexpense/></div>
<div><MonthlyExpensesChart/></div>

      
<Addtransaction/>
    </div>

  );
}
