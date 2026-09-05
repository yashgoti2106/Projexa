import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Dna } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { saveProjectProfile } from '../lib/db';
import { ProgressIndicator } from '../components/ui/ProgressIndicator';
import { TagInput } from '../components/ui/TagInput';
import { SelectionCard } from '../components/ui/SelectionCard';
import type { StudentProfile } from '../types/project';

const steps = ["Skills", "Interests", "Experience", "Time", "Goals", "Summary"];

const commonSkills = ["JavaScript", "Python", "Java", "C++", "React", "Node.js", "Firebase", "MongoDB", "SQL", "Machine Learning", "TensorFlow", "AWS", "Flutter", "Swift"];
const commonInterests = ["Healthcare", "Education", "Finance", "Environment", "Cybersecurity", "E-commerce", "Social Impact", "Entertainment", "Productivity", "IoT"];

export const DiscoverDNA: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [profileId, setProfileId] = useState<string | undefined>(undefined);
  
  const [profile, setProfile] = useState<StudentProfile>({
    skills: [],
    skillLevels: {},
    interests: [],
    experience: "",
    timeframe: "",
    complexity: "",
    learningGoals: []
  });

  const updateProfile = (updates: Partial<StudentProfile>) => {
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
        mode: 'dna',
        studentProfile: profile,
      }, profileId);
      setProfileId(newId);
      navigate('/discover/results', { state: { profileData: { mode: 'dna', studentProfile: profile } } });
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
              <h2 className="text-2xl font-bold text-slate-900 mb-2">What are your technical skills?</h2>
              <p className="text-slate-600 mb-6">List the programming languages, frameworks, and tools you already know.</p>
              <TagInput 
                tags={profile.skills} 
                onChange={(tags) => updateProfile({ skills: tags })} 
                suggestions={commonSkills}
                placeholder="e.g. React, Python, SQL..."
              />
            </div>
            
            {profile.skills.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Skill Proficiency (Optional)</h3>
                <div className="space-y-4">
                  {profile.skills.map(skill => (
                    <div key={skill} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="font-medium text-slate-800 mb-2 sm:mb-0">{skill}</span>
                      <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden text-sm">
                        {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => updateProfile({ 
                              skillLevels: { ...profile.skillLevels, [skill]: level as any } 
                            })}
                            className={`px-3 py-1.5 ${profile.skillLevels[skill] === level ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'} border-r border-slate-200 last:border-0`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">What areas interest you?</h2>
              <p className="text-slate-600 mb-6">Select or add problem domains you'd like to work in.</p>
              <TagInput 
                tags={profile.interests} 
                onChange={(tags) => updateProfile({ interests: tags })} 
                suggestions={commonInterests}
                placeholder="e.g. Healthcare, Education..."
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">What's your project experience?</h2>
              <p className="text-slate-600 mb-6">This helps us match the project scope to your capabilities.</p>
              <div className="grid gap-3">
                {[
                  "This is my first major project",
                  "I have built small projects",
                  "I have built multiple projects",
                  "I have experience with production-level apps"
                ].map((exp) => (
                  <SelectionCard
                    key={exp}
                    title={exp}
                    selected={profile.experience === exp}
                    onClick={() => updateProfile({ experience: exp })}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Available Time</h2>
              <p className="text-slate-600 mb-4">How much time do you have to complete this project?</p>
              <div className="grid grid-cols-2 gap-3">
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
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Preferred Complexity</h2>
              <p className="text-slate-600 mb-4">What level of challenge are you looking for?</p>
              <div className="grid gap-3">
                <SelectionCard
                  title="Basic"
                  description="I want something straightforward and manageable."
                  selected={profile.complexity === "Basic"}
                  onClick={() => updateProfile({ complexity: "Basic" })}
                />
                <SelectionCard
                  title="Medium"
                  description="I want a balanced academic project with some challenging components."
                  selected={profile.complexity === "Medium"}
                  onClick={() => updateProfile({ complexity: "Medium" })}
                />
                <SelectionCard
                  title="Advanced"
                  description="I want a technically challenging project."
                  selected={profile.complexity === "Advanced"}
                  onClick={() => updateProfile({ complexity: "Advanced" })}
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Learning Goals</h2>
              <p className="text-slate-600 mb-6">Are there specific technologies or concepts you want to learn through this project?</p>
              <TagInput 
                tags={profile.learningGoals} 
                onChange={(tags) => updateProfile({ learningGoals: tags })} 
                suggestions={["Machine Learning", "Cloud Deployment", "React Native", "GraphQL", "DevOps", "Microservices", "Data Engineering"]}
                placeholder="e.g. AWS, GraphQL, Mobile App Development..."
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Dna className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Your Project DNA</h2>
              <p className="text-slate-600 mt-2">Here is your unique profile based on your inputs.</p>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technical Strengths</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.length > 0 ? profile.skills.map(s => (
                    <span key={s} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm font-medium">{s}</span>
                  )) : <span className="text-slate-500 italic text-sm">None specified</span>}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Experience</h4>
                  <p className="text-slate-800 font-medium">{profile.experience || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Available Time</h4>
                  <p className="text-slate-800 font-medium">{profile.timeframe || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Complexity</h4>
                  <p className="text-slate-800 font-medium">{profile.complexity || "Not specified"}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.length > 0 ? profile.interests.map(i => (
                    <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm font-medium">{i}</span>
                  )) : <span className="text-slate-500 italic text-sm">None specified</span>}
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Learning Goals</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.learningGoals.length > 0 ? profile.learningGoals.map(g => (
                    <span key={g} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm font-medium">{g}</span>
                  )) : <span className="text-slate-500 italic text-sm">None specified</span>}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 0) return profile.skills.length === 0; // Or allow skip if needed
    if (currentStep === 1) return profile.interests.length === 0;
    if (currentStep === 2) return !profile.experience;
    if (currentStep === 3) return !profile.timeframe || !profile.complexity;
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
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {isSaving ? 'Saving...' : 'Find My Projects'} <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
