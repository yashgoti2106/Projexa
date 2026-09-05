import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Dna, Compass, Lightbulb } from 'lucide-react';

export const Discover: React.FC = () => {
  return (
    <div className="flex-grow p-4 md:p-8 max-w-4xl mx-auto w-full">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>
      
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">How would you like to start?</h1>
        <p className="text-slate-600">Choose the path that best fits your current situation.</p>
      </div>

      <div className="space-y-4">
        <Link to="/discover/dna" className="block bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-md transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Dna className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Build My Project DNA</h3>
              <p className="text-slate-600 text-sm">I know my skills, interests, and goals. Recommend a project that matches my exact profile.</p>
            </div>
          </div>
        </Link>
        
        <Link to="/discover/guided" className="block bg-white border border-slate-200 rounded-2xl p-6 hover:border-purple-400 hover:shadow-md transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Help Me Discover</h3>
              <p className="text-slate-600 text-sm">I have no idea what to build. Guide me through themes and streams to find inspiration.</p>
            </div>
          </div>
        </Link>
        
        <Link to="/discover/validate" className="block bg-white border border-slate-200 rounded-2xl p-6 hover:border-amber-400 hover:shadow-md transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Validate My Idea</h3>
              <p className="text-slate-600 text-sm">I already have a project idea. Let's see if it's feasible, novel, and what I need to build it.</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
