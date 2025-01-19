import { BellRing, CheckCircle, AlertCircle } from "lucide-react"; 
import { Card } from "@/components/ui/card"; 
import { Avatar } from "@/components/ui/avatar";

export default function NotificationPage() {
  // back and to be done when i get timeeeee
  const notifications = [
    {
      id: 1,
      type: "success",
      message: "Your profile has been updated successfully.",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "info",
      message: "You have a new message from support.",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "error",
      message: "Failed to save your recent settings. Try again later.",
      time: "1 day ago",
    },
  ];

  
  const renderIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500 w-6 h-6" />;
      case "info":
        return <BellRing className="text-blue-500 w-6 h-6" />;
      case "error":
        return <AlertCircle className="text-red-500 w-6 h-6" />;
      default:
        return <BellRing className="text-gray-500 w-6 h-6" />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl p-6 bg-white shadow-xl rounded-lg space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-green-700">Notifications</h1>
          <Avatar className="w-10 h-10 border-2 border-green-400">
            <img src="./assets/avatar.jpg" alt="User Avatar" className="w-full h-full rounded-full" />
          </Avatar>
        </div>

        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition transform hover:scale-105"
            >
              <div className="mr-4">{renderIcon(notification.type)}</div>

              <div className="flex-1">
                <p className="text-gray-800 font-medium">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition">
            View All Notifications
          </button>
        </div>
      </Card>
    </main>
  );
}
