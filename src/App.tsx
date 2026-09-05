import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { MainLayout } from './layouts/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Discover } from './pages/Discover';
import { DiscoverDNA } from './pages/DiscoverDNA';
import { DiscoverGuided } from './pages/DiscoverGuided';
import { DiscoverValidate } from './pages/DiscoverValidate';
import { ProjectResults } from './pages/ProjectResults';
import { ProjectDetail } from './pages/ProjectDetail';
import { SavedProjects } from './pages/SavedProjects';
import { ProjectBlueprint } from './pages/ProjectBlueprint';
import { ProjectWorkspace } from './pages/ProjectWorkspace';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/discover/dna" element={<DiscoverDNA />} />
              <Route path="/discover/guided" element={<DiscoverGuided />} />
              <Route path="/discover/validate" element={<DiscoverValidate />} />
              <Route path="/discover/results" element={<ProjectResults />} />
              <Route path="/saved" element={<SavedProjects />} />
              <Route path="/projects/generated" element={<ProjectDetail />} />
              <Route path="/projects/blueprint" element={<ProjectBlueprint />} />
              <Route path="/projects/:id" element={<ProjectWorkspace />} />
              <Route path="/projects/:id/*" element={<ProjectWorkspace />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
