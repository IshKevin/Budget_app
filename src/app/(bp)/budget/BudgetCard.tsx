/* eslint-disable @typescript-eslint/ban-ts-comment */
type Budget = {
  id: number;
  name: string;
  categoryId: number;
  amount: number;
  startDate: Date;
  endDate: Date;
  notificationThreshold: number;
  kindeId: string;
};

type Category = {
  id: number;
  name: string;
  kindeId: string;
};

type BudgetCardProps = {
  budget: Budget;
  category?: Category;
};

export function BudgetCard({ budget, category }: BudgetCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-green-900">
            {budget.name}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-green-600 uppercase">Category</p>
              <p className="text-sm font-medium text-green-800">
                {category?.name || `Category ${budget.categoryId}`}
              </p>
            </div>
            <div>
              <p className="text-xs text-green-600 uppercase">Amount</p>
              <p className="text-sm font-medium text-green-800">
                {new Intl.NumberFormat('en-UK', {
                  style: 'currency',
                  currency: 'RWF'
                }).format(budget.amount)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-green-600 uppercase">Start Date</p>
              <p className="text-sm font-medium text-green-800">
                {new Date(budget.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-green-600 uppercase">End Date</p>
              <p className="text-sm font-medium text-green-800">
                {new Date(budget.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
