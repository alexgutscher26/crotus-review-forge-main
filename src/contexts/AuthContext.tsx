import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, getUserProfile } from '@/lib/supabase';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  supabase: typeof supabase;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  updateProfile: (updates: any) => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provides authentication context and state management for React components.
 *
 * This component manages user session, profile data, and provides methods for
 * signing in, signing up, signing out, and updating the user profile. It uses
 * Supabase for authentication and fetches user profiles from a database.
 * The component ensures that the initial session is loaded and listens for
 * authentication state changes to update its state accordingly.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Fetches and sets user profile based on userId.
   */
  const fetchProfile = async (userId: string) => {
    setIsLoading(true);
    const { profile, error } = await getUserProfile(userId);
    
    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(profile);
    }
    
    setIsLoading(false);
  };

  /**
   * Signs in a user with an email and password.
   */
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  /**
   * Signs up a user with the provided email and password.
   */
  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    
    // If signup is successful, fetch the user profile
    if (!error && data.user) {
      await fetchProfile(data.user.id);
    }
    
    return { error };
  };

  /**
   * Signs out the current user and returns any errors encountered.
   */
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  /**
   * Updates the user profile with the provided data.
   */
  const updateProfile = async (updates: any) => {
    if (!user) return { error: new Error('No user logged in') };
    
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id);
      
    if (!error) {
      setProfile({ ...profile, ...updates });
    }
    
    return { error };
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    supabase,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access authentication context.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}