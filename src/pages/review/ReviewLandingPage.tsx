import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Video } from 'lucide-react';

const ReviewLandingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleTextReview = () => {
    navigate(`/review/${id}/text`);
  };

  const handleVideoReview = () => {
    navigate(`/review/${id}/video`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Share your feedback</h1>
          <p className="text-gray-600">
            Hey there! 👋 Choose how you'd like to share your experience with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={handleTextReview}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-3 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
          >
            <MessageSquare className="w-8 h-8" />
            <div className="text-center">
              <div className="font-medium">Write a Review</div>
              <div className="text-sm text-gray-500 mt-1">Share your thoughts in writing</div>
            </div>
          </Button>

          <Button
            onClick={handleVideoReview}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-3 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
          >
            <Video className="w-8 h-8" />
            <div className="text-center">
              <div className="font-medium">Record a Video</div>
              <div className="text-sm text-gray-500 mt-1">Share your experience on camera</div>
            </div>
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          By submitting, you agree we may share your review in our marketing.
          We appreciate your support!
        </p>
      </Card>
    </div>
  );
};

export default ReviewLandingPage;