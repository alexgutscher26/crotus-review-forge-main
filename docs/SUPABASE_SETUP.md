# Supabase Authentication and Database Setup

## Overview

This document provides instructions for setting up and using the Supabase authentication and database integration in the Crotus Review Forge application.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and create an account if you don't have one
2. Create a new project
3. Once your project is created, go to Project Settings > API to find your project URL and anon key

### 2. Configure Environment Variables

1. Create a `.env` file in the root of the project based on the `.env.example` template
2. Add your Supabase URL and anon key:

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Set Up Database Schema

The SQL migration file in `supabase/migrations/20240101000000_initial_schema.sql` contains the database schema. You can run this in the Supabase SQL editor to create the necessary tables and policies.

## Authentication Flow

1. Users can sign up at `/signup`
2. Users can sign in at `/login`
3. New users are directed to the onboarding page to set their username
4. All dashboard routes are protected and require authentication

## Database Structure

### Users Table

- `id`: UUID (primary key, linked to auth.users)
- `created_at`: Timestamp
- `email`: Text (unique)
- `username`: Text (unique, nullable)
- `full_name`: Text (nullable)
- `avatar_url`: Text (nullable)
- `updated_at`: Timestamp (nullable)

### Reviews Table

- `id`: UUID (primary key)
- `created_at`: Timestamp
- `user_id`: UUID (foreign key to users.id)
- `name`: Text
- `rating`: Integer (1-5)
- `comment`: Text
- `status`: Text ('pending', 'approved', 'rejected')
- `optimized`: Boolean
- `role`: Text (nullable)
- `company`: Text (nullable)
- `avatar`: Text (nullable)

## Security

The implementation includes Row Level Security (RLS) policies to ensure users can only access their own data.

## API Reference

### Authentication

```typescript
// Sign up
const { data, error } = await signUp(email, password);

// Sign in
const { data, error } = await signIn(email, password);

// Sign out
const { error } = await signOut();

// Get current user
const { user, error } = await getCurrentUser();
```

### User Profile

```typescript
// Get user profile
const { profile, error } = await getUserProfile(userId);

// Update user profile
const { data, error } = await updateUserProfile(userId, updates);
```