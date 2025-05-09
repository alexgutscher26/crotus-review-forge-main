import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  redirectPath?: string;
}

/**
 * ProtectedRoute component that checks user authentication and redirects accordingly.
 *
 * This component uses the `useAuth` hook to determine if a user is authenticated,
 * loading, or has completed onboarding. Based on these conditions, it either renders
 * the child routes or redirects the user to different paths.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  redirectPath = '/login' 
}) => {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-crotus-purple"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  // If user is authenticated but hasn't completed onboarding (no username set)
  // and isn't already on the onboarding page, redirect to onboarding
  if (profile && !profile.username && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  // If authenticated and onboarded, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;