import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wallet, ChartBar, PieChart, Clock } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Smart Tracking",
      description: "Automatically categorize and track your daily expenses"
    },
    {
      icon: <ChartBar className="w-6 h-6" />,
      title: "Visual Analytics",
      description: "Beautiful charts to visualize your financial journey"
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Budget Planning",
      description: "Set and manage budgets with intelligent alerts"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Stay updated with instant transaction notifications"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="relative overflow-hidden">
       
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-10 sm:px-6 lg:px-8 lg:pt-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-extrabold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                  WalletPro
                </span>
                <br />
                <span className="text-4xl lg:text-5xl text-gray-900">
                  Your Personal Finance App
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-2xl">
                Simplify your financial management. Track transactions, manage
                budgets, and gain insights into your spending habits – all in one
                place.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/auth"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-150 ease-in-out"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/auth"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 ease-in-out"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
           
            <div className="flex-1 relative">
              <div className="relative w-full h-[400px] animate-float">
                <Image
                   src="/assets/logo.png" 
                  alt="App Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-white/50 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ease-in-out"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    
      <footer className="bg-white/30 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} WalletPro. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-600 hover:text-green-600 transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-green-600 transition">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-600 transition">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
