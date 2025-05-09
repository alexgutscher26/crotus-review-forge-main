import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
};

/**
 * Custom hook to fetch and manage review data with optional status filtering.
 */
export const useReviews = (status?: 'approved' | 'pending' | 'rejected') => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches and processes reviews from the database, updating state with results.
   */
  const fetchReviews = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('reviews')
        .select('*')
        .order('date', { ascending: false });

      // If status filter is provided, add it to the query
      if (status) {
        query = query.eq('status', status);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      // Transform the data to match our Review type
      const transformedReviews: Review[] = data.map(review => ({
        id: review.id,
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        date: new Date(review.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        status: review.status
      }));

      setReviews(transformedReviews);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();

    // Subscribe to changes
    const subscription = supabase
      .channel('review_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reviews',
        },
        () => {
          fetchReviews();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [status]);

  return { reviews, loading, error };
};