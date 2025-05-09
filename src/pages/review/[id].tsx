import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ReviewForm } from '@/pages/dashboard/form/Welcome';

/**
 * Component representing a review page where users can write feedback.
 */
const ReviewPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden">
          <div className="p-8 space-y-6">
            <h3 className="text-2xl font-bold">Write a review</h3>
            <p className="text-gray-600 whitespace-pre-wrap">
              Hey there! 👋 By sharing your honest feedback, you can help other people decide if our product is right for them.
            </p>
          </div>
          <div className="bg-gray-50 p-6 border-t">
            <ReviewForm onClose={() => {}} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReviewPage;