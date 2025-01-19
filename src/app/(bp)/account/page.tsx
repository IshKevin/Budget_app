/* eslint-disable @typescript-eslint/no-explicit-any */
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createAccount, getAccounts } from "@/lib/queries/account";
import { revalidatePath } from "next/cache";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AccountForm } from "./AccountForm";
import { AccountCard } from "./AccountCard";

export default async function AccountsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Please sign in to access your accounts
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const accounts = await getAccounts(user.id);

  async function handleSubmit(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const currency = formData.get("currency") as string;
    const balance = Number(formData.get("balance"));
    const description = formData.get("description") as string;

    if (!name || !currency || isNaN(balance)) {
      throw new Error("Please fill in all required fields");
    }

    try {
      await createAccount({
        kindeId: user.id,
        name,
        currency,
        balance,
        description,
        type: "BANK",
      });
      
      revalidatePath("/accounts");
    } catch (error) {
      console.error("Error creating account:", error);
      throw new Error("Failed to create account. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-green-400 via-green-300 to-green-200 py-8 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Accounts</h1>
          <p className="text-green-900">Manage your financial accounts in one place</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-green-800">
                  Your Accounts
                </h2>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {accounts.length} {accounts.length === 1 ? 'Account' : 'Accounts'}
                </span>
              </div>
              
              {accounts.length > 0 ? (
                <div className="grid gap-4">
                  {accounts.map((account: any) => (
                  <AccountCard key={account.id} account={account} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-2">No accounts yet</p>
                  <p className="text-sm text-gray-500">Add your first account to get started</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
              <h2 className="text-xl font-semibold text-green-800 mb-6">Add New Account</h2>
              <AccountForm onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}