import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  responseRate: number;
  conversionRate: number;
}

/**
 * Custom hook to fetch and calculate review statistics from a Supabase database.
 */
export const useReviewStats = () => {
  const [stats, setStats] = useState<ReviewStats>({
    totalReviews: 0,
    averageRating: 0,
    responseRate: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Asynchronously calculates and updates statistics related to reviews.
   */
  const calculateStats = async () => {
    try {
      setLoading(true);
      
      // Get total reviews
      const { data: totalData, error: totalError } = await supabase
        .from('reviews')
        .select('id', { count: 'exact' });

      if (totalError) throw totalError;

      // Get average rating
      const { data: ratingData, error: ratingError } = await supabase
        .from('reviews')
        .select('rating');

      if (ratingError) throw ratingError;

      // Get approved reviews count for response rate
      const { data: approvedData, error: approvedError } = await supabase
        .from('reviews')
        .select('id', { count: 'exact' })
        .eq('status', 'approved');

      if (approvedError) throw approvedError;

      const totalCount = totalData.length;
      const averageRating = ratingData.reduce((acc, review) => acc + review.rating, 0) / (ratingData.length || 1);
      const approvedCount = approvedData.length;
      
      // Calculate rates
      const responseRate = totalCount > 0 ? (approvedCount / totalCount) * 100 : 0;
      // For conversion rate, we'll use a simplified calculation
      // Assuming conversion is the ratio of approved reviews to total reviews
      const conversionRate = totalCount > 0 ? (approvedCount / totalCount) * 100 : 0;

      setStats({
        totalReviews: totalCount,
        averageRating: Number(averageRating.toFixed(1)),
        responseRate: Number(responseRate.toFixed(0)),
        conversionRate: Number(conversionRate.toFixed(0)),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch review stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateStats();

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
          calculateStats();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { stats, loading, error };
};