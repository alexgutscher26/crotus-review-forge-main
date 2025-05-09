import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please check your environment variables.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Authentication helper functions
/**
 * Signs up a user with the provided email and password.
 */
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

/**
 * Signs in a user with the provided email and password.
 */
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

/**
 * Signs out the current user and returns the result of the operation.
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

/**
 * Fetches and returns the current authenticated user from Supabase.
 */
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

/**
 * Retrieves the current user session and any associated errors.
 */
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
};

// User profile functions
/**
 * Fetches a user profile by ID from the database.
 */
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  return { profile: data, error };
};

/**
 * Updates a user profile in the database.
 */
export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId);
  return { data, error };
};

/**
 * Creates a user profile in the database.
 */
export const createUserProfile = async (profile: any) => {
  const { data, error } = await supabase
    .from('users')
    .insert([profile]);
  return { data, error };
};