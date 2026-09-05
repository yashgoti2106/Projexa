import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, ShieldAlert, Zap, BookOpen, Target, CheckCircle2, LayoutList, Layers } from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;

  if (!project) {
    navigate('/discover/results');
    return null;
  }

  return (
    <div className="flex-grow bg-slate-50">
      {/* Header Banner */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/projects/blueprint', { state: { project } })}
              className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Zap className="w-4 h-4" /> Generate Blueprint
            </button>
            <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
              <Save className="w-4 h-4" /> Save Project
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Title Section */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-slate-200 text-slate-800 rounded-lg text-sm font-bold">{project.domain}</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-bold">{project.projectType}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{project.title}</h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">{project.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Fit Explanation */}
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" /> Why this fits you
              </h2>
              <p className="text-slate-700 leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                {project.fitScore.explanation}
              </p>
            </section>

            {/* Overview */}
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">The Problem</h3>
                <p className="text-slate-600">{project.problemStatement}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Proposed Solution</h3>
                <p className="text-slate-600">{project.proposedSolution}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Target Users</h3>
                <p className="text-slate-600">{project.targetUsers}</p>
              </div>
            </section>

            {/* Scope */}
            <section className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <LayoutList className="w-5 h-5 text-green-600" /> MVP Scope
                </h3>
                <ul className="space-y-3">
                  {project.mvp.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-600" /> Future Scope
                </h3>
                <ul className="space-y-3">
                  {project.futureScope.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-center mb-6">
                <div className="text-5xl font-extrabold text-blue-400 mb-1">{project.fitScore.overall}%</div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Overall Fit Score</div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center"><span className="text-slate-300">Skill Match</span> <span className="font-bold">{project.fitScore.skillMatch}%</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-300">Interest Match</span> <span className="font-bold">{project.fitScore.interestMatch}%</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-300">Time Feasibility</span> <span className="font-bold">{project.fitScore.timeFeasibility}%</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-300">Learning Value</span> <span className="font-bold">{project.fitScore.learningValue}%</span></div>
              </div>
            </div>

            {/* Reality Check */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <ShieldAlert className="w-4 h-4 text-amber-500" /> Reality Check
              </h3>
              <div className="space-y-4 text-sm">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Status</span>
                  <span className="font-bold text-slate-800">{project.realityCheck.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Duration</span>
                    <span className="font-medium text-slate-800">{project.realityCheck.duration}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Team</span>
                    <span className="font-medium text-slate-800">{project.realityCheck.teamSize}</span>
                  </div>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Recommendation</span>
                  <p className="text-slate-700">{project.realityCheck.recommendation}</p>
                </div>
              </div>
            </div>

            {/* Novelty */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-amber-500" /> Novelty Check
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Level</span>
                  <span className="font-bold text-slate-800">{project.novelty.level}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Differentiation</span>
                  <p className="text-slate-700">{project.novelty.differentiation}</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <span className="block text-xs font-bold text-amber-600 uppercase mb-1">Suggested USP</span>
                  <p className="text-amber-900 font-medium">{project.novelty.suggestedUSP}</p>
                </div>
              </div>
            </div>

            {/* Skills Map */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-blue-500" /> Skill Requirements
              </h3>
              
              <div className="space-y-4">
                {project.skills.alreadyHave?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Already Have</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.skills.alreadyHave.map((s: string) => <span key={s} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium border border-green-200">{s}</span>)}
                    </div>
                  </div>
                )}
                
                {project.skills.needImprovement?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Need Improvement</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.skills.needImprovement.map((s: string) => <span key={s} className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs font-medium border border-amber-200">{s}</span>)}
                    </div>
                  </div>
                )}
                
                {project.skills.needToLearn?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Need to Learn</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.skills.needToLearn.map((s: string) => <span key={s} className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-medium border border-red-200">{s}</span>)}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
