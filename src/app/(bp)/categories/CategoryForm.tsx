"use client";
import { SubmitButton } from "./CategoryButton";

type CategoryFormProps = {
  onSubmit: (formData: FormData) => Promise<void>;
  categories: Array<{
    id: number;
    name: string;
    kindeId: string;
  }>;
};

export function CategoryForm({ onSubmit, categories }: CategoryFormProps) {
  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">
          Category Name *
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="e.g., Groceries"
          className="w-full px-4 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="Add a description for this category"
          className="w-full px-4 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">
          Parent Category
        </label>
        <select
          name="parentId"
          className="w-full px-4 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
        >
          <option value="">None</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <SubmitButton />
    </form>
  );
}