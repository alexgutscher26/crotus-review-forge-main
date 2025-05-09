export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          rating: number
          comment: string
          status: 'pending' | 'approved' | 'rejected'
          optimized: boolean
          role: string | null
          company: string | null
          avatar: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          rating: number
          comment: string
          status?: 'pending' | 'approved' | 'rejected'
          optimized?: boolean
          role?: string | null
          company?: string | null
          avatar?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          rating?: number
          comment?: string
          status?: 'pending' | 'approved' | 'rejected'
          optimized?: boolean
          role?: string | null
          company?: string | null
          avatar?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}