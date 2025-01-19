/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createCategory, getCategories } from "@/lib/queries/category";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CategoryForm } from "./CategoryForm";
import { CategoryCard } from "./CategoryCard";
import { revalidatePath } from "next/cache";

export default async function CategoryPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Please sign in to manage your categories
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  try {
    const categories = await getCategories(user.id);

    async function handleSubmit(formData: FormData) {
      "use server";

      const name = formData.get("name") as string;
      const description = formData.get("description") as string;
      const parentId = formData.get("parentId") as string;

      if (!name) {
        throw new Error("Category name is required");
      }

      try {
        await createCategory({
          kindeId: user.id,
          name,
          description: description || undefined,
          parentId: parentId ? parseInt(parentId, 10) : undefined,
        });
        
        revalidatePath("/categories");
      } catch (error) {
        console.error("Error creating category:", error);
        throw new Error("Failed to create category");
      }
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-green-400 via-green-300 to-green-200 py-8 shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-2">Categories</h1>
            <p className="text-green-900">Organize your transactions by category</p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-green-800">
                    Your Categories
                  </h2>
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {categories.length} {categories.length === 1 ? 'Category' : 'Categories'}
                  </span>
                </div>
                
                {categories.length > 0 ? (
                  <div className="grid gap-4">
                    {categories.map((category) => (
                      <CategoryCard 
                        key={category.id}
                        // @ts-ignore 
                        category={category}
                        // @ts-ignore
                        parentCategory={categories.find(c => c.id === category.parentId)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-2">No categories yet</p>
                    <p className="text-sm text-gray-500">Create your first category to start organizing</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
                <h2 className="text-xl font-semibold text-green-800 mb-6">Create New Category</h2>

                <CategoryForm onSubmit={handleSubmit}
                // @ts-ignore
                 categories={categories} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Error loading categories. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
}