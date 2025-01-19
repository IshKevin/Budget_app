import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createAccount, getAccounts } from "@/lib/queries/account";
import { Card } from "@/components/ui/card";
import { revalidatePath } from "next/cache";

export default async function AccountsPage() {
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

  async function handleSubmit(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const currency = formData.get("currency") as string;

    if (!name || !currency) {
      throw new Error("Missing required fields");
    }

    try {
      await createAccount({
        kindeId: user.id, name, currency,
        type: "BANK",
        balance: 0
      });
      revalidatePath("/accounts");
    } catch (error) {
      console.error("Error creating account:", error);
      throw new Error("Failed to create account");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">


      <header className="bg-gradient-to-r from-green-300 via-yellow-200 to-green-200 py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-900">Accounts</h1>
        </div>
      </header>

  
      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div>
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Existing Accounts
            </h2>
            {accounts.length > 0 ? (
              <div className="space-y-4">
                {accounts.map((account) => (
                  <Card key={account.id} className="p-4 bg-yellow-50 rounded-lg shadow border border-yellow-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-green-900">
                          {account.name}
                        </h3>
                        <p className="text-sm text-green-700">
                          Currency: {account.currency}
                        </p>
                         <p className="text-sm text-green-700">
                          Currency: {account.balance}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-green-700">No accounts available.</p>
            )}
          </div>


          <div>
            <h2 className="text-xl font-semibold text-green-800 mb-4">Add Account</h2>
            <div className="bg-white p-6 rounded-lg shadow border border-green-200">
              <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-green-800">
                    Account Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter account name"
                    className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-green-800">
                    Currency
                  </label>
                  <select
                    name="currency"
                    className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-300"
                  >
                    <option value="USD">RWF</option>
                    <option value="EUR">EUR</option>
                    <option value="RWF">RWF</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">BRF</option>
                    <option value="CNY">USD</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-300"
                >
                  Add Account
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
