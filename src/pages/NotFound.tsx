import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col flex-grow items-center justify-center p-4 text-center">
      <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-12">
        <span className="font-bold text-3xl">404</span>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Page not found</h1>
      <p className="text-slate-600 max-w-md mx-auto mb-8">
        We couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link to="/" className="inline-flex items-center gap-2 bg-slate-900 text-white font-medium px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Return Home
      </Link>
    </div>
  );
};
