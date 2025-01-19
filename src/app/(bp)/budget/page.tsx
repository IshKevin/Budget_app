import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createBudget, getBudgets } from "@/lib/queries/budget"; // Assuming you have a function to get budgets
import { Card } from "@/components/ui/card";
import { revalidatePath } from "next/cache";
import BudgetForm from "@/app/(bp)/budget/BudgetForm"; // Assuming your BudgetForm component is here

export default async function BudgetPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-2xl text-gray-600 font-semibold">
          User not authenticated
        </h2>
      </div>
    );
  }

  try {
    const budgets = await getBudgets(user.id);

    async function handleSubmit(formData: FormData) {
      "use server";

      const name = formData.get("name") as string;
      const categoryId = formData.get("categoryId") as string;
      const amount = formData.get("amount") as string;

      if (!name || !categoryId || !amount) {
        throw new Error("Missing required fields");
      }

      try {
        await createBudget({
          kindeId: user.id,
          name,
          categoryId,
          amount: parseFloat(amount),
          startDate: formData.get("startDate") as string,
          endDate: formData.get("endDate") as string,
          notificationThreshold: 80,
        });
        revalidatePath("/budgets");
      } catch (error) {
        console.error("Error creating budget:", error);
        throw new Error("Failed to create budget");
      }
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-green-300 via-yellow-200 to-green-200 py-6 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-900">Budgets</h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-10">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Existing Budgets */}
            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                Existing Budgets
              </h2>
              {budgets.length > 0 ? (
                <div className="space-y-4">
                  {budgets.map((budget) => (
                    <Card key={budget.id} className="p-4 bg-yellow-50 rounded-lg shadow border border-yellow-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-green-900">
                            {budget.name}
                          </h3>
                          <p className="text-sm text-green-700">
                            Category ID: {budget.categoryId}
                          </p>
                          <p className="text-sm text-green-700">
                            Amount: {budget.amount} {budget.currency}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-green-700">No budgets available.</p>
              )}
            </div>

            {/* Add New Budget Form */}
            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-4">Add New Budget</h2>
              <div className="bg-white p-6 rounded-lg shadow border border-green-200">
                <BudgetForm
                  onSubmit={handleSubmit}
                  categories={[]} // Pass your categories array here
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return <div>Error loading budgets</div>;
  }
}
