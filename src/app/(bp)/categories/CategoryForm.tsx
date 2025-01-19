"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";

interface Category {
  name?: string;
  description?: string;
  parentId?: number;
}

interface CategoryFormProps {
  category?: Partial<Category>;
  onSubmit: (data: Partial<Category>) => Promise<void>;
}

export default function CategoryForm({ category, onSubmit }: CategoryFormProps) {
  const [formData, setFormData] = useState<Partial<Category>>({
    name: category?.name || "",
    description: category?.description || "",
    parentId: category?.parentId || undefined,
  });

  const [errors, setErrors] = useState({ name: false });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? Number(value) : undefined,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name?.trim()) {
      setErrors((prev) => ({ ...prev, name: true }));
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        {category ? "Edit Category" : "New Transaction Category"}
      </h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">Category Name</label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm">Category name is required</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">Description</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">Parent Category</label>
        <input
          type="number"
          name="parentId"
          value={formData.parentId || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Parent Category ID (optional)"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        {category ? "Update" : "Create"} Category
      </button>
    </form>
  );
}
