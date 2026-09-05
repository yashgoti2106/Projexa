import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, LayoutDashboard, Search, FolderHeart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={user ? '/dashboard' : '/'} className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">Project Mentor</span>
        </Link>
        
        {user ? (
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/discover" className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4" /> Find Project
              </Link>
              <Link to="/saved" className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2">
                <FolderHeart className="w-4 h-4" /> Saved
              </Link>
            </div>
            
            <div className="flex items-center space-x-4 border-l border-slate-200 pl-4">
              <span className="text-sm font-medium text-slate-700 hidden sm:block">{user.displayName}</span>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Sign In
            </Link>
            <Link to="/login" className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
