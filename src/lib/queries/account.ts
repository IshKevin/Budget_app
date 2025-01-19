/* eslint-disable @typescript-eslint/ban-ts-comment */
import { db } from "@/db";
import { accounts } from "@/db/schema";
import { eq } from "drizzle-orm";



export type Account = {

  id: number;

  kindeId: string;

  name: string;

  type: "BANK" | "OTHER" | "MOBILE_MONEY" | "CASH";

  currency: string;

  balance: number;

  description?: string;

  createdAt: Date;

  updatedAt: Date;

};

export const getAccounts = async (kindeId: string) => {
  return await db
    .select()
    .from(accounts)
    .where(eq(accounts.kindeId, kindeId));
};

export const createAccount = async (data: {
  kindeId: string;
  name: string;
  type: "BANK" | "MOBILE_MONEY" | "CASH";
  balance: number;
  currency: string;
  description?: string;
}) => {
  return await db.insert(accounts).values({ ...data, balance: data.balance.toString() });
};

export const updateAccount = async (id: number, data: Partial<Account>) => {
  return await db
    .update(accounts)
    // @ts-ignore
    .set(data)
    .where(eq(accounts.id, id));
};