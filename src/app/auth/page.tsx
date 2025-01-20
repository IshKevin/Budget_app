"use client";

import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function AuthPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-yellow-200 to-green-300">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-green-700">
          Welcome to WalletPro
        </h1>
        <p className="text-lg text-gray-700">
          Join us to manage your money . Sign up or Sign in to get started.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
              <LoginLink>
                 Log In
              </LoginLink>
          </button>
          <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition duration-300">
            <RegisterLink>
               Sign Up
            </RegisterLink>
          </button>
        </div>
      </div>
    </main>
  );
}
