import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const ProjectWorkspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex-grow p-4 md:p-8 max-w-6xl mx-auto w-full">
      <Link to="/saved" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Saved Projects
      </Link>
      
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Project Workspace</h1>
        <p className="text-slate-600 mb-8">This area will contain your project's roadmap, fit score, skill gaps, and tasks.</p>
        
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg text-sm">
          <strong>Under Construction:</strong> The project workspace for project ID {id} will be implemented in future phases.
        </div>
      </div>
    </div>
  );
};
