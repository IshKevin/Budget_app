import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { syncUser } from "@/lib/auth/syncUser";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Fetch user data from Kinde
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser) {
      return res.status(404).json({ error: "No user data found in Kinde." });
    }

    // Sync user with the database
    const result = await syncUser(kindeUser);
    return res.status(200).json({ message: "User synced successfully.", result });
  } catch (error) {
    console.error("Error syncing user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
