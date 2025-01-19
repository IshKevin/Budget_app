/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createBudget, getBudgets } from "@/lib/queries/budget";
import { getCategories } from "@/lib/queries/category";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BudgetForm } from "./BudgetForm";
import { BudgetCard } from "./BudgetCard";
import { revalidatePath } from "next/cache";

export default async function BudgetPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Please sign in to access your budgets
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  try {
    const [budgets, rawCategories] = await Promise.all([
      getBudgets(user.id),
      getCategories(user.id),
    ]);

    const categories = rawCategories.map(category => ({
      id: category.id,
      name: category.name,
      kindeId: category.kindeId || user.id, // Ensure kindeId is present
    }));

    async function handleSubmit(formData: FormData) {
      "use server";

      const name = formData.get("name") as string;
      const categoryId = formData.get("categoryId") as string;
      const amount = formData.get("amount") as string;
      const startDate = formData.get("startDate") as string;
      const endDate = formData.get("endDate") as string;

      if (!name || !categoryId || !amount || !startDate || !endDate) {
        throw new Error("Missing required fields");
      }

      try {
        await createBudget({
          kindeId: user.id,
          name,
          categoryId: parseInt(categoryId, 10),
          amount: parseFloat(amount),
          startDate: new Date(startDate),
          endDate: new Date(endDate),
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
        <header className="bg-gradient-to-r from-green-400 via-green-300 to-green-200 py-8 shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-2">Budgets</h1>
            <p className="text-green-900">Plan and track your spending limits</p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-green-800">
                    Your Budgets
                  </h2>
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {budgets.length} {budgets.length === 1 ? 'Budget' : 'Budgets'}
                  </span>
                </div>
                
                {budgets.length > 0 ? (
                  <div className="grid gap-4">
                    {budgets.map((budget) => (
                      <BudgetCard 
                        key={budget.id} 
                        // @ts-expect-error
                        budget={budget}
                        category={categories.find(c => c.id === budget.categoryId)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-2">No budgets yet</p>
                    <p className="text-sm text-gray-500">Create your first budget to start tracking</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
                <h2 className="text-xl font-semibold text-green-800 mb-6">Create New Budget</h2>
                <BudgetForm onSubmit={handleSubmit} categories={categories} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Error loading budgets. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
}