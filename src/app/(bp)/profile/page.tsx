import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Card } from "@/components/ui/card"; // Import Card from ShadCN
import { Avatar } from "@/components/ui/avatar"; // Import Avatar from ShadCN

export default async function ProfilePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg space-y-6">
        <div className="flex justify-center">
          <Avatar
            src={"/assets/avatar.jpg"} // Replace with dynamic image if available
            alt="User Avatar"
            className="w-32 h-32 border-4 border-green-400"
          />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-green-700">
            {user?.given_name} {user?.family_name}
          </h1>
          <p className="text-lg text-gray-600">{user?.email}</p>
          <p className="text-sm text-gray-500">User name: {user?.username || "Not Available"}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-medium text-green-700">Personal Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Full Name</span>
              <span className="text-gray-700">{user?.given_name} {user?.family_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email</span>
              <span className="text-gray-700">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Username</span>
              <span className="text-gray-700">{user?.username || "Not Available"}</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
            Edit Profile
          </button>
        </div>
      </Card>
    </main>
  );
}
