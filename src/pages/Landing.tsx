import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowRight, Compass, Dna, Lightbulb, Code2, GraduationCap, Presentation, Search } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Landing: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col flex-grow">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 md:pt-32 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          From Project Confusion to <span className="text-blue-600">Project Confidence.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Your AI Project Mentor for discovering, validating, learning, and building the right final-year project.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            Find My Project <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 font-medium rounded-xl hover:bg-slate-50 transition-colors">
            Validate My Idea
          </Link>
        </div>
        <p className="mt-8 text-sm text-slate-500 max-w-md mx-auto">
          Discover a project that fits your skills, understand what you need to learn, and get a practical roadmap to build it.
        </p>
      </section>

      {/* How it Works Section */}
      <section className="bg-white border-y border-slate-200 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Complete Journey</h2>
            <p className="text-slate-600 max-w-xl mx-auto">We don't just give you an idea. We guide you from concept to defense.</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-center text-slate-500 font-medium text-sm md:text-base">
            <div className="flex items-center gap-2 text-slate-800"><Search className="w-5 h-5" /> Discover</div>
            <ArrowRight className="w-4 h-4 hidden sm:block text-slate-300" />
            <div className="flex items-center gap-2 text-slate-800"><Lightbulb className="w-5 h-5" /> Validate</div>
            <ArrowRight className="w-4 h-4 hidden md:block text-slate-300" />
            <div className="flex items-center gap-2 text-slate-800"><GraduationCap className="w-5 h-5" /> Learn</div>
            <ArrowRight className="w-4 h-4 hidden sm:block text-slate-300" />
            <div className="flex items-center gap-2 text-slate-800"><Code2 className="w-5 h-5" /> Build</div>
            <ArrowRight className="w-4 h-4 hidden md:block text-slate-300" />
            <div className="flex items-center gap-2 text-slate-800"><Presentation className="w-5 h-5" /> Defend</div>
          </div>
        </div>
      </section>

      {/* Three Ways to Start Section */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Three Ways to Start</h2>
          <p className="text-slate-600 max-w-xl mx-auto">Whether you have a clear vision or are completely lost, we have a path for you.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Dna className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Build My Project DNA</h3>
            <p className="text-slate-600">I know my skills and interests, but I need a project that perfectly matches my profile.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Help Me Discover</h3>
            <p className="text-slate-600">I don't know what project I should build. Guide me through options based on my stream.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Validate My Idea</h3>
            <p className="text-slate-600">I already have a project idea. Help me evaluate its feasibility and create a roadmap.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
