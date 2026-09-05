import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Project Mentor. Empowering students to build better.</p>
        </div>
      </footer>
    </div>
  );
};
