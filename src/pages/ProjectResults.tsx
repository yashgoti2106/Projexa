import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshCw, CheckCircle2, ChevronRight, Zap, Target, BrainCircuit, Activity } from 'lucide-react';
import { generateProjectRecommendations } from '../services/ai/projectIntelligenceService';

export const ProjectResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);
  
  const profileData = location.state?.profileData;
  const isValidateMode = profileData?.mode === 'validate';

  useEffect(() => {
    if (!profileData) {
      navigate('/dashboard');
      return;
    }
    
    generateProjects();
  }, [profileData]);

  const generateProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateProjectRecommendations(profileData);
      setResults(data.projects);
    } catch (err: any) {
      setError(err.message || 'Failed to generate projects.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
          <BrainCircuit className="w-10 h-10 animate-bounce" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Analyzing your project profile...</h2>
        <div className="space-y-4 max-w-md mx-auto text-slate-600 font-medium">
          <p className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Understanding your skills and goals</p>
          <p className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Checking project feasibility and reality</p>
          <p className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Evaluating differentiation</p>
          <p className="flex items-center gap-3 text-blue-600"><RefreshCw className="w-5 h-5 animate-spin" /> Building personalized recommendations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl max-w-md w-full border border-red-100">
          <h2 className="text-xl font-bold mb-2">AI Service Unavailable</h2>
          <p className="mb-6">{error}</p>
          <button onClick={generateProjects} className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!results) return null;

  return (
    <div className="flex-grow p-4 md:p-8 max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {isValidateMode ? 'Your Validated Concept' : 'Your Project Recommendations'}
          </h1>
          <p className="text-slate-600">
            {isValidateMode 
              ? 'We evaluated your idea and prepared a refined, realistic project concept.' 
              : 'We matched these projects to your skills, interests, goals, and available time.'}
          </p>
        </div>
        <button onClick={generateProjects} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-lg transition-colors shadow-sm">
          <RefreshCw className="w-4 h-4" /> Regenerate
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {results.map((project: any, index: number) => (
          <div key={index} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3">
                {project.projectType}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{project.title}</h3>
              <p className="text-slate-600 text-sm line-clamp-3">{project.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="text-center p-2 bg-white rounded-lg border border-slate-200">
                <div className="text-2xl font-bold text-blue-600">{project.fitScore.overall}%</div>
                <div className="text-xs font-semibold text-slate-500 uppercase">Fit Score</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg border border-slate-200 flex flex-col justify-center">
                <div className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" /> {project.novelty.level}
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Novelty</div>
              </div>
            </div>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5"><Activity className="w-4 h-4" /> Reality</span>
                <span className="font-medium text-slate-900">{project.realityCheck.status}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5"><Target className="w-4 h-4" /> Difficulty</span>
                <span className="font-medium text-slate-900">{project.difficulty}</span>
              </div>
            </div>
            
            <div className="mt-auto space-y-3">
              <button 
                onClick={() => navigate('/projects/generated', { state: { project } })}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-medium py-3 rounded-xl hover:bg-slate-800 transition-colors"
              >
                View Project <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
