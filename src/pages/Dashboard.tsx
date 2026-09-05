import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Dna, Compass, Lightbulb, ArrowRight } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Dummy data for phase A
  const hasSavedProjects = false;

  return (
    <div className="flex-grow p-4 md:p-8 max-w-6xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.displayName?.split(' ')[0]}</h1>
        <p className="text-slate-600 mt-2">Ready to continue your project journey?</p>
      </div>

      {!hasSavedProjects ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 text-center mb-10 shadow-sm">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Compass className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Your project journey starts here.</h2>
          <p className="text-slate-600 max-w-lg mx-auto mb-8">
            Tell us what you know, what interests you, or bring us an idea you've already created.
          </p>
          <Link to="/discover" className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
            Start Exploring <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Recent Projects</h2>
            <Link to="/saved" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {/* Saved projects list would go here */}
        </div>
      )}

      <h2 className="text-xl font-bold text-slate-900 mb-6">Start a New Journey</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/discover/dna" className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group cursor-pointer block">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Dna className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Build My Project DNA</h3>
          <p className="text-sm text-slate-500">Find projects that match your exact skills and interests.</p>
        </Link>
        
        <Link to="/discover/guided" className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all group cursor-pointer block">
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Help Me Discover</h3>
          <p className="text-sm text-slate-500">Get guided recommendations based on your stream.</p>
        </Link>
        
        <Link to="/discover/validate" className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all group cursor-pointer block">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Validate My Idea</h3>
          <p className="text-sm text-slate-500">Evaluate your existing idea for feasibility and get a roadmap.</p>
        </Link>
      </div>
    </div>
  );
};
