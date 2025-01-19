import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createCategory, getCategories } from "@/lib/queries/category";
import CategoryForm from "@/app/(bp)/categories/CategoryForm";

export default async function CategoriesPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <h2 className="text-2xl font-semibold text-red-600">
          Please log in to continue
        </h2>
      </div>
    );
  }

  try {
    const categories = await getCategories(user.id);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-green-300 via-yellow-200 to-green-200 py-6 shadow-lg">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-extrabold text-green-900 text-center">
              Transaction Categories
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Categories List */}
          <div className="col-span-1 bg-white rounded-lg shadow-md border border-green-200 p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              All Categories
            </h2>
            <div className="space-y-4">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <div
                    key={category.id}
                    className="p-4 bg-gray-100 rounded-lg border border-gray-300"
                  >
                    <h3 className="text-lg font-semibold text-green-700">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.description || "No description provided"}
                    </p>
                    {category.parentId && (
                      <p className="text-xs text-gray-500 mt-1">
                        Parent ID: {category.parentId}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No categories available. Create your first category to get
                  started!
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Category Form */}
          <div className="col-span-2 bg-white rounded-lg shadow-md border border-green-200 p-6">
            <CategoryForm
              onSubmit={async (data) => {
                "use server";
                if (!user?.id) return;
                await createCategory({
                  ...data,
                  kindeId: user.id,
                });
              }}
            />
          </div>
        </main>
      </div>
    );
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
}
