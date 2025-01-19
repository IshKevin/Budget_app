type Category = {
  id: number;
  name: string;
  description?: string;
  parentId?: number;
  kindeId: string;
};

type CategoryCardProps = {
  category: Category;
  parentCategory?: Category;
};

export function CategoryCard({ category, parentCategory }: CategoryCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-200">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-green-900">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-sm text-green-700">
            {category.description}
          </p>
        )}
        {parentCategory && (
          <div>
            <p className="text-xs text-green-600 uppercase">Parent Category</p>
            <p className="text-sm font-medium text-green-800">
              {parentCategory.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}