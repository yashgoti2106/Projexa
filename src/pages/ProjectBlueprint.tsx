import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, RefreshCw, Layers, Layout, Server, Database, Cloud, CheckCircle2, Milestone } from 'lucide-react';
import { generateProjectBlueprint } from '../services/ai/projectIntelligenceService';

export const ProjectBlueprint: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;

  const [blueprint, setBlueprint] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!project) {
      navigate('/discover/results');
    } else if (!blueprint && !loading) {
      generateBlueprint();
    }
  }, [project]);

  const generateBlueprint = async (refinement?: string) => {
    setLoading(true);
    setError('');
    try {
      const result = await generateProjectBlueprint(project, refinement);
      setBlueprint(result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate blueprint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    generateBlueprint(feedback);
  };

  if (!project) return null;

  return (
    <div className="flex-grow bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200 sticky top-16 z-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Project
          </button>
          
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              value={feedback} 
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Refinement constraints (optional)..." 
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              onClick={handleRegenerate}
              disabled={loading}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-xl hover:bg-indigo-200 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> 
              {loading ? 'Generating...' : 'Regenerate'}
            </button>
            <button 
              disabled={loading || !blueprint}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> Save Blueprint
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {loading && !blueprint ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-slate-800">Architecting your project...</h2>
            <p className="text-slate-500 mt-2">Generating features, architecture, and milestones.</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200 text-center">
            <p className="font-medium">{error}</p>
            <button onClick={() => generateBlueprint()} className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors">
              Try Again
            </button>
          </div>
        ) : blueprint ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{project.title} - Blueprint</h2>
              <textarea 
                className="w-full h-24 p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 resize-none"
                value={blueprint.overview}
                onChange={(e) => setBlueprint({...blueprint, overview: e.target.value})}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-500" /> Key Features
                </h3>
                <ul className="space-y-2">
                  {blueprint.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layout className="w-5 h-5 text-purple-500" /> User Stories
                </h3>
                <div className="space-y-3">
                  {blueprint.userStories.map((us: any, i: number) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm">
                      <span className="font-bold text-slate-800">As a {us.role}, </span>
                      <span className="text-slate-600">I want to {us.action}, </span>
                      <span className="italic text-slate-500">so that {us.benefit}.</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
                <Server className="w-5 h-5 text-blue-500" /> Architecture Diagram
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex flex-col items-center text-center gap-2">
                  <Layout className="w-8 h-8 text-blue-600" />
                  <span className="font-bold text-blue-900 text-sm">Frontend</span>
                  <p className="text-xs text-blue-700">{blueprint.architecture.frontend}</p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl flex flex-col items-center text-center gap-2">
                  <Server className="w-8 h-8 text-purple-600" />
                  <span className="font-bold text-purple-900 text-sm">Backend</span>
                  <p className="text-xs text-purple-700">{blueprint.architecture.backend}</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex flex-col items-center text-center gap-2">
                  <Database className="w-8 h-8 text-green-600" />
                  <span className="font-bold text-green-900 text-sm">Database</span>
                  <p className="text-xs text-green-700">{blueprint.architecture.database}</p>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-col items-center text-center gap-2">
                  <Cloud className="w-8 h-8 text-amber-600" />
                  <span className="font-bold text-amber-900 text-sm">Infrastructure</span>
                  <p className="text-xs text-amber-700">{blueprint.architecture.infrastructure}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-4">
                {blueprint.technologyStack.map((stack: any, i: number) => (
                  <div key={i} className="flex-1 min-w-[200px] p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-2">{stack.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {stack.technologies.map((t: string, j: number) => (
                        <span key={j} className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Milestone className="w-5 h-5 text-red-500" /> Development Roadmap
              </h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200">
                {blueprint.milestones.map((ms: any, i: number) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                      {i + 1}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-900">{ms.title}</h4>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{ms.duration}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{ms.description}</p>
                      <ul className="space-y-1">
                        {ms.tasks.map((task: string, j: number) => (
                          <li key={j} className="text-xs text-slate-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span> {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectBlueprint;
