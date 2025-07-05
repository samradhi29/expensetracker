'use client';

import { useRouter } from 'next/navigation'; // for Next.js 13 app router
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur bg-black border-b border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent cursor-pointer" onClick={() => router.push('/')}>
          Finance Tracker
        </h1>
        <NavigationMenu>
          <NavigationMenuList className="space-x-4">
                        <NavigationMenuItem>
              <Button
                variant="ghost"
                className="text-white hover:bg-fuchsia-700 hover:text-white"
                onClick={() => router.push('/listexpenses')} // route to Monthly Expenses page
              >
                Expenses History
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="ghost"
                className="text-white hover:bg-pink-700 hover:text-white"
                onClick={() => router.push('/addtransaction')} // route to Add Expense page
              >
                Add Expense
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="ghost"
                className="text-white hover:bg-purple-700 hover:text-white"
                onClick={() => router.push('/Budget')} // route to Monthly Budget page
              >
                Monthly Budget
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="ghost"
                className="text-white hover:bg-fuchsia-700 hover:text-white"
                onClick={() => router.push('/viewmontlyexpense')} // route to Monthly Expenses page
              >
                View Monthly Expenses
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
