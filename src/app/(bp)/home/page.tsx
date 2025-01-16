import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LucideIcon, CreditCard, FileText, TrendingUp, PlusCircle } from "lucide-react";
import GreetingComponent from "./Greeting"; // Assuming you've created this component

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userName = user?.given_name || "User";

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <section className="mb-8">
        <GreetingComponent userName={userName} />
      </section>

      {/* Quick Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Balance</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">$12,345</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-700">Monthly Spending</h2>
          <p className="text-3xl font-bold text-red-500 mt-2">$1,234</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-700">Savings</h2>
          <p className="text-3xl font-bold text-blue-500 mt-2">$8,901</p>
        </div>
      </section>

      {/* Actions Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <ActionCard
          icon={CreditCard}
          label="Add Transaction"
          href="/transactions/new"
          bgColor="bg-green-100"
          textColor="text-green-700"
        />
        <ActionCard
          icon={FileText}
          label="View Reports"
          href="/reports"
          bgColor="bg-blue-100"
          textColor="text-blue-700"
        />
        <ActionCard
          icon={TrendingUp}
          label="Manage Budgets"
          href="/budgets"
          bgColor="bg-purple-100"
          textColor="text-purple-700"
        />
        <ActionCard
          icon={PlusCircle}
          label="Create Category"
          href="/categories/new"
          bgColor="bg-yellow-100"
          textColor="text-yellow-700"
        />
      </section>

      {/* Recent Transactions Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
        <ul className="bg-white rounded-lg shadow-md divide-y">
          {[ 
            { id: 1, name: "Groceries", amount: "$100", date: "Jan 12" },
            { id: 2, name: "Rent", amount: "$1,200", date: "Jan 1" },
            { id: 3, name: "Utilities", amount: "$150", date: "Jan 10" },
          ].map((transaction) => (
            <li key={transaction.id} className="flex justify-between p-4 hover:bg-gray-100">
              <div>
                <p className="text-lg font-semibold">{transaction.name}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <p className="text-lg font-bold text-gray-700">{transaction.amount}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// ActionCard Component
function ActionCard({
  icon: Icon,
  label,
  href,
  bgColor,
  textColor,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
  bgColor: string;
  textColor: string;
}) {
  return (
    <a
      href={href}
      className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md hover:shadow-lg transition ${bgColor} ${textColor}`}
    >
      <Icon className="w-8 h-8 mb-2" />
      <p className="font-semibold">{label}</p>
    </a>
  );
}
