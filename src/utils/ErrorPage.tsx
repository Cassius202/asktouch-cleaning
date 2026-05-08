'use client';

import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-8 p-10 bg-white rounded-2xl shadow-xl border border-gray-100">
        {/* Large Emoji or Icon */}
        <div className="text-6xl mb-4">😅</div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Oops!
          </h1>
          <p className="text-gray-500">
            Something went wrong or this page decided to take a break.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          {/* Go Back Logic fixed to router.back() */}
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </button>

          {/* Go Home */}
          <button 
            onClick={() => router.push('/')}
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}