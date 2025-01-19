// src/app/(bp)/budget/BudgetForm.tsx
"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Budget {
  id?: number;
  name: string;
  categoryId: number;
  amount: number;
  startDate: string;
  endDate: string;
  notificationThreshold: number;
}

interface Category {
  id: number;
  name: string;
}

interface BudgetFormProps {
  budget?: Budget;
  categories: Category[];
  onSubmit: (data: Partial<Budget>) => Promise<void>;
}

export default function BudgetForm({ budget, categories, onSubmit }: BudgetFormProps) {
  const [formData, setFormData] = useState({
    name: budget?.name || "",
    categoryId: budget?.categoryId || 0,
    amount: budget?.amount || 0,
    startDate: budget?.startDate
      ? new Date(budget.startDate).toISOString().split("T")[0]
      : "",
    endDate: budget?.endDate
      ? new Date(budget.endDate).toISOString().split("T")[0]
      : "",
    notificationThreshold: budget?.notificationThreshold || 80,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "amount" || name === "notificationThreshold" || name === "categoryId"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const validateDates = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (end <= start) {
      setError("End date must be after start date.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateDates()) return;

    try {
      await onSubmit({
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      });

      if (!budget) {
        setFormData({
          name: "",
          categoryId: 0,
          amount: 0,
          startDate: "",
          endDate: "",
          notificationThreshold: 80,
        });
      }
    } catch (err) {
      setError("An error occurred while submitting the budget. Please try again.");
      console.error("Error submitting budget:", err);
    }
  };

  return (
    <TooltipProvider>
      <Card className="p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {budget ? "Edit Budget" : "Create New Budget"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 border border-red-300 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Budget Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Budget Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Monthly Groceries"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="grid gap-2">
            <Label htmlFor="categoryId">Category</Label>
            <Select
              value={formData.categoryId.toString()}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, categoryId: parseInt(value) }))
              }
            >
              <SelectTrigger id="categoryId">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="grid gap-2">
            <Label htmlFor="amount">Budget Amount</Label>
            <Input
              id="amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Dates */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Notification Threshold */}
          <div className="grid gap-2">
            <Label htmlFor="notificationThreshold">Alert Threshold (%)</Label>
            <Input
              id="notificationThreshold"
              type="number"
              name="notificationThreshold"
              value={formData.notificationThreshold}
              onChange={handleChange}
              min="1"
              max="100"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            {budget ? "Update Budget" : "Create Budget"}
          </Button>
        </form>
      </Card>
    </TooltipProvider>
  );
}
