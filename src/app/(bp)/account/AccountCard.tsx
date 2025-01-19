type AccountType = 'BANK' | 'WALLET';

type Account = {
  id: string;
  name: string;
  currency: string;
  balance: number;
  description?: string;
  type: AccountType;
  kindeId: string;
};

type AccountCardProps = {
  account: Account;
};

export function AccountCard({ account }: AccountCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-green-900">
            {account.name}
          </h3>
          <div className="flex gap-4">
            <div>
              <p className="text-xs text-green-600 uppercase">Currency</p>
              <p className="text-sm font-medium text-green-800">{account.currency}</p>
            </div>
            <div>
              <p className="text-xs text-green-600 uppercase">Balance</p>
              <p className="text-sm font-medium text-green-800">
                {new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: account.currency
                }).format(account.balance)}
              </p>
            </div>
          </div>
          {account.description && (
            <p className="text-sm text-green-700 mt-2">{account.description}</p>
          )}
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium
          ${account.type === 'BANK' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
          {account.type}
        </span>
      </div>
    </div>
  );
}