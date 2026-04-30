// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 rounded-full mb-6">
            <span className="text-5xl">🔍</span>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Page not found</h2>
        <p className="text-gray-500 mb-8 max-w-md">
         {` Sorry, we couldn't find the page you're looking for.`}
        </p>
        
        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}