import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { saveProjectProfile } from '../lib/db';
import { ProgressIndicator } from '../components/ui/ProgressIndicator';
import { TagInput } from '../components/ui/TagInput';
import type { ExistingIdea } from '../types/project';

const steps = ["Idea", "Context", "Summary"];

export const DiscoverValidate: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [profileId, setProfileId] = useState<string | undefined>(undefined);
  
  const [profile, setProfile] = useState<ExistingIdea>({
    description: "",
    skills: [],
    timeframe: "",
    teamSize: "",
    complexity: ""
  });

  const updateProfile = (updates: Partial<ExistingIdea>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/discover');
    }
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      setIsSaving(true);
      const newId = await saveProjectProfile(user.uid, {
        mode: 'validate',
        existingIdea: profile,
      }, profileId);
      setProfileId(newId);
      navigate('/discover/results', { state: { profileData: { mode: 'validate', existingIdea: profile } } });
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Tell us about your project idea.</h2>
              <p className="text-slate-600 mb-6">Describe it in natural language. We'll evaluate its feasibility and give you a roadmap.</p>
              <textarea
                value={profile.description}
                onChange={(e) => updateProfile({ description: e.target.value })}
                placeholder="Example: An AI system that detects crop diseases from leaf images and helps farmers identify possible treatments."
                className="w-full h-48 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-slate-800"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold text-slate-900">Optional Context</h2>
              <button 
                onClick={handleNext}
                className="text-sm font-medium text-slate-500 hover:text-slate-900"
              >
                Skip Context
              </button>
            </div>
            <p className="text-slate-600 mb-6">Adding this information helps us analyze feasibility better.</p>
            
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Skills I already know</label>
                <TagInput 
                  tags={profile.skills} 
                  onChange={(tags) => updateProfile({ skills: tags })} 
                  placeholder="e.g. Python, React..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Available Time</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["1 month", "2–3 months", "3–6 months", "6+ months"].map(t => (
                    <button
                      key={t}
                      onClick={() => updateProfile({ timeframe: t })}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors border ${profile.timeframe === t ? 'border-amber-500 bg-amber-50 text-amber-800' : 'border-slate-200 text-slate-600 hover:border-amber-300 hover:bg-slate-50'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Team Size</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Individual", "2 members", "3–4 members", "5+ members"].map(t => (
                    <button
                      key={t}
                      onClick={() => updateProfile({ teamSize: t })}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors border ${profile.teamSize === t ? 'border-amber-500 bg-amber-50 text-amber-800' : 'border-slate-200 text-slate-600 hover:border-amber-300 hover:bg-slate-50'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Complexity</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Basic", "Medium", "Advanced"].map(c => (
                    <button
                      key={c}
                      onClick={() => updateProfile({ complexity: c })}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors border ${profile.complexity === c ? 'border-amber-500 bg-amber-50 text-amber-800' : 'border-slate-200 text-slate-600 hover:border-amber-300 hover:bg-slate-50'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Your Idea Summary</h2>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Idea</h4>
                <p className="text-slate-800 italic bg-white p-4 rounded-xl border border-slate-200">
                  "{profile.description}"
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Time</h4>
                  <p className="text-slate-800 font-medium">{profile.timeframe || "Any"}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Team</h4>
                  <p className="text-slate-800 font-medium">{profile.teamSize || "Any"}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Complexity</h4>
                  <p className="text-slate-800 font-medium">{profile.complexity || "Any"}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Skills</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.skills.length > 0 ? profile.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 text-xs font-medium">{s}</span>
                    )) : <span className="text-slate-500 text-sm">None</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 0) return profile.description.trim().length < 10;
    return false;
  };

  return (
    <div className="flex-grow p-4 md:p-8 max-w-3xl mx-auto w-full flex flex-col">
      <div className="mb-8 pt-8 pb-4 sticky top-16 bg-slate-50 z-10">
        <ProgressIndicator totalSteps={steps.length} currentStep={currentStep} labels={steps.map(s => s.substring(0,4))} />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm mb-24 min-h-[400px]">
        {renderStepContent()}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 z-20">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <button
            onClick={handleBack}
            className="px-6 py-3 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> {currentStep === 0 ? 'Cancel' : 'Back'}
          </button>
          
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={isNextDisabled()}
              className="px-8 py-3 bg-amber-600 text-white font-medium rounded-xl hover:bg-amber-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {isSaving ? 'Saving...' : 'Analyze My Idea'} <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
