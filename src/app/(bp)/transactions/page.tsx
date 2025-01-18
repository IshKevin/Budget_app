import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createTransaction, getTransactions } from "@/lib/queries/transaction";
import { getAccounts } from "@/lib/queries/account";
import { getCategories } from "@/lib/queries/category";
import TransactionForm from "@/app/(bp)/transactions/TransactionForm";
import { Card } from "@/components/ui/card";

export default async function TransactionsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return (
      <div>
        <h2 className="text-2xl mb-2">User not authenticated</h2>
      </div>
    );
  }

  const accounts = await getAccounts(user.id);
  const categories = await getCategories(user.id);
  const transactions = await getTransactions(user.id);

  return (
    <div>
      <h1 className="text-2xl mb-4">Transactions</h1>
      <div className="grid grid-cols-1 gap-4">
        {transactions.map((transaction) => (
          <Card key={transaction.id}>
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold">{transaction.description}</h2>
                <p className="text-gray-500">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: accounts.find(a => a.id === transaction.accountId)?.currency || 'USD'
                  }).format(transaction.amount)}
                </p>
                <p className="text-gray-500">
                  {new Date(transaction.transactionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <TransactionForm
          accounts={accounts}
          categories={categories}
          onSubmit={async (data) => {
            'use server';
            if (!user?.id) return;
            await createTransaction({
              ...data,
              userId: user.id,
              transactionDate: new Date(data.transactionDate)
            });
          }}
        />
      </div>
    </div>
  );
}