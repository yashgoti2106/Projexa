import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { saveProjectProfile } from '../lib/db';
import { ProgressIndicator } from '../components/ui/ProgressIndicator';
import { SelectionCard } from '../components/ui/SelectionCard';
import type { DiscoveryProfile } from '../types/project';

const steps = ["Stream", "Domain", "Problem", "Type", "Time", "Summary"];

const streams = [
  "Computer Science / IT",
  "Artificial Intelligence & ML",
  "Data Science",
  "Cybersecurity",
  "Electronics / IoT",
  "Mechanical",
  "Civil",
  "Other"
];

const domains = ["Healthcare", "Education", "Agriculture", "Finance", "Environment", "Disaster Management", "Cybersecurity", "Smart Cities", "Social Impact", "Business", "Productivity"];

const problemTypes = [
  { id: "Prediction", desc: "Predict future outcomes from data." },
  { id: "Detection", desc: "Detect problems, anomalies, or events." },
  { id: "Automation", desc: "Reduce repetitive manual work." },
  { id: "Recommendation", desc: "Help users make better decisions." },
  { id: "Monitoring", desc: "Track something continuously." },
  { id: "Optimization", desc: "Make an existing process more efficient." },
  { id: "Analytics", desc: "Turn data into useful insights." },
  { id: "Decision Support", desc: "Help people make informed decisions." }
];

const projectTypes = [
  "AI / ML System",
  "Web Application",
  "Mobile Application",
  "Data Analytics Platform",
  "IoT System",
  "Cybersecurity System",
  "Research-oriented Project",
  "Hybrid System"
];

export const DiscoverGuided: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [profileId, setProfileId] = useState<string | undefined>(undefined);
  
  const [profile, setProfile] = useState<DiscoveryProfile>({
    stream: "",
    domains: [],
    problemTypes: [],
    projectTypes: [],
    timeframe: "",
    complexity: ""
  });

  const updateProfile = (updates: Partial<DiscoveryProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const toggleArrayItem = (key: keyof DiscoveryProfile, item: string) => {
    setProfile(prev => {
      const arr = prev[key] as string[];
      if (arr.includes(item)) {
        return { ...prev, [key]: arr.filter(i => i !== item) };
      } else {
        return { ...prev, [key]: [...arr, item] };
      }
    });
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
        mode: 'guided',
        discoveryProfile: profile,
      }, profileId);
      setProfileId(newId);
      navigate('/discover/results', { state: { profileData: { mode: 'guided', discoveryProfile: profile } } });
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
              <h2 className="text-2xl font-bold text-slate-900 mb-2">What is your academic stream?</h2>
              <p className="text-slate-600 mb-6">This helps us align the project with your degree requirements.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {streams.map((stream) => (
                  <SelectionCard
                    key={stream}
                    title={stream}
                    selected={profile.stream === stream}
                    onClick={() => updateProfile({ stream })}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Which area would you like your project to impact?</h2>
              <p className="text-slate-600 mb-6">Select one or more domains that interest you.</p>
              <div className="flex flex-wrap gap-3">
                {domains.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => toggleArrayItem('domains', domain)}
                    className={`px-4 py-2 rounded-xl border-2 font-medium transition-colors ${
                      profile.domains.includes(domain) 
                        ? 'border-purple-600 bg-purple-50 text-purple-800' 
                        : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300'
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">What kind of problem would you like to solve?</h2>
              <p className="text-slate-600 mb-6">Choose one or more problem types.</p>
              <div className="grid gap-3">
                {problemTypes.map((pt) => (
                  <SelectionCard
                    key={pt.id}
                    title={pt.id}
                    description={pt.desc}
                    selected={profile.problemTypes.includes(pt.id)}
                    onClick={() => toggleArrayItem('problemTypes', pt.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">What would you like to build?</h2>
              <p className="text-slate-600 mb-6">Choose the format of your project.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {projectTypes.map((type) => (
                  <SelectionCard
                    key={type}
                    title={type}
                    selected={profile.projectTypes.includes(type)}
                    onClick={() => {
                      // Allow only one primary project type for simplicity, or toggle. Let's do single select here.
                      updateProfile({ projectTypes: [type] });
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">How much time do you have?</h2>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {["1 month", "2–3 months", "3–6 months", "6+ months"].map((time) => (
                  <SelectionCard
                    key={time}
                    title={time}
                    selected={profile.timeframe === time}
                    onClick={() => updateProfile({ timeframe: time })}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">What level are you comfortable with?</h2>
              <div className="grid gap-3">
                <SelectionCard
                  title="Basic"
                  selected={profile.complexity === "Basic"}
                  onClick={() => updateProfile({ complexity: "Basic" })}
                />
                <SelectionCard
                  title="Medium"
                  selected={profile.complexity === "Medium"}
                  onClick={() => updateProfile({ complexity: "Medium" })}
                />
                <SelectionCard
                  title="Advanced"
                  selected={profile.complexity === "Advanced"}
                  onClick={() => updateProfile({ complexity: "Advanced" })}
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Your Discovery Profile</h2>
              <p className="text-slate-600 mt-2">Your profile is ready. We can now generate projects tailored for you.</p>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Stream</h4>
                  <p className="text-slate-800 font-medium">{profile.stream}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Project Type</h4>
                  <p className="text-slate-800 font-medium">{profile.projectTypes[0] || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Time</h4>
                  <p className="text-slate-800 font-medium">{profile.timeframe}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Complexity</h4>
                  <p className="text-slate-800 font-medium">{profile.complexity}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Domains</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.domains.map(d => (
                    <span key={d} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm font-medium">{d}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Problem Types</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.problemTypes.map(pt => (
                    <span key={pt} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm font-medium">{pt}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 0) return !profile.stream;
    if (currentStep === 1) return profile.domains.length === 0;
    if (currentStep === 2) return profile.problemTypes.length === 0;
    if (currentStep === 3) return profile.projectTypes.length === 0;
    if (currentStep === 4) return !profile.timeframe || !profile.complexity;
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
              className="px-8 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {isSaving ? 'Saving...' : 'Discover My Projects'} <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
