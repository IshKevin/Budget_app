import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createAccount } from "@/lib/queries/account";
import AccountForm from "@/app/(bp)/account/AccountForm";

export default async function AccountsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    return <h2 className="text-2xl mb-2">Please log in to continue</h2>;
  }

  try {

    return (
      <div className="">
       

        <div>
          <AccountForm
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSubmit={async (data: { balance: string; currency: string; type: any; kindeId?: string; name?: string; description?: string | undefined; }) => {
              'use server';
              if (!user?.id) return;
              await createAccount({
                ...data,
                kindeId: user.id,
                balance: Number(data.balance) || 0,
                currency: data.currency || 'USD',
                type: data.type || 'BANK',
                name: data.name || 'Default Name'
              });
            }}
          />
        </div>
      </div>
    );
  } catch (e) {
      throw e;
  }
}
