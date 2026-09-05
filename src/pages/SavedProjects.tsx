import React from 'react';
import { Link } from 'react-router-dom';
import { FolderHeart, ArrowLeft, Plus } from 'lucide-react';

export const SavedProjects: React.FC = () => {
  return (
    <div className="flex-grow p-4 md:p-8 max-w-6xl mx-auto w-full">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Saved Projects</h1>
          <p className="text-slate-600 mt-1">Your personal collection of project ideas and roadmaps.</p>
        </div>
        <Link to="/discover" className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FolderHeart className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">You haven't saved any projects yet.</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-6">
          When you discover or validate a project idea, you can save it here to track your progress and roadmap.
        </p>
        <Link to="/discover" className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 font-medium px-6 py-2 rounded-lg hover:bg-slate-50 transition-colors">
          Start Exploring
        </Link>
      </div>
    </div>
  );
};
