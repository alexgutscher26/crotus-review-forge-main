import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MessageCircle, Mail, Download, Heart, Star, ArrowRight, Key, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  path: string;
  isNew?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, path, isNew }) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <Link 
      to={path} 
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
        isActive 
          ? "text-crotus-dark-purple bg-crotus-light-purple/20" 
          : "text-gray-600 hover:text-crotus-dark-purple hover:bg-crotus-light-purple/10"
      )}
    >
      {icon}
      <span>{label}</span>
      {isNew && (
        <span className="ml-auto flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-crotus-light-purple text-crotus-dark-purple">
          New <span className="ml-1">🎉</span>
        </span>
      )}
    </Link>
  );
};

const NavSection: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => {
  return (
    <div className="mb-8">
      <h3 className="mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

const DashboardSidebar: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign out',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      {/* Fixed sidebar */}
      <aside className="w-64 border-r bg-white h-screen flex flex-col fixed left-0 top-0 z-30">
        {/* Logo/header - fixed at top */}
        <div className="p-4 flex items-center gap-2 border-b shrink-0">
          <span className="text-xl font-bold text-gray-800">crotus</span>
        </div>
        
        {/* Navigation content - scrollable */}
        <div className="flex-1 overflow-y-auto py-6 px-2">
          <NavSection title="Collect">
            <NavItem 
              icon={<MessageCircle className="w-5 h-5" />} 
              label="Collection Page" 
              path="/dashboard/collection" 
            />
            <NavItem 
              icon={<Mail className="w-5 h-5" />} 
              label="Automated Emails" 
              path="/dashboard/emails" 
            />
            <NavItem 
              icon={<Download className="w-5 h-5" />} 
              label="Import Review" 
              path="/dashboard/import" 
              isNew={true}
            />
          </NavSection>
          
          <NavSection title="Manage">
            <NavItem 
              icon={<Heart className="w-5 h-5" />} 
              label="My reviews" 
              path="/dashboard/reviews" 
            />
          </NavSection>

          <NavSection title="Export">
            <NavItem 
              icon={<Star className="w-5 h-5" />} 
              label="Wall of Love" 
              path="/dashboard/wall" 
              isNew={true}
            />
            <NavItem 
              icon={<ArrowRight className="w-5 h-5" />} 
              label="Single Review - soon :)" 
              path="/dashboard/single" 
            />
          </NavSection>

          <NavSection title="Automate">
            <NavItem 
              icon={<Key className="w-5 h-5" />} 
              label="API Key" 
              path="/dashboard/api" 
            />
          </NavSection>
          
          {/* Navigation sections end here */}
        </div>

        {/* User profile and logout - fixed at bottom */}
        <div className="p-4 border-t bg-white shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-crotus-light-purple flex items-center justify-center text-crotus-dark-purple">
              {profile?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{profile?.username || user?.email}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center gap-2"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>
      
      {/* Spacer to push content away from sidebar */}
      <div className="w-64 flex-shrink-0"></div>
    </>
  );
};

export default DashboardSidebar;

// Example of how to use this sidebar in a layout
export const DashboardLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 ml-64">
        <div className="container mx-auto py-6 px-8">
          {children}
        </div>
      </main>
    </div>
  );
};