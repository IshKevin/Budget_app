import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { syncUser } from "@/lib/auth/syncUser";

export async function syncUserMiddleware(req: NextRequest) {
  try {
    // Fetch user data from Kinde
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser) {
      return NextResponse.json({ error: "No user data found in Kinde." }, { status: 404 });
    }

    // Sync user with the database
    const result = await syncUser(kindeUser);
    return NextResponse.json({ message: "User synced successfully.", result }, { status: 200 });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}