/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getHomeData } from "@/lib/queries/homeQueries";
import HomePage from "./HomeData";



export const revalidate = 300;

export default async function Home() {
  const { getUser } = getKindeServerSession();
  // @ts-ignore
  const user = await getUser() as User;

  if (!user?.id) {
    return <h2 className="text-2xl mb-2">Please log in to continue</h2>;
  }

  try {
    const {
      accounts,
      recentTransactions,
      budgets,
      categories,
      categorySpending,
    } = await getHomeData(user.id);

    
    return (
      <HomePage 
      user={user}
      accounts={accounts.map(account => ({ ...account, balance: parseFloat(account.balance) }))}
      // @ts-ignore
      transactions={recentTransactions.map(({ id, amount, date, description }) => ({ id, amount, date, description }))}
      budgets={budgets}
      categories={categories}
      categorySpending={categorySpending.map(({ name, total }) => ({ name, value: total }))}
      />
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return <div>Error loading dashboard</div>;
  }
}