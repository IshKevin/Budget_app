/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createTransaction, getTransactions } from "@/lib/queries/transaction";
import { getAccounts } from "@/lib/queries/account";
import { getCategories } from "@/lib/queries/category";
import { getBudgetsWithSpent } from "@/lib/queries/budget";
import TransactionForm from "@/app/(bp)/transactions/TransactionForm";
import { Card } from "@/components/ui/card";
import { revalidatePath } from "next/cache";

export default async function TransactionsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-2xl text-gray-600 font-semibold">
          User not authenticated
        </h2>
      </div>
    );
  }

  const accounts = await getAccounts(user.id);
  const categories = await getCategories(user.id);
  const transactions = await getTransactions(user.id);
  const budgets = await getBudgetsWithSpent(user.id);

  async function handleSubmit(formData: FormData) {
    "use server";

    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    const accountId = parseInt(formData.get("accountId") as string);
    const categoryId = parseInt(formData.get("categoryId") as string);
    const amount = parseFloat(formData.get("amount") as string);
    const type = formData.get("type") as "INCOME" | "EXPENSE";
    const description = formData.get("description") as string;
    const date = new Date(formData.get("date") as string);

    if (!accountId || !categoryId || !amount || !type || !date) {
      throw new Error("Missing required fields");
    }

    try {
      await createTransaction({
        kindeId: user.id,
        accountId,
        // @ts-ignore
        categoryId,
        type,
        amount,
        description,
        date,
      });

      revalidatePath("/transactions");
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw new Error("Failed to create transaction");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-green-300 via-yellow-200 to-green-200 py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-900">Transactions</h1>
        </div>
      </header>

    
      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      

          <div>
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Recent Transactions
            </h2>
            {transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <Card key={transaction.id} className="p-4 bg-yellow-50 rounded-lg shadow border border-yellow-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-green-900">
                          {transaction.description || "No description"}
                        </h3>
                        <p className="text-sm text-green-700">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-green-700">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency:
                              accounts.find((a) => a.id === transaction.accountId)?.currency || "USD",
                          }).format(Number(transaction.amount))}
                        </p>
                      </div>
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          transaction.type === "INCOME"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-green-700">No transactions available.</p>
            )}
          </div>

          {/* Transaction Form */}
          <div>
            <h2 className="text-xl font-semibold text-green-800 mb-4">Add Transaction</h2>
            <div className="bg-white p-6 rounded-lg shadow border border-green-200">
              <TransactionForm
                accounts={accounts}
                categories={categories}
                budgets={budgets}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
